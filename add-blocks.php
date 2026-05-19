<?php

if( function_exists('acf_add_options_page') ) {
//	acf_add_options_page('Settings');
}


// register_block_type( get_template_directory() . '/blocks/blank_block/block.json' );
register_block_type( get_template_directory() . '/blocks/banner_block/block.json' );

function register_acf_block_types() {
/*
    acf_register_block_type(array(
        'name'              => 'resource-block',
        'title'             => __('Resource Block'),
        'description'       => __('Link to file in Media Library and display file format.'),
        'render_template'   => 'blocks/resource-block.php',
        'category'          => 'formatting',
        'icon'              => 'admin-links',
        'keywords'          => array( 'resource', 'file', 'pdf' ),
    ));
*/

    acf_register_block_type(array(
        'name'              => 'operator-block',
        'title'             => __( 'Operator Information', 'itm_indigpro' ),
        'description'       => __( 'A block to display operator information.', 'itm_indigpro' ),
        'category'          => 'widgets',
        'icon'              => 'admin-users',
        'keywords'          => array( 'operator', 'business', 'information' ),
        'render_template'   => get_template_directory() . '/blocks/operator_block/operator_block.php',
        'mode'              => 'preview',
    ));

    acf_register_block_type( array(
        'name'              => 'operator-search-block',
        'title'             => __( 'Operator Filter', 'itm_indigpro' ),
        'description'       => __( 'A block to display operator information.', 'itm_indigpro' ),
        'category'          => 'widgets',
        'icon'              => 'admin-users',
        'keywords'          => array( 'operator', 'business', 'information' ),
        'render_template'   => get_template_directory() . '/blocks/operator-search-block/operator_search_block.php',
        'mode'              => 'preview',
    ));
}

if( function_exists('acf_register_block_type') ) {
    add_action('acf/init', 'register_acf_block_types');
}
