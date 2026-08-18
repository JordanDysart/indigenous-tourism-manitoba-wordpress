<?php
/**
 * Kiwatinook functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package kiwatinook
 */

if (!function_exists('kiwatinook_setup')):
	function kiwatinook_setup()
	{
		// Primary text domain with backward-compatible alias
		load_theme_textdomain('kiwatinook', get_template_directory() . '/languages');
		load_theme_textdomain('itm_indigpro', get_template_directory() . '/languages');

		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');

		register_nav_menus(array(
			'primary-menu' => esc_html__('Primary Menu', 'kiwatinook'),
			'footer-menu'  => esc_html__('Footer Menu', 'kiwatinook'),
		));

		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));

		add_theme_support('custom-background', apply_filters('kiwatinook_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		)));

		add_theme_support('customize-selective-refresh-widgets');

		add_theme_support('custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		));
	}
endif;
add_action('after_setup_theme', 'kiwatinook_setup');

// Backwards compatibility alias
if (!function_exists('itm_indigpro_setup')) {
	function itm_indigpro_setup() {
		kiwatinook_setup();
	}
}

function kiwatinook_content_width()
{
	$GLOBALS['content_width'] = apply_filters('kiwatinook_content_width', 640);
}
add_action('after_setup_theme', 'kiwatinook_content_width', 0);

function kiwatinook_widgets_init()
{
	register_sidebar(array(
		'name'          => esc_html__('Sidebar', 'kiwatinook'),
		'id'            => 'sidebar-1',
		'description'   => esc_html__('Add widgets here.', 'kiwatinook'),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	));
}

// add_action( 'widgets_init', 'kiwatinook_widgets_init' );

function kiwatinook_scripts()
{
	$style_css  = get_stylesheet_directory() . '/style.css';
	$styles_css = get_template_directory() . '/assets/css/styles.css';
	$theme_js   = get_template_directory() . '/js/theme.js';
	$nav_js     = get_template_directory() . '/js/navigation.js';
	$skip_js    = get_template_directory() . '/js/skip-link-focus-fix.js';
	$anim_js    = get_template_directory() . '/js/animated-menu.js';

	wp_enqueue_style(
		'kiwatinook-style',
		get_stylesheet_uri(),
		[],
		file_exists($style_css) ? filemtime($style_css) : null
	);
	wp_enqueue_style(
		'animated-menu-style',
		get_template_directory_uri() . '/assets/css/styles.css',
		['kiwatinook-style'],
		file_exists($styles_css) ? filemtime($styles_css) : null
	);

	$vars = array(
		'ajaxurl' => admin_url('admin-ajax.php'),
	);

	wp_deregister_script('jquery');
	wp_register_script('jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', [], '3.7.1', true);
	wp_enqueue_script('jquery');

	wp_enqueue_style('fancybox-css', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css');
	wp_enqueue_script('fancybox-js', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js', array('jquery'), null, true);

	wp_register_script(
		'kiwatinook-theme',
		get_template_directory_uri() . '/js/theme.js',
		array('jquery'),
		file_exists($theme_js) ? filemtime($theme_js) : '20150524',
		true
	);
	wp_localize_script('kiwatinook-theme', 'kiwatinook', $vars);
	wp_enqueue_script('kiwatinook-theme');

	wp_enqueue_script(
		'kiwatinook-navigation',
		get_template_directory_uri() . '/js/navigation.js',
		array('jquery'),
		file_exists($nav_js) ? filemtime($nav_js) : '20151215',
		true
	);
	wp_enqueue_script(
		'kiwatinook-skip-link-focus-fix',
		get_template_directory_uri() . '/js/skip-link-focus-fix.js',
		array('jquery'),
		file_exists($skip_js) ? filemtime($skip_js) : '20151215',
		true
	);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}

	wp_register_script(
		'animated-menu',
		get_template_directory_uri() . '/js/animated-menu.js',
		array('jquery'),
		file_exists($anim_js) ? filemtime($anim_js) : null
	);
	wp_enqueue_script('animated-menu');

	// Bootstrap Icons — required by nav walker toggle chevrons and footer nav headings
	wp_enqueue_style(
		'bootstrap-icons',
		'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
		[],
		'1.11.3'
	);
}

add_action('wp_enqueue_scripts', 'kiwatinook_scripts', 99);


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

function kiwatinook_blocks_scripts()
{
	$block_js = '/blocks/blocks.js';
	$block_css = '/blocks/blocks.css';

	wp_enqueue_script(
		'kiwatinook-blocks-js',
		get_template_directory_uri() . $block_js,
		['jquery'],
		filemtime(get_template_directory() . $block_js),
		true
	);

	wp_enqueue_style(
		'kiwatinook-blocks-css',
		get_template_directory_uri() . $block_css,
		[],
		filemtime(get_template_directory() . $block_css)
	);
}

add_action('enqueue_block_assets', 'kiwatinook_blocks_scripts');

function kiwatinook_blocks_editor_scripts()
{
	$editor_js  = '/blocks/blocks.js';
	$editor_css = '/blocks/blocks.css';
	$styles_css = '/assets/css/styles.css';

	wp_enqueue_script(
		'kiwatinook-blocks-editor-js',
		get_template_directory_uri() . $editor_js,
		['wp-blocks', 'wp-element'],
		filemtime(get_template_directory() . $editor_js),
		true
	);

	if (file_exists(get_template_directory() . $styles_css)) {
		wp_enqueue_style(
			'kiwatinook-styles-editor-css',
			get_template_directory_uri() . $styles_css,
			[],
			filemtime(get_template_directory() . $styles_css)
		);
	}

	wp_enqueue_style(
		'kiwatinook-blocks-editor-css',
		get_template_directory_uri() . $editor_css,
		['wp-edit-blocks'],
		filemtime(get_template_directory() . $editor_css)
	);
}

add_action('enqueue_block_editor_assets', 'kiwatinook_blocks_editor_scripts');

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

function kiwatinook_load_walker_classes()
{
	require_once get_template_directory() . '/inc/mega-menu-meta.php';
	require_once get_template_directory() . '/inc/class-header-menu-walker.php';
	require_once get_template_directory() . '/inc/class-footer-menu-walker.php';
}

add_action('after_setup_theme', 'kiwatinook_load_walker_classes');

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

/**
 * Self-hosted theme updates (GitHub Releases).
 */
require get_template_directory() . '/inc/plugin-updates.php';

/**
 * Milestone 2 — 15 Pages Modernization Migration.
 */
require get_template_directory() . '/inc/m2-pages-migration.php';

/**
 * Mega Menu Multi-Column Structure Migration.
 */
require get_template_directory() . '/inc/menu-structure-migration.php';

function kiwatinook_theme_setup()
{
	add_theme_support('align-wide');
	add_theme_support('editor-styles');
	add_theme_support('wp-block-styles');
	add_theme_support('dark-editor-style');
	add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'kiwatinook_theme_setup');

/**
 * Register block pattern categories.
 */
function kiwatinook_register_pattern_categories() {
	if ( function_exists( 'register_block_pattern_category' ) ) {
		register_block_pattern_category(
			'itm-patterns',
			array( 'label' => __( 'ITM Patterns', 'kiwatinook' ) )
		);
	}
}
add_action( 'init', 'kiwatinook_register_pattern_categories' );

add_theme_support('editor-color-palette', array(
	array(
		'name'  => __('Black', 'kiwatinook'),
		'slug'  => 'black',
		'color' => '#000000',
	),
	array(
		'name'  => __('White', 'kiwatinook'),
		'slug'  => 'white',
		'color' => '#ffffff',
	),
));

add_theme_support('editor-font-sizes', array(
	array(
		'name'      => __('Medium', 'kiwatinook'),
		'shortName' => __('M', 'kiwatinook'),
		'size'      => 22,
		'slug'      => 'medium'
	),
	array(
		'name'      => __('Large', 'kiwatinook'),
		'shortName' => __('L', 'kiwatinook'),
		'size'      => 36,
		'slug'      => 'large'
	),
	array(
		'name'      => __('Huge', 'kiwatinook'),
		'shortName' => __('XL', 'kiwatinook'),
		'size'      => 48,
		'slug'      => 'huge'
	)
));

/**
 * Handle AJAX filtering for operators based on category and region.
 */
function ajax_filter_operators()
{
	$category = isset($_POST['operator_cat']) ? intval($_POST['operator_cat']) : 0;
	$region   = isset($_POST['operator_region']) ? intval($_POST['operator_region']) : 0;

	$args = array(
		'post_type'      => 'operator',
		'posts_per_page' => -1,
		'orderby'        => 'title',
		'order'          => 'ASC',
	);

	$tax_query = array('relation' => 'AND');

	if ($category > 0) {
		$tax_query[] = array(
			'taxonomy'         => 'operator_category',
			'field'            => 'term_id',
			'terms'            => $category,
			'include_children' => false,
		);
	}

	if ($region > 0) {
		$tax_query[] = array(
			'taxonomy'         => 'operator_region',
			'field'            => 'term_id',
			'terms'            => $region,
			'include_children' => false,
		);
	}

	if (count($tax_query) > 1 || (!empty($tax_query[0]))) {
		$args['tax_query'] = $tax_query;
	}

	$operators = get_posts($args);

	if ($operators) {
		echo '<ul class="operator-list-module-items wp-block-post-template is-layout-grid">';

		foreach ($operators as $op) {
			$operator_category = wp_get_post_terms($op->ID, 'operator_category');
			$operator_region   = wp_get_post_terms($op->ID, 'operator_region');
			$thumbnail_url     = get_the_post_thumbnail_url($op->ID, 'medium_large');

			if (!$thumbnail_url) {
				$thumbnail_url = get_template_directory_uri() . '/screenshot.png';
			}

			echo '<li class="wp-block-post operator-card post-' . esc_attr($op->ID) . ' '
				. (!empty($operator_category) ? 'cat-' . sanitize_html_class($operator_category[0]->slug) . ' ' : '')
				. (!empty($operator_region) ? 'region-' . sanitize_html_class($operator_region[0]->slug) : '') . '">';

			echo '<figure class="operator-card-image-wrap wp-block-post-featured-image">';
			echo '<a href="' . esc_url(get_permalink($op->ID)) . '" target="_self">';
			echo '<img loading="lazy" decoding="async" src="' . esc_url($thumbnail_url) . '" class="operator-card-img attachment-post-thumbnail size-post-thumbnail" alt="' . esc_attr(get_the_title($op->ID)) . '">';
			echo '</a>';
			echo '</figure>';

			if (!empty($operator_region)) {
				echo '<div class="taxonomy-operator_region wp-block-post-terms">';
				echo '<a href="' . esc_url(get_term_link($operator_region[0])) . '" rel="tag">' . esc_html($operator_region[0]->name) . '</a>';
				echo '</div>';
			}

			echo '<h2 class="operator-card-title wp-block-post-title">';
			echo '<a href="' . esc_url(get_permalink($op->ID)) . '" target="_self">' . esc_html(get_the_title($op->ID)) . '</a>';
			echo '</h2>';

			echo '</li>';
		}

		echo '</ul>';
	} else {
		echo '<div class="operator-empty-state">';
		echo '<h3>' . esc_html__('No operators found', 'kiwatinook') . '</h3>';
		echo '<p>' . esc_html__('No experiences match the selected filters. Please try selecting a different region or category.', 'kiwatinook') . '</p>';
		echo '<button type="button" class="btn btn--outline btn--sm operator-reset-btn">' . esc_html__('Reset Filters', 'kiwatinook') . '</button>';
		echo '</div>';
	}
	wp_die();
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
			'name'          => 'Operators',
			'singular_name' => 'Operator',
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'supports'     => array('title', 'editor', 'thumbnail'),
		'rewrite'      => array('slug' => 'operator'),
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
				'name'              => 'Operator Categories',
				'singular_name'     => 'Operator Category',
				'search_items'      => 'Search Categories',
				'all_items'         => 'All Categories',
				'parent_item'       => 'Parent Category',
				'parent_item_colon' => 'Parent Category:',
				'edit_item'         => 'Edit Category',
				'update_item'       => 'Update Category',
				'add_new_item'      => 'Add New Category',
				'new_item_name'     => 'New Category Name',
				'menu_name'         => 'Categories',
			),
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite'      => array('slug' => 'operator-category'),
			'show_ui'      => true,
		)
	);

	register_taxonomy(
		'operator_region',
		'operator',
		array(
			'labels' => array(
				'name'              => 'Operator Regions',
				'singular_name'     => 'Operator Region',
				'search_items'      => 'Search Regions',
				'all_items'         => 'All Regions',
				'parent_item'       => 'Parent Region',
				'parent_item_colon' => 'Parent Region:',
				'edit_item'         => 'Edit Region',
				'update_item'       => 'Update Region',
				'add_new_item'      => 'Add New Region',
				'new_item_name'     => 'New Region Name',
				'menu_name'         => 'Regions',
			),
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite'      => array('slug' => 'operator-region'),
			'show_ui'      => true,
		)
	);
}
add_action('init', 'register_operator_taxonomies');

// extend page preview plugin length
add_filter( 'ppp_nonce_life', 'kiwatinook_nonce_life' );
function kiwatinook_nonce_life() {
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

/**
 * Render Breadcrumbs matching production layout.
 *
 * @param array $args Optional configuration arguments.
 * @return string HTML markup for the breadcrumb navigation.
 */
function itm_render_breadcrumbs( $args = [] ) {
	if ( is_front_page() || is_home() ) {
		return '';
	}

	$items = [];
	$home_url = home_url( '/' );

	// 1. Single Operator Post Type: Operators > [Operator Title]
	if ( is_singular( 'operator' ) ) {
		$items[] = [
			'title' => __( 'Operators', 'kiwatinook' ),
			'url'   => home_url( '/operators/' ),
		];
		$items[] = [
			'title' => get_the_title(),
			'url'   => get_permalink(),
		];
	}
	// 2. Operator Taxonomies: Operators > [Term Name]
	elseif ( is_tax( 'operator_region' ) || is_tax( 'operator_category' ) ) {
		$term = get_queried_object();
		$items[] = [
			'title' => __( 'Operators', 'kiwatinook' ),
			'url'   => home_url( '/operators/' ),
		];
		if ( $term && ! is_wp_error( $term ) ) {
			$items[] = [
				'title' => $term->name,
				'url'   => get_term_link( $term ),
			];
		}
	}
	// 3. Standard Single Post (News / Articles)
	elseif ( is_singular( 'post' ) ) {
		$items[] = [
			'title' => __( 'Home', 'kiwatinook' ),
			'url'   => $home_url,
		];
		$categories = get_the_category();
		if ( ! empty( $categories ) ) {
			$items[] = [
				'title' => $categories[0]->name,
				'url'   => get_category_link( $categories[0]->term_id ),
			];
		}
		$items[] = [
			'title' => get_the_title(),
			'url'   => get_permalink(),
		];
	}
	// 4. Hierarchical Page
	elseif ( is_page() ) {
		$items[] = [
			'title' => __( 'Home', 'kiwatinook' ),
			'url'   => $home_url,
		];
		$ancestors = get_post_ancestors( get_the_ID() );
		if ( ! empty( $ancestors ) ) {
			$ancestors = array_reverse( $ancestors );
			foreach ( $ancestors as $ancestor_id ) {
				$items[] = [
					'title' => get_the_title( $ancestor_id ),
					'url'   => get_permalink( $ancestor_id ),
				];
			}
		}
		$items[] = [
			'title' => get_the_title(),
			'url'   => get_permalink(),
		];
	}
	// 5. General Archive / Taxonomy
	elseif ( is_archive() ) {
		$items[] = [
			'title' => __( 'Home', 'kiwatinook' ),
			'url'   => $home_url,
		];
		$items[] = [
			'title' => get_the_archive_title(),
			'url'   => '',
		];
	}
	// 6. Search Results
	elseif ( is_search() ) {
		$items[] = [
			'title' => __( 'Home', 'kiwatinook' ),
			'url'   => $home_url,
		];
		$items[] = [
			'title' => sprintf( __( 'Search: %s', 'kiwatinook' ), get_search_query() ),
			'url'   => '',
		];
	}
	// 7. 404
	elseif ( is_404() ) {
		$items[] = [
			'title' => __( 'Home', 'kiwatinook' ),
			'url'   => $home_url,
		];
		$items[] = [
			'title' => __( 'Page Not Found', 'kiwatinook' ),
			'url'   => '',
		];
	}

	if ( empty( $items ) ) {
		return '';
	}

	$output  = '<div class="breadcrumb-container theme1">';
	$output .= '<ol itemscope itemtype="https://schema.org/BreadcrumbList">';

	$count = count( $items );
	foreach ( $items as $index => $item ) {
		$position = $index + 1;
		$is_last  = ( $position === $count );

		$output .= '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
		$output .= '<a itemprop="item" title="' . esc_attr( $item['title'] ) . '" href="' . esc_url( $item['url'] ? $item['url'] : '#' ) . '"><span itemprop="name">' . esc_html( $item['title'] ) . '</span></a>';
		$output .= '<meta itemprop="position" content="' . esc_attr( $position ) . '" />';
		if ( ! $is_last ) {
			$output .= '<span class="separator"></span>';
		}
		$output .= '</li>';
	}

	$output .= '</ol>';
	$output .= '</div>';

	return $output;
}

/**
 * Shortcode handler for [breadcrumb]
 */
function itm_breadcrumb_shortcode( $atts ) {
	return itm_render_breadcrumbs( $atts );
}
add_shortcode( 'breadcrumb', 'itm_breadcrumb_shortcode' );
