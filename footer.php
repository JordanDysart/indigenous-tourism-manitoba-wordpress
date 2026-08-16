<?php
/**
 * The template for displaying the footer
 *
 * @package itm_indigpro
 */

$footer_logo = get_theme_mod( 'footer_logo' );
if ( ! $footer_logo && function_exists( 'get_custom_logo' ) ) {
	$custom_logo_id = get_theme_mod( 'custom_logo' );
	if ( $custom_logo_id ) {
		$logo_img = wp_get_attachment_image_src( $custom_logo_id, 'full' );
		if ( $logo_img ) {
			$footer_logo = $logo_img[0];
		}
	}
}
if ( ! $footer_logo ) {
	$footer_logo = home_url( '/wp-content/uploads/2024/11/ITM_Logo_4CP_KO.png' );
}
?>
		</div><!-- #content -->
	</div><!-- #page -->

	<footer class="site-footer" role="contentinfo">
		<div class="site-footer__main">
			<div class="site-footer__container">
				<div class="site-footer__grid">
					<!-- Column 1: Brand & Mission -->
					<div class="site-footer__brand-col">
						<div class="site-footer__logo">
							<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
								<img src="<?php echo esc_url( $footer_logo ); ?>" alt="<?php bloginfo( 'name' ); ?> Logo" width="180" height="auto" />
							</a>
						</div>
						<h3 class="site-footer__tagline">Adventure to Understanding</h3>
						<p class="site-footer__mission">
							Empowering Indigenous voices to share authentic stories, cultivating sustainable economic growth, and celebrating living cultural heritage across Manitoba.
						</p>
						<div class="site-footer__social">
							<a href="https://www.facebook.com/IndigenousTourismMB" target="_blank" rel="noopener noreferrer" class="site-footer__social-link" aria-label="Facebook">
								<i class="bi bi-facebook" aria-hidden="true"></i>
							</a>
							<a href="https://www.instagram.com/tourism_itm/" target="_blank" rel="noopener noreferrer" class="site-footer__social-link" aria-label="Instagram">
								<i class="bi bi-instagram" aria-hidden="true"></i>
							</a>
							<a href="https://www.linkedin.com/company/manitoba-indigenous-tourism-association" target="_blank" rel="noopener noreferrer" class="site-footer__social-link" aria-label="LinkedIn">
								<i class="bi bi-linkedin" aria-hidden="true"></i>
							</a>
							<a href="https://twitter.com/IndigenousMB" target="_blank" rel="noopener noreferrer" class="site-footer__social-link" aria-label="Twitter / X">
								<i class="bi bi-twitter-x" aria-hidden="true"></i>
							</a>
						</div>
					</div>

					<!-- Column 2: Explore -->
					<div class="site-footer__nav-col">
						<h4 class="site-footer__nav-heading">Explore</h4>
						<ul class="site-footer__nav-list">
							<li><a href="<?php echo esc_url( home_url( '/things-to-do/' ) ); ?>">Things To Do</a></li>
							<li><a href="<?php echo esc_url( home_url( '/experience-map/' ) ); ?>">Experience Map</a></li>
							<li><a href="<?php echo esc_url( home_url( '/operators/' ) ); ?>">Operator Directory</a></li>
							<li><a href="<?php echo esc_url( home_url( '/the-forks/' ) ); ?>">The Forks Experience</a></li>
						</ul>
					</div>

					<!-- Column 3: About ITM -->
					<div class="site-footer__nav-col">
						<h4 class="site-footer__nav-heading">About ITM</h4>
						<ul class="site-footer__nav-list">
							<li><a href="<?php echo esc_url( home_url( '/about-itm/' ) ); ?>">Who We Are</a></li>
							<li><a href="<?php echo esc_url( home_url( '/reconciliation/' ) ); ?>">Reconciliation &amp; Protocol</a></li>
							<li><a href="<?php echo esc_url( home_url( '/our-team/' ) ); ?>">Meet Our Team</a></li>
							<li><a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>">Contact Us</a></li>
						</ul>
					</div>

					<!-- Column 4: Programs & Membership -->
					<div class="site-footer__nav-col">
						<h4 class="site-footer__nav-heading">Programs &amp; Members</h4>
						<ul class="site-footer__nav-list">
							<li><a href="<?php echo esc_url( home_url( '/guide-training-program/' ) ); ?>">Guide Training Program</a></li>
							<li><a href="<?php echo esc_url( home_url( '/become-a-member/' ) ); ?>">Become a Member</a></li>
							<li><a href="<?php echo esc_url( home_url( '/member-benefits/' ) ); ?>">Member Benefits</a></li>
							<li><a href="<?php echo esc_url( home_url( '/itm-indigenous-guide-training-program-inquiry-form/' ) ); ?>">Inquire &amp; Apply</a></li>
							<li><a href="<?php echo esc_url( home_url( '/sitemap/' ) ); ?>">Site Map</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer Bottom Bar -->
		<div class="site-footer__bottom">
			<div class="site-footer__bottom-container">
				<div class="site-footer__copyright">
					<p>&copy; <?php echo date( 'Y' ); ?> Indigenous Tourism Manitoba. All rights reserved.</p>
				</div>
				<div class="site-footer__territory">
					<p>Proudly Built in Treaty One Territory</p>
				</div>
				<div class="site-footer__legal">
					<a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a>
					<span class="site-footer__legal-sep" aria-hidden="true">&bull;</span>
					<a href="<?php echo esc_url( home_url( '/sitemap/' ) ); ?>">Sitemap</a>
				</div>
			</div>
		</div>
	</footer>

	<?php wp_footer(); ?>
</body>
</html>
