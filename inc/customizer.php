<?php
/**
 * itm_indigpro Theme Customizer
 *
 * @package itm_indigpro
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function itm_indigpro_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'        => '.site-title a',
			'render_callback' => 'itm_indigpro_customize_partial_blogname',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'        => '.site-description',
			'render_callback' => 'itm_indigpro_customize_partial_blogdescription',
		) );
	}

	$wp_customize->add_section( 'footer_settings', array(
		'title' => __( 'Footer Settings', 'itm_indigpro' ),
		'description' => __( 'Customize the footer elements.', 'itm_indigpro' ),
		'priority'    => 130,
	) );

	// Option Logo Footer
	$wp_customize->add_setting( 'footer_logo', array(
		'default'           => '',
		'sanitize_callback' => 'esc_url_raw',
	) );

	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'footer_logo', array(
		'label'       => __( 'Footer Logo', 'itm_indigpro' ),
		'description' => __( 'Upload a logo for the footer.', 'itm_indigpro' ),
		'section'     => 'footer_settings',
		'settings'    => 'footer_logo',
	) ) );
	
	$wp_customize->add_setting( 'footer_background_color', array(
    'default'           => '#333333', // Default color
    'transport'         => 'refresh',
	) );

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'footer_background_color', array(
			'label'             => __( 'Footer Background Color', 'itm_indigpro' ),
			'section'     => 'footer_settings', // Places this in the colors in Footer section
			'settings'          => 'footer_background_color',
	) ) );

	// Register the setting for the footer text color
	$wp_customize->add_setting( 'footer_text_color', array(
			'default'           => '#ffffff', // Default color
			'transport'         => 'refresh',
	) );

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'footer_text_color', array(
			'label'             => __( 'Footer Text Color', 'itm_indigpro' ),
			'section'     => 'footer_settings', // Also places it in the colors in Footer section
			'settings'          => 'footer_text_color',
	) ) );
}

add_action( 'customize_register', 'itm_indigpro_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function itm_indigpro_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function itm_indigpro_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function itm_indigpro_customize_preview_js() {
	wp_enqueue_script( 'itm_indigpro-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'itm_indigpro_customize_preview_js' );
