<?php
/**
 * Constant Contact -> WordPress Newsletter Duplication Pipeline
 *
 * Automatically or on-demand duplicates sent Constant Contact email newsletters
 * (targeted at the e-Newsletter list) into native WordPress posts assigned to
 * the "Newsletter" category (status: draft by default for quick staff review).
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Retrieve a valid Constant Contact v3 Bearer access token, refreshing if needed.
 *
 * @param bool $force_refresh Whether to force a token refresh.
 * @return array {
 *     @type bool   $success      Whether a valid access token is available.
 *     @type string $access_token OAuth2 Bearer access token.
 *     @type string $error        Error message if unavailable.
 * }
 */
function itm_get_valid_ctct_access_token( $force_refresh = false ) {
	$access_token = itm_get_ctct_option( '_ctct_access_token' );

	$issued_time    = (int) get_option( 'ctct_access_token_timestamp', 0 );
	$expires_in     = (int) itm_get_ctct_option( '_ctct_expires_in' );
	$refresh_after  = $expires_in > 300 ? ( $expires_in - 300 ) : 82800;
	$is_due_refresh = ( $issued_time > 0 && ( time() - $issued_time ) >= $refresh_after );

	if ( $force_refresh || empty( $access_token ) || $is_due_refresh ) {
		$refresh_result = itm_refresh_ctct_access_token();
		if ( ! empty( $refresh_result['success'] ) && ! empty( $refresh_result['access_token'] ) ) {
			return array(
				'success'      => true,
				'access_token' => $refresh_result['access_token'],
			);
		}
		if ( empty( $access_token ) || $force_refresh ) {
			return array(
				'success' => false,
				'error'   => ! empty( $refresh_result['error'] ) ? $refresh_result['error'] : 'missing_access_token',
			);
		}
	}

	return array(
		'success'      => true,
		'access_token' => $access_token,
	);
}

/**
 * Perform an authenticated GET request against the Constant Contact v3 API
 * with automatic 401 token refresh retry.
 *
 * @param string $endpointFullUrl Full URL (e.g. 'https://api.cc.email/v3/emails?limit=25').
 * @return array {
 *     @type bool       $success Whether the request returned HTTP 200.
 *     @type array|null $data    Decoded JSON response array.
 *     @type string     $error   Error details if failed.
 * }
 */
function itm_ctct_api_get( $endpoint_url ) {
	$token_info = itm_get_valid_ctct_access_token( false );
	if ( ! $token_info['success'] ) {
		return array(
			'success' => false,
			'data'    => null,
			'error'   => $token_info['error'],
		);
	}

	$args = array(
		'headers' => array(
			'Authorization' => 'Bearer ' . trim( $token_info['access_token'] ),
			'Accept'        => 'application/json',
			'Cache-Control' => 'no-cache',
		),
		'timeout' => 20,
	);

	$response = wp_safe_remote_get( $endpoint_url, $args );
	if ( is_wp_error( $response ) ) {
		return array(
			'success' => false,
			'data'    => null,
			'error'   => $response->get_error_message(),
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	$raw_body    = wp_remote_retrieve_body( $response );

	// Reactive 401 refresh and single retry
	if ( 401 === $status_code ) {
		$retry_token = itm_get_valid_ctct_access_token( true );
		if ( $retry_token['success'] ) {
			$args['headers']['Authorization'] = 'Bearer ' . trim( $retry_token['access_token'] );
			$response                         = wp_safe_remote_get( $endpoint_url, $args );
			if ( is_wp_error( $response ) ) {
				return array(
					'success' => false,
					'data'    => null,
					'error'   => $response->get_error_message(),
				);
			}
			$status_code = wp_remote_retrieve_response_code( $response );
			$raw_body    = wp_remote_retrieve_body( $response );
		} else {
			return array(
				'success' => false,
				'data'    => null,
				'error'   => 'HTTP_401 (refresh failed: ' . ( $retry_token['error'] ?? 'unknown' ) . ')',
			);
		}
	}

	$decoded = json_decode( $raw_body, true );
	if ( 200 === $status_code && is_array( $decoded ) ) {
		return array(
			'success' => true,
			'data'    => $decoded,
			'error'   => '',
		);
	}

	return array(
		'success' => false,
		'data'    => is_array( $decoded ) ? $decoded : null,
		'error'   => 'HTTP_' . $status_code . ': ' . substr( (string) $raw_body, 0, 200 ),
	);
}

/**
 * Resolve or create the "Newsletter" category term ID.
 *
 * @return int Category term ID.
 */
function itm_get_newsletter_category_id() {
	$term = get_term_by( 'slug', 'newsletter', 'category' );
	if ( $term && ! is_wp_error( $term ) ) {
		return (int) $term->term_id;
	}

	$created = wp_insert_term(
		__( 'Newsletter', 'kiwatinook' ),
		'category',
		array( 'slug' => 'newsletter' )
	);

	if ( ! is_wp_error( $created ) && ! empty( $created['term_id'] ) ) {
		return (int) $created['term_id'];
	}

	return (int) get_option( 'default_category', 1 );
}

/**
 * Check if a Constant Contact campaign or external URL has already been imported into WordPress.
 *
 * @param string $campaign_id  Constant Contact campaign UUID.
 * @param string $external_url Optional Constant Contact permalink URL.
 * @return int Existing Post ID if found, or 0 if not yet imported.
 */
function itm_find_existing_newsletter_post( $campaign_id = '', $external_url = '' ) {
	$meta_query = array( 'relation' => 'OR' );

	if ( ! empty( $campaign_id ) ) {
		$meta_query[] = array(
			'key'     => '_ctct_campaign_id',
			'value'   => sanitize_text_field( $campaign_id ),
			'compare' => '=',
		);
	}

	if ( ! empty( $external_url ) ) {
		$meta_query[] = array(
			'key'     => '_newsletter_external_url',
			'value'   => esc_url_raw( $external_url ),
			'compare' => '=',
		);
	}

	if ( count( $meta_query ) <= 1 ) {
		return 0;
	}

	$existing = get_posts(
		array(
			'post_type'      => 'post',
			'post_status'    => array( 'publish', 'draft', 'pending', 'future', 'private' ),
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_query'     => $meta_query,
		)
	);

	return ! empty( $existing[0] ) ? (int) $existing[0] : 0;
}

/**
 * Clean email boilerplate text and normalize whitespace.
 *
 * @param string $text Raw text extracted from DOM node.
 * @return string Cleaned text.
 */
function itm_clean_newsletter_node_text( $text ) {
	if ( ! is_string( $text ) ) {
		return '';
	}
	// Replace non-breaking spaces and collapse whitespace
	$text = str_replace( array( "\xc2\xa0", '&nbsp;' ), ' ', $text );
	$text = preg_replace( '/\s+/u', ' ', $text );
	return trim( $text );
}

/**
 * Determine whether a text snippet is email footer/header boilerplate that should be excluded.
 *
 * @param string $text Text to inspect.
 * @return bool True if boilerplate.
 */
function itm_is_email_boilerplate_text( $text ) {
	$lower = strtolower( trim( $text ) );
	if ( '' === $lower || strlen( $lower ) < 3 ) {
		return true;
	}

	$boilerplate_phrases = array(
		'unsubscribe',
		'update profile',
		'constant contact data notice',
		'sent by ',
		'powered by constant contact',
		'try email marketing for free',
		'safeunsubscribe',
		'view this email in your browser',
		'having trouble viewing this email',
		'forward to a friend',
	);

	foreach ( $boilerplate_phrases as $phrase ) {
		if ( false !== strpos( $lower, $phrase ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Transform Constant Contact campaign HTML into native WordPress Gutenberg blocks
 * matching `patterns/newsletter.php`, and extract the primary hero image URL and excerpt.
 *
 * @param string $raw_html      Raw HTML content from Constant Contact campaign or web archive.
 * @param string $permalink_url Optional Constant Contact hosted archive URL ('https://conta.cc/...').
 * @param string $preheader     Optional campaign preheader text.
 * @return array {
 *     @type string $block_content Gutenberg block markup.
 *     @type string $excerpt       Extracted 1-2 sentence excerpt.
 *     @type string $hero_image    First content/hero image URL found in the email.
 * }
 */
function itm_transform_ctct_html_to_blocks( $raw_html, $permalink_url = '', $preheader = '' ) {
	$blocks          = array();
	$hero_image      = '';
	$lead_assigned   = false;
	$first_paragraph = '';
	$seen_hashes     = array();

	if ( ! empty( $raw_html ) && class_exists( 'DOMDocument' ) ) {
		$prev_errors = libxml_use_internal_errors( true );
		$dom         = new DOMDocument();

		// Ensure UTF-8 parsing
		$encoded_html = '<?xml encoding="UTF-8">' . $raw_html;
		$dom->loadHTML( $encoded_html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
		libxml_clear_errors();
		libxml_use_internal_errors( $prev_errors );

		// Remove non-content elements (style, script, head, title, meta, svg)
		$remove_tags = array( 'style', 'script', 'head', 'title', 'meta', 'noscript' );
		foreach ( $remove_tags as $tag_name ) {
			$node_list = $dom->getElementsByTagName( $tag_name );
			for ( $i = $node_list->length - 1; $i >= 0; $i-- ) {
				$node = $node_list->item( $i );
				if ( $node && $node->parentNode ) {
					$node->parentNode->removeChild( $node );
				}
			}
		}

		$xpath = new DOMXPath( $dom );

		// Query semantic content elements in document order
		$nodes = $xpath->query( '//h1 | //h2 | //h3 | //h4 | //p | //ul | //ol | //img | //a' );

		if ( $nodes ) {
			foreach ( $nodes as $node ) {
				$tag = strtolower( $node->nodeName );

				// Skip nodes located inside a Constant Contact compliance footer container
				$ancestor_classes = '';
				$parent           = $node->parentNode;
				while ( $parent && XML_ELEMENT_NODE === $parent->nodeType ) {
					if ( $parent->hasAttribute( 'class' ) ) {
						$ancestor_classes .= ' ' . strtolower( $parent->getAttribute( 'class' ) );
					}
					if ( $parent->hasAttribute( 'id' ) ) {
						$ancestor_classes .= ' ' . strtolower( $parent->getAttribute( 'id' ) );
					}
					$parent = $parent->parentNode;
				}
				if (
					false !== strpos( $ancestor_classes, 'footer-container' ) ||
					false !== strpos( $ancestor_classes, 'compliance' ) ||
					false !== strpos( $ancestor_classes, 'unsubscribe' )
				) {
					continue;
				}

				if ( in_array( $tag, array( 'h1', 'h2', 'h3', 'h4' ), true ) ) {
					$text = itm_clean_newsletter_node_text( $node->textContent );
					if ( itm_is_email_boilerplate_text( $text ) ) {
						continue;
					}

					$hash = 'h:' . md5( strtolower( $text ) );
					if ( isset( $seen_hashes[ $hash ] ) ) {
						continue;
					}
					$seen_hashes[ $hash ] = true;

					// Map h1 -> h2 inside post body since post title is already h1
					$level    = ( 'h1' === $tag || 'h2' === $tag ) ? 2 : 3;
					$blocks[] = sprintf(
						"<!-- wp:heading {\"level\":%d} -->\n<h%d class=\"wp-block-heading\">%s</h%d>\n<!-- /wp:heading -->",
						$level,
						$level,
						esc_html( $text ),
						$level
					);
				} elseif ( 'p' === $tag ) {
					// Skip <p> inside <li> (handled by list block)
					if ( $node->parentNode && 'li' === strtolower( $node->parentNode->nodeName ) ) {
						continue;
					}

					$text = itm_clean_newsletter_node_text( $node->textContent );
					if ( itm_is_email_boilerplate_text( $text ) ) {
						continue;
					}

					$hash = 'p:' . md5( strtolower( $text ) );
					if ( isset( $seen_hashes[ $hash ] ) ) {
						continue;
					}
					$seen_hashes[ $hash ] = true;

					if ( '' === $first_paragraph && strlen( $text ) > 35 ) {
						$first_paragraph = $text;
					}

					// Preserve safe inline links inside paragraphs
					$inner_html = '';
					foreach ( $node->childNodes as $child ) {
						$inner_html .= $dom->saveHTML( $child );
					}
					$clean_html = wp_kses(
						itm_clean_newsletter_node_text( $inner_html ),
						array(
							'a'      => array(
								'href'   => true,
								'target' => true,
								'rel'    => true,
							),
							'strong' => array(),
							'b'      => array(),
							'em'     => array(),
							'i'      => array(),
							'br'     => array(),
						)
					);

					if ( '' === trim( wp_strip_all_tags( $clean_html ) ) ) {
						continue;
					}

					if ( ! $lead_assigned && strlen( $text ) >= 40 ) {
						$lead_assigned = true;
						$blocks[]      = sprintf(
							"<!-- wp:paragraph {\"style\":{\"typography\":{\"fontSize\":\"1.25rem\",\"lineHeight\":\"1.6\"}},\"className\":\"has-custom-font-size itm-newsletter-lead\"} -->\n<p class=\"has-custom-font-size itm-newsletter-lead\" style=\"font-size:1.25rem;line-height:1.6\">%s</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:separator {\"className\":\"is-style-wide\"} -->\n<hr class=\"wp-block-separator has-alpha-channel-opacity is-style-wide\"/>\n<!-- /wp:separator -->",
							$clean_html
						);
					} else {
						$blocks[] = sprintf(
							"<!-- wp:paragraph -->\n<p>%s</p>\n<!-- /wp:paragraph -->",
							$clean_html
						);
					}
				} elseif ( 'ul' === $tag || 'ol' === $tag ) {
					$items = array();
					foreach ( $node->childNodes as $li ) {
						if ( 'li' === strtolower( $li->nodeName ) ) {
							$li_text = itm_clean_newsletter_node_text( $li->textContent );
							if ( ! itm_is_email_boilerplate_text( $li_text ) ) {
								$items[] = sprintf(
									"<!-- wp:list-item -->\n<li>%s</li>\n<!-- /wp:list-item -->",
									esc_html( $li_text )
								);
							}
						}
					}

					if ( ! empty( $items ) ) {
						$ordered  = ( 'ol' === $tag );
						$attr     = $ordered ? ' {"ordered":true}' : '';
						$blocks[] = sprintf(
							"<!-- wp:list%s -->\n<%s class=\"wp-block-list\">\n%s\n</%s>\n<!-- /wp:list -->",
							$attr,
							$tag,
							implode( "\n", $items ),
							$tag
						);
					}
				} elseif ( 'img' === $tag ) {
					$src    = trim( $node->getAttribute( 'src' ) );
					$alt    = itm_clean_newsletter_node_text( $node->getAttribute( 'alt' ) );
					$width  = (int) $node->getAttribute( 'width' );
					$height = (int) $node->getAttribute( 'height' );

					if ( empty( $src ) || 0 !== strpos( $src, 'http' ) ) {
						continue;
					}

					// Ignore tracking pixels, social icons, spacers, and tiny badges
					$src_lower = strtolower( $src );
					if (
						( $width > 0 && $width < 120 ) ||
						( $height > 0 && $height < 60 ) ||
						false !== strpos( $src_lower, 'spacer' ) ||
						false !== strpos( $src_lower, 'pixel' ) ||
						false !== strpos( $src_lower, 'track' ) ||
						false !== strpos( $src_lower, 'social' ) ||
						false !== strpos( $src_lower, 'facebook' ) ||
						false !== strpos( $src_lower, 'instagram' ) ||
						false !== strpos( $src_lower, 'linkedin' ) ||
						false !== strpos( $src_lower, 'youtube' ) ||
						false !== strpos( $src_lower, 'twitter' ) ||
						false !== strpos( $src_lower, 'constantcontact.com/letters/images' )
					) {
						continue;
					}

					$hash = 'img:' . md5( $src );
					if ( isset( $seen_hashes[ $hash ] ) ) {
						continue;
					}
					$seen_hashes[ $hash ] = true;

					// Record the first substantial image as the featured hero image
					if ( '' === $hero_image ) {
						$hero_image = $src;
					}

					$blocks[] = sprintf(
						"<!-- wp:image {\"sizeSlug\":\"large\"} -->\n<figure class=\"wp-block-image size-large\"><img src=\"%s\" alt=\"%s\"/></figure>\n<!-- /wp:image -->",
						esc_url( $src ),
						esc_attr( $alt )
					);
				} elseif ( 'a' === $tag ) {
					// Convert standalone button-styled links in email tables into Gutenberg buttons
					$parent_tag = $node->parentNode ? strtolower( $node->parentNode->nodeName ) : '';
					if ( in_array( $parent_tag, array( 'p', 'li', 'h1', 'h2', 'h3', 'h4' ), true ) ) {
						continue;
					}

					$href       = trim( $node->getAttribute( 'href' ) );
					$label      = itm_clean_newsletter_node_text( $node->textContent );
					$class_attr = strtolower( $node->getAttribute( 'class' ) . ' ' . $node->getAttribute( 'style' ) );

					if (
						empty( $href ) ||
						0 !== strpos( $href, 'http' ) ||
						itm_is_email_boilerplate_text( $label ) ||
						strlen( $label ) > 65
					) {
						continue;
					}

					$is_button_like = (
						false !== strpos( $class_attr, 'button' ) ||
						false !== strpos( $class_attr, 'btn' ) ||
						false !== strpos( $class_attr, 'background-color' ) ||
						( 'td' === $parent_tag && $node->parentNode->hasAttribute( 'bgcolor' ) )
					);

					if ( ! $is_button_like ) {
						continue;
					}

					$hash = 'btn:' . md5( $href . '|' . strtolower( $label ) );
					if ( isset( $seen_hashes[ $hash ] ) ) {
						continue;
					}
					$seen_hashes[ $hash ] = true;

					$blocks[] = sprintf(
						"<!-- wp:buttons {\"layout\":{\"type\":\"flex\",\"justifyContent\":\"left\"}} -->\n<div class=\"wp-block-buttons\">\n\t<!-- wp:button {\"className\":\"btn btn--outline is-external-link\"} -->\n\t<div class=\"wp-block-button btn btn--outline is-external-link\"><a class=\"wp-block-button__link wp-element-button\" href=\"%s\" target=\"_blank\" rel=\"noopener noreferrer\">%s <span class=\"screen-reader-text\">(opens in a new tab)</span></a></div>\n\t<!-- /wp:button -->\n</div>\n<!-- /wp:buttons -->",
						esc_url( $href ),
						esc_html( $label )
					);
				}
			}
		}
	}

	// Fallback if the campaign HTML had non-standard table text nodes without <p> tags
	if ( empty( $blocks ) && ! empty( $raw_html ) ) {
		$plain = trim( wp_strip_all_tags( $raw_html ) );
		$lines = preg_split( '/\R{2,}/', $plain );
		foreach ( $lines as $line ) {
			$clean = itm_clean_newsletter_node_text( $line );
			if ( ! itm_is_email_boilerplate_text( $clean ) && strlen( $clean ) > 25 ) {
				if ( '' === $first_paragraph ) {
					$first_paragraph = $clean;
				}
				$blocks[] = sprintf(
					"<!-- wp:paragraph -->\n<p>%s</p>\n<!-- /wp:paragraph -->",
					esc_html( $clean )
				);
			}
		}
	}

	// Build bottom "Never Miss an Update" callout matching patterns/newsletter.php
	$original_email_btn = '';
	if ( ! empty( $permalink_url ) ) {
		$original_email_btn = sprintf(
			"\n\t\t<!-- wp:button {\"className\":\"btn btn--outline is-external-link\"} -->\n\t\t<div class=\"wp-block-button btn btn--outline is-external-link\"><a class=\"wp-block-button__link wp-element-button\" href=\"%s\" target=\"_blank\" rel=\"noopener noreferrer\">%s <span class=\"screen-reader-text\">(opens in a new tab)</span></a></div>\n\t\t<!-- /wp:button -->",
			esc_url( $permalink_url ),
			esc_html__( 'View Original Email Version', 'kiwatinook' )
		);
	}

	$blocks[] = sprintf(
		"<!-- wp:group {\"style\":{\"spacing\":{\"padding\":{\"top\":\"2rem\",\"bottom\":\"2rem\",\"left\":\"2rem\",\"right\":\"2rem\"},\"margin\":{\"top\":\"2.5rem\"}},\"border\":{\"radius\":\"8px\"}},\"backgroundColor\":\"light-gray\",\"className\":\"itm-newsletter-callout\",\"layout\":{\"type\":\"constrained\"}} -->\n<div class=\"wp-block-group itm-newsletter-callout has-light-gray-background-color has-background\" style=\"border-radius:8px;margin-top:2.5rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem\">\n\t<!-- wp:heading {\"level\":3,\"style\":{\"typography\":{\"fontSize\":\"1.375rem\"}}} -->\n\t<h3 class=\"wp-block-heading\" style=\"font-size:1.375rem\">%s</h3>\n\t<!-- /wp:heading -->\n\n\t<!-- wp:paragraph -->\n\t<p>%s</p>\n\t<!-- /wp:paragraph -->\n\n\t<!-- wp:buttons {\"layout\":{\"type\":\"flex\",\"justifyContent\":\"left\"}} -->\n\t<div class=\"wp-block-buttons\">\n\t\t<!-- wp:button {\"className\":\"btn btn--primary\"} -->\n\t\t<div class=\"wp-block-button btn btn--primary\"><a class=\"wp-block-button__link wp-element-button\" href=\"#itm-newsletter-form\">%s</a></div>\n\t\t<!-- /wp:button -->\n\t\t<!-- wp:button {\"className\":\"btn btn--outline\"} -->\n\t\t<div class=\"wp-block-button btn btn--outline\"><a class=\"wp-block-button__link wp-element-button\" href=\"/category/newsletter/\">%s</a></div>\n\t\t<!-- /wp:button -->%s\n\t</div>\n\t<!-- /wp:buttons -->\n</div>\n<!-- /wp:group -->",
		esc_html__( 'Never Miss an Update', 'kiwatinook' ),
		esc_html__( 'Subscribe to receive our e-newsletter directly in your inbox, or explore previous editions in our updates archive.', 'kiwatinook' ),
		esc_html__( 'Subscribe to Future Issues', 'kiwatinook' ),
		esc_html__( 'Browse Newsletter Archive', 'kiwatinook' ),
		$original_email_btn
	);

	$excerpt_source = ! empty( $preheader ) ? itm_clean_newsletter_node_text( $preheader ) : $first_paragraph;
	$excerpt        = ! empty( $excerpt_source )
		? wp_trim_words( $excerpt_source, 28, '...' )
		: __( 'Explore seasonal highlights, authentic Indigenous travel stories, member milestones, and upcoming cultural gatherings across Manitoba.', 'kiwatinook' );

	return array(
		'block_content' => implode( "\n\n", $blocks ),
		'excerpt'       => $excerpt,
		'hero_image'    => $hero_image,
	);
}

/**
 * Download and attach a remote campaign hero image as the post's Featured Image.
 *
 * @param string $image_url Remote image URL.
 * @param int    $post_id   Target WordPress Post ID.
 * @param string $title     Post title for attachment description.
 * @return int|false Attachment ID on success, false on failure.
 */
function itm_sideload_newsletter_hero_image( $image_url, $post_id, $title = '' ) {
	if ( empty( $image_url ) || empty( $post_id ) || has_post_thumbnail( $post_id ) ) {
		return false;
	}

	if ( ! function_exists( 'media_sideload_image' ) ) {
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';
	}

	$attachment_id = media_sideload_image( $image_url, $post_id, $title, 'id' );
	if ( ! is_wp_error( $attachment_id ) && is_numeric( $attachment_id ) ) {
		set_post_thumbnail( $post_id, (int) $attachment_id );
		return (int) $attachment_id;
	}

	return false;
}

/**
 * Create a native WordPress Newsletter post from Constant Contact campaign data.
 *
 * @param array $campaign_data {
 *     @type string $campaign_id    Constant Contact campaign UUID.
 *     @type string $activity_id    Constant Contact primary email activity UUID.
 *     @type string $title          Newsletter subject / headline.
 *     @type string $preheader      Email preheader text.
 *     @type string $html_content   Raw email HTML content.
 *     @type string $permalink_url  Constant Contact hosted archive URL.
 *     @type string $sent_date      ISO/MySQL send timestamp.
 *     @type string $edition_label  Optional edition badge label (e.g. 'Spring 2026').
 *     @type string $post_status    Target post status ('draft' by default).
 * }
 * @return array {
 *     @type bool   $created   Whether a new post was created.
 *     @type bool   $skipped   Whether the campaign was skipped because it already exists.
 *     @type int    $post_id   WordPress Post ID.
 *     @type string $title     Post title.
 *     @type string $status    Post status ('draft' or 'publish').
 *     @type string $edit_url  Admin edit URL.
 *     @type string $view_url  Frontend preview/permalink URL.
 *     @type string $error     Error message if creation failed.
 * }
 */
function itm_create_newsletter_post_from_campaign( $campaign_data ) {
	$campaign_id   = isset( $campaign_data['campaign_id'] ) ? sanitize_text_field( $campaign_data['campaign_id'] ) : '';
	$activity_id   = isset( $campaign_data['activity_id'] ) ? sanitize_text_field( $campaign_data['activity_id'] ) : '';
	$permalink_url = isset( $campaign_data['permalink_url'] ) ? esc_url_raw( $campaign_data['permalink_url'] ) : '';

	// Deduplication check
	$existing_id = itm_find_existing_newsletter_post( $campaign_id, $permalink_url );
	if ( $existing_id > 0 ) {
		return array(
			'created'  => false,
			'skipped'  => true,
			'post_id'  => $existing_id,
			'title'    => html_entity_decode( get_the_title( $existing_id ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ),
			'status'   => get_post_status( $existing_id ),
			'edit_url' => admin_url( 'post.php?post=' . (int) $existing_id . '&action=edit' ),
			'view_url' => get_permalink( $existing_id ),
		);
	}

	$title       = ! empty( $campaign_data['title'] ) ? sanitize_text_field( $campaign_data['title'] ) : __( 'Indigenous Tourism Manitoba e-Newsletter', 'kiwatinook' );
	$preheader   = isset( $campaign_data['preheader'] ) ? sanitize_text_field( $campaign_data['preheader'] ) : '';
	$raw_html    = isset( $campaign_data['html_content'] ) ? (string) $campaign_data['html_content'] : '';
	$post_status = ! empty( $campaign_data['post_status'] ) ? sanitize_key( $campaign_data['post_status'] ) : 'draft';

	$transformed = itm_transform_ctct_html_to_blocks( $raw_html, $permalink_url, $preheader );
	$category_id = itm_get_newsletter_category_id();

	$post_args = array(
		'post_type'     => 'post',
		'post_title'    => $title,
		'post_content'  => $transformed['block_content'],
		'post_excerpt'  => ! empty( $campaign_data['excerpt'] ) ? sanitize_text_field( $campaign_data['excerpt'] ) : $transformed['excerpt'],
		'post_status'   => $post_status,
		'post_category' => array( $category_id ),
	);

	if ( ! empty( $campaign_data['sent_date'] ) ) {
		$timestamp = strtotime( (string) $campaign_data['sent_date'] );
		if ( $timestamp ) {
			$post_args['post_date']     = gmdate( 'Y-m-d H:i:s', $timestamp + ( (int) get_option( 'gmt_offset' ) * HOUR_IN_SECONDS ) );
			$post_args['post_date_gmt'] = gmdate( 'Y-m-d H:i:s', $timestamp );
		}
	}

	$post_id = wp_insert_post( wp_slash( $post_args ), true );
	if ( is_wp_error( $post_id ) ) {
		return array(
			'created' => false,
			'skipped' => false,
			'post_id' => 0,
			'error'   => $post_id->get_error_message(),
		);
	}

	// Store Constant Contact metadata for deduplication & template display
	if ( ! empty( $campaign_id ) ) {
		update_post_meta( $post_id, '_ctct_campaign_id', $campaign_id );
	}
	if ( ! empty( $activity_id ) ) {
		update_post_meta( $post_id, '_ctct_activity_id', $activity_id );
	}
	if ( ! empty( $permalink_url ) ) {
		update_post_meta( $post_id, '_newsletter_external_url', $permalink_url );
	}
	if ( ! empty( $campaign_data['edition_label'] ) ) {
		update_post_meta( $post_id, '_newsletter_edition_number', sanitize_text_field( $campaign_data['edition_label'] ) );
	}

	// Sideload lead campaign image as Featured Image
	$hero_image = ! empty( $campaign_data['hero_image'] ) ? $campaign_data['hero_image'] : $transformed['hero_image'];
	if ( ! empty( $hero_image ) ) {
		itm_sideload_newsletter_hero_image( $hero_image, $post_id, $title );
	}

	return array(
		'created'  => true,
		'skipped'  => false,
		'post_id'  => (int) $post_id,
		'title'    => $title,
		'status'   => $post_status,
		'edit_url' => admin_url( 'post.php?post=' . (int) $post_id . '&action=edit' ),
		'view_url' => get_preview_post_link( $post_id ),
	);
}

/**
 * Poll Constant Contact v3 API for sent ("Done") email campaigns targeted at the
 * e-Newsletter list (5aa6bf4a-fbb1-11f0-b6d2-0242a2ded4be) and create draft posts.
 *
 * @param array $options {
 *     @type int    $limit       Max campaigns to inspect (default 15).
 *     @type string $post_status Target post status ('draft' by default).
 *     @type string $list_id     Target Constant Contact list UUID.
 * }
 * @return array Summary of synced, skipped, and errored campaigns.
 */
function itm_sync_sent_newsletters_from_constant_contact( $options = array() ) {
	$limit       = isset( $options['limit'] ) ? max( 1, min( 50, (int) $options['limit'] ) ) : 15;
	$post_status = ! empty( $options['post_status'] ) ? sanitize_key( $options['post_status'] ) : 'draft';
	$target_list = ! empty( $options['list_id'] ) ? sanitize_text_field( $options['list_id'] ) : itm_get_newsletter_list_id();

	$campaigns_res = itm_ctct_api_get( 'https://api.cc.email/v3/emails?limit=' . $limit );
	if ( ! $campaigns_res['success'] ) {
		return array(
			'success'  => false,
			'error'    => $campaigns_res['error'],
			'imported' => array(),
			'skipped'  => array(),
		);
	}

	$campaigns = isset( $campaigns_res['data']['campaigns'] ) && is_array( $campaigns_res['data']['campaigns'] )
		? $campaigns_res['data']['campaigns']
		: array();

	$imported = array();
	$skipped  = array();
	$errors   = array();

	foreach ( $campaigns as $campaign ) {
		$campaign_id = isset( $campaign['campaign_id'] ) ? sanitize_text_field( $campaign['campaign_id'] ) : '';
		$status      = isset( $campaign['current_status'] ) ? (string) $campaign['current_status'] : '';
		$type        = isset( $campaign['type'] ) ? (string) $campaign['type'] : '';

		// Only duplicate completed ("Done") newsletter email campaigns
		if ( empty( $campaign_id ) || 'Done' !== $status ) {
			continue;
		}
		if ( ! empty( $type ) && 'NEWSLETTER' !== strtoupper( $type ) && 'CUSTOM_CODE_EMAIL' !== strtoupper( $type ) ) {
			continue;
		}

		// Quick check before making extra per-campaign API requests
		$existing_id = itm_find_existing_newsletter_post( $campaign_id );
		if ( $existing_id > 0 ) {
			$skipped[] = array(
				'campaign_id' => $campaign_id,
				'post_id'     => $existing_id,
				'title'       => get_the_title( $existing_id ),
				'reason'      => 'already_imported',
			);
			continue;
		}

		// Fetch campaign details to locate the primary_email activity ID
		$detail_res = itm_ctct_api_get( 'https://api.cc.email/v3/emails/' . rawurlencode( $campaign_id ) );
		if ( ! $detail_res['success'] || empty( $detail_res['data'] ) ) {
			$errors[] = 'Failed to fetch campaign ' . $campaign_id . ': ' . ( $detail_res['error'] ?? 'unknown' );
			continue;
		}

		$detail          = $detail_res['data'];
		$activities      = isset( $detail['campaign_activities'] ) && is_array( $detail['campaign_activities'] )
			? $detail['campaign_activities']
			: array();
		$primary_act_id  = '';
		$permalink_url   = '';

		foreach ( $activities as $act ) {
			if ( isset( $act['role'] ) && 'primary_email' === $act['role'] && ! empty( $act['campaign_activity_id'] ) ) {
				$primary_act_id = sanitize_text_field( $act['campaign_activity_id'] );
				break;
			}
		}

		if ( empty( $primary_act_id ) && ! empty( $activities[0]['campaign_activity_id'] ) ) {
			$primary_act_id = sanitize_text_field( $activities[0]['campaign_activity_id'] );
		}

		if ( empty( $primary_act_id ) ) {
			continue;
		}

		// Fetch the primary email activity payload (includes contact_list_ids, subject, html_content, permalink_url)
		$act_res = itm_ctct_api_get( 'https://api.cc.email/v3/emails/activities/' . rawurlencode( $primary_act_id ) );
		if ( ! $act_res['success'] || empty( $act_res['data'] ) ) {
			$errors[] = 'Failed to fetch activity ' . $primary_act_id . ': ' . ( $act_res['error'] ?? 'unknown' );
			continue;
		}

		$activity  = $act_res['data'];
		$list_ids  = isset( $activity['contact_list_ids'] ) && is_array( $activity['contact_list_ids'] )
			? $activity['contact_list_ids']
			: array();

		// Filter strictly to campaigns sent to the target e-Newsletter list (5aa6bf4a-fbb1-11f0-b6d2-0242a2ded4be)
		if ( ! empty( $target_list ) && ! in_array( $target_list, $list_ids, true ) ) {
			$skipped[] = array(
				'campaign_id' => $campaign_id,
				'title'       => $activity['subject'] ?? ( $campaign['name'] ?? $campaign_id ),
				'reason'      => 'not_sent_to_enewsletter_list',
			);
			continue;
		}

		$permalink_url = ! empty( $activity['permalink_url'] ) ? esc_url_raw( $activity['permalink_url'] ) : '';
		$html_content  = ! empty( $activity['html_content'] ) ? (string) $activity['html_content'] : '';

		// If html_content is omitted by API and permalink_url is available, fetch the hosted web version
		if ( empty( $html_content ) && ! empty( $permalink_url ) ) {
			$web_res = wp_safe_remote_get( $permalink_url, array( 'timeout' => 15 ) );
			if ( ! is_wp_error( $web_res ) && 200 === wp_remote_retrieve_response_code( $web_res ) ) {
				$html_content = wp_remote_retrieve_body( $web_res );
			}
		}

		$subject   = ! empty( $activity['subject'] ) ? $activity['subject'] : ( $campaign['name'] ?? '' );
		$preheader = ! empty( $activity['preheader'] ) ? $activity['preheader'] : '';
		$sent_date = ! empty( $campaign['updated_at'] ) ? $campaign['updated_at'] : ( $campaign['created_at'] ?? '' );

		$created = itm_create_newsletter_post_from_campaign(
			array(
				'campaign_id'   => $campaign_id,
				'activity_id'   => $primary_act_id,
				'title'         => $subject,
				'preheader'     => $preheader,
				'html_content'  => $html_content,
				'permalink_url' => $permalink_url,
				'sent_date'     => $sent_date,
				'post_status'   => $post_status,
			)
		);

		if ( ! empty( $created['created'] ) ) {
			$imported[] = $created;
		} elseif ( ! empty( $created['skipped'] ) ) {
			$skipped[] = $created;
		} elseif ( ! empty( $created['error'] ) ) {
			$errors[] = $created['error'];
		}
	}

	update_option( 'itm_ctct_last_newsletter_sync', current_time( 'mysql' ), false );

	return array(
		'success'  => true,
		'imported' => $imported,
		'skipped'  => $skipped,
		'errors'   => $errors,
	);
}

/**
 * Import a single Constant Contact newsletter directly from its public archive URL (e.g. https://conta.cc/...).
 *
 * @param string $url     Public archive URL of the Constant Contact newsletter.
 * @param array  $options Optional overrides ('title', 'date', 'post_status', 'edition_label').
 * @return array Result array from itm_create_newsletter_post_from_campaign().
 */
function itm_import_newsletter_from_archive_url( $url, $options = array() ) {
	$clean_url = esc_url_raw( trim( $url ) );
	if ( empty( $clean_url ) ) {
		return array(
			'created' => false,
			'error'   => 'Invalid newsletter archive URL.',
		);
	}

	$existing_id = itm_find_existing_newsletter_post( '', $clean_url );
	if ( $existing_id > 0 ) {
		return array(
			'created'  => false,
			'skipped'  => true,
			'post_id'  => $existing_id,
			'title'    => get_the_title( $existing_id ),
			'status'   => get_post_status( $existing_id ),
			'edit_url' => admin_url( 'post.php?post=' . $existing_id . '&action=edit' ),
			'view_url' => get_permalink( $existing_id ),
		);
	}

	$response = wp_safe_remote_get( $clean_url, array( 'timeout' => 20 ) );
	if ( is_wp_error( $response ) ) {
		return array(
			'created' => false,
			'error'   => $response->get_error_message(),
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	$html        = wp_remote_retrieve_body( $response );

	if ( 200 !== $status_code || empty( $html ) ) {
		return array(
			'created' => false,
			'error'   => 'HTTP_' . $status_code . ' when fetching archive URL.',
		);
	}

	// Extract <title> from HTML if not explicitly passed
	$title = ! empty( $options['title'] ) ? sanitize_text_field( $options['title'] ) : '';
	if ( '' === $title && preg_match( '/<title[^>]*>(.*?)<\/title>/is', $html, $matches ) ) {
		$title = html_entity_decode( trim( $matches[1] ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
	}
	if ( '' === $title ) {
		$title = __( 'Indigenous Tourism Manitoba e-Newsletter', 'kiwatinook' );
	}

	return itm_create_newsletter_post_from_campaign(
		array(
			'campaign_id'   => ! empty( $options['campaign_id'] ) ? $options['campaign_id'] : 'url_' . md5( $clean_url ),
			'title'         => $title,
			'html_content'  => $html,
			'permalink_url' => $clean_url,
			'sent_date'     => ! empty( $options['date'] ) ? $options['date'] : '',
			'edition_label' => ! empty( $options['edition_label'] ) ? $options['edition_label'] : '',
			'post_status'   => ! empty( $options['post_status'] ) ? $options['post_status'] : 'draft',
		)
	);
}

/**
 * Schedule background WP-Cron job to check for newly sent Constant Contact newsletters twice daily.
 */
function itm_schedule_newsletter_sync_cron() {
	if ( ! wp_next_scheduled( 'itm_ctct_sync_sent_newsletters_cron' ) ) {
		wp_schedule_event( time() + ( 15 * MINUTE_IN_SECONDS ), 'twicedaily', 'itm_ctct_sync_sent_newsletters_cron' );
	}
}
add_action( 'init', 'itm_schedule_newsletter_sync_cron' );

/**
 * WP-Cron callback for automatic Constant Contact newsletter duplication.
 */
function itm_run_scheduled_newsletter_sync() {
	// Skip background cron polling on local dev domains unless explicitly enabled
	$host          = wp_parse_url( home_url(), PHP_URL_HOST );
	$is_local_host = is_string( $host ) && (
		'localhost' === $host ||
		'127.0.0.1' === $host ||
		false !== strpos( $host, '.lndo.site' ) ||
		false !== strpos( $host, '.local' ) ||
		false !== strpos( $host, '.test' )
	);
	if ( $is_local_host && ( ! defined( 'ITM_ALLOW_LOCAL_CTCT_SYNC' ) || ! ITM_ALLOW_LOCAL_CTCT_SYNC ) ) {
		return;
	}

	itm_sync_sent_newsletters_from_constant_contact(
		array(
			'limit'       => 10,
			'post_status' => 'draft',
		)
	);
}
add_action( 'itm_ctct_sync_sent_newsletters_cron', 'itm_run_scheduled_newsletter_sync' );

/**
 * Add "Sync Newsletters (Constant Contact)" submenu item under Posts in WP Admin
 * and handle one-click manual sync requests.
 */
function itm_register_newsletter_sync_admin_menu() {
	add_posts_page(
		__( 'Sync Sent Newsletters', 'kiwatinook' ),
		__( 'Sync Newsletters', 'kiwatinook' ),
		'edit_posts',
		'itm-sync-newsletters',
		'itm_render_newsletter_sync_admin_page'
	);
}
add_action( 'admin_menu', 'itm_register_newsletter_sync_admin_menu' );

/**
 * Handle form submissions from the "Sync Sent Newsletters" admin screen.
 */
function itm_handle_newsletter_sync_admin_action() {
	if ( ! is_admin() || ! isset( $_POST['itm_newsletter_sync_action'] ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_die( esc_html__( 'You do not have permission to sync newsletters.', 'kiwatinook' ) );
	}

	check_admin_referer( 'itm_sync_newsletters_nonce', 'itm_sync_newsletters_nonce_field' );

	$action = sanitize_key( wp_unslash( $_POST['itm_newsletter_sync_action'] ) );
	$result = array();

	if ( 'sync_api' === $action ) {
		$result = itm_sync_sent_newsletters_from_constant_contact(
			array(
				'limit'       => 15,
				'post_status' => 'draft',
			)
		);
	} elseif ( 'import_url' === $action && ! empty( $_POST['itm_archive_url'] ) ) {
		$archive_url  = esc_url_raw( wp_unslash( $_POST['itm_archive_url'] ) );
		$custom_title = isset( $_POST['itm_custom_title'] ) ? sanitize_text_field( wp_unslash( $_POST['itm_custom_title'] ) ) : '';
		$single_res   = itm_import_newsletter_from_archive_url(
			$archive_url,
			array(
				'title'       => $custom_title,
				'post_status' => 'draft',
			)
		);

		if ( ! empty( $single_res['created'] ) ) {
			$result = array(
				'success'  => true,
				'imported' => array( $single_res ),
				'skipped'  => array(),
				'errors'   => array(),
			);
		} elseif ( ! empty( $single_res['skipped'] ) ) {
			$result = array(
				'success'  => true,
				'imported' => array(),
				'skipped'  => array( $single_res ),
				'errors'   => array(),
			);
		} else {
			$result = array(
				'success'  => false,
				'error'    => $single_res['error'] ?? __( 'Could not import URL.', 'kiwatinook' ),
				'imported' => array(),
				'skipped'  => array(),
			);
		}
	}

	set_transient( 'itm_newsletter_sync_admin_notice_' . get_current_user_id(), $result, 60 );
	wp_safe_redirect( admin_url( 'edit.php?page=itm-sync-newsletters' ) );
	exit;
}
add_action( 'admin_init', 'itm_handle_newsletter_sync_admin_action' );

/**
 * Render the WP Admin "Posts -> Sync Newsletters" page.
 */
function itm_render_newsletter_sync_admin_page() {
	$notice    = get_transient( 'itm_newsletter_sync_admin_notice_' . get_current_user_id() );
	if ( false !== $notice ) {
		delete_transient( 'itm_newsletter_sync_admin_notice_' . get_current_user_id() );
	}
	$last_sync = get_option( 'itm_ctct_last_newsletter_sync', '' );
	$list_id   = itm_get_newsletter_list_id();
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Sync Sent Newsletters from Constant Contact', 'kiwatinook' ); ?></h1>
		<p>
			<?php
			esc_html_e(
				'Automatically or manually duplicate sent Constant Contact e-Newsletters into native WordPress draft posts under the Newsletter category.',
				'kiwatinook'
			);
			?>
		</p>

		<?php if ( is_array( $notice ) ) : ?>
			<?php if ( ! empty( $notice['success'] ) ) : ?>
				<div class="notice notice-success is-dismissible">
					<p>
						<strong>
							<?php
							printf(
								/* translators: 1: imported count, 2: skipped count */
								esc_html__( 'Sync complete: %1$d new newsletter draft(s) created, %2$d existing/filtered campaign(s) skipped.', 'kiwatinook' ),
								count( $notice['imported'] ?? array() ),
								count( $notice['skipped'] ?? array() )
							);
							?>
						</strong>
					</p>
					<?php if ( ! empty( $notice['imported'] ) ) : ?>
						<ul style="list-style:disc;margin-left:1.5rem;">
							<?php foreach ( $notice['imported'] as $item ) : ?>
								<li>
									<strong><?php echo esc_html( $item['title'] ); ?></strong>
									(<?php echo esc_html( strtoupper( $item['status'] ) ); ?>) —
									<a href="<?php echo esc_url( $item['edit_url'] ); ?>"><?php esc_html_e( 'Review & Publish in Editor', 'kiwatinook' ); ?></a>
								</li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
				</div>
			<?php else : ?>
				<div class="notice notice-error is-dismissible">
					<p>
						<strong><?php esc_html_e( 'Newsletter Sync Error:', 'kiwatinook' ); ?></strong>
						<?php echo esc_html( $notice['error'] ?? __( 'Unknown error occurred.', 'kiwatinook' ) ); ?>
					</p>
				</div>
			<?php endif; ?>
		<?php endif; ?>

		<div class="card" style="max-width:720px;padding:1.25rem 1.5rem;margin-top:1rem;">
			<h2 style="margin-top:0;"><?php esc_html_e( '1. Sync Sent Campaigns via Constant Contact API', 'kiwatinook' ); ?></h2>
			<p>
				<?php esc_html_e( 'Checks Constant Contact for completed ("Done") email campaigns sent to the e-Newsletter list and creates a WordPress draft post for each new issue.', 'kiwatinook' ); ?>
			</p>
			<p style="color:#555;font-size:13px;">
				<strong><?php esc_html_e( 'Target e-Newsletter List ID:', 'kiwatinook' ); ?></strong> <code><?php echo esc_html( $list_id ); ?></code><br />
				<strong><?php esc_html_e( 'Default Post Status:', 'kiwatinook' ); ?></strong> <code>draft</code> (<?php esc_html_e( 'ready for quick staff review', 'kiwatinook' ); ?>)<br />
				<?php if ( ! empty( $last_sync ) ) : ?>
					<strong><?php esc_html_e( 'Last API Sync:', 'kiwatinook' ); ?></strong> <?php echo esc_html( $last_sync ); ?>
				<?php endif; ?>
			</p>
			<form method="post" action="">
				<?php wp_nonce_field( 'itm_sync_newsletters_nonce', 'itm_sync_newsletters_nonce_field' ); ?>
				<input type="hidden" name="itm_newsletter_sync_action" value="sync_api" />
				<?php submit_button( __( 'Sync Sent Newsletters Now', 'kiwatinook' ), 'primary', 'submit', false ); ?>
			</form>
		</div>

		<div class="card" style="max-width:720px;padding:1.25rem 1.5rem;margin-top:1.25rem;">
			<h2 style="margin-top:0;"><?php esc_html_e( '2. Import by Constant Contact Share URL', 'kiwatinook' ); ?></h2>
			<p>
				<?php esc_html_e( 'Have a shareable Constant Contact campaign link (e.g. https://conta.cc/...)? Paste it below to convert it into a native WordPress Newsletter draft post.', 'kiwatinook' ); ?>
			</p>
			<form method="post" action="">
				<?php wp_nonce_field( 'itm_sync_newsletters_nonce', 'itm_sync_newsletters_nonce_field' ); ?>
				<input type="hidden" name="itm_newsletter_sync_action" value="import_url" />
				<table class="form-table" role="presentation">
					<tr>
						<th scope="row"><label for="itm_archive_url"><?php esc_html_e( 'Campaign Archive URL', 'kiwatinook' ); ?></label></th>
						<td>
							<input name="itm_archive_url" type="url" id="itm_archive_url" value="" class="regular-text" placeholder="https://conta.cc/..." required />
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="itm_custom_title"><?php esc_html_e( 'Custom Title (Optional)', 'kiwatinook' ); ?></label></th>
						<td>
							<input name="itm_custom_title" type="text" id="itm_custom_title" value="" class="regular-text" placeholder="<?php esc_attr_e( 'Defaults to email subject line', 'kiwatinook' ); ?>" />
						</td>
					</tr>
				</table>
				<?php submit_button( __( 'Create Newsletter Draft from URL', 'kiwatinook' ), 'secondary', 'submit', false ); ?>
			</form>
		</div>
	</div>
	<?php
}
