<?php
/**
 * Block Registrations for ITM Kiwatinook Theme
 *
 * Registers native Gutenberg blocks and backward-compatible ACF block aliases.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( function_exists( 'acf_add_options_page' ) ) {
	// acf_add_options_page('Settings');
}

/**
 * Register native WordPress blocks via block.json
 */
function relish_register_native_blocks() {
	// Native Theme Blocks
	register_block_type( get_template_directory() . '/blocks/banner_block/block.json' );
	register_block_type( get_template_directory() . '/blocks/hero_block/block.json' );
	register_block_type( get_template_directory() . '/blocks/operator_block/block.json' );
	register_block_type( get_template_directory() . '/blocks/operator-search-block/block.json' );
	register_block_type( get_template_directory() . '/blocks/video-popup-block/block.json' );
	register_block_type( get_template_directory() . '/blocks/featured-operators-block/block.json' );

	// Legacy block alias fallback for acf/operator-block
	if ( ! WP_Block_Type_Registry::get_instance()->is_registered( 'acf/operator-block' ) ) {
		register_block_type( 'acf/operator-block', array(
			'render_callback' => function( $attributes, $content ) {
				ob_start();
				include get_template_directory() . '/blocks/operator_block/operator_block.php';
				return ob_get_clean();
			},
		) );
	}
}
add_action( 'init', 'relish_register_native_blocks' );

/**
 * ACF Block Registrations (when ACF Pro is active)
 */
function register_acf_block_types() {
	acf_register_block_type( array(
		'name'            => 'operator-block',
		'title'           => __( 'Operator Information', 'itm_indigpro' ),
		'description'     => __( 'A block to display operator information.', 'itm_indigpro' ),
		'category'        => 'widgets',
		'icon'            => 'admin-users',
		'keywords'        => array( 'operator', 'business', 'information', 'map' ),
		'render_template' => get_template_directory() . '/blocks/operator_block/operator_block.php',
		'mode'            => 'preview',
	) );

	acf_register_block_type( array(
		'name'            => 'operator-search-block',
		'title'           => __( 'Operator Filter', 'itm_indigpro' ),
		'description'     => __( 'A block to display operator information.', 'itm_indigpro' ),
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
