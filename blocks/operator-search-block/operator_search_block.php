<?php
/**
 * Operator Filter Block Render Template
 *
 * Renders Region and Category interactive filter bar for the Operators Directory.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$operator_regions = get_terms( array(
	'taxonomy'   => 'operator_region',
	'hide_empty' => true,
) );

$operator_cats = get_terms( array(
	'taxonomy'   => 'operator_category',
	'hide_empty' => true,
) );
?>

<div class="operator-search-container" id="operator-search-wrapper">
	<div class="operator-search">
		<!-- Region Dropdown -->
		<div class="custom-dropdown" id="operator_region_dropdown" tabindex="0" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-label="<?php esc_attr_e( 'Filter by Region', 'itm_indigpro' ); ?>">
			<div class="dropdown-header">
				<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify" width="1.4em" height="1.4em" viewBox="0 0 32 32">
					<path fill="currentColor" d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"></path>
					<path fill="currentColor" d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"></path>
				</svg>
				<span id="selected_region" class="selected-label"><?php esc_html_e( 'All Regions', 'itm_indigpro' ); ?></span>
				<i class="bi bi-chevron-down dropdown-arrow"></i>
			</div>
			<div class="dropdown-options" role="listbox">
				<div class="dropdown-option is-selected" data-value="" data-slug="" role="option"><?php esc_html_e( 'All Regions', 'itm_indigpro' ); ?></div>
				<?php if ( ! empty( $operator_regions ) && ! is_wp_error( $operator_regions ) ) : ?>
					<?php foreach ( $operator_regions as $region ) : ?>
						<div class="dropdown-option" data-value="<?php echo esc_attr( $region->term_id ); ?>" data-slug="<?php echo esc_attr( $region->slug ); ?>" role="option">
							<?php echo esc_html( $region->name ); ?> (<?php echo intval( $region->count ); ?>)
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>

		<div class="dropdown-divider"></div>

		<!-- Category Dropdown -->
		<div class="custom-dropdown" id="operator_category_dropdown" tabindex="0" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-label="<?php esc_attr_e( 'Filter by Category', 'itm_indigpro' ); ?>">
			<div class="dropdown-header">
				<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify" width="1.4em" height="1.4em" viewBox="0 0 32 32">
					<path fill="currentColor" d="M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.367 3.888L4.438 26H2v2h28v-2ZM16 10.85L25.22 26H17v-8h-2v8H6.78Z"></path>
				</svg>
				<span id="selected_category" class="selected-label"><?php esc_html_e( 'All Categories', 'itm_indigpro' ); ?></span>
				<i class="bi bi-chevron-down dropdown-arrow"></i>
			</div>
			<div class="dropdown-options" role="listbox">
				<div class="dropdown-option is-selected" data-value="" data-slug="" role="option"><?php esc_html_e( 'All Categories', 'itm_indigpro' ); ?></div>
				<?php if ( ! empty( $operator_cats ) && ! is_wp_error( $operator_cats ) ) : ?>
					<?php foreach ( $operator_cats as $cat ) : ?>
						<div class="dropdown-option" data-value="<?php echo esc_attr( $cat->term_id ); ?>" data-slug="<?php echo esc_attr( $cat->slug ); ?>" role="option">
							<?php echo esc_html( $cat->name ); ?> (<?php echo intval( $cat->count ); ?>)
						</div>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
		</div>

		<!-- Hidden form inputs -->
		<input type="hidden" id="operator_category_select" name="operator_category_select" value="" />
		<input type="hidden" id="operator_region_select" name="operator_region_select" value="" />

		<!-- Actions -->
		<button class="operator-search-btn" id="operator_search_btn" aria-label="<?php esc_attr_e( 'Filter Operators', 'itm_indigpro' ); ?>">
			<svg class="operator-search-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.4em" height="1.4em" viewBox="0 0 32 32">
				<path fill="currentColor" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"></path>
			</svg>
			<span><?php esc_html_e( 'Search', 'itm_indigpro' ); ?></span>
		</button>

		<button type="button" class="operator-reset-btn" id="operator_reset_btn" style="display: none;" aria-label="<?php esc_attr_e( 'Reset Filters', 'itm_indigpro' ); ?>">
			<?php esc_html_e( 'Reset', 'itm_indigpro' ); ?>
		</button>
	</div>

	<!-- Results placeholder -->
	<div id="operator_results" class="operator-results-container" style="display: none;"></div>
</div>

<script type="text/javascript">
	var adminAjaxUrl = "<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>";
</script>
