<?php
/**
 * Template part for displaying The Forks bottom CTA section.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<section class="forks-cta-section">
	<div class="forks-container">
		<div class="forks-cta-box">
			<div class="forks-cta-content">
				<h2 class="cta-title"><?php esc_html_e( 'Planning a Group Tour or Visit?', 'itm_indigpro' ); ?></h2>
				<p class="cta-text">
					<?php esc_html_e( 'We welcome tour operators, school groups, and conference attendees. Contact our team in advance to coordinate customized welcoming experiences and cultural workshops.', 'itm_indigpro' ); ?>
				</p>
			</div>
			<div class="forks-cta-actions">
				<a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>" class="btn btn--primary btn--lg">
					<?php esc_html_e( 'Get in Touch with Our Team', 'itm_indigpro' ); ?>
				</a>
			</div>
		</div>
	</div>
</section>
