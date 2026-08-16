<?php
/**
 * Milestone 2 — 15 Target WordPress Pages Modernization & Block Migration
 *
 * Replaces legacy third-party plugin blocks (kadence/*, acf/*, getwid/*)
 * with native WordPress Core blocks and theme relish/* blocks.
 *
 * @package itm_indigpro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ITM_M2_Pages_Migration {

	const MIGRATION_VERSION = '2.2.0';

	public static function init() {
		add_action( 'init', [ __CLASS__, 'maybe_run_migration' ], 20 );
		add_action( 'admin_init', [ __CLASS__, 'maybe_run_migration' ], 20 );
	}

	public static function maybe_run_migration() {
		$current_ver = get_option( 'itm_m2_migration_version' );
		$force       = isset( $_GET['force_m2_migration'] ) && '1' === $_GET['force_m2_migration'];

		if ( $force || $current_ver !== self::MIGRATION_VERSION ) {
			self::run_migration();
		}
	}

	public static function get_pages_content() {
		return [
			// 0. Home Page (Page ID 2)
			2 => [
				'title' => 'Home',
				'slug'  => 'home',
				'content' => '<!-- wp:relish/hero-block {"backgroundImage":{"id":3016,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2026/06/whiteshell-petroforms-resized.jpg"},"showHoopOverlay":true,"overlayOpacity":25,"minHeight":70,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Welcome to Indigenous Tourism Manitoba</h1>
<!-- /wp:heading -->
<!-- /wp:relish/hero-block -->

<!-- wp:relish/featured-operators-block {"title":"Discover Authentic Experiences","showViewAll":true,"viewAllText":"View All","viewAllUrl":"/operators/","numberOfPosts":4,"orderBy":"rand","backgroundColor":"off-white"} /-->

<!-- wp:relish/banner-block {"backgroundImage":{"id":2716,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2025/05/4-1.png","alt":"Teaching others to bead"},"title":"Experience Manitoba\'s Indigenous Culture"} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<div class="mvo-section alignwide">
<div class="mvo-card">
<div class="mvo-card-label"><span class="mvo-card-dash"></span><h2 class="mvo-card-heading">Mission</h2></div>
<div class="mvo-card-body"><p>Empowering Indigenous voices to share their stories for the advancement and benefit of Indigenous people and the growth of Manitoba\'s tourism industry.</p></div>
</div>
<div class="mvo-card">
<div class="mvo-card-label"><span class="mvo-card-dash"></span><h2 class="mvo-card-heading">Vision</h2></div>
<div class="mvo-card-body"><p>A prosperous Indigenous tourism industry across Manitoba, providing authentic, unique and engaging experiences.</p></div>
</div>
<div class="mvo-card">
<div class="mvo-card-label"><span class="mvo-card-dash"></span><h2 class="mvo-card-heading">Outlook</h2></div>
<div class="mvo-card-body"><p>With eagerness, we look forward to working closely with our members, stakeholders, and partners to overcome challenges and celebrate successes.</p></div>
</div>
</div>

<div class="outlook-highlight alignwide">
<p class="outlook-highlight-text">In the coming year, we aim to increase our membership and offer tailored support, training, and education to help our members revitalize or rebuild their businesses. This will be achieved through partnerships and securing funding from both federal and provincial governments to sustain and enhance our support for our members.</p>
<div class="outlook-highlight-images">
<figure class="wp-block-image size-full"><img src="/wp-content/uploads/2024/12/Group-4.png" alt="" class="wp-image-2201"/></figure>
<figure class="wp-block-image size-full"><img src="/wp-content/uploads/2024/12/Group-5.png" alt="" class="wp-image-2202"/></figure>
</div>
</div>
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"page-section video-feature-section","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section video-feature-section has-off-white-background-color has-background">
<!-- wp:heading {"level":2,"className":"section-heading text-center"} -->
<h2 class="wp-block-heading section-heading text-center">The History of Indigenous Tourism Manitoba</h2>
<!-- /wp:heading -->
<!-- wp:relish/video-popup-block {"videoUrl":"https://youtu.be/fIRzNja1yPo?si=TIcVr_vqTm-9nLvH","title":"The History of Indigenous Tourism Manitoba","caption":"A journey through Indigenous cultural heritage and tourism growth.","overlayColor":"#000000","overlayOpacity":25,"playButtonColor":"#e0ac0f","aspectRatio":"16-9"} /-->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"page-section cta-section text-center","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section cta-section text-center">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Indigenous Tourism Manitoba Membership</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Indigenous Tourism Manitoba provides access to invaluable marketing, sales, and business development programs that build capacity to produce high quality tourism products and services. ITM is well aligned and positioned to support Indigenous communities and entrepreneurs in all stages of business development.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/become-a-member/">Become a Member</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/member-benefits/">Member Benefits</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->',
			],

			// 1. About ITM (Page ID 22)
			22 => [
				'title' => 'About Indigenous Tourism Manitoba',
				'slug'  => 'about-itm',
				'content' => '<!-- wp:relish/hero-block {"backgroundImage":{"id":422,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/10/about-itm.jpg"},"showHoopOverlay":true,"overlayOpacity":25,"minHeight":60,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">About Indigenous Tourism Manitoba</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Growing, supporting, and promoting authentic Indigenous tourism in Manitoba.</p>
<!-- /wp:paragraph -->
<!-- /wp:relish/hero-block -->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2,"className":"section-heading"} -->
<h2 class="wp-block-heading section-heading">Our Purpose &amp; Vision</h2>
<!-- /wp:heading -->

<!-- wp:columns {"className":"about-pillars-grid"} -->
<div class="wp-block-columns about-pillars-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Vision</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>To establish Manitoba as a premier destination for authentic, high-quality, and transformative Indigenous tourism experiences that honour our traditions, people, and lands.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Mission</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>To unite, support, and champion Indigenous tourism operators across Manitoba through marketing, capacity building, advocacy, and strategic partnerships.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"page-section video-feature-section","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section video-feature-section has-off-white-background-color has-background">
<!-- wp:heading {"level":2,"className":"section-heading text-center"} -->
<h2 class="wp-block-heading section-heading text-center">Building the Brand</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"section-subheading text-center"} -->
<p class="section-subheading text-center">Discover how Indigenous Tourism Manitoba is expanding economic opportunities and celebrating cultural storytelling across our province.</p>
<!-- /wp:paragraph -->

<!-- wp:relish/video-popup-block {"videoUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","title":"Building the Brand","caption":"Discover how Indigenous Tourism Manitoba is expanding opportunities.","overlayColor":"#000000","overlayOpacity":25,"playButtonColor":"#e0ac0f","aspectRatio":"16-9"} /-->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"page-section cta-section text-center","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section cta-section text-center">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Join the Indigenous Tourism Movement</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Connect with our growing network of First Nations, Métis, and Inuit operators, partners, and cultural ambassadors.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/become-a-member/">Become a Member</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/operators/">Explore Operators</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->',
			],

			// 2. Reconciliation (Page ID 283)
			283 => [
				'title' => 'Reconciliation',
				'slug'  => 'reconciliation',
				'content' => '<!-- wp:relish/hero-block {"backgroundImage":{"id":287,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/10/IMG_7169-scaled.jpg"},"showHoopOverlay":true,"overlayOpacity":30,"minHeight":60,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Reconciliation &amp; Cultural Safety</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Commitment to Truth, Healing, and Meaningful Economic Partnership.</p>
<!-- /wp:paragraph -->
<!-- /wp:relish/hero-block -->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Our Commitment to Truth &amp; Reconciliation</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Indigenous Tourism Manitoba is committed to advancing the Truth and Reconciliation Commission of Canada’s Calls to Action, particularly Call to Action 92 for the corporate sector. We believe that authentic tourism provides a powerful vehicle for cultural preservation, education, and sustainable economic self-determination for Indigenous communities.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"reconciliation-pillars-grid"} -->
<div class="wp-block-columns reconciliation-pillars-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Guiding Principles</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We center Indigenous voices, cultural sovereignty, and authentic community partnerships in all our tourism initiatives:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Respect for Indigenous sovereignty and intellectual property</li>
<li>Authentic representation of diverse First Nations, Inuit, and Métis cultures</li>
<li>Community-led and community-approved tourism development</li>
<li>Environmental stewardship and respect for traditional lands</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Action &amp; Advocacy</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Through education, marketing, and business support, we bridge understanding between visitors and Indigenous hosts:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Cultural awareness and cultural safety training for tourism operators</li>
<li>Equitable economic development and entrepreneurship support</li>
<li>Direct funding assistance and capacity-building workshops</li>
<li>Partnerships with provincial and national tourism organizations</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"reconciliation-cta-box","layout":{"type":"constrained"}} -->
<div class="wp-block-group reconciliation-cta-box">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Learn More &amp; Connect</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Discover how our member operators and partners are leading authentic cultural tourism across Manitoba.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/operators/">Explore Operators</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/contact-us/">Contact Us</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 3. Things To Do (Page ID 463)
			463 => [
				'title' => 'Things To Do',
				'slug'  => 'things-to-do',
				'content' => '<!-- wp:relish/hero-block {"backgroundImage":{"id":467,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/10/LP-Powwow-221.jpg"},"showHoopOverlay":true,"overlayOpacity":25,"overlayColor":"#000000","minHeight":60,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Things To Do</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Immerse yourself in authentic Indigenous experiences across Manitoba.</p>
<!-- /wp:paragraph -->
<!-- /wp:relish/hero-block -->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Explore Authentic Indigenous Experiences</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>From immersive cultural teachings and guided wilderness adventures to culinary journeys and community gatherings, discover the rich tapestry of Indigenous experiences waiting for you in Manitoba.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"experiences-card-grid"} -->
<div class="wp-block-columns experiences-card-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"experience-card"} -->
<div class="wp-block-group experience-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Culture &amp; Heritage</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Connect with traditional knowledge keepers, participate in craft workshops, and hear authentic stories handed down through generations.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/operators/">View Cultural Operators</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"experience-card"} -->
<div class="wp-block-group experience-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Outdoor &amp; Nature</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Experience guided canoeing, fishing, dog sledding, and hiking across Manitoba’s breathtaking boreal forests and pristine waterways.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/operators/">View Outdoor Operators</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"experience-card"} -->
<div class="wp-block-group experience-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Culinary Traditions</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Savour traditional Indigenous foods, forage for native botanicals, and experience culinary events that honour the bounty of the land.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/operators/">Explore Culinary</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"page-section map-cta-section text-center","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section map-cta-section text-center has-off-white-background-color has-background">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Interactive Experience Map</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Find operators, cultural destinations, and authentic adventures across Northern, Central, and Southern Manitoba.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/experience-map/">Launch Experience Map</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 4. Our Team (Page ID 435)
			435 => [
				'title' => 'Our Team',
				'slug'  => 'our-team',
				'content' => '<!-- wp:relish/banner-block {"title":"Our Team","description":"Meet the dedicated leaders and advocates behind Indigenous Tourism Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content section-team-members","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content section-team-members">
<!-- wp:heading {"level":2,"className":"text-center"} -->
<h2 class="wp-block-heading text-center">Leadership &amp; Staff</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-center"} -->
<p class="text-center">Our team brings together passionate leaders in tourism development, cultural education, marketing, and community advocacy.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"team-grid-container"} -->
<div class="wp-block-columns team-grid-container">
<!-- wp:column {"className":"team-member-col"} -->
<div class="wp-block-column team-member-col">
<!-- wp:group {"className":"team-member-card text-center"} -->
<div class="wp-block-group team-member-card text-center">
<div class="img-circular-wrap">
<img src="/wp-content/themes/kiwatinook/screenshot.png" alt="Executive Director" class="img-circular team-photo" />
</div>
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Executive Leadership</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"team-member-role"} -->
<p class="team-member-role">Executive Director</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Guiding ITM’s strategic vision, partnerships, and advocacy for Indigenous tourism operators throughout Manitoba.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column {"className":"team-member-col"} -->
<div class="wp-block-column team-member-col">
<!-- wp:group {"className":"team-member-card text-center"} -->
<div class="wp-block-group team-member-card text-center">
<div class="img-circular-wrap">
<img src="/wp-content/themes/kiwatinook/screenshot.png" alt="Marketing Manager" class="img-circular team-photo" />
</div>
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Marketing &amp; Communications</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"team-member-role"} -->
<p class="team-member-role">Marketing Manager</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Promoting Manitoba’s authentic Indigenous experiences to provincial, national, and international travelers.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column {"className":"team-member-col"} -->
<div class="wp-block-column team-member-col">
<!-- wp:group {"className":"team-member-card text-center"} -->
<div class="wp-block-group team-member-card text-center">
<div class="img-circular-wrap">
<img src="/wp-content/themes/kiwatinook/screenshot.png" alt="Program Coordinator" class="img-circular team-photo" />
</div>
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Training &amp; Development</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"team-member-role"} -->
<p class="team-member-role">Program Coordinator</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Delivering operator capacity training, guide certification, and cultural safety workshops across communities.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"page-section board-section text-center","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section board-section text-center has-off-white-background-color has-background">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Board of Directors</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Guided by Indigenous leaders representing First Nations, Métis, and Inuit communities from every region of Manitoba.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/contact-us/">Contact Our Team</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 5. Become a Member (Page ID 2367)
			2367 => [
				'title' => 'Become a Member',
				'slug'  => 'become-a-member',
				'content' => '<!-- wp:relish/banner-block {"title":"Become a Member","description":"Join Indigenous Tourism Manitoba to grow your business, access training, and connect with a thriving network.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Why Join Indigenous Tourism Manitoba?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Whether you are an established operator, an emerging cultural business, or a supporting partner organization, ITM membership offers dedicated advocacy, marketing reach, and business development support.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"membership-tiers-grid"} -->
<div class="wp-block-columns membership-tiers-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Indigenous Tourism Operator</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>For majority-owned Indigenous tourism businesses operating in Manitoba offering experiences, accommodation, arts, or food services.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Featured listing on the official ITM directory and map</li>
<li>Priority access to marketing campaigns and trade shows</li>
<li>Direct grant and financial assistance support</li>
</ul>
<!-- /wp:list -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/new-account-request/">Apply as Operator</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Associate Member</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>For non-Indigenous tourism businesses, regional tourism associations, and industry allies committed to supporting Indigenous tourism.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Networking and reconciliation partnership opportunities</li>
<li>Access to cultural awareness workshops</li>
<li>Industry updates and collaborative campaign participation</li>
</ul>
<!-- /wp:list -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/new-account-request/">Apply as Associate</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"page-section cta-section text-center","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section cta-section text-center has-off-white-background-color has-background">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Explore All Membership Advantages</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Discover marketing exposure, training programs, and grant assistance available to our members.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/member-benefits/">View Member Benefits</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 6. Member Benefits (Page ID 2373)
			2373 => [
				'title' => 'Member Benefits',
				'slug'  => 'member-benefits',
				'content' => '<!-- wp:relish/banner-block {"title":"Member Benefits","description":"Explore the advantages of partnering with Indigenous Tourism Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What ITM Membership Delivers</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our comprehensive membership program is designed to empower Indigenous operators at every stage of their business journey.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"benefit-card-container"} -->
<div class="wp-block-columns benefit-card-container">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Marketing &amp; Promotion</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Featured listings on our website, inclusion in provincial travel guides, social media spotlights, and international trade show representation.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Training &amp; Certification</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Access to the Indigenous Guide Training Program, hospitality excellence workshops, and digital marketing bootcamps.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:columns {"className":"benefit-card-container"} -->
<div class="wp-block-columns benefit-card-container">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Funding &amp; Grants</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Direct guidance for accessing provincial and federal tourism recovery funds, development grants, and micro-loan programs.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Advocacy &amp; Community</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A unified voice representing Indigenous tourism interests with government bodies, Destination Canada, and Travel Manitoba.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"page-section cta-section text-center","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section cta-section text-center has-off-white-background-color has-background">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Ready to Join Our Community?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Take the next step in elevating your tourism business.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/become-a-member/">Become a Member</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/new-account-request/">New Account Request</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 7. Contact Us (Page ID 605)
			605 => [
				'title' => 'Contact Us',
				'slug'  => 'contact-us',
				'content' => '<!-- wp:relish/banner-block {"title":"Contact Us","description":"Connect with the Indigenous Tourism Manitoba team.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:columns {"className":"contact-section-grid"} -->
<div class="wp-block-columns contact-section-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Get in Touch</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We’d love to hear from you. Whether you have questions about membership, guide training, or visiting Manitoba’s Indigenous destinations, reach out to us today.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Contact Information</h3>
<!-- /wp:heading -->
<!-- wp:list {"className":"contact-details-list"} -->
<ul class="wp-block-list contact-details-list">
<li><strong>Location:</strong> Winnipeg, Manitoba, Canada</li>
<li><strong>Email:</strong> <a href="mailto:info@indigenoustourismmanitoba.ca">info@indigenoustourismmanitoba.ca</a></li>
<li><strong>Website:</strong> <a href="https://indigenoustourismmanitoba.ca">indigenoustourismmanitoba.ca</a></li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Office Hours</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Monday to Friday: 8:30 AM – 4:30 PM CST</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"contact-form-card"} -->
<div class="wp-block-group contact-form-card">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Send Us a Message</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Please send us an email directly at <a href="mailto:info@indigenoustourismmanitoba.ca">info@indigenoustourismmanitoba.ca</a> or connect with us on social media.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="mailto:info@indigenoustourismmanitoba.ca">Email info@indigenoustourismmanitoba.ca</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
			],

			// 8. Privacy Policy (Page ID 1769)
			1769 => [
				'title' => 'Privacy Policy',
				'slug'  => 'privacy-policy',
				'content' => '<!-- wp:group {"className":"page-section constrained-content-narrow","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content-narrow">
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Privacy Policy</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><em>Last updated: August 2026</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Indigenous Tourism Manitoba ("ITM", "we", "our", "us") is dedicated to protecting the privacy and confidentiality of personal information collected through our website, membership portals, and communications channels.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">1. Information We Collect</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We may collect information you provide directly to us when filling out membership applications, training inquiries, or contact forms:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Contact information (such as name, email address, phone number, and mailing address)</li>
<li>Business and organization details for operator directory listings</li>
<li>Communication records and inquiry correspondence</li>
<li>Technical usage data (such as IP address, browser type, and navigation paths for site analytics)</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">2. How We Use Information</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We use collected information solely to provide, maintain, and improve our services, including:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Publishing operator directory listings on our website and marketing materials</li>
<li>Administering membership applications, renewals, and member-only services</li>
<li>Coordinating and delivering the Indigenous Guide Training Program</li>
<li>Responding to inquiries and sending authorized newsletters and event updates</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">3. Information Sharing &amp; Disclosure</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We do not sell, rent, or trade your personal information. Information is only disclosed to trusted third-party service providers (such as hosting, email delivery, and mapping services) under strict confidentiality agreements to facilitate our operations.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">4. Contact &amp; Questions</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>If you have questions regarding this Privacy Policy or wish to access or update your information, please contact us at <a href="mailto:info@indigenoustourismmanitoba.ca">info@indigenoustourismmanitoba.ca</a>.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->',
			],

			// 9. New Account Request (Page ID 1518)
			1518 => [
				'title' => 'New Account Request',
				'slug'  => 'new-account-request',
				'content' => '<!-- wp:relish/banner-block {"title":"New Account Request","description":"Submit your operator or member account application.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content-narrow","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content-narrow">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Request an Operator or Member Account</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>If you are an Indigenous tourism operator in Manitoba looking to manage your directory listing, update photos, or access member-only resources, please submit your account request below.</p>
<!-- /wp:paragraph -->

<!-- wp:group {"className":"account-request-box"} -->
<div class="wp-block-group account-request-box">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">How to Submit</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Please provide your business name, primary contact person, email address, and community affiliation by emailing our membership team directly at <a href="mailto:info@indigenoustourismmanitoba.ca">info@indigenoustourismmanitoba.ca</a>.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Our team will review your application and provide your login credentials within two business days.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="mailto:info@indigenoustourismmanitoba.ca?subject=New%20Account%20Request">Email Membership Team</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/member-benefits/">Explore Member Benefits</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 10. ITM Indigenous Guide Training Program Inquiry Form (Page ID 2572)
			2572 => [
				'title' => 'ITM Indigenous Guide Training Program Inquiry Form',
				'slug'  => 'itm-indigenous-guide-training-program-inquiry-form',
				'content' => '<!-- wp:relish/banner-block {"title":"Guide Training Program Inquiry","description":"Take the first step towards becoming a certified Indigenous guide.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content-narrow","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content-narrow">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Program Inquiry &amp; Expression of Interest</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Thank you for your interest in the Indigenous Guide Training Program. Please review the program details and connect with our training team to request upcoming course schedules or inquire about community sponsorship.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"inquiry-info-grid"} -->
<div class="wp-block-columns inquiry-info-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Program Pathways</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul class="wp-block-list">
<li><strong>Step 1:</strong> Introduction to Indigenous Guiding</li>
<li><strong>Step 2:</strong> 7-Day Intensive Field Course</li>
<li><strong>Step 3:</strong> Mentored Operator Practicum</li>
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>Funding support and travel subsidies may be available for eligible participants from Manitoba First Nations, Métis, and Inuit communities.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"inquiry-contact-card"} -->
<div class="wp-block-group inquiry-contact-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Contact Training Team</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>To register or submit your expression of interest, email us directly with your name, community, and guiding interests.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="mailto:info@indigenoustourismmanitoba.ca?subject=Guide%20Training%20Program%20Inquiry">Email Training Team</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/guide-training-program/">Back to Training Hub</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
			],

			// 11. Indigenous Guide Training Program (Hub) (Page ID 2734)
			2734 => [
				'title' => 'Indigenous Guide Training Program',
				'slug'  => 'guide-training-program',
				'content' => '<!-- wp:relish/banner-block {"title":"Indigenous Guide Training Program","description":"Empowering Indigenous storytellers, cultural ambassadors, and wilderness guides across Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2,"className":"text-center"} -->
<h2 class="wp-block-heading text-center">A Three-Step Pathway to Professional Guiding</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-center"} -->
<p class="text-center">The ITM Indigenous Guide Training Program provides culturally grounded, industry-certified education for individuals aspiring to lead authentic tourism experiences across Manitoba.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"program-pathway-grid"} -->
<div class="wp-block-columns program-pathway-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"program-step-card"} -->
<div class="wp-block-group program-step-card">
<div class="step-badge">Step 1</div>
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Introduction</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Orientation to Indigenous tourism fundamentals, cultural protocols, and foundational storytelling skills.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-1/">Explore Step 1</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"program-step-card"} -->
<div class="wp-block-group program-step-card">
<div class="step-badge">Step 2</div>
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">7-Day Training</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Intensive hands-on field training, wilderness safety, first aid certification, and group dynamics.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-2/">Explore Step 2</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"program-step-card"} -->
<div class="wp-block-group program-step-card">
<div class="step-badge">Step 3</div>
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Practicum</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Mentored workplace placement with certified Indigenous tourism operators in Manitoba.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-3/">Explore Step 3</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"page-section cta-section text-center","backgroundColor":"off-white","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group page-section cta-section text-center has-off-white-background-color has-background">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Additional Learning Opportunities</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Expand your qualifications with specialized workshops in digital marketing, hospitality, and business planning.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-more-learning-opportunities/">More Opportunities</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/itm-indigenous-guide-training-program-inquiry-form/">Inquire Now</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 12. Guide Training — Step 1 (Page ID 2534)
			2534 => [
				'title' => 'Indigenous Guide Training Program - Introduction',
				'slug'  => 'indigenous-guide-training-program-step-1',
				'content' => '<!-- wp:relish/banner-block {"title":"Step 1: Introduction","description":"Foundational orientation for prospective Indigenous guides in Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:columns {"className":"step-details-grid"} -->
<div class="wp-block-columns step-details-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Course Curriculum</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Step 1 introduces participants to the core tenets of Indigenous tourism, ethics, and professional communication:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Introduction to Manitoba’s Indigenous tourism landscape</li>
<li>Cultural intellectual property and storytelling protocols</li>
<li>Customer service excellence and hospitality standards</li>
<li>Risk management fundamentals and emergency awareness</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Eligibility &amp; Prerequisites</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Open to Indigenous individuals (First Nations, Métis, Inuit) residing in Manitoba who are passionate about sharing their culture and heritage:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Minimum 18 years of age</li>
<li>Interest in outdoor, cultural, or adventure tourism</li>
<li>Commitment to completing training modules</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"step-nav-bar text-center"} -->
<div class="wp-block-group step-nav-bar text-center">
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--outline"} -->
<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/guide-training-program/">← Back to Program Hub</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-2/">Next: Step 2 — 7-Day Training →</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 13. Guide Training — Step 2 (Page ID 2537)
			2537 => [
				'title' => 'Indigenous Guide Training Program - 7-Day Training Course',
				'slug'  => 'indigenous-guide-training-program-step-2',
				'content' => '<!-- wp:relish/banner-block {"title":"Step 2: 7-Day Training Course","description":"Intensive hands-on field training, wilderness safety, and cultural storytelling.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:columns {"className":"step-details-grid"} -->
<div class="wp-block-columns step-details-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Field Training Modules</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>An immersive 7-day experiential learning program hosted at premier wilderness and cultural locations in Manitoba:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>On-the-land navigation and wilderness travel techniques</li>
<li>Interpretive guiding techniques and campfire storytelling</li>
<li>Group dynamics, leadership, and crisis management</li>
<li>Elder teachings on traditional land stewardship</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Industry Certifications</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Participants graduate with recognized safety and tourism certifications essential for commercial guiding:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Wilderness &amp; Remote First Aid + CPR</li>
<li>Food Handler safety certification</li>
<li>Leave No Trace ethical outdoor principles</li>
<li>ITM Guide Certificate of Completion</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"step-nav-bar text-center"} -->
<div class="wp-block-group step-nav-bar text-center">
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--outline"} -->
<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-1/">← Step 1: Introduction</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-3/">Next: Step 3 — Practicum →</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 14. Guide Training — Step 3 (Page ID 2542)
			2542 => [
				'title' => 'Indigenous Guide Training Program - Practicum',
				'slug'  => 'indigenous-guide-training-program-step-3',
				'content' => '<!-- wp:relish/banner-block {"title":"Step 3: Practicum","description":"Mentored field placement with licensed Indigenous tourism operators in Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1140px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:columns {"className":"step-details-grid"} -->
<div class="wp-block-columns step-details-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Workplace Mentorship</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Step 3 connects graduates with established Indigenous tourism businesses for real-world guiding experience:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>40 to 80 hours of mentored field guiding</li>
<li>Direct co-guiding with senior Indigenous tour leaders</li>
<li>Customer feedback and performance evaluations</li>
<li>Practical tour staging, safety, and logistics experience</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Career Pathways</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Completing the practicum qualifies guides for direct employment or entrepreneurial launch:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul class="wp-block-list">
<li>Employment referrals across the ITM operator network</li>
<li>Profile featured in the ITM Certified Guides Registry</li>
<li>Business startup mentorship for independent operators</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"step-nav-bar text-center"} -->
<div class="wp-block-group step-nav-bar text-center">
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--outline"} -->
<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-2/">← Step 2: 7-Day Training</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/itm-indigenous-guide-training-program-inquiry-form/">Inquire / Apply for Practicum</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],

			// 15. More Learning Opportunities (Page ID 2676)
			2676 => [
				'title' => 'Indigenous Guide Training Program - More Learning Opportunities',
				'slug'  => 'indigenous-guide-training-program-more-learning-opportunities',
				'content' => '<!-- wp:relish/banner-block {"title":"More Learning Opportunities","description":"Additional certifications, workshops, and advanced hospitality training.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:group {"className":"page-section constrained-content","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group page-section constrained-content">
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Continuous Professional Growth</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>In addition to our core guide training program, ITM offers specialized workshops and seasonal training opportunities throughout the year.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"learning-opportunities-grid"} -->
<div class="wp-block-columns learning-opportunities-grid">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Digital Marketing &amp; Storytelling</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Master smartphone photography, video storytelling, and social media marketing to promote your tours and attract travelers.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/contact-us/">Inquire About Dates</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Tourism Business Planning</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Learn pricing, insurance, packaging, and bookkeeping essentials to scale your cultural tourism business.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/contact-us/">Inquire About Dates</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"benefit-card"} -->
<div class="wp-block-group benefit-card">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Wilderness Survival &amp; Safety</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Advanced seasonal safety courses for winter guiding, water safety, and remote backcountry navigation.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary btn--sm"} -->
<div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/contact-us/">Inquire About Dates</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

<!-- wp:group {"className":"page-section cta-section text-center","layout":{"type":"constrained"}} -->
<div class="wp-block-group page-section cta-section text-center">
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--gold"} -->
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/guide-training-program/">← Back to Guide Training Hub</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->',
			],
		];
	}

	public static function run_migration() {
		global $wpdb;

		$pages_data = self::get_pages_content();
		$updated_count = 0;
		$log = [];

		foreach ( $pages_data as $id => $data ) {
			// Find post by ID or slug
			$post = get_post( $id );
			if ( ! $post || 'page' !== $post->post_type ) {
				$post_by_slug = get_page_by_path( $data['slug'] );
				if ( $post_by_slug ) {
					$post = $post_by_slug;
					$id   = $post->ID;
				}
			}

			if ( $post ) {
				$wpdb->update(
					$wpdb->posts,
					[
						'post_content' => $data['content'],
						'post_title'   => $data['title'],
					],
					[ 'ID' => $id ],
					[ '%s', '%s' ],
					[ '%d' ]
				);
				clean_post_cache( $id );
				$updated_count++;
				$log[] = "Updated Page ID {$id} ({$data['slug']}) with modernized Gutenberg block content.";
			} else {
				$log[] = "Warning: Page ID {$id} ({$data['slug']}) not found in database.";
			}
		}

		update_option( 'itm_m2_migration_version', self::MIGRATION_VERSION );

		// Flush rewrites & transients
		if ( function_exists( 'flush_rewrite_rules' ) ) {
			flush_rewrite_rules( false );
		}

		$output_path = get_template_directory() . '/.agents/worker_m2/migration_result.json';
		$result = [
			'status'        => 'SUCCESS',
			'version'       => self::MIGRATION_VERSION,
			'timestamp'     => current_time( 'mysql' ),
			'pages_updated' => $updated_count,
			'log'           => $log,
		];

		@file_put_contents( $output_path, json_encode( $result, JSON_PRETTY_PRINT ) );
	}
}

ITM_M2_Pages_Migration::init();
