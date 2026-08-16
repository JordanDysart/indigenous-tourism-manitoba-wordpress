<?php
/**
 * Template Name: Human-Readable Sitemap
 *
 * Displays an organized hierarchical sitemap of all site pages, operator categories, regions, and resources.
 *
 * @package itm_indigpro
 */

get_header();
?>

<!-- wp:relish/hero-block {"showHoopOverlay":true,"overlayOpacity":30,"minHeight":50,"contentAlignment":"center"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Site Map &amp; Directory</h1>
<!-- /wp:relish/hero-block -->

<div class="page-section constrained-content sitemap-page-section">
	<div class="sitemap-intro text-center">
		<p class="lead">Explore the complete index of Indigenous tourism experiences, regional directories, training programs, and membership resources across Manitoba.</p>
	</div>

	<div class="sitemap-grid">
		<!-- Section 1: Main Pages & Exploration -->
		<div class="sitemap-card">
			<div class="sitemap-card__header">
				<span class="sitemap-card__badge">Explore</span>
				<h2 class="sitemap-card__title">Experiences &amp; Destinations</h2>
			</div>
			<ul class="sitemap-list">
				<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
				<li><a href="<?php echo esc_url( home_url( '/things-to-do/' ) ); ?>">Things To Do in Manitoba</a></li>
				<li><a href="<?php echo esc_url( home_url( '/experience-map/' ) ); ?>">Interactive Experience Map</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operators/' ) ); ?>">All Operators Directory</a></li>
				<li><a href="<?php echo esc_url( home_url( '/the-forks/' ) ); ?>">The Forks Experience &amp; Heritage</a></li>
			</ul>
		</div>

		<!-- Section 2: Regional Experiences -->
		<div class="sitemap-card">
			<div class="sitemap-card__header">
				<span class="sitemap-card__badge">Regions</span>
				<h2 class="sitemap-card__title">Explore by Region</h2>
			</div>
			<ul class="sitemap-list">
				<li><a href="<?php echo esc_url( home_url( '/operator-region/north/' ) ); ?>">Northern Manitoba</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-region/central/' ) ); ?>">Central Manitoba</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-region/south/' ) ); ?>">Southern Manitoba</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-region/winnipeg/' ) ); ?>">Winnipeg &amp; Capital Region</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-region/interlake/' ) ); ?>">Interlake Region</a></li>
			</ul>
		</div>

		<!-- Section 3: Experience Categories -->
		<div class="sitemap-card">
			<div class="sitemap-card__header">
				<span class="sitemap-card__badge">Categories</span>
				<h2 class="sitemap-card__title">Explore by Category</h2>
			</div>
			<ul class="sitemap-list">
				<li><a href="<?php echo esc_url( home_url( '/operator-category/accommodation/' ) ); ?>">Accommodation &amp; Lodges</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/culinary/' ) ); ?>">Culinary &amp; Dining</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/tour-and-related-services/' ) ); ?>">Guided Tours &amp; Excursions</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/workshops-art-culture/' ) ); ?>">Workshops, Art &amp; Culture</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/outdoors-and-adventures/' ) ); ?>">Outdoors &amp; Wilderness Adventures</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/attractions/' ) ); ?>">Heritage Attractions &amp; Museums</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/events/' ) ); ?>">Cultural Events &amp; Gatherings</a></li>
				<li><a href="<?php echo esc_url( home_url( '/operator-category/retail-and-other/' ) ); ?>">Retail &amp; Authentic Crafts</a></li>
			</ul>
		</div>

		<!-- Section 4: Guide Training Program -->
		<div class="sitemap-card">
			<div class="sitemap-card__header">
				<span class="sitemap-card__badge">Training</span>
				<h2 class="sitemap-card__title">Indigenous Guide Training</h2>
			</div>
			<ul class="sitemap-list">
				<li><a href="<?php echo esc_url( home_url( '/guide-training-program/' ) ); ?>">Program Overview &amp; Hub</a></li>
				<li><a href="<?php echo esc_url( home_url( '/indigenous-guide-training-program-step-1/' ) ); ?>">Step 1: Foundational Training</a></li>
				<li><a href="<?php echo esc_url( home_url( '/indigenous-guide-training-program-step-2/' ) ); ?>">Step 2: Practical Field Skills</a></li>
				<li><a href="<?php echo esc_url( home_url( '/indigenous-guide-training-program-step-3/' ) ); ?>">Step 3: Certification &amp; Workplace Placement</a></li>
				<li><a href="<?php echo esc_url( home_url( '/indigenous-guide-training-program-more-learning-opportunities/' ) ); ?>">More Learning Opportunities</a></li>
				<li><a href="<?php echo esc_url( home_url( '/itm-indigenous-guide-training-program-inquiry-form/' ) ); ?>">Program Inquiry &amp; Application Form</a></li>
			</ul>
		</div>

		<!-- Section 5: Organization & Leadership -->
		<div class="sitemap-card">
			<div class="sitemap-card__header">
				<span class="sitemap-card__badge">About ITM</span>
				<h2 class="sitemap-card__title">About &amp; Governance</h2>
			</div>
			<ul class="sitemap-list">
				<li><a href="<?php echo esc_url( home_url( '/about-itm/' ) ); ?>">Who We Are &amp; Strategic Vision</a></li>
				<li><a href="<?php echo esc_url( home_url( '/reconciliation/' ) ); ?>">Reconciliation &amp; Protocol</a></li>
				<li><a href="<?php echo esc_url( home_url( '/our-team/' ) ); ?>">Leadership Team &amp; Staff</a></li>
				<li><a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>">Contact Us</a></li>
				<li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a></li>
			</ul>
		</div>

		<!-- Section 6: Membership & Industry Support -->
		<div class="sitemap-card">
			<div class="sitemap-card__header">
				<span class="sitemap-card__badge">Industry</span>
				<h2 class="sitemap-card__title">Membership &amp; Business</h2>
			</div>
			<ul class="sitemap-list">
				<li><a href="<?php echo esc_url( home_url( '/become-a-member/' ) ); ?>">Become a Member</a></li>
				<li><a href="<?php echo esc_url( home_url( '/member-benefits/' ) ); ?>">Member Benefits &amp; Resources</a></li>
				<li><a href="<?php echo esc_url( home_url( '/new-account-request/' ) ); ?>">New Account Request</a></li>
			</ul>
		</div>
	</div>
</div>

<?php
get_footer();
