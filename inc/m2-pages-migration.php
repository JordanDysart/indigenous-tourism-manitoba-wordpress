<?php
/**
 * Milestone 2 — 15 Target WordPress Pages Modernization & Block Migration
 *
 * Replaces legacy third-party plugin blocks (kadence/*, acf/*, getwid/*)
 * with native WordPress Core blocks and theme relish/* blocks.
 *
 * @package kiwatinook
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ITM_M2_Pages_Migration {

	const MIGRATION_VERSION = '2.11.0';

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
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":3016,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2026/06/whiteshell-petroforms-resized.jpg"},"showHoopOverlay":true,"overlayOpacity":25,"minHeight":70,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Welcome to Indigenous Tourism Manitoba</h1>
<!-- /wp:heading -->
<!-- /wp:midflight/hero-block -->

<!-- wp:midflight/featured-operators-block {"title":"Discover Authentic Experiences","showViewAll":true,"viewAllText":"View All","viewAllUrl":"/operators/","numberOfPosts":4,"orderBy":"rand","backgroundColor":"off-white"} /-->

<!-- wp:html -->
<div class="page-section culture-feature-section constrained-content">
<div class="culture-feature-grid">
<div class="culture-text-col">
<span class="culture-badge">Authentic Hospitality &amp; Living Culture</span>
<h2 class="culture-title">Experience Manitoba\'s Indigenous Culture</h2>
<p class="culture-lead">Immerse yourself in authentic Indigenous hospitality, where traditions are shared with open hearts and every encounter creates lasting understanding.</p>
<p class="culture-body">From sacred petroform teachings and traditional birchbark craft workshops to fireside storytelling and culinary journeys featuring regional botanicals, our Indigenous operators invite you to experience Manitoba through living heritage and ancestral wisdom.</p>
<div class="wp-block-buttons">
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/things-to-do/">Explore Experiences</a></div>
<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/experience-map/">View Experience Map</a></div>
</div>
</div>
<div class="culture-image-col">
<div class="culture-image-card">
<img src="https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2025/05/4-1.png" alt="Teaching others traditional craft and hospitality" class="wp-image-2716" />
</div>
</div>
</div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="page-section constrained-content has-off-white-background-color has-background" style="padding:60px 20px;">
<div class="text-center" style="max-width:720px;margin:0 auto 30px auto;text-align:center;">
<span class="culture-badge" style="background:rgba(224,172,15,0.15);color:#9a6700;">Our Guiding Purpose</span>
<h2 class="wp-block-heading" style="font-size:clamp(1.9rem,3vw,2.4rem);margin-top:10px;">Advancing Indigenous Tourism Across Manitoba</h2>
</div>

<div class="mvo-pillar-grid">
<div class="mvo-pillar-card mvo-pillar-card--mission">
<div class="mvo-card-header">
<h3 class="mvo-card-title">Mission</h3>
<span class="mvo-card-badge">Empower</span>
</div>
<p class="mvo-card-body">Empowering Indigenous voices to share their stories for the advancement and benefit of Indigenous people and the growth of Manitoba\'s tourism industry.</p>
</div>

<div class="mvo-pillar-card mvo-pillar-card--vision">
<div class="mvo-card-header">
<h3 class="mvo-card-title">Vision</h3>
<span class="mvo-card-badge">Prosper</span>
</div>
<p class="mvo-card-body">A prosperous Indigenous tourism industry across Manitoba, providing authentic, unique and engaging experiences.</p>
</div>

<div class="mvo-pillar-card mvo-pillar-card--outlook">
<div class="mvo-card-header">
<h3 class="mvo-card-title">Outlook</h3>
<span class="mvo-card-badge">Collaborate</span>
</div>
<p class="mvo-card-body">With eagerness, we look forward to working closely with our members, stakeholders, and partners to overcome challenges and celebrate successes.</p>
</div>
</div>

<div class="outlook-highlight-card">
<p class="outlook-highlight-lead">In the coming year, we aim to increase our membership and offer tailored support, training, and education to help our members revitalize or rebuild their businesses. This will be achieved through partnerships and securing funding from both federal and provincial governments to sustain and enhance our support for our members.</p>
<div class="outlook-badges-grid">
<figure class="wp-block-image size-full"><img src="https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/12/Group-4.png" alt="Strategic Partnership Badge" class="wp-image-2201"/></figure>
<figure class="wp-block-image size-full"><img src="https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/12/Group-5.png" alt="Tourism Growth Badge" class="wp-image-2202"/></figure>
</div>
</div>
</div>
<!-- /wp:html -->

<!-- wp:html -->
<div class="page-section video-feature-section constrained-content" style="padding-bottom:10px;">
<div class="text-center" style="max-width:720px;margin:0 auto 20px auto;text-align:center;">
<span class="culture-badge">Featured Story</span>
<h2 class="wp-block-heading section-heading text-center" style="margin-top:10px;">The History of Indigenous Tourism Manitoba</h2>
</div>
</div>
<!-- /wp:html -->

<!-- wp:midflight/video-popup-block {"videoUrl":"https://youtu.be/fIRzNja1yPo?si=TIcVr_vqTm-9nLvH","posterImage":{"id":1099,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/11/Screenshot-2023-10-27-at-1.17.24-PM.png","alt":"The History of Indigenous Tourism Manitoba"},"title":"The History of Indigenous Tourism Manitoba","caption":"A journey through Indigenous cultural heritage, community leadership, and tourism growth.","overlayColor":"#000000","overlayOpacity":30,"playButtonColor":"#e0ac0f","aspectRatio":"16-9"} /-->

<!-- wp:html -->
<section class="membership-cta-section alignfull">
<div class="membership-cta-section__image-pane">
<img src="https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2025/05/CedarLakeRanch_ITACManitoba_PhotoByTaylorBurk_Print-7475-scaled.jpg" alt="Indigenous Tourism Manitoba Member" class="membership-cta-section__image" />
<div class="membership-cta-section__image-fade"></div>
</div>
<div class="membership-cta-section__container">
<div class="membership-cta-section__content">
<span class="membership-lead-tag">Building a Sustainable Future</span>
<h2 class="wp-block-heading membership-title">Indigenous Tourism Manitoba Membership</h2>
<p class="membership-desc">Indigenous Tourism Manitoba provides access to invaluable marketing, sales, and business development programs that build capacity to produce high-quality tourism products and services across Manitoba.</p>
<div class="wp-block-buttons">
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/become-a-member/">Become a Member</a></div>
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/member-benefits/">Member Benefits</a></div>
</div>
</div>
</div>
</section>
<!-- /wp:html -->',
			],

			// 1. About ITM (Page ID 22)
			22 => [
				'title' => 'About Indigenous Tourism Manitoba',
				'slug'  => 'about-itm',
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":422,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/10/about-itm.jpg"},"showHoopOverlay":true,"overlayOpacity":25,"minHeight":60,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">About Indigenous Tourism Manitoba</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Growing, supporting, and promoting authentic Indigenous tourism in Manitoba.</p>
<!-- /wp:paragraph -->
<!-- /wp:midflight/hero-block -->

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

<!-- wp:midflight/video-popup-block {"videoUrl":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","posterImage":{"id":1227,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/11/placeholderAboutVideo.png","alt":"Building the Brand"},"title":"Building the Brand","caption":"Discover how Indigenous Tourism Manitoba is expanding opportunities.","overlayColor":"#000000","overlayOpacity":25,"playButtonColor":"#e0ac0f","aspectRatio":"16-9"} /-->
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
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":283,"url":"/wp-content/uploads/2024/10/IMG_7169-scaled.jpg"},"showHoopOverlay":true,"overlayOpacity":30,"minHeight":50,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Reconciliation</h1>
<!-- /wp:heading -->
<!-- /wp:midflight/hero-block -->

<!-- wp:html -->
<section class="page-section constrained-content reconciliation-lead-section">
<p class="reconciliation-lead-text">As the country continues to mourn the children lost to residential schools, and struggles to find ways to support reconciliation, Indigenous tourism plays a vital role in education and sharing Indigenous culture. Experiencing Indigenous tourism firsthand is an important way for non-Indigenous Canadians to gain a new perspective. It helps them to connect to the lands, traditions, and Indigenous Peoples way of life and to better understand the history of Canada, while also having a positive impact on Indigenous economic growth. Investing in Indigenous tourism demonstrates reconciliation in action by creating and expanding tourism economic development projects with Indigenous nations, while supporting self-determination for Indigenous businesses.</p>
</section>
<!-- /wp:html -->

<!-- wp:midflight/banner-block {"title":"Join us as we honour those who came before us as we secure our future.","image":{"url":"/wp-content/uploads/2024/10/Cranberry-Portage-22_Credit-Travel-Manitoba-edited-scaled.jpg","alt":"Cranberry Portage"},"overlayColor":"#000000","overlayOpacity":20,"fontSize":2.4} /-->

<!-- wp:midflight/featured-operators-block {"title":"Discover Authentic Experiences","showViewAll":true,"viewAllText":"View All","viewAllUrl":"/operators/","numberOfPosts":4,"orderBy":"rand","backgroundColor":"off-white"} /-->

<!-- wp:html -->
<section class="page-section constrained-content reconciliation-authenticity-section">
<div class="text-center" style="max-width:860px;margin:0 auto 28px auto;text-align:center;">
<span class="culture-badge" style="background:rgba(224,172,15,0.15);color:#9a6700;">Living Heritage</span>
<h2 class="wp-block-heading" style="font-size:clamp(1.9rem,3vw,2.4rem);margin-top:10px;">Grounded in Cultural Authenticity</h2>
</div>

<div class="reconciliation-body-text" style="max-width:860px;margin:0 auto;">
<p>Our offerings are not just a window into Indigenous life, culture, and history &ndash; they are a direct connection to the people who have lived these traditions for generations. We believe in the power of firsthand experience, and that’s why our operators are the keepers of the culture, those who’ve embraced this way of life… the nation and its people.</p>
<p>We are part of a vast network of businesses, communities, organizations, corporations, governments, and groups, all with a common goal: to preserve and celebrate Indigenous heritage. We are committed to keeping these rich traditions alive and sharing them with the world.</p>
<p>Join us on this journey of cultural authenticity, where every moment is a celebration of the past, a vibrant expression of the present, and a promise to safeguard the future.</p>
</div>
</section>
<!-- /wp:html -->',
			],

			// 3. Things To Do (Page ID 463)
			463 => [
				'title' => 'Things To Do',
				'slug'  => 'things-to-do',
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":467,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2024/10/LP-Powwow-221.jpg"},"showHoopOverlay":true,"overlayOpacity":25,"overlayColor":"#000000","minHeight":60,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Things To Do</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Immerse yourself in authentic Indigenous experiences across Manitoba.</p>
<!-- /wp:paragraph -->
<!-- /wp:midflight/hero-block -->

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
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":435,"url":"/wp-content/uploads/2024/10/wood-itm-scaled.jpg"},"showHoopOverlay":true,"overlayOpacity":35,"minHeight":55,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Our Team</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Meet the dedicated leaders, staff, and advocates behind Indigenous Tourism Manitoba.</p>
<!-- /wp:paragraph -->
<!-- /wp:midflight/hero-block -->

<!-- wp:html -->
<section class="page-section constrained-content section-team-leadership">
<div class="text-center" style="max-width:760px;margin:0 auto 30px auto;text-align:center;">
<span class="culture-badge" style="background:rgba(224,172,15,0.15);color:#9a6700;">Leadership &amp; Operations</span>
<h2 class="wp-block-heading" style="font-size:clamp(1.9rem,3vw,2.4rem);margin-top:10px;margin-bottom:12px;">Staff &amp; Executive Leadership</h2>
<p style="font-size:1.05rem;color:#4b5563;line-height:1.6;">Our team brings together passionate leaders in tourism development, cultural education, financial governance, marketing, and community advocacy across Manitoba.</p>
</div>

<div class="team-grid-container">
<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/10/Holly-Spence-headshot-2025-300x206.jpg" alt="Holly Spence - CEO" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Holly Spence</h3>
<div class="team-member-role">CEO</div>
<div class="team-member-bio">
<p>Tasked with leading the growth and development of the Indigenous tourism industry in Manitoba and in collaboration with Travel Manitoba and Indigenous Tourism Association of Canada, Holly will lead efforts for implementation of the Manitoba Indigenous Tourism Strategy, which focuses on the development of sustainable market-ready and export-ready Indigenous tourism products, as well as increasing the demand for Manitoba’s Indigenous tourism experiences. Holly was born and raised in Peguis First Nation where she owned and operated multiple successful businesses. She understands the barriers and complexities of owning a business both on and off the reserve and brings that first-hand knowledge to tourism operators in Manitoba.</p>
<p>Through her previous work as the Manitoba Regional Coordinator at ITAC from 2019 to 2022, Holly guided many Indigenous entrepreneurs and community-owned tourism enterprises to strengthen their offerings into market and export-ready products. Holly’s connections and leadership within the region are proven and she is a true advocate for Indigenous tourism in Manitoba.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/11/Doreen-Booth-HS1-300x200.jpg" alt="Doreen Booth - ITM Project Manager" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Doreen Booth</h3>
<div class="team-member-role">ITM Project Manager</div>
<div class="team-member-bio">
<p>Doreen Booth joined ITM as a Project Manager. Having worked in the tourism industry for the past 16 years, she brings extensive knowledge and experience in program development, project management, and relationship building. As a passionate traveler and outdoor enthusiast who has experienced destinations all across Canada and abroad, Doreen believes that the connection to place, story, and people is what creates lasting memories. She is dedicated to supporting Manitoba operators and expanding authentic Indigenous cultural experiences throughout the province.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2026/03/Renee-Simcoe-headshot-2025-225x300.jpg" alt="Renée Simcoe - Marketing Manager" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Renée Simcoe</h3>
<div class="team-member-role">Marketing Manager</div>
<div class="team-member-bio">
<p>Renée’s professional background is eclectic, including 10 years in the agriculture industry across various levels of government, not-for-profit, and academic sectors with a focus in communications, event planning, and education. She brings a fresh perspective and enthusiasm to the ITM team and looks forward to supporting members with marketing and outreach initiatives.</p>
<p>Outside work— in the warmer months Renée enjoys foraging wild mushrooms, cycling, and hiking. In the winter, she spends her time reading, baking sourdough, and cross-country skiing.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2026/03/Cecilia-Point-headshot-2026-300x300.jpg" alt="Cecelia Point - Director of Finance" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Cecelia Point</h3>
<div class="team-member-role">Director of Finance</div>
<div class="team-member-bio">
<p>As the Director of Finance, Cecilia contributes to the overall success of Indigenous Tourism Manitoba by effectively managing the organization’s financial operations and providing strategic advice.</p>
<p>A member of the Musqueam Indian Band, Cecilia has worked in the travel and tourism industry in excess of 25 years. She holds a Bachelor of Arts in Political Science from the University of British Columbia, bringing deep financial stewardship, governance experience, and operational expertise.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2026/03/Taytum-Assinaboine-headshot-2025-264x300.jpg" alt="Taytum Assinaboine - Explore Indigenous Manager" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Taytum Assinaboine</h3>
<div class="team-member-role">Explore Indigenous Manager</div>
<div class="team-member-bio">
<p>Taytum Assiniboine is a proud Indigenous leader in Manitoba’s Tourism and Economic Development sector.</p>
<p>Through her work as Store Manager at Indigenous Tourism Manitoba and Board Director at SEED Winnipeg, she is passionate about creating spaces that uplift Indigenous artists, makers, and tourism operators, promoting economic reconciliation through authentic retail and cultural exchange.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/11/Outlook-0dql1hgw-225x300.jpg" alt="Darcie Guarderas - Director & Client Strategist" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Darcie Guarderas</h3>
<div class="team-member-role">Director & Client Strategist</div>
<div class="team-member-bio">
<p>A Manitoban at heart, Darcie graduated with honours in tourism and then travelled the world for 25 years as an award-winning tour director. With deep expertise across experiential travel, community partnerships, and destination marketing, Darcie works closely with ITM operators to strengthen business capacity, market readiness, and visitor engagement.</p>
</div>
</div>
</div>
</section>
<!-- /wp:html -->

<!-- wp:html -->
<section class="page-section constrained-content section-team-board has-off-white-background-color has-background" style="background-color:#faf9f6;padding:60px 20px;">
<div class="text-center" style="max-width:760px;margin:0 auto 30px auto;text-align:center;">
<span class="culture-badge" style="background:rgba(189,43,30,0.12);color:#9b1b10;">Governance &amp; Advocacy</span>
<h2 class="wp-block-heading" style="font-size:clamp(1.9rem,3vw,2.4rem);margin-top:10px;margin-bottom:12px;">Board of Directors</h2>
<p style="font-size:1.05rem;color:#4b5563;line-height:1.6;">Guided by Indigenous leaders representing First Nations, Métis, and Inuit communities, entrepreneurs, and operators from every region of Manitoba.</p>
</div>

<div class="team-grid-container">
<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/10/david-daley-652x652@2x-320x320-1-300x300.jpg" alt="Dave Daley - President" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Dave Daley</h3>
<div class="team-member-role">President</div>
<div class="team-member-bio">
<p>David Daley is a Métis man, and long-time resident of Churchill, Manitoba. David and his wife Valerie have worked hard to become a part of Churchill’s tourism industry including owning and operating the Wapusk General Store (hand-built by Dave) and Wapusk Adventures, an award winning Indigenous Tourism experience.</p>
<p>Dave served his community as the Chairman of the Churchill Métis Local, a previous President of the Churchill Chamber of Commerce, and Founder of the Hudson Bay Quest dog sled race. Dave also chaired the Manitoba Indigenous Tourism Advisory Committee and is now the Chair of Indigenous Tourism Manitoba and is a board member for the Indigenous Tourism Association of Canada as the Manitoba representative.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2026/03/Melanie-Gamache-headshot-2026-240x300.jpg" alt="Melanie Gamache - Vice President" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Melanie Gamache</h3>
<div class="team-member-role">Vice President</div>
<div class="team-member-bio">
<p>Melanie Gamache is the one woman show that created Borealis Beading. She is a francophone Red River Métis with a passion for sharing Métis history and culture through the art of beadwork. Her hands-on workshops immerse guests in the historic Métis floral beading traditions that earned the Métis the name \'The Flower Beadwork People\'.</p>
<p>As a board member, Melanie is committed to representing Indigenous tourism operators—especially small and rural businesses—and helping cultivate authentic, high-quality cultural experiences that respect and honour Indigenous traditions.</p>
<p>Melanie brings strong relationship-building skills and a broad network of partners, artists, and tourism stakeholders to her role as Vice President of ITM.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/11/lee_sinclair-300x271.jpg" alt="Lee Sinclair - Secretary / Treasurer" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Lee Sinclair</h3>
<div class="team-member-role">Secretary / Treasurer</div>
<div class="team-member-bio">
<p>Lee Sinclair is the Director of Operations for PBDC and oversees its portfolio of current businesses including Otineka Mall, Kikiwak Inn, and other commercial enterprises. A proud member of Opaskwayak Cree Nation, Lee has extensive experience in corporate governance, financial management, and economic development in northern Manitoba.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/11/ITM_4CP_DANCER-298x300.png" alt="Melanie Ferris - Director At Large" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Melanie Ferris</h3>
<div class="team-member-role">Director At Large</div>
<div class="team-member-bio">
<p>Melanie Ferris is a writer based in Winnipeg, Manitoba. She is a proud member of the Long Plain First Nation in Treaty One Territory.</p>
<p>As an intergenerational Survivor of the residential schools, Sixties Scoop, and foster care systems, Melanie has been working with First Nations across Manitoba for more than five years. She has travelled to more than 20 of the 63 First Nations across the province, including many remote, fly-in communities.</p>
<p>Melanie loves stories and has written numerous books, including \'Honouring our Ancestors: Remembering the Legacy of the Residential School System in Northern Manitoba.\' She is the Director of Communications for the Southern Chiefs’ Organization and brings strong advocacy and storytelling expertise to ITM.</p>
</div>
</div>

<div class="team-member-card">
<div class="img-circular-wrap">
<img src="/wp-content/uploads/2024/11/edna-300x288.jpg" alt="Edna Nabess - Director At Large" class="img-circular team-photo" />
</div>
<h3 class="team-member-name">Edna Nabess</h3>
<div class="team-member-role">Director At Large</div>
<div class="team-member-bio">
<p>Edna Nabess was born and raised in Cormorant, Manitoba and is a proud member of the Mathias Colomb Cree Nation. Edna was taught to sew and bead by her mother at a very young age. She is an award-winning artisan, entrepreneur, and the founder of Cree-Ations. Edna is deeply committed to community development, Indigenous artisan empowerment, and sharing traditional cultural arts with visitors from around the world.</p>
</div>
</div>
</div>
</section>
<!-- /wp:html -->

<!-- wp:group {"className":"page-section text-center","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group page-section text-center" style="padding:60px 20px;">
<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center">Connect With Our Team</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Whether you are an Indigenous operator, artisan, or tourism partner, we are here to support you.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"className":"btn btn--primary"} -->
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/contact-us/">Contact Us</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn btn--outline"} -->
<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/become-a-member/">Become a Member</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->',
			],

			// 5. Become a Member (Page ID 2367)
			2367 => [
				'title' => 'Become a Member',
				'slug'  => 'become-a-member',
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":2367,"url":"/wp-content/uploads/2024/10/wood-itm-scaled.jpg"},"showHoopOverlay":true,"overlayOpacity":35,"minHeight":50,"contentAlignment":"center"} -->
<!-- wp:heading {"textAlign":"center","level":1,"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Become A Member</h1>
<!-- /wp:heading -->
<!-- /wp:midflight/hero-block -->

<!-- wp:html -->
<section class="page-section constrained-content membership-intro-section" style="padding-top:60px;padding-bottom:40px;">
<div class="membership-intro-grid">
<div class="membership-intro-content">
<h2 class="membership-lead-heading">ITM membership is a wonderful first step towards a brighter future for all.</h2>
<p class="membership-lead-p">Indigenous Tourism Manitoba is committed to rebuilding and preserving Indigenous Tourism in Manitoba. We support the growth of this industry by promoting cultural storytelling, economic empowerment, and leadership. Any Indigenous individual or organization can join us.</p>
<p class="membership-lead-p">As an ITM member, you’ll gain resources to boost your business. We offer help with experience development, training, networking, and marketing programs to set you on a path to success. Our goal is to provide valuable resources for entrepreneurs and communities, helping create genuine Indigenous experiences and stable jobs for Indigenous communities.</p>
<div class="wp-block-buttons" style="margin-top:24px;margin-bottom:28px;">
<div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="/member-benefits/">Discover Member Benefits</a></div>
</div>
<hr class="membership-divider" style="margin:24px 0;border:0;border-top:1px solid #e5e7eb;" />
<ul class="membership-resource-list">
<li><i class="bi bi-file-earmark-pdf" style="color:#bd2b1e;font-size:1.2rem;"></i> <span>Indigenous Tourism Manitoba (ITM) <a href="/wp-content/uploads/2026/01/2026-Membership-Guide.pdf" target="_blank" rel="noopener">Membership Guide</a></span></li>
<li><i class="bi bi-file-earmark-pdf" style="color:#bd2b1e;font-size:1.2rem;"></i> <span>Market Readiness <a href="/wp-content/uploads/2025/01/ITM_Market-Readiness-Checklist.pdf" target="_blank" rel="noopener">Checklist</a></span></li>
</ul>
</div>
<div class="membership-intro-image">
<div class="membership-logo-card">
<img src="/wp-content/uploads/2024/10/ITM-Logo-Portrait.png" alt="Indigenous Tourism Manitoba - Adventure to Understanding" />
</div>
</div>
</div>
</section>
<!-- /wp:html -->

<!-- wp:html -->
<section class="page-section constrained-content membership-app-section" style="padding-top:20px;padding-bottom:60px;">
<details class="membership-app-details" open>
<summary class="membership-app-summary">
<span>ITM Membership Application</span>
<i class="bi bi-chevron-down membership-accordion-icon"></i>
</summary>
<div class="membership-form-wrapper">
[gravityform id="4" title="true" description="false" ajax="true"]
</div>
</details>
</section>
<!-- /wp:html -->',
			],

			// 6. Member Benefits (Page ID 2373)
			2373 => [
				'title' => 'Member Benefits',
				'slug'  => 'member-benefits',
				'content' => '<!-- wp:midflight/banner-block {"title":"Member Benefits","description":"Explore the advantages of partnering with Indigenous Tourism Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"Contact Us","description":"Connect with the Indigenous Tourism Manitoba team.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"New Account Request","description":"Submit your operator or member account application.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"Guide Training Program Inquiry","description":"Take the first step towards becoming a certified Indigenous guide.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"Indigenous Guide Training Program","description":"Empowering Indigenous storytellers, cultural ambassadors, and wilderness guides across Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

<!-- wp:html -->
<div class="page-section constrained-content">
<h2 class="wp-block-heading text-center">A Three-Step Pathway to Professional Guiding</h2>
<p class="text-center">The ITM Indigenous Guide Training Program provides culturally grounded, industry-certified education for individuals aspiring to lead authentic tourism experiences across Manitoba.</p>

<div class="wp-block-columns program-pathway-grid">
<div class="wp-block-column">
<div class="program-step-card">
<div class="step-badge">Step 1</div>
<h3 class="wp-block-heading">Introduction</h3>
<p>Orientation to Indigenous tourism fundamentals, cultural protocols, and foundational storytelling skills.</p>
<div class="wp-block-buttons"><div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-1/">Explore Step 1</a></div></div>
</div>
</div>

<div class="wp-block-column">
<div class="program-step-card">
<div class="step-badge">Step 2</div>
<h3 class="wp-block-heading">7-Day Training</h3>
<p>Intensive hands-on field training, wilderness safety, first aid certification, and group dynamics.</p>
<div class="wp-block-buttons"><div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-2/">Explore Step 2</a></div></div>
</div>
</div>

<div class="wp-block-column">
<div class="program-step-card">
<div class="step-badge">Step 3</div>
<h3 class="wp-block-heading">Practicum</h3>
<p>Mentored workplace placement with certified Indigenous tourism operators in Manitoba.</p>
<div class="wp-block-buttons"><div class="wp-block-button btn btn--primary btn--sm"><a class="wp-block-button__link wp-element-button" href="/indigenous-guide-training-program-step-3/">Explore Step 3</a></div></div>
</div>
</div>
</div>
</div>
<!-- /wp:html -->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"Step 1: Introduction","description":"Foundational orientation for prospective Indigenous guides in Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"Step 2: 7-Day Training Course","description":"Intensive hands-on field training, wilderness safety, and cultural storytelling.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"Step 3: Practicum","description":"Mentored field placement with licensed Indigenous tourism operators in Manitoba.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
				'content' => '<!-- wp:midflight/banner-block {"title":"More Learning Opportunities","description":"Additional certifications, workshops, and advanced hospitality training.","overlayColor":"#000000","overlayOpacity":30,"fontSize":2.5,"descriptionFontSize":1.2} /-->

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
					// 16. The Forks Location / Explore Indigenous (Page ID 3026)
			3026 => [
				'title' => 'Explore Indigenous at The Forks Market',
				'slug'  => 'the-forks',
				'content' => '<!-- wp:midflight/hero-block {"backgroundImage":{"id":2838,"url":"https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2025/10/Anne_Mulaire_Boutique_2025-2-scaled.jpg"},"showHoopOverlay":true,"overlayOpacity":35,"minHeight":65,"contentAlignment":"center"} -->
<span class="hero-badge" style="display:inline-block;padding:6px 16px;background:rgba(224,172,15,0.2);border:1px solid #e0ac0f;color:#e0ac0f;border-radius:9999px;font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px;">📍 Inside The Forks Market, Winnipeg</span>
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Explore Indigenous at The Forks</h1>
<p class="has-text-align-center has-white-color has-text-color" style="font-size:1.2rem;max-width:720px;margin:0 auto 24px;line-height:1.5;">A retail and showcase space created and managed by Indigenous Tourism Manitoba, located inside The Forks Market.</p>
<div class="wp-block-buttons is-content-justification-center">
<div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="#about-space">Discover the Space</a></div>
<div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="#hours-location">Hours &amp; Location</a></div>
</div>
<!-- /wp:midflight/hero-block -->

<!-- wp:html -->
<section id="about-space" class="page-section forks-vision-section constrained-content">
<div class="forks-vision-grid">
  <div class="vision-text-col">
    <span class="vision-badge">Retail &amp; Showcase Hub</span>
    <h2 class="vision-title">Culture, Community &amp; Commerce</h2>
    <p class="vision-lead">To create a place where visitors can shop handcrafted goods and discover Indigenous tourism experiences across Manitoba.</p>
    <p class="vision-body">Explore Indigenous is a retail and showcase space created and managed by Indigenous Tourism Manitoba, located inside The Forks Market. The space sells locally made Indigenous products from artisans across Manitoba, and also serves as a place where Indigenous tourism businesses can host events and workshops.</p>
    <div class="vision-feature-cards">
      <div class="vision-card">
        <div class="vision-card-icon"><i class="bi bi-bag-heart"></i></div>
        <h3 class="vision-card-title">Authentic Retail Store</h3>
        <p class="vision-card-desc">Featuring authentic, Indigenous-made handcrafted products, apparel, artwork, and gifts from artisans across Manitoba.</p>
      </div>
      <div class="vision-card">
        <div class="vision-card-icon"><i class="bi bi-compass"></i></div>
        <h3 class="vision-card-title">Tourism Information Hub</h3>
        <p class="vision-card-desc">Where visitors can learn about Indigenous tourism experiences, regional itineraries, and operators throughout Manitoba.</p>
      </div>
    </div>
    <p class="vision-body" style="margin-bottom:0;">The space supports ITM members by increasing visibility, creating retail opportunities, and connecting operators and artisans directly with visitors from Manitoba and around the world.</p>
  </div>
  <div class="vision-image-col">
    <div class="vision-img-wrap">
      <img src="https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2025/05/4-1.png" alt="Indigenous Artisan Crafting at The Forks Market" loading="lazy" />
    </div>
    <div class="vision-image-caption-card">
      <span class="caption-label">Authentic Craftsmanship</span>
      <p class="caption-text">Connecting visitors directly with Manitoba artisans &amp; living culture.</p>
    </div>
  </div>
</div>
</section>
<!-- /wp:html -->

<!-- wp:html -->
<section class="page-section artisan-spotlight-section constrained-content">
<div class="artisan-spotlight-card">
  <div class="artisan-header-group">
    <div class="artisan-title-wrap">
      <span class="artisan-badge">Featured Artisan Profile</span>
      <h2 class="artisan-name">Jordan Stranger</h2>
      <p class="artisan-subhead">Totem Doodem &bull; Peguis First Nation</p>
    </div>
    <a class="artisan-link-btn" href="https://totemdoodem.ca/about" target="_blank" rel="noopener noreferrer">Visit Totem Doodem &rarr;</a>
  </div>
  <div class="artisan-content-grid">
    <div class="artisan-bio-col">
      <p class="artisan-bio-text">Jordan Stranger is an Anishinaabe artist and graphic designer from Peguis First Nation known for his colourful style represented through murals, illustrations, and graphic design. Stranger’s work is deeply rooted in the traditions within contemporary Indigenous culture, and he uses his life experiences and spiritual practice learned through Ojibwe teachings to drive his artistic passions.</p>
      <p class="artisan-bio-text">His murals and artwork using cultural influences and symbolism can be found throughout the city of Winnipeg, and he is the designer and artist behind the Winnipeg 150 logo.</p>
      <div class="artisan-client-showcase">
        <span class="client-label">Recognized Collaborations &amp; Work:</span>
        <div class="client-tag-list">
          <span class="client-tag">APTN</span>
          <span class="client-tag">Apple</span>
          <span class="client-tag">Shopify</span>
          <span class="client-tag">Audible</span>
          <span class="client-tag">Festival du Voyageur</span>
          <span class="client-tag">Winnipeg 150</span>
        </div>
      </div>
    </div>
    <div class="artisan-blessing-col">
      <div class="blessing-card">
        <div class="blessing-icon"><i class="bi bi-feather"></i></div>
        <h3 class="blessing-title">Special Blessing Artwork</h3>
        <p class="blessing-text">Jordan created a special piece of artwork for the space itself &mdash; a work intended to bless the store and carry a message of inclusion, welcome, and shared understanding. The piece reflects the spirit of Explore Indigenous: a place for culture, community, and connection.</p>
        <div class="blessing-print-banner">
          <div class="print-icon"><i class="bi bi-brush"></i></div>
          <p class="print-text"><strong>Artwork Prints Available:</strong> Prints of Jordan’s artwork are available for purchase in-store, allowing visitors to take home a meaningful piece representing artistry and intention.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
<!-- /wp:html -->

<!-- wp:html -->
<section class="page-section forks-opportunities-section constrained-content">
<div class="section-header">
  <span class="section-badge">Community &amp; Operator Benefits</span>
  <h2 class="section-title">How the Space Is Used &amp; Opportunities for Members</h2>
  <p class="section-subtitle">Explore Indigenous provides multiple benefits and physical connection points for ITM members across Manitoba.</p>
</div>
<div class="forks-opportunities-grid">
  <div class="opportunity-card opportunity-card--featured">
    <div class="opportunity-icon-wrap opportunity-icon-wrap--gold"><i class="bi bi-shop"></i></div>
    <h3 class="opportunity-title">Retail Opportunities</h3>
    <p class="opportunity-desc">Artisans can showcase and sell authentic, handmade goods in a high-traffic location at The Forks &mdash; one of Manitoba’s most visited destinations.</p>
  </div>
  <div class="opportunity-card">
    <div class="opportunity-icon-wrap"><i class="bi bi-signpost-2"></i></div>
    <h3 class="opportunity-title">Tourism Promotion</h3>
    <p class="opportunity-desc">Tour operators can share brochures, information, and stories about their experiences, helping visitors discover tourism opportunities throughout the province.</p>
  </div>
  <div class="opportunity-card">
    <div class="opportunity-icon-wrap"><i class="bi bi-calendar-event"></i></div>
    <h3 class="opportunity-title">Workshop &amp; Event Space</h3>
    <p class="opportunity-desc">Open to members who wish to host workshops, demonstrations, small gatherings, or cultural programming to engage directly with visitors and share knowledge.</p>
  </div>
  <div class="opportunity-card">
    <div class="opportunity-icon-wrap"><i class="bi bi-globe2"></i></div>
    <h3 class="opportunity-title">Increased Visibility</h3>
    <p class="opportunity-desc">Members gain valuable exposure to diverse audiences visiting The Forks every week:</p>
    <ul class="opportunity-audience-list">
      <li>Local Winnipeg &amp; regional shoppers</li>
      <li>Canadian domestic travellers</li>
      <li>International visitors from around the world</li>
      <li>Event attendees and conference guests</li>
    </ul>
  </div>
  <div class="opportunity-card">
    <div class="opportunity-icon-wrap"><i class="bi bi-people"></i></div>
    <h3 class="opportunity-title">Collaborative Space</h3>
    <p class="opportunity-desc">A connection point &mdash; a physical representation of Manitoba’s Indigenous tourism community working together to elevate, empower, and support one another.</p>
  </div>
</div>
</section>
<!-- /wp:html -->

<!-- wp:html -->
<section id="hours-location" class="page-section forks-visit-cta-section constrained-content">
<div class="forks-visit-split">
  <div class="hours-info-card">
    <span class="card-badge">Plan Your Visit</span>
    <h3 class="card-title">Operating Hours &amp; Location</h3>
    <div class="hours-schedule-box">
      <p class="schedule-days">Thursday &ndash; Sunday</p>
      <p class="schedule-time">10:00 AM &ndash; 6:00 PM</p>
      <p class="schedule-note">*Extended hours may apply during peak tourism seasons or special events.</p>
    </div>
    <p class="location-details"><strong>Location:</strong> Inside The Forks Market, 1 Forks Market Rd, Winnipeg, MB R3C 4L9</p>
    <div class="wp-block-buttons" style="margin-top:auto;">
      <div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="https://maps.google.com/?q=The+Forks+Market+Winnipeg" target="_blank" rel="noopener noreferrer">Get Directions &rarr;</a></div>
    </div>
  </div>
  <div class="ambassador-contact-card">
    <span class="card-badge">Member Booking Pathway</span>
    <h3 class="card-title">Host an Event or Sell Your Products</h3>
    <p class="card-body">Members interested in using the space for workshops, events, demonstrations, or to sell their authentic products are encouraged to reach out to our space manager to discuss availability and booking opportunities.</p>
    <div class="contact-profile-box">
      <p class="contact-name">Taytum</p>
      <p class="contact-role">Ambassador &amp; Space Manager, Indigenous Tourism Manitoba</p>
      <div class="wp-block-buttons">
        <div class="wp-block-button btn btn--primary"><a class="wp-block-button__link wp-element-button" href="mailto:ambassadormgr@indigenoustourismmanitoba.ca?subject=Explore%20Indigenous%20Space%20Inquiry">Email ambassadormgr@indigenoustourismmanitoba.ca</a></div>
      </div>
    </div>
  </div>
</div>
<div class="invite-closing-box">
  <h2 class="invite-title">We Invite You to Experience It Firsthand</h2>
  <p class="invite-lead">Whether you are an ITM member looking to participate, an artisan interested in retail opportunities, a tourism operator wanting to increase visibility, or a visitor looking to shop with intention &mdash; we invite you to stop by.</p>
  <p class="invite-body">Explore Indigenous is more than a store &mdash; it is a living expression of Indigenous creativity, entrepreneurship, and tourism excellence in Manitoba. Come visit us at The Forks and see what’s possible when community, culture, and commerce come together.</p>
  <div class="invite-actions">
    <div class="wp-block-button btn btn--gold"><a class="wp-block-button__link wp-element-button" href="/operators/">Discover Manitoba Operators</a></div>
    <div class="wp-block-button btn btn--outline"><a class="wp-block-button__link wp-element-button" href="/become-a-member/">Become an ITM Member</a></div>
  </div>
</div>
</section>
<!-- /wp:html -->',
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

		// Ensure Sitemap page exists
		$sitemap_page = get_page_by_path( 'sitemap' );
		if ( ! $sitemap_page ) {
			$sitemap_id = wp_insert_post( [
				'post_title'     => 'Site Map & Directory',
				'post_name'      => 'sitemap',
				'post_status'    => 'publish',
				'post_type'      => 'page',
				'comment_status' => 'closed',
				'ping_status'    => 'closed',
			] );
			if ( $sitemap_id && ! is_wp_error( $sitemap_id ) ) {
				update_post_meta( $sitemap_id, '_wp_page_template', 'page-sitemap.php' );
				$log[] = "Created Sitemap Page (ID {$sitemap_id}) with template page-sitemap.php.";
			}
		} else {
			update_post_meta( $sitemap_page->ID, '_wp_page_template', 'page-sitemap.php' );
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
