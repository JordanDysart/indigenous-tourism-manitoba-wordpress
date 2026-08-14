<?php
/**
 * Template part for displaying The Forks hero section.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<section class="forks-hero">
	<div class="forks-hero-overlay"></div>
	<div class="forks-hero-content">
		<span class="forks-hero-badge"><?php esc_html_e( 'Flagship Experience Hub', 'itm_indigpro' ); ?></span>
		<h1 class="forks-hero-title"><?php esc_html_e( 'Indigenous Tourism Manitoba at The Forks', 'itm_indigpro' ); ?></h1>
		<p class="forks-hero-subtitle">
			<?php esc_html_e( 'A sacred gathering place for over 6,000 years. Connect with authentic Indigenous cultures, handcrafted artisan works, and guided journey planning in the heart of Winnipeg.', 'itm_indigpro' ); ?>
		</p>
		<div class="forks-hero-actions">
			<a href="#visitor-info" class="btn btn--primary"><?php esc_html_e( 'Plan Your Visit', 'itm_indigpro' ); ?></a>
			<a href="#experience-pillars" class="btn btn--outline" style="color: #ffffff; border-color: #ffffff;"><?php esc_html_e( 'Explore What\'s Inside', 'itm_indigpro' ); ?></a>
		</div>
	</div>
</section>
