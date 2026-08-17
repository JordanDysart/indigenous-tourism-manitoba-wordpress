<?php
/**
 * Block Registrations for Kiwatinook Theme
 *
 * Registers native Gutenberg blocks (midflight/*) and backward-compatible block aliases.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register native WordPress blocks via block.json and provide backward-compatible aliases.
 */
function kiwatinook_register_native_blocks() {
	// Native Theme Blocks (midflight/*)
	register_block_type( get_template_directory() . '/blocks/banner_block/block.json' );
	register_block_type( get_template_directory() . '/blocks/hero_block/block.json' );
	register_block_type( get_template_directory() . '/blocks/operator_block/block.json' );
	register_block_type( get_template_directory() . '/blocks/operator-search-block/block.json' );
	register_block_type( get_template_directory() . '/blocks/video-popup-block/block.json' );
	register_block_type( get_template_directory() . '/blocks/featured-operators-block/block.json' );

	// Backward-compatible aliases for legacy relish/* blocks
	$relish_aliases = array(
		'relish/banner-block'             => '/blocks/banner_block/banner_block.php',
		'relish/hero-block'               => '/blocks/hero_block/hero_block.php',
		'relish/operator-block'           => '/blocks/operator_block/operator_block.php',
		'relish/operator-search-block'    => '/blocks/operator-search-block/operator_search_block.php',
		'relish/video-popup-block'        => '/blocks/video-popup-block/video_popup_block.php',
		'relish/featured-operators-block' => '/blocks/featured-operators-block/featured_operators_block.php',
		'acf/operator-block'              => '/blocks/operator_block/operator_block.php',
		'acf/operator-search-block'       => '/blocks/operator-search-block/operator_search_block.php',
	);

	foreach ( $relish_aliases as $alias => $template_path ) {
		if ( ! WP_Block_Type_Registry::get_instance()->is_registered( $alias ) ) {
			register_block_type( $alias, array(
				'render_callback' => function( $attributes, $content, $block = null ) use ( $template_path ) {
					ob_start();
					include get_template_directory() . $template_path;
					return ob_get_clean();
				},
			) );
		}
	}
}
add_action( 'init', 'kiwatinook_register_native_blocks' );

// Backward-compatibility alias for function call
if ( ! function_exists( 'relish_register_native_blocks' ) ) {
	function relish_register_native_blocks() {
		kiwatinook_register_native_blocks();
	}
}

/**
 * ACF Block Registrations (when ACF Pro is active)
 */
function register_acf_block_types() {
	acf_register_block_type( array(
		'name'            => 'operator-block',
		'title'           => __( 'Operator Information', 'kiwatinook' ),
		'description'     => __( 'A block to display operator information.', 'kiwatinook' ),
		'category'        => 'widgets',
		'icon'            => 'admin-users',
		'keywords'        => array( 'operator', 'business', 'information', 'map' ),
		'render_template' => get_template_directory() . '/blocks/operator_block/operator_block.php',
		'mode'            => 'preview',
	) );

	acf_register_block_type( array(
		'name'            => 'operator-search-block',
		'title'           => __( 'Operator Filter', 'kiwatinook' ),
		'description'     => __( 'A block to display operator information.', 'kiwatinook' ),
		'category'        => 'widgets',
		'icon'            => 'admin-users',
		'keywords'        => array( 'operator', 'business', 'information' ),
		'render_template' => get_template_directory() . '/blocks/operator-search-block/operator_search_block.php',
		'mode'            => 'preview',
	) );
}

if ( function_exists( 'acf_register_block_type' ) ) {
	add_action( 'acf/init', 'register_acf_block_types' );
}
