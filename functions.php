<?php
/**
 * itm_indigpro functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package itm_indigpro
 */

if (!function_exists('itm_indigpro_setup')):
	function itm_indigpro_setup()
	{
		load_theme_textdomain('itm_indigpro', get_template_directory() . '/languages');

		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');

		register_nav_menus(array(
			'primary-menu' => esc_html__('Primary Menu', 'itm_indigpro'),
			'footer-menu' => esc_html__('Footer Menu', 'itm_indigpro'),
		));

		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));

		add_theme_support('custom-background', apply_filters('itm_indigpro_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		)));

		add_theme_support('customize-selective-refresh-widgets');

		add_theme_support('custom-logo', array(
			'height' => 250,
			'width' => 250,
			'flex-width' => true,
			'flex-height' => true,
		));
	}
endif;
add_action('after_setup_theme', 'itm_indigpro_setup');

function itm_indigpro_content_width()
{
	$GLOBALS['content_width'] = apply_filters('itm_indigpro_content_width', 640);
}
add_action('after_setup_theme', 'itm_indigpro_content_width', 0);

function itm_indigpro_widgets_init()
{
	register_sidebar(array(
		'name' => esc_html__('Sidebar', 'itm_indigpro'),
		'id' => 'sidebar-1',
		'description' => esc_html__('Add widgets here.', 'itm_indigpro'),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget' => '</section>',
		'before_title' => '<h2 class="widget-title">',
		'after_title' => '</h2>',
	));
}

// add_action( 'widgets_init', 'itm_indigpro_widgets_init' );

function itm_indigpro_scripts()
{
	wp_enqueue_style('itm_indigpro-style', get_stylesheet_uri());
	wp_enqueue_style('animated-menu-style', get_template_directory_uri() . '/assets/css/styles.css');

	$vars = array(
		'ajaxurl' => admin_url('admin-ajax.php'),
	);

	wp_deregister_script('jquery');
	wp_register_script('jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', [], '3.7.1', true);
	wp_enqueue_script('jquery');

	wp_enqueue_style('fancybox-css', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css');
	wp_enqueue_script('fancybox-js', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js', array('jquery'), null, true);

	wp_register_script('itm_indigpro-theme', get_template_directory_uri() . '/js/theme.js', array('jquery'), '20150524', true);
	wp_localize_script('itm_indigpro-theme', 'itm_indigpro', $vars);
	wp_enqueue_script('itm_indigpro-theme');

	wp_enqueue_script('itm_indigpro-navigation', get_template_directory_uri() . '/js/navigation.js', array('jquery'), '20151215', true);
	wp_enqueue_script('itm_indigpro-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array('jquery'), '20151215', true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

	wp_register_script('animated-menu', get_template_directory_uri() . '/js/animated-menu.js', array('jquery'));
	wp_enqueue_script('animated-menu');

	// Bootstrap Icons — required by nav walker toggle chevrons and footer nav headings
	wp_enqueue_style(
		'bootstrap-icons',
		'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
		[],
		'1.11.3'
	);
}

add_action('wp_enqueue_scripts', 'itm_indigpro_scripts', 99);


/**
 * Add Constant Contact Active Forms to wp_head
 */
function add_constant_contact_to_head() {
    ?>
    <script> var _ctct_m = "0e1ea91fdfd5a3260d6f165551b021ed"; </script>
    <script id="signupScript" src="//static.ctctcdn.com/js/signup-form-widget/current/signup-form-widget.min.js" async defer></script>
    <?php
}
add_action('wp_head', 'add_constant_contact_to_head');

function relish_blocks_scripts()
{
	$block_js = '/blocks/blocks.js';
	$block_css = '/blocks/blocks.css';

	wp_enqueue_script(
		'relish-blocks-js',
		get_template_directory_uri() . $block_js,
		['jquery'],
		filemtime(get_template_directory() . $block_js),
		true
	);

	wp_enqueue_style(
		'relish-blocks-css',
		get_template_directory_uri() . $block_css,
		[],
		filemtime(get_template_directory() . $block_css)
	);
}

add_action('enqueue_block_assets', 'relish_blocks_scripts');

function relish_blocks_editor_scripts()
{
	$editor_js = '/blocks/blocks.js';
	$editor_css = '/blocks/blocks.css';

	wp_enqueue_script(
		'relish-blocks-editor-js',
		get_template_directory_uri() . $editor_js,
		['wp-blocks', 'wp-element'],
		filemtime(get_template_directory() . $editor_js),
		true
	);

	wp_enqueue_style(
		'relish-blocks-editor-css',
		get_template_directory_uri() . $editor_css,
		['wp-edit-blocks'],
		filemtime(get_template_directory() . $editor_css)
	);
}

add_action('enqueue_block_editor_assets', 'relish_blocks_editor_scripts');

add_action('after_setup_theme', 'woocommerce_support');
function woocommerce_support()
{
	add_theme_support('woocommerce');
}


require get_template_directory() . '/add-blocks.php';


/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

function itm_indigpro_load_walker_classes()
{
	require_once get_template_directory() . '/inc/class-header-menu-walker.php';
	require_once get_template_directory() . '/inc/class-footer-menu-walker.php';
}

add_action('after_setup_theme', 'itm_indigpro_load_walker_classes');

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

function mytheme_setup()
{
	add_theme_support('align-wide');
	add_theme_support('editor-styles');
	add_theme_support('wp-block-styles');
	add_theme_support('dark-editor-style');
	add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'mytheme_setup');

add_theme_support('editor-color-palette', array(
	array(
		'name' => __('Black', 'custom'),
		'slug' => 'black',
		'color' => '#000000',
	),
	array(
		'name' => __('White', 'custom'),
		'slug' => 'white',
		'color' => '#ffffff',
	),
));

add_theme_support('editor-font-sizes', array(
	array(
		'name' => __('Medium', 'custom'),
		'shortName' => __('M', 'custom'),
		'size' => 22,
		'slug' => 'medium'
	),
	array(
		'name' => __('Large', 'custom'),
		'shortName' => __('L', 'custom'),
		'size' => 36,
		'slug' => 'large'
	),
	array(
		'name' => __('Huge', 'custom'),
		'shortName' => __('XL', 'custom'),
		'size' => 48,
		'slug' => 'huge'
	)
));

/**
 * Handle AJAX filtering for operators based on category and region.
 */
function ajax_filter_operators()
{
	$category = isset($_POST['operator_cat']) ? intval($_POST['operator_cat']) : 0;
	$region = isset($_POST['operator_region']) ? intval($_POST['operator_region']) : 0;

	if (!$category && !$region) {
		die();
	}

	$tax_query = array('relation' => 'AND');

	if ($category) {
		$tax_query[] = array(
			'taxonomy' => 'operator_category',
			'field' => 'term_id',
			'terms' => $category,
			'include_children' => false,
		);
	}

	if ($region) {
		$tax_query[] = array(
			'taxonomy' => 'operator_region',
			'field' => 'term_id',
			'terms' => $region,
			'include_children' => false,
		);
	}

	$args = array(
		'post_type' => 'operator',
		'numberposts' => -1,
		'tax_query' => count($tax_query) > 1 ? $tax_query : '',
	);

	$operators = get_posts($args);

	if ($operators) {
		echo '<ul class="columns-4 operator-list-module-items wp-block-post-template is-layout-grid wp-container-core-post-template-is-layout-1 wp-block-post-template-is-layout-grid">';

		foreach ($operators as $op) {
			$operator_category = wp_get_post_terms($op->ID, 'operator_category');
			$operator_region = wp_get_post_terms($op->ID, 'operator_region');
			$thumbnail_url = get_the_post_thumbnail_url($op->ID, 'full');

			echo '<li class="wp-block-post post-' . esc_attr($op->ID) . ' operator type-operator status-publish has-post-thumbnail hentry '
				. (!empty($operator_category) ? 'operator_category-' . sanitize_html_class($operator_category[0]->slug) . ' ' : '')
				. (!empty($operator_region) ? 'operator_region-' . sanitize_html_class($operator_region[0]->slug) : '') . '">';

			if ($thumbnail_url) {
				echo '<figure style="aspect-ratio:1;width:300px;height:300px;" class="wp-block-post-featured-image">';
				echo '<a href="' . esc_url(get_permalink($op->ID)) . '" target="_self" style="height:300px">';
				echo '<img loading="lazy" decoding="async" src="' . esc_url($thumbnail_url) . '" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="' . esc_attr(get_the_title($op->ID)) . '" style="width:100%;height:100%;object-fit:cover;">';
				echo '</a>';
				echo '</figure>';
			}

			if (!empty($operator_region)) {
				echo '<div style="color:#da5225;font-size:1.13rem;font-style:normal;font-weight:700" class="taxonomy-operator_region has-link-color wp-elements-f73f0efa918dea6e52bc4da62e4f3cf0 wp-block-post-terms has-text-color">';
				echo '<a href="' . esc_url(get_term_link($operator_region[0])) . '" rel="tag">' . esc_html($operator_region[0]->name) . '</a>';
				echo '</div>';
			}

			echo '<h2 style="font-size:1.13rem;font-style:normal;font-weight:700;" class="has-link-color wp-elements-992cb9ba7baa2105e31fa2add54a631a wp-block-post-title has-text-color has-black-color">';
			echo '<a href="' . esc_url(get_permalink($op->ID)) . '" target="_self">' . esc_html(get_the_title($op->ID)) . '</a>';
			echo '</h2>';

			echo '</li>';
		}

		echo '</ul>';
	} else {
		echo '<p>No operators found.</p>';
	}
	die();
}

add_action('wp_ajax_nopriv_filter_operators', 'ajax_filter_operators');
add_action('wp_ajax_filter_operators', 'ajax_filter_operators');

/**
 * Register a custom post type for Operators.
 */
function register_operator_post_type()
{
	$args = array(
		'labels' => array(
			'name' => 'Operators',
			'singular_name' => 'Operator',
		),
		'public' => true,
		'has_archive' => true,
		'show_in_rest' => true,
		'supports' => array('title', 'editor', 'thumbnail'),
		'rewrite' => array('slug' => 'operator'),
	);
	register_post_type('operator', $args);
}
add_action('init', 'register_operator_post_type');

/**
 * Register custom taxonomies for the Operator post type.
 */
function register_operator_taxonomies()
{
	register_taxonomy(
		'operator_category',
		'operator',
		array(
			'labels' => array(
				'name' => 'Operator Categories',
				'singular_name' => 'Operator Category',
				'search_items' => 'Search Categories',
				'all_items' => 'All Categories',
				'parent_item' => 'Parent Category',
				'parent_item_colon' => 'Parent Category:',
				'edit_item' => 'Edit Category',
				'update_item' => 'Update Category',
				'add_new_item' => 'Add New Category',
				'new_item_name' => 'New Category Name',
				'menu_name' => 'Categories',
			),
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite' => array('slug' => 'operator-category'),
			'show_ui' => true,
		)
	);

	register_taxonomy(
		'operator_region',
		'operator',
		array(
			'labels' => array(
				'name' => 'Operator Regions',
				'singular_name' => 'Operator Region',
				'search_items' => 'Search Regions',
				'all_items' => 'All Regions',
				'parent_item' => 'Parent Region',
				'parent_item_colon' => 'Parent Region:',
				'edit_item' => 'Edit Region',
				'update_item' => 'Update Region',
				'add_new_item' => 'Add New Region',
				'new_item_name' => 'New Region Name',
				'menu_name' => 'Regions',
			),
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite' => array('slug' => 'operator-region'),
			'show_ui' => true,
		)
	);
}
add_action('init', 'register_operator_taxonomies');

// extend page preview plugin length
add_filter( 'ppp_nonce_life', 'my_nonce_life' );
function my_nonce_life() {
    return 60 * 60 * 24 * 5; // 5 days
}

/**
 * ACF-compatible field getter with native post_meta fallback.
 *
 * Use this instead of get_field() everywhere in the theme. When ACF is active
 * it delegates to get_field() exactly as before. When ACF is not installed it
 * falls back to get_post_meta() for post-based fields (covers all operator
 * fields, since ACF stores them as standard post meta under the same key).
 *
 * Calls without a $post_id are block-context reads (banner block, operator
 * block attribute selectors) — those return null without ACF because there is
 * no post-meta equivalent for block-instance data.
 *
 * @param string           $field   ACF field name / post meta key.
 * @param int|string|false $post_id Post ID, or ACF object identifier (e.g. 'menu_42').
 * @return mixed
 */
function itm_get_field( $field, $post_id = false ) {
	if ( function_exists( 'get_field' ) ) {
		return get_field( $field, $post_id );
	}
	if ( $post_id && is_numeric( $post_id ) ) {
		$value = get_post_meta( (int) $post_id, $field, true );
		return $value !== '' ? $value : null;
	}
	return null;
}

/**
 * Normalise an image field value to an ACF-compatible array.
 *
 * ACF image fields return ['url'=>…, 'alt'=>…, 'width'=>…, 'height'=>…].
 * When ACF is absent, itm_get_field() returns the raw attachment ID stored
 * by get_post_meta(). This helper accepts either format and always returns
 * the same array shape, or null if the value is empty/invalid.
 *
 * Usage:
 *   $img = itm_normalize_image( itm_get_field( 'operator_feature_image', $id ) );
 *   if ( $img ) { echo $img['url']; }
 *
 * @param mixed $image  ACF image array OR attachment ID.
 * @return array|null   Normalised ['url', 'alt', 'width', 'height'] or null.
 */
function itm_normalize_image( $image ) {
	if ( is_array( $image ) && ! empty( $image['url'] ) ) {
		return $image;
	}
	if ( is_numeric( $image ) && (int) $image > 0 ) {
		$src = wp_get_attachment_image_src( (int) $image, 'full' );
		if ( $src ) {
			return [
				'url'    => $src[0],
				'alt'    => (string) get_post_meta( (int) $image, '_wp_attachment_image_alt', true ),
				'width'  => $src[1],
				'height' => $src[2],
			];
		}
	}
	return null;
}

/**
 * Normalise a gallery field value to an array of ACF-compatible image arrays.
 *
 * ACF gallery fields return an array of image arrays. Without ACF,
 * get_post_meta() returns a serialised array of attachment IDs which
 * WordPress auto-unserialises on read.
 *
 * @param mixed $gallery  ACF gallery array OR array of attachment IDs.
 * @return array          Array of normalised image arrays (may be empty).
 */
function itm_normalize_gallery( $gallery ) {
	if ( ! is_array( $gallery ) ) {
		return [];
	}
	$result = [];
	foreach ( $gallery as $item ) {
		$normalised = itm_normalize_image( $item );
		if ( $normalised ) {
			$result[] = $normalised;
		}
	}
	return $result;
}
