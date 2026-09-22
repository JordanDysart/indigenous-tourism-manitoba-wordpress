<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package kiwatinook
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function kiwatinook_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	// Headroom offset detection: flag whether current page has a top hero or banner
	if ( is_singular() ) {
		global $post;
		$has_hero = false;
		if ( $post && ! empty( $post->post_content ) ) {
			if (
				has_block( 'relish/hero-block', $post ) ||
				has_block( 'relish/banner-block', $post ) ||
				has_block( 'lazyblock/hero-block', $post ) ||
				strpos( $post->post_content, 'hero-block' ) !== false ||
				strpos( $post->post_content, 'banner-block' ) !== false
			) {
				$has_hero = true;
			}
		}
		if ( $has_hero ) {
			$classes[] = 'has-hero-banner';
		} else {
			$classes[] = 'no-hero-banner';
		}
	} else {
		$classes[] = 'no-hero-banner';
	}

	return $classes;
}
add_filter( 'body_class', 'kiwatinook_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function kiwatinook_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'kiwatinook_pingback_header' );
