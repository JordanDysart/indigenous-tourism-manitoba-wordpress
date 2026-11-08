<?php
/**
 * Integrated Footer Newsletter Handler & Constant Contact v3 API Integration
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Constant Contact Default Target List ID
 * List Name: e-Newsletter
 */
if ( ! defined( 'ITM_CTCT_NEWSLETTER_LIST_ID' ) ) {
	define( 'ITM_CTCT_NEWSLETTER_LIST_ID', '5aa6bf4a-fbb1-11f0-b6d2-0242a2ded4be' );
}

/**
 * Constant Contact OAuth2 Client Configuration (matches Constant Contact Forms plugin)
 */
if ( ! defined( 'ITM_CTCT_CLIENT_API_KEY' ) ) {
	define( 'ITM_CTCT_CLIENT_API_KEY', 'a001418d-73c6-4ecb-9f8b-d5773d29b6e4' );
}
if ( ! defined( 'ITM_CTCT_OAUTH_TOKEN_URL' ) ) {
	define( 'ITM_CTCT_OAUTH_TOKEN_URL', 'https://authz.constantcontact.com/oauth2/default/v1/token' );
}
if ( ! defined( 'ITM_CTCT_OAUTH_REDIRECT_URI' ) ) {
	define( 'ITM_CTCT_OAUTH_REDIRECT_URI', 'https://app.constantcontact.com/pages/dma/portal/oauth2' );
}

/**
 * Register REST API route for newsletter subscription
 */
function itm_register_newsletter_rest_route() {
	register_rest_route(
		'kiwatinook/v1',
		'/newsletter-signup',
		array(
			'methods'             => 'POST',
			'callback'            => 'itm_handle_newsletter_rest_request',
			'permission_callback' => '__return_true',
		)
	);
}
add_action( 'rest_api_init', 'itm_register_newsletter_rest_route' );

/**
 * REST API Callback
 *
 * @param WP_REST_Request $request REST request object.
 * @return WP_REST_Response
 */
function itm_handle_newsletter_rest_request( $request ) {
	$email    = $request->get_param( 'email' );
	$nonce    = $request->get_param( 'nonce' );
	$honeypot = $request->get_param( 'hp_check' );

	$result = itm_process_newsletter_signup( $email, $nonce, $honeypot );

	$status_code = $result['success'] ? 200 : 400;
	return new WP_REST_Response( $result, $status_code );
}

/**
 * Register AJAX handlers for newsletter subscription
 */
add_action( 'wp_ajax_itm_newsletter_signup', 'itm_handle_newsletter_ajax_request' );
add_action( 'wp_ajax_nopriv_itm_newsletter_signup', 'itm_handle_newsletter_ajax_request' );

/**
 * AJAX Callback
 */
function itm_handle_newsletter_ajax_request() {
	$email    = isset( $_POST['email'] ) ? sanitize_text_field( wp_unslash( $_POST['email'] ) ) : '';
	$nonce    = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
	$honeypot = isset( $_POST['hp_check'] ) ? sanitize_text_field( wp_unslash( $_POST['hp_check'] ) ) : '';

	$result = itm_process_newsletter_signup( $email, $nonce, $honeypot );

	if ( $result['success'] ) {
		wp_send_json_success( $result );
	} else {
		wp_send_json_error( $result );
	}
}

/**
 * Resolve target Constant Contact List UUID
 *
 * @return string
 */
function itm_get_newsletter_list_id() {
	if ( defined( 'ITM_CTCT_NEWSLETTER_LIST_ID' ) && ! empty( ITM_CTCT_NEWSLETTER_LIST_ID ) ) {
		return ITM_CTCT_NEWSLETTER_LIST_ID;
	}

	$settings = get_option( 'ctct_options_settings', array() );
	if ( is_array( $settings ) && ! empty( $settings['_ctct_optin_list'][0] ) ) {
		return sanitize_text_field( $settings['_ctct_optin_list'][0] );
	}

	return '5aa6bf4a-fbb1-11f0-b6d2-0242a2ded4be';
}

/**
 * Core processing function for newsletter signup
 *
 * @param string $raw_email Email address.
 * @param string $nonce     Security nonce.
 * @param string $honeypot  Honeypot value.
 * @return array
 */
function itm_process_newsletter_signup( $raw_email, $nonce, $honeypot ) {
	// 1. Check anti-spam honeypot (bots that populate hidden field receive fake success)
	if ( ! empty( $honeypot ) ) {
		return array(
			'success' => true,
			'message' => esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' ),
		);
	}

	// 2. Nonce verification
	if ( ! wp_verify_nonce( $nonce, 'itm_newsletter_nonce' ) ) {
		return array(
			'success' => false,
			'code'    => 'invalid_nonce',
			'message' => esc_html__( 'Security check failed. Please refresh the page and try again.', 'kiwatinook' ),
		);
	}

	// 3. Email sanitization and format validation
	$email = sanitize_email( $raw_email );
	if ( empty( $email ) || ! is_email( $email ) ) {
		return array(
			'success' => false,
			'code'    => 'invalid_email',
			'message' => esc_html__( 'Please provide a valid email address.', 'kiwatinook' ),
		);
	}

	$list_id = itm_get_newsletter_list_id();

	// 4. Constant Contact API Synchronization
	$api_synced = itm_sync_contact_to_constant_contact( $email, $list_id );

	if ( $api_synced['synced'] ) {
		// Flush any previously queued signups now that connection is healthy
		itm_flush_pending_newsletter_signups();

		$message = ! empty( $api_synced['message'] )
			? $api_synced['message']
			: esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' );

		return array(
			'success' => true,
			'synced'  => true,
			'message' => $message,
		);
	}

	// 5. If remote API is temporarily unreachable or requires re-authentication,
	// queue contact locally so no user sign-ups are ever dropped.
	itm_queue_pending_newsletter_signup( $email, $list_id, $api_synced['error'] );

	$response = array(
		'success' => true,
		'synced'  => false,
		'queued'  => true,
		'message' => esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' ),
	);

	if ( current_user_can( 'manage_options' ) && ! empty( $api_synced['error'] ) ) {
		$response['debug_error'] = $api_synced['error'];
	}

	return $response;
}

/**
 * Retrieve Constant Contact option, decrypting via Constant Contact Forms plugin when available.
 *
 * @param string $key Option key (e.g. '_ctct_access_token', '_ctct_refresh_token', '_ctct_expires_in').
 * @return string
 */
function itm_get_ctct_option( $key ) {
	if ( function_exists( 'constant_contact' ) ) {
		try {
			$plugin = constant_contact();
			if ( is_object( $plugin ) && method_exists( $plugin, 'get_connect' ) ) {
				$connect = $plugin->get_connect();
				if ( is_object( $connect ) && method_exists( $connect, 'e_get' ) ) {
					$decrypted = $connect->e_get( $key );
					if ( is_string( $decrypted ) && '' !== trim( $decrypted ) ) {
						return trim( $decrypted );
					}
				}
			}
		} catch ( Exception $e ) {
			// Fall back to direct option lookup below.
		}
	}

	$raw = get_option( $key, '' );
	if ( ! is_string( $raw ) || '' === trim( $raw ) ) {
		return '';
	}

	$raw = trim( $raw );

	// Defuse Crypto ciphertexts begin with 'def50200'. Do not return raw ciphertext as a Bearer token.
	if ( 0 === strpos( $raw, 'def50200' ) ) {
		return '';
	}

	return $raw;
}

/**
 * Save Constant Contact option, encrypting via Constant Contact Forms plugin when available.
 *
 * @param string $key   Option key.
 * @param string $value Option value.
 * @return void
 */
function itm_set_ctct_option( $key, $value ) {
	if ( function_exists( 'constant_contact' ) ) {
		try {
			$plugin = constant_contact();
			if ( is_object( $plugin ) && method_exists( $plugin, 'get_connect' ) ) {
				$connect = $plugin->get_connect();
				if ( is_object( $connect ) && method_exists( $connect, 'e_set' ) ) {
					$connect->e_set( $key, (string) $value );
					return;
				}
			}
		} catch ( Exception $e ) {
			// Fall back to update_option below.
		}
	}

	update_option( $key, (string) $value, false );
}

/**
 * Refresh the Constant Contact OAuth2 access token using the stored refresh token.
 *
 * @return array {
 *     @type bool   $success      Whether refresh succeeded.
 *     @type string $access_token New access token (if successful).
 *     @type string $error        Error code/details (if failed).
 * }
 */
function itm_refresh_ctct_access_token() {
	// Guard against local/cloned dev environments consuming production's single-use rotating refresh token
	$host = wp_parse_url( home_url(), PHP_URL_HOST );
	$is_local_host = is_string( $host ) && (
		'localhost' === $host ||
		'127.0.0.1' === $host ||
		false !== strpos( $host, '.lndo.site' ) ||
		false !== strpos( $host, '.local' ) ||
		false !== strpos( $host, '.test' )
	);
	if ( $is_local_host && ( ! defined( 'ITM_ALLOW_LOCAL_CTCT_SYNC' ) || ! ITM_ALLOW_LOCAL_CTCT_SYNC ) ) {
		return array(
			'success' => false,
			'error'   => 'local_env_refresh_skipped_to_protect_production_token',
		);
	}

	$refresh_token = itm_get_ctct_option( '_ctct_refresh_token' );
	if ( empty( $refresh_token ) ) {
		return array(
			'success' => false,
			'error'   => 'missing_refresh_token',
		);
	}

	$token_hash = md5( $refresh_token );
	$dead_hash  = get_option( 'itm_ctct_dead_refresh_token_hash', '' );
	if ( ! empty( $dead_hash ) && hash_equals( (string) $dead_hash, $token_hash ) ) {
		return array(
			'success' => false,
			'error'   => 'refresh_token_invalid_grant_reconnect_required',
		);
	}

	// Prevent concurrent refresh races on rotating refresh tokens
	$lock_age = time() - (int) get_option( 'ctct_refreshing_token_time', 0 );
	if ( 'true' === get_option( 'ctct_refreshing_token', 'false' ) && $lock_age < 30 ) {
		sleep( 1 );
		wp_cache_delete( '_ctct_access_token', 'options' );
		$updated_token = itm_get_ctct_option( '_ctct_access_token' );
		if ( ! empty( $updated_token ) ) {
			return array(
				'success'      => true,
				'access_token' => $updated_token,
			);
		}
	}

	update_option( 'ctct_refreshing_token', 'true', false );
	update_option( 'ctct_refreshing_token_time', time(), false );

	$args = array(
		'headers' => array(
			'Authorization' => 'Basic ' . base64_encode( ITM_CTCT_CLIENT_API_KEY ),
			'Cache-Control' => 'no-cache',
			'Content-Type'  => 'application/x-www-form-urlencoded',
			'Accept'        => 'application/json',
		),
		'body'    => array(
			'client_id'     => ITM_CTCT_CLIENT_API_KEY,
			'refresh_token' => $refresh_token,
			'redirect_uri'  => ITM_CTCT_OAUTH_REDIRECT_URI,
			'grant_type'    => 'refresh_token',
		),
		'timeout' => 20,
	);

	$response = wp_safe_remote_post( ITM_CTCT_OAUTH_TOKEN_URL, $args );

	update_option( 'ctct_refreshing_token', 'false', false );

	if ( is_wp_error( $response ) ) {
		return array(
			'success' => false,
			'error'   => 'refresh_wp_error: ' . $response->get_error_message(),
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	$raw_body    = wp_remote_retrieve_body( $response );
	$data        = json_decode( $raw_body, true );

	if ( 200 === $status_code && is_array( $data ) && ! empty( $data['access_token'] ) ) {
		$new_access  = trim( (string) $data['access_token'] );
		$new_refresh = ! empty( $data['refresh_token'] ) ? trim( (string) $data['refresh_token'] ) : $refresh_token;
		$expires_in  = ! empty( $data['expires_in'] ) ? (string) $data['expires_in'] : '86400';

		itm_set_ctct_option( '_ctct_access_token', $new_access );
		itm_set_ctct_option( '_ctct_refresh_token', $new_refresh );
		itm_set_ctct_option( '_ctct_expires_in', $expires_in );

		update_option( 'ctct_access_token_timestamp', time() );
		update_option( 'ctct_refresh_failures', 0 );
		delete_option( 'itm_ctct_dead_refresh_token_hash' );

		if ( function_exists( 'constant_contact_set_needs_manual_reconnect' ) ) {
			constant_contact_set_needs_manual_reconnect( 'false' );
		} else {
			delete_option( 'ctct_maybe_needs_reconnected' );
		}

		return array(
			'success'      => true,
			'access_token' => $new_access,
		);
	}

	// Only flag manual reconnect if the refresh token itself was revoked/invalidated (invalid_grant)
	$error_code = is_array( $data ) && isset( $data['error'] ) ? (string) $data['error'] : '';
	if ( 'invalid_grant' === $error_code ) {
		update_option( 'itm_ctct_dead_refresh_token_hash', $token_hash, false );
		if ( function_exists( 'constant_contact_set_needs_manual_reconnect' ) ) {
			constant_contact_set_needs_manual_reconnect( 'true' );
		} else {
			update_option( 'ctct_maybe_needs_reconnected', 'true', false );
		}
	}

	return array(
		'success' => false,
		'error'   => 'refresh_http_' . $status_code . ': ' . substr( $raw_body, 0, 160 ),
	);
}

/**
 * Send sign_up_form request to Constant Contact v3 API.
 *
 * @param string $email        Contact email address.
 * @param string $list_id      Target Constant Contact List UUID.
 * @param string $access_token OAuth2 Bearer access token.
 * @return array|WP_Error
 */
function itm_request_ctct_sign_up_form( $email, $list_id, $access_token ) {
	$api_url = 'https://api.cc.email/v3/contacts/sign_up_form';

	$body = array(
		'email_address'    => $email,
		'list_memberships' => array( $list_id ),
	);

	$args = array(
		'headers'     => array(
			'Authorization' => 'Bearer ' . trim( $access_token ),
			'Content-Type'  => 'application/json; charset=utf-8',
			'Accept'        => 'application/json',
			'Cache-Control' => 'no-cache',
		),
		'body'        => wp_json_encode( $body ),
		'timeout'     => 15,
		'data_format' => 'body',
	);

	return wp_safe_remote_post( $api_url, $args );
}

/**
 * Synchronize contact with Constant Contact v3 API (with proactive and reactive OAuth2 token refresh)
 *
 * @param string $email   Contact email address.
 * @param string $list_id Target Constant Contact List UUID.
 * @return array
 */
function itm_sync_contact_to_constant_contact( $email, $list_id ) {
	$access_token = itm_get_ctct_option( '_ctct_access_token' );

	// Check if token is missing or approaching expiration (proactive refresh)
	$issued_time    = (int) get_option( 'ctct_access_token_timestamp', 0 );
	$expires_in     = (int) itm_get_ctct_option( '_ctct_expires_in' );
	$refresh_after  = $expires_in > 300 ? ( $expires_in - 300 ) : 82800;
	$is_due_refresh = ( $issued_time > 0 && ( time() - $issued_time ) >= $refresh_after );

	if ( empty( $access_token ) || $is_due_refresh ) {
		$refresh_result = itm_refresh_ctct_access_token();
		if ( $refresh_result['success'] && ! empty( $refresh_result['access_token'] ) ) {
			$access_token = $refresh_result['access_token'];
		} elseif ( empty( $access_token ) ) {
			return array(
				'synced' => false,
				'error'  => ! empty( $refresh_result['error'] ) ? $refresh_result['error'] : 'missing_access_token',
			);
		}
	}

	$response = itm_request_ctct_sign_up_form( $email, $list_id, $access_token );

	if ( is_wp_error( $response ) ) {
		return array(
			'synced' => false,
			'error'  => $response->get_error_message(),
		);
	}

	$status_code = wp_remote_retrieve_response_code( $response );
	$raw_body    = wp_remote_retrieve_body( $response );

	// Reactive refresh: if access token returned 401 Unauthorized, refresh token and retry once
	if ( 401 === $status_code ) {
		$refresh_result = itm_refresh_ctct_access_token();
		if ( $refresh_result['success'] && ! empty( $refresh_result['access_token'] ) ) {
			$response = itm_request_ctct_sign_up_form( $email, $list_id, $refresh_result['access_token'] );
			if ( is_wp_error( $response ) ) {
				return array(
					'synced' => false,
					'error'  => $response->get_error_message(),
				);
			}
			$status_code = wp_remote_retrieve_response_code( $response );
			$raw_body    = wp_remote_retrieve_body( $response );
		} else {
			return array(
				'synced' => false,
				'error'  => 'HTTP_401 (refresh failed: ' . ( $refresh_result['error'] ?? 'unknown' ) . ')',
			);
		}
	}

	// 200 OK or 201 Created
	if ( 200 === $status_code || 201 === $status_code ) {
		return array(
			'synced'  => true,
			'message' => esc_html__( 'Miigwech / Thank you for subscribing!', 'kiwatinook' ),
		);
	}

	// 409 Conflict (Contact already exists / already subscribed)
	if ( 409 === $status_code ) {
		return array(
			'synced'  => true,
			'message' => esc_html__( 'You are already subscribed to our newsletter. Thank you!', 'kiwatinook' ),
		);
	}

	return array(
		'synced' => false,
		'error'  => 'HTTP_' . $status_code . ': ' . substr( $raw_body, 0, 160 ),
	);
}

/**
 * Queue contact locally if Constant Contact API is unavailable
 *
 * @param string $email   Contact email.
 * @param string $list_id List UUID.
 * @param string $reason  Failure reason.
 */
function itm_queue_pending_newsletter_signup( $email, $list_id, $reason = '' ) {
	$pending = get_option( 'itm_pending_newsletter_signups', array() );
	if ( ! is_array( $pending ) ) {
		$pending = array();
	}

	// Update existing entry if email is already in pending queue
	foreach ( $pending as $index => $entry ) {
		if ( isset( $entry['email'] ) && strtolower( $entry['email'] ) === strtolower( $email ) ) {
			$pending[ $index ]['timestamp'] = current_time( 'mysql' );
			$pending[ $index ]['reason']    = sanitize_text_field( $reason );
			update_option( 'itm_pending_newsletter_signups', $pending, false );
			return;
		}
	}

	$pending[] = array(
		'email'     => $email,
		'list_id'   => $list_id,
		'timestamp' => current_time( 'mysql' ),
		'reason'    => sanitize_text_field( $reason ),
	);

	update_option( 'itm_pending_newsletter_signups', $pending, false );
}

/**
 * Flush and synchronize any queued newsletter signups once Constant Contact API connection is active.
 *
 * @return int Number of queued contacts successfully synced.
 */
function itm_flush_pending_newsletter_signups() {
	$pending = get_option( 'itm_pending_newsletter_signups', array() );
	if ( empty( $pending ) || ! is_array( $pending ) ) {
		return 0;
	}

	$remaining    = array();
	$synced_count = 0;

	foreach ( $pending as $entry ) {
		$email   = isset( $entry['email'] ) ? sanitize_email( $entry['email'] ) : '';
		$list_id = ! empty( $entry['list_id'] ) ? sanitize_text_field( $entry['list_id'] ) : itm_get_newsletter_list_id();

		if ( empty( $email ) || ! is_email( $email ) ) {
			continue;
		}

		$result = itm_sync_contact_to_constant_contact( $email, $list_id );
		if ( $result['synced'] ) {
			$synced_count++;
		} else {
			$entry['reason'] = sanitize_text_field( $result['error'] ?? '' );
			$remaining[]     = $entry;
			// Stop batch early if auth is still failing to avoid repeated failed HTTP calls
			if ( false !== strpos( $entry['reason'], '401' ) || false !== strpos( $entry['reason'], 'missing_' ) || false !== strpos( $entry['reason'], 'refresh_' ) ) {
				$processed = count( $remaining ) + $synced_count;
				$remaining = array_merge( $remaining, array_slice( $pending, $processed ) );
				break;
			}
		}
	}

	if ( empty( $remaining ) ) {
		delete_option( 'itm_pending_newsletter_signups' );
	} else {
		update_option( 'itm_pending_newsletter_signups', $remaining, false );
	}

	return $synced_count;
}
add_action( 'ctct_access_token_acquired', 'itm_flush_pending_newsletter_signups' );

/**
 * Periodically attempt to flush pending newsletter signups on admin page loads.
 */
function itm_maybe_flush_pending_signups_on_admin() {
	if ( ! is_admin() || wp_doing_ajax() ) {
		return;
	}

	$pending = get_option( 'itm_pending_newsletter_signups', array() );
	if ( empty( $pending ) || ! is_array( $pending ) ) {
		return;
	}

	if ( get_transient( 'itm_pending_signups_retry_lock' ) ) {
		return;
	}

	set_transient( 'itm_pending_signups_retry_lock', 1, 5 * MINUTE_IN_SECONDS );
	itm_flush_pending_newsletter_signups();
}
add_action( 'admin_init', 'itm_maybe_flush_pending_signups_on_admin' );

/**
 * Shortcode to render THE TEA Newsletter Archive component
 *
 * Usage: [the_tea_archive] or [newsletter_archive]
 *
 * @param array $atts Shortcode attributes.
 * @return string Rendered HTML markup.
 */
function itm_the_tea_archive_shortcode( $atts ) {
	ob_start();
	get_template_part( 'template-parts/content', 'newsletter-archive' );
	return ob_get_clean();
}
add_shortcode( 'the_tea_archive', 'itm_the_tea_archive_shortcode' );
add_shortcode( 'newsletter_archive', 'itm_the_tea_archive_shortcode' );
