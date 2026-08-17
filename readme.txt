=== Kiwatinook ===
Contributors: midflight, jordandysart
Tags: custom-background, custom-logo, custom-menu, featured-images, threaded-comments, translation-ready, accessibility-ready, full-width-template
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.1.1
License: GNU General Public License v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Kiwatinook ("North" in Cree) is the bespoke WordPress theme developed for Indigenous Tourism Manitoba (ITM).

== Description ==

Kiwatinook is a modern, high-performance WordPress theme created specifically for Indigenous Tourism Manitoba. Rooted in authentic storytelling and cultural connection, the theme is named *Kiwatinook*—the Cree word for "North"—honouring the lands, communities, and traditions of Manitoba's Indigenous peoples.

= Key Features =

* **Native Block Architecture**: Built entirely around native WordPress Gutenberg blocks (`wp:core/*` and custom `midflight/*` blocks), eliminating legacy plugin overhead from Kadence, Getwid, and ACF frontend renders.
* **Interactive Operator Experiences**: Custom interactive Leaflet mapping, category/region filter bars, and dedicated operator showcase components.
* **Accessible Video Modal Player**: Zero-dependency lightbox modal with automated pulse-play trigger, responsive 16:9 aspect ratios, keyboard traps (ESC / Tab cycling), and complete audio leak prevention.
* **Modern Navigation & Mega Menu**: Sticky header with dynamic height tracking, hover-intent buffering, multi-column category/region layouts, and featured visual showcases.
* **Breadcrumb Navigation**: Integrated breadcrumb trail for single operators, blog articles, child pages, and taxonomy archives.
* **Structured 4-Column Footer**: Redesigned modern footer featuring Treaty One territory recognition, social links, organized navigation columns, and a human-readable sitemap.
* **Self-Hosted Release Updates**: Automated theme update pipeline powered by Plugin Update Checker (PUC) and GitHub Releases.

== Installation ==

1. In your WordPress Admin panel, go to **Appearance > Themes** and click **Add New Theme**.
2. Click **Upload Theme**, select the `kiwatinook.zip` release archive, and click **Install Now**.
3. Click **Activate** to use Kiwatinook.
4. For automated updates from private GitHub Releases, define `ITM_MIDFLIGHT_UPDATE_TOKEN` in your `wp-config.php`.

== Changelog ==

= 1.1.1 - August 2026 =
* **Agency & Brand Modernization**: Rebranded all theme references, text domains, and packages from legacy agencies (Indigpro / Relish / Underscores) to Kiwatinook by Midflight.
* **Custom Block Namespace Update**: Updated block registrations to `midflight/*` (`midflight/banner-block`, `midflight/hero-block`, `midflight/featured-operators-block`, `midflight/operator-block`, `midflight/operator-search-block`, `midflight/video-popup-block`) with backward-compatible aliases for legacy blocks.
* **Operator Template Polish**: Enhanced `.operator-content` responsive grid boundaries, fixed image aspect ratios, and improved right sidebar card presentation.
* **Theme Documentation**: Added comprehensive `readme.txt` with description, feature list, and changelog tracker for WordPress Admin theme viewer.

= 1.1.0 - August 2026 =
* **Footer Redesign**: Replaced unstyled legacy footer with modern, responsive 4-column layout including brand column, social links, Explore, About ITM, Programs & Members, and Treaty One acknowledgement.
* **Human-Readable Sitemap**: Added `/sitemap/` page template with 6 structured cards categorizing experiences, regions, categories, guide training, and governance.
* **Breadcrumbs System**: Added `itm_render_breadcrumbs()` shortcode for single operators, post types, and taxonomy archives.
* **Navigation Mega Menu Polish**: Implemented hover-intent buffer delay (150ms) to prevent accidental collapse when moving between navigation root items and dropdown panels.
* **Hero Banner Focal Alignment**: Added internal header offset padding to center hero headlines visually below sticky navigation.

= 1.0.0 - August 2026 =
* **Initial Production Release**: Complete modernization and stabilization of Indigenous Tourism Manitoba theme.
* **Gutenberg Migration**: Refactored 15 core pages from Kadence / Getwid / ACF plugins to native WordPress Core blocks and theme blocks.
* **Video Modal Block**: Introduced `relish/video-popup-block` with accessible lightbox player, YouTube/Vimeo parsing, and pulse animations.
* **Theme Release Pipeline**: Added automated packaging script (`npm run package:release`) and GitHub Actions workflow for self-hosted updates.

== Credits ==

* Developed and maintained by [Midflight](https://midflight.ca/) for [Indigenous Tourism Manitoba](https://indigenoustourismmanitoba.ca/).
* Based on WordPress coding standards and Underscores architecture (C) Automattic, Inc., GPLv2 or later.
