<?php
/**
 * Title: Newsletter
 * Slug: kiwatinook/newsletter
 * Categories: itm-updates, itm-patterns, featured, posts
 * Post Types: post, page
 * Block Types: core/post-content
 * Description: Newsletter issue layout featuring an introduction, community stories, and subscription callout.
 * Keywords: newsletter, update, bulletin, email, digest
 * Inserter: true
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.25rem","lineHeight":"1.6"}},"className":"has-custom-font-size itm-newsletter-lead"} -->
<p class="has-custom-font-size itm-newsletter-lead" style="font-size:1.25rem;line-height:1.6">Welcome to our latest newsletter edition. Here, we share seasonal highlights, authentic Indigenous travel stories, member milestones, and upcoming cultural gatherings from across Manitoba.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Community Highlights &amp; Operator Stories</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Share key stories and updates from Indigenous operators across the province. Feature recent accomplishments, awards, or seasonal authentic experiences available to travelers.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Seasonal Experiences</h3>
		<!-- /wp:heading -->
		<!-- wp:paragraph -->
		<p>Highlight seasonal activities, land-based adventures, and community celebrations taking place this season.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column -->
	<div class="wp-block-column">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Member Spotlight</h3>
		<!-- /wp:heading -->
		<!-- wp:paragraph -->
		<p>Introduce a featured Indigenous operator, artisan, or guide sharing their cultural teachings and heritage.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Upcoming Events &amp; Opportunities</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>List key upcoming events, workshops, training opportunities, or seasonal gatherings for members and visitors.</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"},"margin":{"top":"2.5rem"}},"border":{"radius":"8px"}},"backgroundColor":"light-gray","className":"itm-newsletter-callout","layout":{"type":"constrained"}} -->
<div class="wp-block-group itm-newsletter-callout has-light-gray-background-color has-background" style="border-radius:8px;margin-top:2.5rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
	<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.375rem"}}} -->
	<h3 class="wp-block-heading" style="font-size:1.375rem">Never Miss an Update</h3>
	<!-- /wp:heading -->

	<!-- wp:paragraph -->
	<p>Subscribe to receive our e-newsletter directly in your inbox, or explore previous editions in our updates archive.</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"className":"btn btn--primary"} -->
		<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="#itm-newsletter-form">Subscribe to Future Issues</a></div>
		<!-- /wp:button -->
		<!-- wp:button {"className":"btn btn--outline"} -->
		<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/category/newsletter/">Browse Newsletter Archive</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
