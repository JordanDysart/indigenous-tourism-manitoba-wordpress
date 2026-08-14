<?php
/**
 * Template Name: The Forks Location Hub
 * Description: Dedicated showcase template for ITM's flagship visitor hub and artisan retail at The Forks.
 *
 * @package itm_indigpro
 */

get_header(); ?>

<main id="primary" class="site-main forks-page-template">

	<!-- 1. Hero Section -->
	<?php get_template_part( 'template-parts/forks/hero' ); ?>

	<!-- 2. Visitor Quick Info Bar -->
	<?php get_template_part( 'template-parts/forks/visitor-info' ); ?>

	<!-- 3. Experience Highlights / Pillars -->
	<?php get_template_part( 'template-parts/forks/highlights' ); ?>

	<!-- 4. Dynamic Page Content (Gutenberg Blocks for custom news/galleries) -->
	<?php if ( have_posts() ) : ?>
		<section class="forks-content-wrapper">
			<div class="forks-container">
				<?php
				while ( have_posts() ) :
					the_post();
					the_content();
				endwhile;
				?>
			</div>
		</section>
	<?php endif; ?>

	<!-- 5. Inquiry & Visit CTA -->
	<?php get_template_part( 'template-parts/forks/cta' ); ?>

</main>

<?php get_footer(); ?>
