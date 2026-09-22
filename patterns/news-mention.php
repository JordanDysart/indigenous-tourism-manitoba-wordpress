<?php
/**
 * Title: News Mention
 * Slug: kiwatinook/news-mention
 * Categories: itm-updates, itm-patterns, featured, posts
 * Post Types: post, page
 * Block Types: core/post-content
 * Description: Short write-up about a news mention linking out to the organization or publication article.
 * Keywords: news, mention, press, coverage, media, external
 * Inserter: true
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Featured in [Publication Name]</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>[Publication Name] recently highlighted Indigenous Tourism Manitoba and our member operators in their latest coverage. Write a 1-2 paragraph overview summarizing the story, key themes, and perspectives shared in the article.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Our Involvement</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Highlight Indigenous Tourism Manitoba's role in this story. Detail which member operators, culinary or cultural programs, or regional initiatives were involved, and how this coverage impacts our community.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons">
	<!-- wp:button {"className":"btn btn--primary is-external-link","lock":{"remove":true}} -->
	<div class="wp-block-button btn btn--primary is-external-link"><a class="wp-block-button__link wp-element-button" href="https://example.com" target="_blank" rel="noopener noreferrer">Read the full story at [Publication] <span class="screen-reader-text">(opens in a new tab)</span><svg class="external-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div>
	<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
