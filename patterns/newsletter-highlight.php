<?php
/**
 * Title: Newsletter Highlight Section
 * Slug: kiwatinook/newsletter-highlight
 * Categories: itm-updates, itm-patterns, featured, call-to-action
 * Description: Homepage split-narrative section highlighting the latest published newsletter with an archive link.
 * Keywords: newsletter, highlight, home, featured, stories, updates
 * Post Types: page, post
 * Inserter: true
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$newsletter_term   = get_term_by( 'slug', 'newsletter', 'category' );
$newsletter_cat_id = $newsletter_term ? (int) $newsletter_term->term_id : 0;
$archive_url       = $newsletter_cat_id ? get_category_link( $newsletter_cat_id ) : home_url( '/category/newsletter/' );
?>
<!-- wp:group {"tagName":"section","className":"newsletter-highlight-section page-section constrained-content has-off-white-background-color has-background","layout":{"type":"constrained"}} -->
<section class="wp-block-group newsletter-highlight-section page-section constrained-content has-off-white-background-color has-background" aria-label="<?php esc_attr_e( 'Latest Newsletters', 'kiwatinook' ); ?>">
	<div class="newsletter-highlight-grid">
		<!-- Left Narrative Column -->
		<div class="newsletter-highlight-content">
			<span class="culture-badge"><?php esc_html_e( 'Stay Connected', 'kiwatinook' ); ?></span>
			<h2 class="wp-block-heading newsletter-highlight-title"><?php esc_html_e( "Stories from Manitoba's Indigenous Communities", 'kiwatinook' ); ?></h2>
			<p class="newsletter-highlight-desc"><?php esc_html_e( 'Explore seasonal highlights, authentic operator milestones, and cultural gatherings across the province. Our community newsletters celebrate the living heritage and traditions that make Manitoba extraordinary.', 'kiwatinook' ); ?></p>
			
			<!-- wp:buttons {"className":"newsletter-highlight-buttons"} -->
			<div class="wp-block-buttons newsletter-highlight-buttons">
				<!-- wp:button {"className":"btn btn--primary"} -->
				<div class="wp-block-button btn btn--primary">
					<a class="wp-block-button__link wp-element-button" href="<?php echo esc_url( $archive_url ); ?>">
						<?php esc_html_e( 'View All Newsletters', 'kiwatinook' ); ?>
					</a>
				</div>
				<!-- /wp:button -->
				<!-- wp:button {"className":"btn btn--outline"} -->
				<div class="wp-block-button btn btn--outline">
					<a class="wp-block-button__link wp-element-button" href="#itm-newsletter-form">
						<?php esc_html_e( 'Subscribe to Updates', 'kiwatinook' ); ?>
					</a>
				</div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>

		<!-- Right Featured Newsletter Card Column -->
		<div class="newsletter-highlight-card-col">
			<div class="newsletter-highlight-badge-wrap">
				<span class="newsletter-featured-pill"><?php esc_html_e( 'Latest Edition', 'kiwatinook' ); ?></span>
			</div>

			<!-- wp:query {"queryId":10,"query":{"perPage":1,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":false,"taxQuery":{"category":[<?php echo $newsletter_cat_id; ?>]}},"className":"newsletter-highlight-query"} -->
			<div class="wp-block-query newsletter-highlight-query">
				<!-- wp:post-template {"className":"newsletter-highlight-template"} -->
				<article class="newsletter-featured-card">
					<div class="newsletter-featured-card__meta">
						<span class="itm-post-card__category"><?php esc_html_e( 'Newsletter', 'kiwatinook' ); ?></span>
						<!-- wp:post-date {"format":"F j, Y","className":"newsletter-featured-card__date"} /-->
					</div>
					
					<!-- wp:post-title {"level":3,"isLink":true,"className":"newsletter-featured-card__title"} /-->
					
					<!-- wp:post-excerpt {"moreText":"Read Full Edition","showMoreOnNewLine":true,"className":"newsletter-featured-card__excerpt"} /-->
				</article>
				<!-- /wp:post-template -->

				<!-- wp:query-no-results -->
				<div class="newsletter-featured-card newsletter-featured-card--empty">
					<h3 class="newsletter-featured-card__title"><?php esc_html_e( 'Upcoming Edition Coming Soon', 'kiwatinook' ); ?></h3>
					<p><?php esc_html_e( 'Subscribe below to be the first to receive our inaugural community newsletter.', 'kiwatinook' ); ?></p>
				</div>
				<!-- /wp:query-no-results -->
			</div>
			<!-- /wp:query -->
		</div>
	</div>
</section>
<!-- /wp:group -->
