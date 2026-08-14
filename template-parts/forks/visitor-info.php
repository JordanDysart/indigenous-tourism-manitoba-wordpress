<?php
/**
 * Template part for displaying The Forks quick visitor info bar.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<section class="forks-visitor-bar" id="visitor-info">
	<div class="forks-container">
		<div class="visitor-info-grid">
			<div class="visitor-info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="currentColor" d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"></path><path fill="currentColor" d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"></path></svg>
				</div>
				<div class="info-content">
					<h3 class="info-title"><?php esc_html_e( 'Location', 'itm_indigpro' ); ?></h3>
					<p class="info-detail"><?php esc_html_e( 'The Forks Market, 1 Forks Market Rd', 'itm_indigpro' ); ?><br><?php esc_html_e( 'Winnipeg, MB R3C 4L9', 'itm_indigpro' ); ?></p>
				</div>
			</div>

			<div class="visitor-info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"></path><path fill="currentColor" d="M16 8h-2v9h8v-2h-6z"></path></svg>
				</div>
				<div class="info-content">
					<h3 class="info-title"><?php esc_html_e( 'Hours of Operation', 'itm_indigpro' ); ?></h3>
					<p class="info-detail"><?php esc_html_e( 'Monday – Sunday: 10:00 AM – 6:00 PM', 'itm_indigpro' ); ?><br><?php esc_html_e( 'Open holidays with seasonal events', 'itm_indigpro' ); ?></p>
				</div>
			</div>

			<div class="visitor-info-card">
				<div class="info-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="currentColor" d="M26 4h-4V2h-2v2h-8V2h-2v2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 22H6V10h20Zm0-18H6V6h4v2h2V6h8v2h2V6h4Z"></path></svg>
				</div>
				<div class="info-content">
					<h3 class="info-title"><?php esc_html_e( 'Visitor Inquiries', 'itm_indigpro' ); ?></h3>
					<p class="info-detail"><?php esc_html_e( 'Email: info@indigenoustourismmanitoba.ca', 'itm_indigpro' ); ?><br><?php esc_html_e( 'Phone: (204) 555-0199', 'itm_indigpro' ); ?></p>
				</div>
			</div>
		</div>
	</div>
</section>
