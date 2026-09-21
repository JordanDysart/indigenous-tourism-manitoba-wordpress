<?php
/**
 * The template for displaying Category Archive pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#category
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$cat_title = single_cat_title( '', false );
$cat_desc  = category_description();
?>

<header class="updates-hero" role="banner">
	<div class="updates-hero__container wrap">
		<span class="updates-hero__badge"><?php esc_html_e( 'Category Archive', 'kiwatinook' ); ?></span>
		<h1 class="updates-hero__title"><?php echo esc_html( $cat_title ); ?></h1>
		<?php if ( ! empty( $cat_desc ) ) : ?>
			<div class="updates-hero__desc"><?php echo wp_kses_post( $cat_desc ); ?></div>
		<?php else : ?>
			<p class="updates-hero__desc"><?php echo esc_html( sprintf( __( 'Explore all updates, stories, and articles filed under %s.', 'kiwatinook' ), $cat_title ) ); ?></p>
		<?php endif; ?>
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
