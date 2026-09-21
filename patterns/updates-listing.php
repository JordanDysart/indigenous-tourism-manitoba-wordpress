<?php
/**
 * Title: Updates Listing
 * Slug: kiwatinook/updates-listing
 * Categories: itm-updates, itm-patterns
 * Description: Updates listing grid with Category Filter, Query Loop, Post Cards, Pagination, and No Results state.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!-- wp:midflight/category-filter /-->

<!-- wp:query {"queryId":1,"query":{"perPage":9,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":true},"className":"itm-updates-query"} -->
<div class="wp-block-query itm-updates-query">
	<!-- wp:post-template {"className":"itm-updates-grid"} -->
	<article class="itm-post-card">
		<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/9"} /-->
		<div class="itm-post-card__body">
			<div class="itm-post-card__meta">
				<!-- wp:post-terms {"term":"category","className":"itm-post-card__category"} /-->
				<!-- wp:post-date {"format":"F j, Y","className":"itm-post-card__date"} /-->
			</div>
			<!-- wp:post-title {"isLink":true,"className":"itm-post-card__title"} /-->
			<!-- wp:post-excerpt {"moreText":"Read more","showMoreOnNewLine":true,"className":"itm-post-card__excerpt"} /-->
		</div>
	</article>
	<!-- /wp:post-template -->

	<!-- wp:query-pagination {"paginationArrow":"arrow","layout":{"type":"flex","justifyContent":"center"},"className":"itm-pagination"} -->
	<!-- wp:query-pagination-previous /-->
	<!-- wp:query-pagination-numbers /-->
	<!-- wp:query-pagination-next /-->
	<!-- /wp:query-pagination -->

	<!-- wp:query-no-results -->
	<div class="itm-no-results">
		<h3 class="itm-no-results__title"><?php esc_html_e( 'No updates found', 'kiwatinook' ); ?></h3>
		<p class="itm-no-results__desc"><?php esc_html_e( 'There are no updates in this category yet. Please check back soon!', 'kiwatinook' ); ?></p>
	</div>
	<!-- /wp:query-no-results -->
</div>
<!-- /wp:query -->
