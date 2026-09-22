<?php
/**
 * Title: Standard Constrained Page Section
 * Slug: kiwatinook/page-section-constrained
 * Categories: itm-patterns
 * Description: Standard content section with 1200px maximum width and 20px responsive horizontal side gutters.
 * Keywords: section, container, constrained, layout, gutter, padding
 * Post Types: page, post
 * Inserter: true
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!-- wp:group {"tagName":"section","className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<section class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading"><?php esc_html_e( 'Section Title', 'kiwatinook' ); ?></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><?php esc_html_e( 'Add section narrative or supporting text here. This section enforces consistent 20px horizontal margins across all desktop and mobile viewports.', 'kiwatinook' ); ?></p>
<!-- /wp:paragraph -->
</section>
<!-- /wp:group -->
