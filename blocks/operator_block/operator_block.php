<?php
/**
 * Server-side render template for relish/operator_block
 *
 * Interactive Leaflet map with tabbed cards and markers for Indigenous tourism operators.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$attributes = isset( $attributes ) && is_array( $attributes ) ? $attributes : array();

// Resolve operators to display from Gutenberg attributes, ACF block data, or fallback query
$chosen_operators = array();

if ( ! empty( $attributes['operatorsToDisplay'] ) && is_array( $attributes['operatorsToDisplay'] ) ) {
	$chosen_operators = $attributes['operatorsToDisplay'];
} elseif ( ! empty( $attributes['operators_to_display'] ) && is_array( $attributes['operators_to_display'] ) ) {
	$chosen_operators = $attributes['operators_to_display'];
} elseif ( ! empty( $attributes['data']['operators_to_display'] ) && is_array( $attributes['data']['operators_to_display'] ) ) {
	$chosen_operators = $attributes['data']['operators_to_display'];
} else {
	$acf_ops = function_exists( 'itm_get_field' ) ? itm_get_field( 'operators_to_display' ) : ( function_exists( 'get_field' ) ? get_field( 'operators_to_display' ) : null );
	if ( ! empty( $acf_ops ) && is_array( $acf_ops ) ) {
		$chosen_operators = $acf_ops;
	}
}

// Fallback: If no specific operators selected, fetch all published operators
if ( empty( $chosen_operators ) ) {
	$all_ops = get_posts( array(
		'post_type'      => 'operator',
		'post_status'    => 'publish',
		'posts_per_page' => 100,
		'fields'         => 'ids',
		'orderby'        => 'title',
		'order'          => 'ASC',
	) );
	if ( ! empty( $all_ops ) ) {
		$chosen_operators = $all_ops;
	}
}

$center_lat    = ! empty( $attributes['centerLat'] ) ? floatval( $attributes['centerLat'] ) : 49.88531957670153;
$center_lng    = ! empty( $attributes['centerLng'] ) ? floatval( $attributes['centerLng'] ) : -97.17762828465725;
$zoom          = ! empty( $attributes['zoom'] ) ? intval( $attributes['zoom'] ) : 10;
$section_title = ! empty( $attributes['title'] ) ? $attributes['title'] : __( 'Operators', 'itm_indigpro' );

$marker_icon   = get_template_directory_uri() . '/blocks/operator_block/hoop-marker.png';
$marker_shadow = get_template_directory_uri() . '/blocks/operator_block/hoop-marker-shadow.png';
?>

<section class="content-operators-map">
	<?php
	// Initialize Leaflet map shortcode
	echo do_shortcode( sprintf( '[leaflet-map lat=%f lng=%f zoom=%d scrollwheel [zoomhomemap fit|!fit]]', $center_lat, $center_lng, $zoom ) );

	if ( ! empty( $chosen_operators ) ) :
		?>
		<div class="content-operators-map-tabs-container">
			<h3 class="content-operators-map-title"><?php echo esc_html( $section_title ); ?></h3>
			<ul class="content-operators-map-tabs-list">
				<?php
				$rendered_count = 0;

				foreach ( $chosen_operators as $index => $operator_id ) {
					$op_id = is_object( $operator_id ) && isset( $operator_id->ID ) ? $operator_id->ID : intval( $operator_id );
					if ( ! $op_id ) {
						continue;
					}

					$operator_title                = get_the_title( $op_id );
					$operator_short_description    = function_exists( 'itm_get_field' ) ? itm_get_field( 'operator_short_description', $op_id ) : get_post_meta( $op_id, 'operator_short_description', true );
					$operator_website              = function_exists( 'itm_get_field' ) ? itm_get_field( 'operator_website', $op_id ) : get_post_meta( $op_id, 'operator_website', true );
					$operator_coordinates_latitude  = function_exists( 'itm_get_field' ) ? itm_get_field( 'operator_coordinates_latitude', $op_id ) : get_post_meta( $op_id, 'operator_coordinates_latitude', true );
					$operator_coordinates_longitude = function_exists( 'itm_get_field' ) ? itm_get_field( 'operator_coordinates_longitude', $op_id ) : get_post_meta( $op_id, 'operator_coordinates_longitude', true );
					$operator_location             = function_exists( 'itm_get_field' ) ? itm_get_field( 'operator_location', $op_id ) : get_post_meta( $op_id, 'operator_location', true );

					// Image resolution
					$operator_feature_image = function_exists( 'itm_normalize_image' )
						? itm_normalize_image( itm_get_field( 'operator_feature_image', $op_id ) )
						: null;

					if ( empty( $operator_feature_image ) || empty( $operator_feature_image['url'] ) ) {
						$thumb_url = get_the_post_thumbnail_url( $op_id, 'full' );
						if ( $thumb_url ) {
							$operator_feature_image = array(
								'url' => $thumb_url,
								'alt' => $operator_title,
							);
						}
					}

					$operator_category = wp_get_post_terms( $op_id, 'operator_category' );
					$operator_region   = wp_get_post_terms( $op_id, 'operator_region' );
					$operator_link     = get_permalink( $op_id );

					// Only render operators with valid geographic coordinates
					if ( ! empty( $operator_coordinates_latitude ) && ! empty( $operator_coordinates_longitude ) ) {
						$rendered_count++;

						// Build popup HTML for Leaflet marker
						$popup_content  = '<div class="content-operators-map-popup">';
						if ( ! empty( $operator_feature_image['url'] ) ) {
							$popup_content .= '<img class="block-map-overlay" width="60" height="60" src="' . esc_url( $operator_feature_image['url'] ) . '" alt="' . esc_attr( $operator_title ) . '">';
						}
						$popup_content .= '<div class="popup-content-description"><div class="popup-content">';
						$popup_content .= '<h3 class="popup-title">' . esc_html( $operator_title ) . '</h3>';
						if ( ! empty( $operator_short_description ) ) {
							$popup_content .= '<p class="popup-description">' . esc_html( wp_strip_all_tags( $operator_short_description ) ) . '</p>';
						}
						$popup_content .= '<a class="popup-link" href="' . esc_url( $operator_link ) . '">' . esc_html__( 'Read More', 'itm_indigpro' ) . '</a>';
						$popup_content .= '</div></div></div>';

						// Output marker shortcode
						echo do_shortcode(
							sprintf(
								'[leaflet-marker id=marker-%s lat=%s lng=%s iconUrl="%s" iconSize="80,80" iconAnchor="40,80" shadowUrl="%s" shadowSize="80,80" shadowAnchor="40,80" _leaflet_id]%s[/leaflet-marker]',
								esc_attr( $index ),
								esc_attr( $operator_coordinates_latitude ),
								esc_attr( $operator_coordinates_longitude ),
								esc_url( $marker_icon ),
								esc_url( $marker_shadow ),
								wp_kses_post( $popup_content )
							)
						);
						?>
						<li class="content-operators-map-tabs-list-items operator-tab" data-lat="<?php echo esc_attr( $operator_coordinates_latitude ); ?>" data-lng="<?php echo esc_attr( $operator_coordinates_longitude ); ?>" data-index="marker-<?php echo esc_attr( $index ); ?>">
							<div class="block-map">
								<div class="block-map-image">
									<div class="block-map-divided"></div>
									<div class="block-map-overlayStatic"></div>
									<?php if ( ! empty( $operator_feature_image['url'] ) ) : ?>
										<img class="block-map-overlay" width="500" height="200" src="<?php echo esc_url( $operator_feature_image['url'] ); ?>" alt="<?php echo esc_attr( $operator_title ); ?>" loading="lazy">
									<?php endif; ?>
								</div>
								<div class="block-map-content">
									<div class="block-map-content-close">
										<h2 class="block-map-content-title"><?php echo esc_html( $operator_title ); ?></h2>
										<?php if ( ! empty( $operator_location ) ) : ?>
											<p class="block-map-content-location"><?php echo esc_html( $operator_location ); ?></p>
										<?php endif; ?>
									</div>
									<div class="block-map-content-open">
										<?php if ( ! empty( $operator_category ) && ! is_wp_error( $operator_category ) && is_array( $operator_category ) ) : ?>
											<p class="block-map-content-category">
												<?php foreach ( $operator_category as $term ) { echo esc_html( $term->name ) . ' '; } ?>
											</p>
										<?php endif; ?>
										<?php if ( ! empty( $operator_region ) && ! is_wp_error( $operator_region ) && is_array( $operator_region ) ) : ?>
											<p class="block-map-content-region">
												<?php foreach ( $operator_region as $term ) { echo esc_html( $term->name ) . ' '; } ?>
											</p>
										<?php endif; ?>
										<a class="block-map-content-button" href="<?php echo esc_url( $operator_link ); ?>" target="_blank" rel="noopener noreferrer">
											<?php esc_html_e( 'Find Out More', 'itm_indigpro' ); ?>
										</a>
									</div>
								</div>
							</div>
						</li>
						<?php
					}
				}
				?>
			</ul>
		</div>
		<?php
		echo do_shortcode( '[cluster][/cluster][zoomhomemap]' );
	else :
		?>
		<p><?php esc_html_e( 'No operators available to display.', 'itm_indigpro' ); ?></p>
	<?php endif; ?>
</section>
