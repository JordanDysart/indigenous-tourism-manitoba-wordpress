<?php
/**
 * Template part for displaying The Forks experience pillars / highlights.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<section class="forks-highlights-section" id="experience-pillars">
	<div class="forks-container">
		<div class="section-header text-center">
			<span class="section-badge"><?php esc_html_e( 'What You\'ll Experience', 'itm_indigpro' ); ?></span>
			<h2 class="section-title"><?php esc_html_e( 'Celebrate Culture, Community & Craft', 'itm_indigpro' ); ?></h2>
			<p class="section-subtitle">
				<?php esc_html_e( 'Visit our welcoming space at The Forks Market to experience the diverse traditions of First Nations, Inuit, and Métis nations across Manitoba.', 'itm_indigpro' ); ?>
			</p>
		</div>

		<div class="forks-pillars-grid">
			<!-- Pillar 1 -->
			<div class="pillar-card">
				<div class="pillar-tag"><?php esc_html_e( 'Artisan Retail', 'itm_indigpro' ); ?></div>
				<h3 class="pillar-title"><?php esc_html_e( 'Shop with Purpose', 'itm_indigpro' ); ?></h3>
				<p class="pillar-text">
					<?php esc_html_e( 'Browse an authentic collection of handcrafted jewelry, beadwork, star blankets, traditional tea blends, moccasins, and art sourced directly from Indigenous makers.', 'itm_indigpro' ); ?>
				</p>
				<ul class="pillar-features">
					<li><?php esc_html_e( '100% authentic Indigenous made', 'itm_indigpro' ); ?></li>
					<li><?php esc_html_e( 'Supports local artists & community families', 'itm_indigpro' ); ?></li>
					<li><?php esc_html_e( 'Seasonal collections & exclusive prints', 'itm_indigpro' ); ?></li>
				</ul>
			</div>

			<!-- Pillar 2 -->
			<div class="pillar-card pillar-card--featured">
				<div class="pillar-tag pillar-tag--gold"><?php esc_html_e( 'Travel Concierge', 'itm_indigpro' ); ?></div>
				<h3 class="pillar-title"><?php esc_html_e( 'Plan Your Journey', 'itm_indigpro' ); ?></h3>
				<p class="pillar-text">
					<?php esc_html_e( 'Speak directly with our knowledgeable travel advisors. We help you discover and book authentic lodges, dog sledding expeditions, guided water tours, and culinary experiences.', 'itm_indigpro' ); ?>
				</p>
				<ul class="pillar-features">
					<li><?php esc_html_e( 'Custom itinerary recommendations', 'itm_indigpro' ); ?></li>
					<li><?php esc_html_e( 'Regional guides from North, Central & South', 'itm_indigpro' ); ?></li>
					<li><?php esc_html_e( 'Direct operator connections', 'itm_indigpro' ); ?></li>
				</ul>
			</div>

			<!-- Pillar 3 -->
			<div class="pillar-card">
				<div class="pillar-tag"><?php esc_html_e( 'Workshops & Events', 'itm_indigpro' ); ?></div>
				<h3 class="pillar-title"><?php esc_html_e( 'Cultural Connections', 'itm_indigpro' ); ?></h3>
				<p class="pillar-text">
					<?php esc_html_e( 'Immerse yourself in live beading workshops, traditional storytelling sessions, artist demonstrations, and cultural celebrations hosted right at our kiosk.', 'itm_indigpro' ); ?>
				</p>
				<ul class="pillar-features">
					<li><?php esc_html_e( 'Interactive hands-on workshops', 'itm_indigpro' ); ?></li>
					<li><?php esc_html_e( 'Guest Knowledge Keepers & Elders', 'itm_indigpro' ); ?></li>
					<li><?php esc_html_e( 'School and group booking options', 'itm_indigpro' ); ?></li>
				</ul>
			</div>
		</div>
	</div>
</section>
