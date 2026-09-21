<?php
/**
 * The template for displaying the blog / updates index page (Posts page).
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#home-page-display
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<header class="updates-hero" role="banner">
	<div class="updates-hero__container wrap">
		<span class="updates-hero__badge"><?php esc_html_e( 'Stay Informed', 'kiwatinook' ); ?></span>
		<h1 class="updates-hero__title"><?php esc_html_e( 'Latest Updates & Stories', 'kiwatinook' ); ?></h1>
		<p class="updates-hero__desc"><?php esc_html_e( 'Explore recent news mentions, community stories, and seasonal newsletters from Indigenous Tourism Manitoba.', 'kiwatinook' ); ?></p>
	</div>
</header>

<div id="primary" class="content-area">
	<main id="main" class="site-main updates-main">
		<?php
		echo do_blocks( '<!-- wp:pattern {"slug":"kiwatinook/updates-listing"} /-->' );
		?>
	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer();
