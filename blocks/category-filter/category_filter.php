<?php
/**
 * Updates Category Filter Block - Server-Side Render Template
 *
 * Renders an accessible category navigation filter with automatic category discovery,
 * non-empty category filtering, and aria-current="page" on the active item.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$posts_page_id = (int) get_option( 'page_for_posts' );
$all_url       = $posts_page_id ? get_permalink( $posts_page_id ) : home_url( '/updates/' );

// Determine if "All" is active.
// In the frontend, "All" is active on the blog index / posts page.
$is_all_active = is_home() || ( ! is_category() && ! is_archive() && ! is_singular( 'post' ) );
if ( is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
	$is_all_active = true;
}

// Fetch categories: hide empty in frontend, but during initial setup or editor preview
// show created categories so UI is visible.
$default_cat = (int) get_option( 'default_category' );
$categories  = get_categories( array(
	'taxonomy'   => 'category',
	'hide_empty' => true,
	'exclude'    => array( $default_cat ),
	'orderby'    => 'name',
	'order'      => 'ASC',
) );

// If no categories have posts yet, fall back to showing all non-default categories
if ( empty( $categories ) ) {
	$categories = get_categories( array(
		'taxonomy'   => 'category',
		'hide_empty' => false,
		'exclude'    => array( $default_cat ),
		'orderby'    => 'name',
		'order'      => 'ASC',
	) );
}

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'itm-category-filter-wrapper',
) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<nav class="itm-category-filter" aria-label="<?php esc_attr_e( 'Filter updates by category', 'kiwatinook' ); ?>">
		<ul class="itm-category-filter__list" role="list">
			<li class="itm-category-filter__item">
				<a
					href="<?php echo esc_url( $all_url ); ?>"
					class="itm-category-filter__link <?php echo $is_all_active ? 'is-active' : ''; ?>"
					<?php echo $is_all_active ? 'aria-current="page"' : ''; ?>
				>
					<?php esc_html_e( 'All', 'kiwatinook' ); ?>
				</a>
			</li>
			<?php if ( ! empty( $categories ) ) : ?>
				<?php foreach ( $categories as $cat ) :
					$cat_url   = get_category_link( $cat->term_id );
					$is_active = is_category( $cat->term_id );
				?>
					<li class="itm-category-filter__item">
						<a
							href="<?php echo esc_url( $cat_url ); ?>"
							class="itm-category-filter__link <?php echo $is_active ? 'is-active' : ''; ?>"
							<?php echo $is_active ? 'aria-current="page"' : ''; ?>
						>
							<?php echo esc_html( $cat->name ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			<?php endif; ?>
		</ul>
	</nav>
</div>
