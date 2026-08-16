<?php
/**
 * Featured Operators Block — Server-Side Render Template.
 *
 * Renders a responsive grid of featured operators with dynamic taxonomy filtering,
 * curated manual selection, customizable header, and quick "View All" link.
 *
 * Variables available:
 *   $attributes  array    Block attributes.
 *   $content     string   Inner block HTML (unused).
 *   $block       WP_Block The block instance.
 */

$title               = isset( $attributes['title'] ) ? $attributes['title'] : 'Discover Authentic Experiences';
$subtitle            = isset( $attributes['subtitle'] ) ? $attributes['subtitle'] : '';
$show_view_all       = isset( $attributes['showViewAll'] ) ? (bool) $attributes['showViewAll'] : true;
$view_all_text       = isset( $attributes['viewAllText'] ) ? $attributes['viewAllText'] : 'View All';
$view_all_url        = isset( $attributes['viewAllUrl'] ) ? $attributes['viewAllUrl'] : '/operators/';
$selection_mode      = isset( $attributes['selectionMode'] ) ? $attributes['selectionMode'] : 'taxonomy';
$selected_taxonomy   = isset( $attributes['selectedTaxonomy'] ) ? $attributes['selectedTaxonomy'] : 'all';
$selected_term_slug  = isset( $attributes['selectedTermSlug'] ) ? trim( $attributes['selectedTermSlug'] ) : '';
$manual_operator_ids = isset( $attributes['manualOperatorIds'] ) ? (array) $attributes['manualOperatorIds'] : [];
$number_of_posts     = isset( $attributes['numberOfPosts'] ) ? max( 1, min( 12, (int) $attributes['numberOfPosts'] ) ) : 4;
$order_by            = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'rand';
$order               = isset( $attributes['order'] ) ? strtoupper( $attributes['order'] ) : 'ASC';
$columns             = isset( $attributes['columns'] ) ? max( 2, min( 4, (int) $attributes['columns'] ) ) : 4;
$background_color    = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : 'off-white';
$extra_class         = isset( $attributes['className'] ) ? $attributes['className'] : '';

// 1. Build Query Arguments
$query_args = [
	'post_type'      => 'operator',
	'post_status'    => 'publish',
	'posts_per_page' => $number_of_posts,
	'no_found_rows'  => true,
];

if ( 'manual' === $selection_mode && ! empty( $manual_operator_ids ) ) {
	$query_args['post__in']       = array_map( 'intval', $manual_operator_ids );
	$query_args['orderby']        = 'post__in';
	$query_args['posts_per_page'] = count( $manual_operator_ids );
} else {
	$query_args['orderby'] = in_array( $order_by, [ 'rand', 'title', 'date' ], true ) ? $order_by : 'rand';
	$query_args['order']   = in_array( $order, [ 'ASC', 'DESC' ], true ) ? $order : 'ASC';

	if ( 'all' !== $selected_taxonomy && ! empty( $selected_taxonomy ) && ! empty( $selected_term_slug ) ) {
		$query_args['tax_query'] = [
			[
				'taxonomy' => sanitize_key( $selected_taxonomy ),
				'field'    => 'slug',
				'terms'    => sanitize_text_field( $selected_term_slug ),
			],
		];
	}
}

$operators_query = new WP_Query( $query_args );

$wrapper_classes = trim( sprintf(
	'featured-operators-block alignfull bg-%s %s',
	sanitize_html_class( $background_color ),
	$extra_class
) );
?>

<section class="<?php echo esc_attr( $wrapper_classes ); ?>" aria-label="<?php echo esc_attr( $title ); ?>">
	<div class="featured-operators-container">

		<div class="featured-operators-header">
			<div class="featured-operators-header-text">
				<?php if ( ! empty( $title ) ) : ?>
					<h2 class="featured-operators-title"><?php echo esc_html( $title ); ?></h2>
				<?php endif; ?>
				<?php if ( ! empty( $subtitle ) ) : ?>
					<p class="featured-operators-subtitle"><?php echo esc_html( $subtitle ); ?></p>
				<?php endif; ?>
			</div>

			<?php if ( $show_view_all && ! empty( $view_all_url ) ) : ?>
				<div class="featured-operators-view-all">
					<a href="<?php echo esc_url( $view_all_url ); ?>" class="view-all-link">
						<span><?php echo esc_html( $view_all_text ); ?></span>
						<svg class="view-all-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</div>
			<?php endif; ?>
		</div>

		<?php if ( $operators_query->have_posts() ) : ?>
			<div class="featured-operators-grid grid-cols-<?php echo esc_attr( $columns ); ?>">
				<?php while ( $operators_query->have_posts() ) : $operators_query->the_post();
					$op_id        = get_the_ID();
					$op_title     = get_the_title();
					$op_link      = get_permalink();
					$op_desc      = function_exists( 'itm_get_field' ) ? itm_get_field( 'operator_short_description', $op_id ) : '';
					$op_feat_img  = function_exists( 'itm_get_field' ) ? itm_normalize_image( itm_get_field( 'operator_feature_image', $op_id ) ) : null;
					$op_regions   = wp_get_post_terms( $op_id, 'operator_region' );
					$op_cats      = wp_get_post_terms( $op_id, 'operator_category' );

					// Resolve card image URL
					$img_url = '';
					$img_alt = $op_title;
					if ( ! empty( $op_feat_img ) && ! empty( $op_feat_img['url'] ) ) {
						$img_url = $op_feat_img['url'];
						$img_alt = ! empty( $op_feat_img['alt'] ) ? $op_feat_img['alt'] : $op_title;
					} elseif ( has_post_thumbnail( $op_id ) ) {
						$img_url = get_the_post_thumbnail_url( $op_id, 'large' );
					} else {
						// Theme fallback hero banner
						$img_url = get_template_directory_uri() . '/screenshot.png';
					}

					// Primary badge label
					$badge_label = '';
					if ( ! empty( $op_regions ) && ! is_wp_error( $op_regions ) ) {
						$badge_label = $op_regions[0]->name;
					} elseif ( ! empty( $op_cats ) && ! is_wp_error( $op_cats ) ) {
						$badge_label = $op_cats[0]->name;
					}
					?>
					<article class="featured-operator-card" id="operator-card-<?php echo esc_attr( $op_id ); ?>">
						<a href="<?php echo esc_url( $op_link ); ?>" class="featured-operator-card-link" aria-label="<?php echo esc_attr( $op_title ); ?>">
							<div class="featured-operator-card-image-wrap">
								<img src="<?php echo esc_url( $img_url ); ?>"
									 alt="<?php echo esc_attr( $img_alt ); ?>"
									 class="featured-operator-card-image"
									 loading="lazy" />
							</div>
							<div class="featured-operator-card-body">
								<?php if ( ! empty( $badge_label ) ) : ?>
									<span class="featured-operator-card-badge"><?php echo esc_html( $badge_label ); ?></span>
								<?php endif; ?>
								<h3 class="featured-operator-card-title"><?php echo esc_html( $op_title ); ?></h3>
							</div>
						</a>
					</article>
				<?php endwhile; wp_reset_postdata(); ?>
			</div>
		<?php else : ?>
			<div class="featured-operators-empty">
				<p><?php esc_html_e( 'No operators found matching the selected criteria.', 'itm_indigpro' ); ?></p>
			</div>
		<?php endif; ?>

	</div>
</section>
