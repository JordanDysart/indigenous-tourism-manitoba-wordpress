# Core & Content Pages — Master Audit Work Plan & Task Analysis

> **Category:** 1. Core & Content Pages  
> **Source Reports:** `docs/audits/reports/` (76 Comprehensive Reports Analyzed)  
> **Scope:** 19 Unique Core URLs across 4 Audit Concerns (Accessibility, Content, Marketing/SEO, Performance)  
> **Date Generated:** 2026-09-03  
> **Status:** Complete Master Task Plan  

---

## Table of Contents

1. [Executive Summary & Strategic Overview](#1-executive-summary--strategic-overview)
2. [Workstream 1: Fix Once, Impact Everywhere (Component & Theme-Level Tasks)](#2-workstream-1-fix-once-impact-everywhere-component--theme-level-tasks)
   - [Component 1: Header Mega Menu Walker (`inc/class-header-menu-walker.php`)](#component-1-header-mega-menu-walker-incclass-header-menu-walkerphp)
   - [Component 2: Global WordPress Navigation Menu & Redirect Engine](#component-2-global-wordpress-navigation-menu--redirect-engine)
   - [Component 3: Theme Asset Pipeline (`functions.php`)](#component-3-theme-asset-pipeline-functionsphp)
   - [Component 4: Banner Block Component (`blocks/banner_block/banner_block.php`)](#component-4-banner-block-component-blocksbanner_blockbanner_blockphp)
   - [Component 5: Featured Operators Block (`blocks/featured-operators-block/`)](#component-5-featured-operators-block-blocksfeatured-operators-block)
   - [Component 6: Global `<head>` SEO & Social Card Engine (`header.php`)](#component-6-global-head-seo--social-card-engine-headerphp)
3. [Workstream 2: Batched Task Strings (Similar Work Across Templates)](#3-workstream-2-batched-task-strings-similar-work-across-templates)
   - [Batch A: Document Heading Outline & H1 Standardization](#batch-a-document-heading-outline--h1-standardization)
   - [Batch B: Critical Asset Compression & WebP Conversion Pass](#batch-b-critical-asset-compression--webp-conversion-pass)
   - [Batch C: Image Dimensions & CLS Elimination in Templates](#batch-c-image-dimensions--cls-elimination-in-templates)
   - [Batch D: Interactive Forms & Lead Ingestion Pipeline](#batch-d-interactive-forms--lead-ingestion-pipeline)
   - [Batch E: Content Integrity, Broken Links & Staging URL Cleansing](#batch-e-content-integrity-broken-links--staging-url-cleansing)
   - [Batch F: Conversion Funnel, Social Proof & Page Exit Architecture](#batch-f-conversion-funnel-social-proof--page-exit-architecture)
   - [Batch G: Accessibility Semantics & Interactive Controls](#batch-g-accessibility-semantics--interactive-controls)
4. [Workstream 3: Comprehensive Page-by-Page Audit Work Review](#4-workstream-3-comprehensive-page-by-page-audit-work-review)
   - [4.1 Home (`/home/`)](#41-home)
   - [4.2 About ITM (`/about-itm/`)](#42-about-itm)
   - [4.3 Our Team (`/our-team/`)](#43-our-team)
   - [4.4 Reconciliation (`/reconciliation/`)](#44-reconciliation)
   - [4.5 Things To Do (`/things-to-do/`)](#45-things-to-do)
   - [4.6 Experience Map (`/experience-map/`)](#46-experience-map)
   - [4.7 Events (`/events/`)](#47-events)
   - [4.8 Our Operators Directory (`/operators/`)](#48-operators)
   - [4.9 Become A Member (`/become-a-member/`)](#49-become-a-member)
   - [4.10 Member Benefits (`/member-benefits/`)](#410-member-benefits)
   - [4.11 New Account Request (`/new-account-request/`)](#411-new-account-request)
   - [4.12 Guide Training Program (`/guide-training-program/`)](#412-guide-training-program)
   - [4.13 Guide Training — Step 1: Introduction (`/indigenous-guide-training-program-step-1/`)](#413-indigenous-guide-training-program-step-1)
   - [4.14 Guide Training — Step 2: 7-Day Intensive (`/indigenous-guide-training-program-step-2/`)](#414-indigenous-guide-training-program-step-2)
   - [4.15 Guide Training — Step 3: Practicum (`/indigenous-guide-training-program-step-3/`)](#415-indigenous-guide-training-program-step-3)
   - [4.16 Guide Training Program Inquiry Form (`/itm-indigenous-guide-training-program-inquiry-form/`)](#416-itm-indigenous-guide-training-program-inquiry-form)
   - [4.17 Contact Us (`/contact-us/`)](#417-contact-us)
   - [4.18 Privacy Policy (`/privacy-policy/`)](#418-privacy-policy)
   - [4.19 Site Map & Directory (`/sitemap/`)](#419-sitemap)
5. [Implementation Roadmap & Recommended Phasing](#5-implementation-roadmap--recommended-phasing)

---

## 1. Executive Summary & Strategic Overview

Following the completion of the comprehensive site-wide audit, this document synthesizes all **76 audit reports** generated for the **19 Core & Content Pages** of Indigenous Tourism Manitoba (ITM).

Across these 19 pages, **318 individual findings** and **271 prioritized action items** were identified across four specialized audit disciplines:
- ♿ **Accessibility (WCAG 2.1 AA):** Document outlines, heading hierarchies, keyboard traps, ARIA semantics, and alt text clarity.
- ✍️ **Content & Editorial:** Staging URL leaks, broken links (404s), editorial tone, and missing content sections.
- 📈 **Marketing & Conversion:** Missing search metadata (SEO descriptions), social sharing previews (Open Graph), lead routing, social proof, and dead-end page exit funnels.
- ⚡ **Performance & Runtime:** Multi-megabyte uncompressed PNG assets, missing image dimensions causing Cumulative Layout Shift (CLS), duplicate icon stylesheets, and un-deferred script execution.

### Key Audit Metrics for Core & Content Pages

| Metric | Count / Volume | Strategic Impact |
|---|---|---|
| **Total Core Pages Audited** | 19 pages | Encompasses all public informational, directory, booking, and administrative intake pages. |
| **Audit Reports Processed** | 76 reports | 4 comprehensive reports per page (`_accessibility`, `_content`, `_marketing`, `_performance`). |
| **Total Detailed Findings** | 318 findings | 80 Accessibility, 73 Content, 85 Marketing, 80 Performance. |
| **Prioritized Action Items** | 271 tasks | 72 High/Critical Priority, 98 Medium Priority, 101 Low Priority. |
| **Single-Fix Multipliers** | 6 global components | Modifying 6 files/configurations instantly resolves over 110 task instances. |
| **Severely Bloated Assets** | 17.34 MB across 3 files | Compressing just 3 identified PNGs saves over 16.9 MB of initial load bandwidth. |

### Strategic Approach: Leverage Before Labor
To maximize engineering velocity, tasks are organized into two primary execution tiers before page-specific work:
1. **"Fix Once, Impact Everywhere"**: Addressing root architectural components (e.g. Header Walker, Banner Block template, `functions.php`, WP Menus) that automatically fix defects across 8 to 19 pages simultaneously.
2. **Batched Task Strings**: Grouping identical functional tasks (such as writing meta descriptions, converting raster graphics to WebP, or injecting image dimensions) so they can be executed in high-efficiency batch sessions.

---

## 2. Workstream 1: Fix Once, Impact Everywhere (Component & Theme-Level Tasks)

These tasks represent the highest ROI in the entire remediation process. By modifying a single template file, walker function, or WordPress database entry, dozens of recurring audit flags across all 19 core pages are resolved simultaneously.

### Component 1: Header Mega Menu Walker (`inc/class-header-menu-walker.php`)
**Impact:** 19 of 19 Core Pages (and all 47 archive/profile pages sitewide)

The custom nav menu walker `GAC_Menu_Walker` generates the top mega navigation menu rendered in `header.php`. Two architectural issues in this file ripple across every single page audit report:

#### Task 1.1: Eliminate Inverted Heading Hierarchy in Mega Menu Featured Cards
- **File:** [`inc/class-header-menu-walker.php:L81`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/inc/class-header-menu-walker.php#L81)
- **The Defect:** Line 81 wraps featured card titles in `<h3>`: `<h3 class="mega-menu-featured-title">` ("Empowering Indigenous Voices", "Discover Authentic Experiences", etc.). Because `<header>` precedes `<main>` in DOM order, screen readers encounter four `<h3>` tags *before* encountering the page's primary `<h1>` or `<h2>`. This caused "Inverted Heading Hierarchy" to fail across all 19 core pages.
- **The Solution:** Replace `<h3 class="mega-menu-featured-title">` with `<p class="mega-menu-featured-title">` or `<span class="mega-menu-featured-title font-bold" role="text">`.
- **Verification:** Inspect the DOM outline in any browser accessibility tree; heading outlines will now start cleanly at the page title.

#### Task 1.2: Inject Explicit Image Dimensions on Mega Menu Featured Media
- **File:** [`inc/class-header-menu-walker.php:L69`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/inc/class-header-menu-walker.php#L69)
- **The Defect:** Line 69 outputs `<img src="..." alt="..." loading="lazy" />` without HTML `width` or `height` attributes. This was flagged in all 19 performance reports as a primary contributor to Cumulative Layout Shift (CLS) on initial load.
- **The Solution:** Add explicit dimension attributes `width="480" height="320"` and CSS `aspect-ratio: 3/2` to the `<img>` tag.
- **Verification:** Chrome DevTools Lighthouse audit will register zero layout shifts attributed to `.mega-menu-featured-media img`.

### Component 2: Global WordPress Navigation Menu & Redirect Engine
**Impact:** 19 of 19 Core Pages (and all 47 archive/profile pages sitewide)

#### Task 2.1: Resolve Dead Global Navigation Submenu Item (`404 Not Found`)
- **Locations:** WordPress Menus (Primary Menu &rarr; Programs), [`inc/menu-structure-migration.php:L234`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/inc/menu-structure-migration.php#L234), and [`page-sitemap.php:L82`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/page-sitemap.php#L82)
- **The Defect:** The submenu item **"More Learning Opportunities"** links to `/indigenous-guide-training-program-more-learning-opportunities/`, which returns an **HTTP 404: Not Found** error. Because this menu renders in the global header on every page, all 76 audit reports flagged this broken link as a High Priority defect.
- **The Solution:**
  1. In `wp-admin` &rarr; Appearance &rarr; Menus &rarr; Main Navigation, update the item URL to `/guide-training-program/#additional-learning-opportunities` (or the active Guide Training landing page).
  2. In `inc/menu-structure-migration.php:L234`, update the programmatic menu seed array.
  3. In `page-sitemap.php:L82`, update or remove the corresponding sitemap link.
  4. Add a 301 redirect rule in `.htaccess` or WordPress redirect manager: `/indigenous-guide-training-program-more-learning-opportunities/` &rarr; `/guide-training-program/`.
- **Verification:** Execute `curl -I https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-more-learning-opportunities/` and verify an HTTP 301/200 response.

### Component 3: Theme Asset Pipeline (`functions.php`)
**Impact:** 18 of 19 Core Pages

#### Task 3.1: Deduplicate Bootstrap Icons Stylesheet Enqueue
- **File:** [`functions.php:L149-L156`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/functions.php#L149-L156)
- **The Defect:** `functions.php` enqueues Bootstrap Icons v1.11.3 from jsdelivr CDN (`bootstrap-icons`), while the plugin suite (`areoi`) concurrently enqueues `areoi-bootstrap-icons-css`. Both load identical icon font sets, causing redundant DNS lookups, blocking CSS rendering, and wasting network requests.
- **The Solution:** Remove or comment out the external CDN enqueue in `kiwatinook_scripts()`, relying on the local plugin asset, or deregister the plugin version if the theme CDN bundle is preferred.
- **Verification:** Inspect `<head>` network waterfall in DevTools; verify `bootstrap-icons.min.css` is downloaded exactly once.

#### Task 3.2: Defer Non-Critical Frontend JavaScript
- **File:** [`functions.php`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/functions.php)
- **The Defect:** `theme.js`, `animated-menu.js`, and `fancybox.umd.js` are loaded synchronously without the `defer` attribute, blocking the browser HTML parser and delaying First Contentful Paint (FCP).
- **The Solution:** Implement the standard `script_loader_tag` filter in `functions.php`:
  ```php
  add_filter('script_loader_tag', function($tag, $handle) {
      $defer_scripts = ['theme-js', 'animated-menu', 'fancybox-js-js'];
      if (in_array($handle, $defer_scripts, true)) {
          return str_replace(' src=', ' defer src=', $tag);
      }
      return $tag;
  }, 10, 2);
  ```
- **Verification:** Check DOM `<script>` tags on frontend; ensure non-critical bundles include `defer`.

### Component 4: Banner Block Component (`blocks/banner_block/banner_block.php`)
**Impact:** 8 Core Pages (`contact-us`, `guide-training-program`, `step-1`, `step-2`, `step-3`, `inquiry-form`, `member-benefits`, `new-account-request`)

#### Task 4.1: Standardize Banner Block Heading to H1
- **File:** [`blocks/banner_block/banner_block.php:L82`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/blocks/banner_block/banner_block.php#L82)
- **The Defect:** Line 82 hardcodes `<h2 class="banner-block-title">`. Because the Banner Block serves as the page hero across 8 core landing pages, those pages completely lack an `<h1>` heading in the DOM outline (a critical WCAG 1.3.1 / 2.4.6 failure flagged across 8 audit reports).
- **The Solution:**
  1. Update `banner_block.php:L82` to render `<h1>` by default (or allow editor level selection via a `headingTag` block attribute defaulting to `h1`):
     ```php
     <h1 class="banner-block-title" style="<?php echo $title_style; ?>">
         <?php echo esc_html( $title ); ?>
     </h1>
     ```
  2. Retain identical styling classes so visual typography is completely preserved.
- **Verification:** Re-running heading outline inspection immediately clears the "No H1 exists in the DOM" violation on all 8 pages.

#### Task 4.2: Add Dimensions to Banner Graphic Assets
- **File:** [`blocks/banner_block/banner_block.php:L96-L107`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/blocks/banner_block/banner_block.php#L96-L107)
- **The Defect:** Both `ITM_Hoop.svg` and `$main_image` render without `width` and `height` attributes.
- **The Solution:** Add explicit `width="450" height="450"` on the hoop SVG and query attachment metadata for the main image (`wp_get_attachment_metadata()` to populate `width` and `height`).

### Component 5: Featured Operators Block (`blocks/featured-operators-block/featured_operators_block.php`)
**Impact:** Multiple Core & Content Pages (`home`, `reconciliation`, `things-to-do`, `operators`)

#### Task 5.1: Inject Explicit Dimensions & Aspect-Ratio into Operator Cards
- **File:** [`blocks/featured-operators-block/featured_operators_block.php:L126-L129`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/blocks/featured-operators-block/featured_operators_block.php#L126-L129)
- **The Defect:** Operator card thumbnails render as `<img src="..." class="featured-operator-card-image" loading="lazy" />` without dimensions, triggering CLS warnings on every page showcasing operator grids.
- **The Solution:** Add `width="400" height="280"` to the markup and ensure `.featured-operator-card-image-wrap` has `aspect-ratio: 4 / 3; overflow: hidden;`.

### Component 6: Global `<head>` SEO & Social Card Engine (`header.php` / `functions.php`)
**Impact:** 19 of 19 Core Pages

#### Task 6.1: Automated Dynamic Meta Description & Open Graph Injection
- **Files:** [`header.php`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/header.php) or [`functions.php`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/functions.php)
- **The Defect:** Every single core page completely lacks `<meta name="description">` and Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) / Twitter cards. Search engines display unstructured text snippets, and shared links on social media/messaging apps display blank preview cards.
- **The Solution:** Either activate/configure an SEO plugin (Yoast SEO / RankMath) OR add a robust fallback hook in `functions.php` hooked to `wp_head`:
  ```php
  function kiwatinook_seo_meta_tags() {
      if (is_admin()) return;
      global $post;
      $desc = get_bloginfo('description');
      if (is_singular() && !empty($post->post_excerpt)) {
          $desc = wp_strip_all_tags($post->post_excerpt);
      } elseif (is_singular() && !empty($post->post_content)) {
          $desc = wp_trim_words(wp_strip_all_tags($post->post_content), 25, '...');
      }
      $og_image = get_template_directory_uri() . '/screenshot.png';
      if (is_singular() && has_post_thumbnail($post->ID)) {
          $og_image = get_the_post_thumbnail_url($post->ID, 'large');
      }
      echo '<meta name="description" content="' . esc_attr($desc) . '">' . "\n";
      echo '<meta property="og:title" content="' . esc_attr(wp_get_document_title()) . '">' . "\n";
      echo '<meta property="og:description" content="' . esc_attr($desc) . '">' . "\n";
      echo '<meta property="og:image" content="' . esc_url($og_image) . '">' . "\n";
      echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '">' . "\n";
      echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
  }
  add_action('wp_head', 'kiwatinook_seo_meta_tags', 1);
  ```
- **Verification:** Use Facebook Sharing Debugger or `curl -s https://indigenoustourismmanitoba.ca/ | grep '<meta property="og:'` to confirm valid tags on all pages.

---

## 3. Workstream 2: Batched Task Strings (Similar Work Across Templates)

When work cannot be resolved through a single global component file, batching similar tasks together reduces context switching and ensures consistency across the website.

### Batch A: Document Heading Outline & H1 Standardization
**Goal:** Achieve 100% WCAG 2.1 AA (1.3.1 Info & Relationships, 2.4.6 Headings & Labels) compliance with a clean, logical document outline starting with a single `<h1>` on every page.

| Page Slug | Current Defect | Remediation Action | Priority |
|---|---|---|---|
| `contact-us` | `<h2>Get In Touch</h2>` & skipped `<h5>FOLLOW US</h5>` | Change `<h2>` to `<h1>Contact Indigenous Tourism Manitoba</h1>`; convert `<h5>` to `<h3 class="h5">Follow Us</h3>`. | 🔴 High |
| `events` | No `<h1>` in DOM (jumps into iframe) | Insert `<h1>Indigenous Events in Manitoba</h1>` above the iframe calendar embed. | 🔴 High |
| `experience-map` | No `<h1>` in DOM (jumps into map & list) | Insert `<h1>Indigenous Tourism Experience Map</h1>` at the top of the main container. | 🔴 High |
| `operators` | No `<h1>` in DOM (jumps into operator cards) | Insert `<h1>Our Operators</h1>` at the top of the archive container. | 🔴 High |
| `home` | Multiple `<h1>` tags (Conference callout block uses `<h1>`) | Change Conference callout heading from `<h1>` to `<h2>`. | 🟠 High |
| `about-itm` | Nested duplicate `<h3>Building the Brand</h3>` inside `<h2>` | Remove redundant inner `<h3>` tag in the custom block markup. | 🟡 Medium |
| `become-a-member` | Duplicate `<h3>Payment Details</h3>` across conditional steps | Label uniquely: `<h3>Accredited Member Payment Details</h3>` vs `<h3>Partner Member Payment Details</h3>`. | 🟡 Medium |
| `guide-training-program` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Indigenous Guide Training Program</h1>`. | 🔴 High |
| `step-1` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Step 1: Introduction – Guide Training Program</h1>`. | 🔴 High |
| `step-2` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Step 2: 7-Day Training Course – Guide Training Program</h1>`. | 🔴 High |
| `step-3` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Step 3: Practicum – Guide Training Program</h1>`. | 🔴 High |
| `inquiry-form` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Guide Training Program Inquiry</h1>`. | 🔴 High |
| `member-benefits` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Member Benefits</h1>`. | 🔴 High |
| `new-account-request`| Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>New Account Request</h1>`. | 🔴 High |

### Batch B: Critical Asset Compression & WebP Conversion Pass
**Goal:** Eliminate multi-megabyte payload bottlenecks that degrade mobile user experience and Core Web Vitals (LCP).

| Asset Filename | Page(s) | Original Size | Target Size (WebP) | Bandwidth Saved | Priority |
|---|---|---|---|---|---|
| `Screenshot-2023-09-05-at-11.07.18-AM.png` | `operators`, `experience-map` | **13.06 MB (13,058 KB)** | **< 100 KB** | **~12.96 MB (99.2%)** | 🔴 Critical |
| `Anne-2024_...png` | `operators`, `experience-map` | **2.62 MB (2,619 KB)** | **< 120 KB** | **~2.50 MB (95.4%)** | 🟠 High |
| `Web-callout-block-2026-ITM-Conference-1.png` | `home` | **1.66 MB (1,660 KB)** | **< 150 KB** | **~1.51 MB (91.0%)** | 🟠 High |
| `about-itm.jpg` | `about-itm`, `contact-us`, `guide-training`, etc. | **841.7 KB** | **< 120 KB** | **~721 KB (85.7%)** | 🟡 Medium |
| `SpenceFProfile-scaled.jpg` & `FCA486D3...jpeg`| `reconciliation` | **400 KB - 540 KB** | **< 100 KB** | **~750 KB (75.0%)** | 🟡 Medium |
| **Total Bandwidth Reduction** | Across Core Pages | **> 18.5 MB** | **< 600 KB** | **> 17.9 MB Total** | — |

> [!TIP]
> Use cwebp or an automated WordPress image optimizer (e.g. WebP Express, Imagify, or WP-CLI `wp media regenerate`) to compress these raw assets losslessly at 82% quality.

### Batch C: Image Dimensions & CLS Elimination in Templates
**Goal:** Prevent visual layout jumps by declaring explicit `width` and `height` attributes on custom page templates and block markups.

1. **Our Team Roster Headshots (`page-our-team.php` / block):**
   - **Finding:** 15 of 17 circular headshot images (`.img-circular.team-photo`) lack HTML `width` and `height` attributes.
   - **Remediation:** Add `width="300" height="300"` directly to the `<img>` tags in the template loop.
2. **Featured Operator Card Images (`featured_operators_block.php`):**
   - **Finding:** 9 of 15 images on `home` and 10 of 12 images on `reconciliation` lack dimensions.
   - **Remediation:** Add `width="400" height="280"` to the block template as detailed in Task 5.1.
3. **Become a Member Form Icons & Logos (`page-become-a-member.php`):**
   - **Finding:** 6 of 8 images lack dimensions.
   - **Remediation:** Declare explicit dimensions or CSS aspect ratios on tier badge icons.

### Batch D: Interactive Forms & Lead Ingestion Pipeline
**Goal:** Replace broken/fragile mailto mechanisms and obsolete static copy with accessible, high-conversion web forms.

1. **Guide Training Program Inquiry Form (`/itm-indigenous-guide-training-program-inquiry-form/`):**
   - **Critical Defect:** Titled "Inquiry Form" but contains **no interactive form**—only a mailto button protected by Cloudflare email obfuscation that returns HTTP 404 for non-JS/static clients.
   - **Remediation:** Embed an active Gravity Form or Contact Form 7 with 5 fields: Full Name, Email, Phone, Indigenous Community / Affiliation, and Program Step Interest (Step 1, Step 2, Step 3).
2. **New Account Request Page (`/new-account-request/`):**
   - **Defect:** Instructs operators to manually compose an email; lacks an intake form and fails to provide a login route for registered users.
   - **Remediation:**
     - Embed a lightweight 4-field intake form (Business Name, Contact Person, Email, Community Affiliation).
     - Add a secondary member route: *"Already have an account? [Log in here](/login/)."*
4. **Become a Member Page (`/become-a-member/`):**
   - **Form Polish:** Combine/minify Gravity Forms orbital CSS bundles; differentiate conditional payment headings.

### Batch E: Content Integrity, Broken Links & Staging URL Cleansing
**Goal:** Eliminate dead links, database staging leaks, and placeholder content.

1. **Database Search-and-Replace for Local Staging URLs (`home`):**
   - **Critical Content Defect:** Three images on the homepage contain hardcoded local Lando development URLs: `https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/...` (`4-1.png`, `Group-4.png`, `Group-5.png`). These fail to render for public visitors.
   - **Remediation:** Run WP-CLI search-and-replace:
     ```bash
     wp search-replace 'https://indigenous-tourism-manitoba-wordpress.lndo.site' 'https://indigenoustourismmanitoba.ca' wp_posts --dry-run
     ```
2. **Sitemap Taxonomy Link Remediation (`/sitemap/`):**
   - **Defect:** Regional links `/operator-region/winnipeg/` and `/operator-region/interlake/` return **HTTP 404**.
   - **Remediation:** Update links to valid taxonomy archive slugs (`/operator-region/central/`) or create the missing taxonomy terms in WordPress.
3. **Events Page Editorial Enhancement (`/events/`):**
   - **Defect:** Page contains only a third-party iframe embed with no introductory editorial content or event submission route.
   - **Remediation:** Add an introductory heading, 2-paragraph overview of seasonal cultural events, and an "Are You Hosting an Indigenous Event? Submit Your Details" CTA block.
4. **Privacy Policy Currency & Cross-Linking (`/privacy-policy/`):**
   - **Remediation:** Add "Last Updated: November 2024" timestamp below the title, and add an inline hyperlink to `/contact-us/` in Section 4.

### Batch F: Conversion Funnel, Social Proof & Page Exit Architecture
**Goal:** Transform dead-end informational pages into interactive conversion funnels that retain visitors and drive memberships/bookings.

1. **Bottom Conversion CTAs for Dead-End Pages:**
   - `about-itm`: Add dual-action CTA banner: *"Become an ITM Member"* (Primary) and *"Meet Our Team"* (Secondary).
   - `our-team`: Add closing *"Connect With Our Team"* CTA banner below the Board of Directors grid.
   - `reconciliation`: Add *"Explore Authentic Cultural Experiences"* CTA button and link to TRC Call to Action 92.
   - `operators`: Add closing banner after pagination: *"Are You an Indigenous Tourism Operator? [Become an ITM Member](/become-a-member/)"*.
   - `events`: Add *"Get Monthly Indigenous Event Updates"* newsletter lead capture.
2. **Social Proof & Credibility Badging:**
   - `home`: Add curated "Visitor Experiences" quote carousel or partner endorsements (Travel Manitoba, ITAC).
   - `guide-training-program`: Add 2 graduate spotlight quotes with photography.
   - `step-2`: Add partner accreditation trust badges (Red Cross, Tourism HR Canada).
   - `step-3`: Add participating host operator logo band.
   - `member-benefits`: Add impact metrics counter banner (e.g. *"60+ Authentic Indigenous Operators Supported"*).
3. **CTA Label Clarity:**
   - `home`: Update generic "Register" button for the 2026 conference to explicit *"Register for Conference"*.
   - `guide-training-program`: Update broken "More Opportunities" button to point to `#additional-learning-opportunities` anchor.

### Batch G: Accessibility Semantics & Interactive Controls
**Goal:** Ensure keyboard accessibility, assistive technology landmarking, and high-quality alternative text.

1. **Interactive Experience Map (`/experience-map/`):**
   - Add `role="region" aria-label="Interactive Manitoba Tourism Map"` to the Leaflet map container.
   - Ensure map pin popups can be traversed via keyboard Tab key and provide skip-map controls.
2. **Events Calendar Iframe (`/events/`):**
   - Update vendor-default iframe title `title="3Common Upcoming and Past"` to descriptive `title="Upcoming Indigenous Tourism Manitoba Events Calendar"`.
   - Add fallback text for screen readers or users with disabled scripts.
3. **Archive Pagination (`/operators/`):**
   - Add `aria-label="Pagination Navigation"` to `<nav class="pagination">` and `aria-current="page"` to the active page number link.
4. **Image Alt Text Quality Upgrades:**
   - Replace raw kebab-case slug `alt="teekcas-boutique"` with `alt="Teekca's Boutique storefront with authentic Indigenous crafts"` (`home`).
   - Replace vague `alt="Monument"` with `alt="National Indigenous Residential School Museum monument in Portage la Prairie"` (`home`, `reconciliation`).
   - Replace generic `alt="polar bear"` with `alt="Polar bear in the wild in Churchill, Manitoba with Sub-Arctic Tours"` (`home`).
   - Replace `alt="Food 1"` with `alt="Indigenous-inspired culinary dishes served at Bistro on Notre Dame"` (`reconciliation`).
   - Replace `alt="SpenceFProfile"` with `alt="Handcrafted Indigenous wood carving by Spence Custom Carving"` (`reconciliation`).

---

## 4. Workstream 3: Comprehensive Page-by-Page Audit Work Review

This section documents the specific audit findings and actionable task lists for every individual page in the Core & Content category. Use the task checkboxes to track progress during remediation.

### 4.1 Home (`/home/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/`
- **Template / Structure:** `Front Page / Custom Blocks`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/home_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/home_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/home_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/home_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` headings ("Empowering Indigenous Voices", "Discover Authentic Experiences", etc.) precede the first `<h1>` in DOM order.<br>**Fix:** Restructure heading hierarchy so `<h1>` opens the page content, and top feature cards use `<h2>` or semantic list elements. |
| Accessibility | Headings Structure | Conference Banner | 🟠 High | **Issue:** A second `<h1>` is defined for "4th Annual Indigenous Tourism Manitoba Conference...".<br>**Fix:** Change the conference heading from `<h1>` to `<h2>` to maintain a single unique `<h1>` per page (WCAG 1.3.1). |
| Accessibility | Alt Text Quality | Featured Operator: Teekca's Boutique | 🟡 Medium | **Issue:** Alt attribute contains raw kebab-case slug: `alt="teekcas-boutique"`.<br>**Fix:** Update alt attribute to human-readable descriptive text: `alt="Teekca's Boutique storefront with authentic Indigenous crafts"`. |
| Accessibility | Alt Text Quality | Featured Operator: Residential School Museum | 🟡 Medium | **Issue:** Alt attribute is vague: `alt="Monument"`.<br>**Fix:** Update alt attribute to provide specific context: `alt="National Indigenous Residential School Museum monument in Portage la Prairie"`. |
| Accessibility | Alt Text Quality | Featured Operator: Sub-Arctic Tours | 🟡 Medium | **Issue:** Alt attribute is generic: `alt="polar bear"`.<br>**Fix:** Update alt attribute to provide context: `alt="Polar bear in the wild in Churchill, Manitoba with Sub-Arctic Tours"`. |
| Accessibility | Interactive Landmarks | Submenu Navigation | 🟢 Low | **Issue:** Submenu links contain nested `<span>` without explicit active focus indicators on high contrast modes.<br>**Fix:** Ensure CSS `:focus-visible` styling provides minimum 3:1 contrast against adjacent background colors. |
| Content | Broken Images / Dev URLs | "Grow Your Tourism Business" card & icons | 🔴 Critical | **Issue:** Three images have hardcoded local Lando development URLs: `https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/...` (`4-1.png`, `Group-4.png`, `Group-5.png`). These fail to load on production browsers.<br>**Fix:** Update image URLs in database/block markup to point to production domain `https://indigenoustourismmanitoba.ca/wp-content/uploads/...`. |
| Content | Broken Navigation Link | Header Navigation &rarr; Programs &rarr; Guide Training | 🟠 High | **Issue:** Submenu link `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404: Not Found** error.<br>**Fix:** Either restore/create the missing page or update the navigation menu item to point to the active Guide Training Program landing page (`/guide-training-program/`). |
| Content | Asset Formatting | Conference Callout Block | 🟢 Low | **Issue:** Image markup contains an empty `alt=""` tag on the conference promotional banner graphic (`Web-callout-block-2026-ITM-Conference-1.png`).<br>**Fix:** Add descriptive alt copy: `alt="4th Annual Indigenous Tourism Manitoba Conference - September 22 & 23, 2026"`. |
| Content | Editorial Review | Footer Copyright & Info | 🟢 Low | **Issue:** Organization naming and acknowledgments are culturally appropriate and well-aligned with ITM brand standards.<br>**Fix:** None required; good baseline. |
| Marketing | SEO & Discoverability | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engine result pages (SERPs) generate unstructured snippets, depressing click-through rates.<br>**Fix:** Add compelling meta description (e.g. "Discover authentic Indigenous experiences, cultural tours, artisan markets, and hospitality across Manitoba with Indigenous Tourism Manitoba."). |
| Marketing | Social Share Previews | No Open Graph (`og:*`) or Twitter Card tags | 🟡 Medium | **Issue:** Sharing homepage links on social media, messaging apps, or LinkedIn displays a blank or unstyled link without preview images.<br>**Fix:** Configure standard OG tags: `og:title`, `og:description`, `og:image` (featuring high-impact Manitoba Indigenous tourism photography), and `og:url`. |
| Marketing | Hero CTA Hierarchy | 4 feature cards above headline; no primary hero button | 🟡 Medium | **Issue:** First-time visitors are presented with 4 cards before seeing a clear primary action button above the fold.<br>**Fix:** Add a dual-action hero CTA banner directly below or beside the main headline: "Explore Experiences" (Primary) and "Become a Member" (Secondary). |
| Marketing | Social Proof & Trust | Operator showcases present, but no testimonials | 🟡 Medium | **Issue:** The page showcases operators but lacks traveler reviews, visitor testimonials, or partner endorsements.<br>**Fix:** Add a curated "Visitor Experiences" quote snippet or partner badging section (e.g. Travel Manitoba, ITAC endorsement) to increase conversion confidence. |
| Marketing | Conference CTA Phrasing | Generic "Register" button label | 🟡 Medium | **Issue:** Button links to external registration engine (`3common.com`), but copy lacks specific event context.<br>**Fix:** Update CTA button copy from "Register" to "Register for Conference" or "Get Conference Tickets" to clarify user expectation. |
| Performance | Heavy Asset Payload | Conference Graphic (`Web-callout-block-2026-ITM-Conference-1.png`) | 🟠 High | **Issue:** The conference callout graphic is transferred as a **1.66 MB** uncompressed PNG.<br>**Fix:** Convert image to modern WebP format and compress with 82% quality (target size: < 150 KB). |
| Performance | Heavy Asset Payload | Operator & Story Imagery (`about-itm.jpg`, `SharecuteriePicnic...jpg`, `beading...jpg`) | 🟠 High | **Issue:** Multiple photographs exceed 500KB - 850KB each, bringing total page image weight above 5.8 MB.<br>**Fix:** Enable WebP generation / responsive `srcset` with WordPress image sub-sizes. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards & operator cards | 🟡 Medium | **Issue:** **9 out of 15 images** lack explicit `width` and `height` attributes in HTML markup.<br>**Fix:** Add explicit `width` and `height` attributes or CSS `aspect-ratio` to container classes (`featured-operator-card-image`). |
| Performance | Duplicate Stylesheet Loading | Bootstrap Icons (`areoi-bootstrap-icons-css` & `bootstrap-icons-css`) | 🟡 Medium | **Issue:** Bootstrap Icons v1.11.3 is loaded twice: once via the plugin directory and once via jsdelivr CDN.<br>**Fix:** Deregister the redundant CDN enqueue in `functions.php` / theme setup. |
| Performance | Render-Blocking Scripts | Theme & plugin JS bundles | 🟢 Low | **Issue:** Scripts (`fancybox.umd.js`, `theme.js`, `blocks.js`) are loaded synchronously in page body without `defer`.<br>**Fix:** Add `defer` attribute via `script_loader_tag` filter for non-critical scripts. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Unify Heading Hierarchy:** Change the conference banner heading from `<h1>` to `<h2>`. Adjust top card block headings from `<h3>` to `<h2>` so the document outline follows a clean top-down tree starting at `<h1>Welcome to Indigenous Tourism Manitoba</h1>`.
- [ ] **[CONTENT] Search-and-Replace Staging URLs in DB:** Replace all instances of `https://indigenous-tourism-manitoba-wordpress.lndo.site` with `https://indigenoustourismmanitoba.ca` in WordPress database `wp_posts.post_content` to fix broken images (`4-1.png`, `Group-4.png`, `Group-5.png`).
- [ ] **[CONTENT] Fix 404 Submenu Link:** In WordPress Menus (`wp-admin` &rarr; Appearance &rarr; Menus &rarr; Main Navigation), update or remove the dead item linking to `/indigenous-guide-training-program-more-learning-opportunities/`.
- [ ] **[MARKETING] Implement SEO & Open Graph Meta Tags:** Install or configure Yoast/RankMath/theme meta hooks to output `<meta name="description">` and `og:image` with a high-resolution 1200x630px branded hero image.
- [ ] **[MARKETING] Clarify External Conference CTA:** Update button text from "Register" to "Register for Conference" so users know they are navigating to the event ticket platform.
- [ ] **[PERFORMANCE] Compress & Modernize Conference Callout Banner:** Re-upload `Web-callout-block-2026-ITM-Conference-1.png` as WebP (< 150KB) to instantly reduce initial page load payload by over 1.5MB.
- [ ] **[PERFORMANCE] Deduplicate Bootstrap Icons:** Remove the secondary CDN enqueue of `bootstrap-icons.min.css` in theme asset hooks.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Refine Operator Image Alt Tags:** Update media library alt tags for featured cards on the homepage (`teekcas-boutique` &rarr; `Teekca's Boutique`, `Monument` &rarr; `National Indigenous Residential School Museum Monument`, `polar bear` &rarr; `Polar bear in Churchill, Manitoba - Sub-Arctic Tours`).
- [ ] **[CONTENT] Promotional Banner Alt Copy:** Add informative alt text to the 2026 Conference promotional callout block.
- [ ] **[MARKETING] Above-the-Fold Action Hierarchy:** Add prominent primary CTA buttons directly below the main welcome statement to capture immediate visitor interest.
- [ ] **[MARKETING] Incorporate Authentic Social Proof:** Add a 2-column testimonial block featuring traveler feedback from authentic Indigenous tours and experiences.
- [ ] **[PERFORMANCE] Inject Explicit Image Dimensions:** Ensure block templates and custom card HTML render explicit `width` and `height` attributes to eliminate layout reflows during page rendering.
- [ ] **[PERFORMANCE] Batch WebP Compression:** Run a lossless image optimization pass on `/wp-content/uploads/` imagery.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Focus Ring Verification:** Verify high-contrast keyboard focus outlines across navigation items and CTA cards across Firefox and Safari.
- [ ] **[CONTENT] Automated Broken Link Monitoring:** Periodically scan navigation dropdowns to prevent orphaned menu links when pages are renamed or drafted.
- [ ] **[MARKETING] Newsletter / Guide Capture:** Consider adding a "Download the Manitoba Indigenous Travel Guide" lead magnet popup or inline banner for visitors not ready to book immediately.
- [ ] **[PERFORMANCE] Add `defer` to Non-Critical Enqueues:** Apply `defer` to `theme.js`, `animated-menu.js`, and `fancybox.js` for smoother initial painting.

---

### 4.2 About ITM (`/about-itm/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/about-itm/`
- **Template / Structure:** `Standard Page / Custom Blocks`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/about-itm_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/about-itm_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/about-itm_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/about-itm_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headings appear before the primary page `<h1>` in the DOM outline.<br>**Fix:** Adjust top card headings to `<h2>` or semantic list items so the `<h1>About Indigenous Tourism Manitoba</h1>` is the opening document header. |
| Accessibility | Heading Repetition | "Building the Brand" section | 🟡 Medium | **Issue:** An identical `<h3>Building the Brand</h3>` is rendered immediately following the `<h2>Building the Brand</h2>` heading in block markup.<br>**Fix:** Remove the duplicate inner `<h3>` tag in the block template to prevent confusing screen reader table-of-contents navigation. |
| Accessibility | Alt Text Quality | Logo & Card Images | 🟢 Low | **Issue:** All 6 images contain valid and descriptive `alt` attributes.<br>**Fix:** Maintain current quality standards. |
| Accessibility | Keyboard Focus | Header navigation & footer CTA | 🟢 Low | **Issue:** Interactive links require consistent high-contrast focus rings for keyboard users.<br>**Fix:** Ensure CSS `:focus-visible` provides clear outline contrast against dark and light background panels. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Global submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update the header menu item in WordPress to point to `/guide-training-program/` or publish the missing child page. |
| Content | Editorial Polish | Body Copy & Mandate | 🟢 Low | **Issue:** Core narrative clearly explains the organization's three pillars (Empowering Indigenous Voices, Discover Authentic Experiences, Grow Your Tourism Business).<br>**Fix:** No editorial changes required; strong copy. |
| Content | Media Asset Health | Hero & Content Photos | 🟢 Low | **Issue:** All 6 images return valid HTTP 200 responses with zero broken paths or staging URL leaks.<br>**Fix:** Maintain current media assets. |
| Marketing | Page Exit / Dead End | Bottom section "Join the Indigenous Tourism Movement" | 🟡 Medium | **Issue:** Page ends with body text and drops directly into the footer without an actionable next step.<br>**Fix:** Add a dual conversion CTA banner at the bottom: "Become an ITM Member" (Primary) and "Meet Our Team" (Secondary). |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines pull random sentence fragments for search results.<br>**Fix:** Add a tailored meta description (e.g. "Learn about Indigenous Tourism Manitoba (ITM), our mission to empower Indigenous entrepreneurs, and how we foster authentic cultural experiences across Manitoba."). |
| Marketing | Title Tag Optimization | `<title>About Indigenous Tourism Manitoba – Indigenous Tourism Manitoba</title>` | 🟡 Medium | **Issue:** Title tag repeats "Indigenous Tourism Manitoba" twice, wasting character budget.<br>**Fix:** Simplify title to: `About Us – Indigenous Tourism Manitoba` or `Our Mission & Story – Indigenous Tourism Manitoba`. |
| Marketing | Social Share Preview | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links on social platforms fail to generate image previews or rich snippets.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Marketing | Cross-Linking | Body copy lacks contextual internal links | 🟡 Medium | **Issue:** Mentions of operators and leadership lack direct links to `/our-team/` and `/operators/`.<br>**Fix:** Add contextual hyperlinks inside the copy to retain visitor engagement. |
| Performance | Image Asset Weight | Hero image (`/wp-content/uploads/2024/10/about-itm.jpg`) | 🟡 Medium | **Issue:** Hero JPEG image is **841.7 KB**.<br>**Fix:** Convert to WebP format and compress to under 120 KB. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit `width` and `height` attributes in HTML.<br>**Fix:** Declare explicit dimensions or CSS aspect ratios on card image containers. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin local file + jsdelivr CDN).<br>**Fix:** Deregister redundant CDN stylesheet in theme setup. |
| Performance | Script Loading Efficiency | Theme JS bundles | 🟢 Low | **Issue:** Non-critical scripts (`fancybox-js-js`, `theme.js`) load synchronously without `defer`.<br>**Fix:** Add `defer` attribute via script loader filters. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Fix Inverted Document Outline:** Restructure top feature cards to follow proper hierarchical order below the main `<h1>`.
- [ ] **[CONTENT] Fix Global 404 Menu Link:** Resolve the dead menu entry `/indigenous-guide-training-program-more-learning-opportunities/` in WP Admin &rarr; Menus.
- [ ] **[MARKETING] Add Bottom Conversion Banner:** Insert a CTA block at the conclusion of "Join the Indigenous Tourism Movement" with buttons linking to `/become-a-member/` and `/contact-us/`.
- [ ] **[MARKETING] Add Meta Description:** Implement a 155-character search description for the page.
- [ ] **[PERFORMANCE] Compress Hero Banner:** Optimize `about-itm.jpg` to modern WebP format (< 120KB).

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Remove Duplicate Heading:** Clean up the nested duplicate `<h3>Building the Brand</h3>` heading inside the content block.
- [ ] **[CONTENT] Explore Adding Video Storytelling:** Consider embedding an introductory video message from leadership or Elders in the "Who We Are" section.
- [ ] **[MARKETING] Clean Up Title Tag:** Adjust page SEO title to avoid redundant brand duplication.
- [ ] **[MARKETING] Link Internal Narrative:** Hyperlink mentions of the Board of Directors to `/our-team/` and mentions of cultural tours to `/operators/`.
- [ ] **[PERFORMANCE] Add Dimensions to Top Card Images:** Include explicit `width` and `height` attributes on the 4 feature cards.
- [ ] **[PERFORMANCE] Deduplicate Font Stylesheets:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Keyboard Focus Styling:** Verify visible focus outline across all interactive text links and buttons.
- [ ] **[CONTENT] Periodic Link Audits:** Run quarterly automated scans of header and footer navigation menus.
- [ ] **[MARKETING] Partner Accreditations:** Display partner accreditation badges (Indigenous Tourism Association of Canada - ITAC, Travel Manitoba) to enhance industry authority.
- [ ] **[PERFORMANCE] Enable Native Lazy Loading:** Add `loading="lazy"` to below-the-fold images.

---

### 4.3 Our Team (`/our-team/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/our-team/`
- **Template / Structure:** `page-our-team.php / Team Roster`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/our-team_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/our-team_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/our-team_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/our-team_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` feature card headings precede the main `<h1>Our Team</h1>` in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or use semantic list items. |
| Accessibility | Team Section Hierarchy | Staff & Board Sections | 🟢 Low | **Issue:** `<h2>Staff & Executive Leadership</h2>` and `<h2>Board of Directors</h2>` with subordinate `<h3>[Name]</h3>` elements follow a clean, logical outline.<br>**Fix:** Maintain this clean hierarchy across other directory pages. |
| Accessibility | Media Alt Quality | Headshot Gallery | 🟢 Low | **Issue:** Headshot alt tags consistently follow the pattern `"[Name] - [Title]"`.<br>**Fix:** Exemplary alt tag practice. |
| Accessibility | Avatar Placeholder | Melanie Ferris profile card | 🟢 Low | **Issue:** Uses generic brand graphic (`ITM_4CP_DANCER-298x300.png`) as a placeholder. Alt text describes role accurately.<br>**Fix:** When available, update image asset to a photographic headshot. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| Content | Placeholder Media | Melanie Ferris Profile Card | 🟢 Low | **Issue:** Uses an illustrated logo graphic (`ITM_4CP_DANCER-298x300.png`) rather than an actual photograph.<br>**Fix:** Replace with a high-resolution photographic headshot when supplied by the Board member. |
| Content | Editorial Quality | Staff & Board Titles | 🟢 Low | **Issue:** Names, executive titles, and roles are accurate, properly formatted, and consistent.<br>**Fix:** Maintain current editorial roster. |
| Content | Image Asset Health | Headshot Media Files | 🟢 Low | **Issue:** All 17 headshot images and badges load with HTTP 200 without broken paths or staging leaks.<br>**Fix:** Clean media inventory. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines display random sentence fragments instead of a structured overview.<br>**Fix:** Add an engaging meta description (e.g. "Meet the dedicated staff and Board of Directors driving Indigenous Tourism Manitoba, empowering Indigenous entrepreneurs across the province."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links on LinkedIn, Facebook, or messaging platforms lack branded image cards.<br>**Fix:** Implement `og:title`, `og:description`, and `og:image` featuring a group or branded leadership graphic. |
| Marketing | Community Representation | Profile cards display title only | 🟡 Medium | **Issue:** Community affiliations / Treaty territories are only visible on individual child bio pages.<br>**Fix:** Add a subtitle tag or nation affiliation directly on the directory card (e.g. "Peguis First Nation", "Métis"). |
| Marketing | Bottom Exit Funnel | Page ends after Board grid | 🟡 Medium | **Issue:** Visitors reaching the bottom of the page have no closing CTA before the footer.<br>**Fix:** Repeat the "Connect With Our Team" CTA banner at the bottom of the board grid. |
| Performance | Cumulative Layout Shift (CLS) | Team member headshots (`.img-circular.team-photo`) | 🟡 Medium | **Issue:** **15 of 17 images** on the page lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add `width="300" height="300"` or matching aspect ratio attributes to circular headshot markup in `page-our-team.php` / block template. |
| Performance | Duplicate Stylesheet | Bootstrap Icons (`areoi-bootstrap-icons-css` & `bootstrap-icons-css`) | 🟡 Medium | **Issue:** Bootstrap Icons v1.11.3 is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Deregister redundant CDN stylesheet enqueue. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Script Loading Efficiency | Theme JS bundles | 🟢 Low | **Issue:** Scripts load synchronously in page body without `defer`.<br>**Fix:** Add `defer` attribute via script loader filters. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Unify Opening Heading Hierarchy:** Align the template heading order so `<h1>Our Team</h1>` opens the content hierarchy.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in the main navigation menu.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add tailored search description and social share tags to `<head>`.
- [ ] **[PERFORMANCE] Add Dimensions to Circular Headshots:** Update the team grid template to output explicit `width` and `height` attributes on each circular portrait image to lock layout geometry.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Focus State Consistency:** Ensure team member card links have clear `:focus-visible` outline styling.
- [ ] **[CONTENT] Source Missing Headshot:** Obtain and upload an official headshot photo for Melanie Ferris (Director At Large).
- [ ] **[MARKETING] Add Bottom CTA Block:** Replicate the "Contact Us" inquiry button at the bottom of the roster to capture visitors who scroll through the full team listing.
- [ ] **[MARKETING] Surface Territory / Community Badges:** Display regional/community affiliations on card previews.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove redundant CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Photograph Update:** Replace the dancer logo avatar for Melanie Ferris with an official team photograph when provided.
- [ ] **[CONTENT] Direct Contact / LinkedIn Links:** Consider providing public business contact email or LinkedIn links for key executive staff members.
- [ ] **[MARKETING] Leadership Inquiries:** Provide direct routing for media/speaking inquiries for key executives (CEO / President).
- [ ] **[PERFORMANCE] Lazy Loading:** Ensure all headshot images located below the fold use `loading="lazy"`.

---

### 4.4 Reconciliation (`/reconciliation/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/reconciliation/`
- **Template / Structure:** `Standard Page / Featured Operators Block`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/reconciliation_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/reconciliation_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/reconciliation_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/reconciliation_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the primary `<h1>Reconciliation</h1>` in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or use semantic list items. |
| Accessibility | Alt Text Quality | Featured Operator: Bistro on Notre Dame | 🟡 Medium | **Issue:** Alt attribute is a generic camera label: `alt="Food 1"`.<br>**Fix:** Update alt attribute to descriptive copy: `alt="Indigenous-inspired culinary dishes served at Bistro on Notre Dame"`. |
| Accessibility | Alt Text Quality | Featured Operator: Spence Custom Carving | 🟡 Medium | **Issue:** Alt attribute contains a raw filename slug: `alt="SpenceFProfile"`.<br>**Fix:** Update alt attribute to: `alt="Handcrafted Indigenous wood carving by Spence Custom Carving"`. |
| Accessibility | Alt Text Quality | Featured Operator: Residential School Museum | 🟡 Medium | **Issue:** Alt attribute is vague: `alt="Monument"`.<br>**Fix:** Update alt attribute to: `alt="National Indigenous Residential School Museum monument in Portage la Prairie"`. |
| Accessibility | Alt Text Quality | Featured Operator: Wapusk Adventures | 🟢 Low | **Issue:** Alt text is minimal: `alt="Wapusk Winter"`.<br>**Fix:** Update alt attribute to: `alt="Dog sledding winter adventure in Churchill with Wapusk Adventures"`. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| Content | Editorial Tone & Cultural Protocol | Core Narrative | 🟢 Low | **Issue:** Copy reflects appropriate solemnity and cultural respect regarding residential schools and treaty territories.<br>**Fix:** High editorial baseline maintained. |
| Content | Media Asset Health | Featured Operator Photography | 🟢 Low | **Issue:** All 12 photographic images and logos resolve with HTTP 200 without broken paths.<br>**Fix:** Clean media inventory. |
| Marketing | Page Exit / Conversion CTA | Conclusion of "Grounded in Cultural Authenticity" | 🟡 Medium | **Issue:** Page drops directly into the footer without next steps or conversion prompts.<br>**Fix:** Add a dual conversion CTA banner: "Explore Authentic Experiences" (`/operators/`) and "View Experience Map" (`/experience-map/`). |
| Marketing | Directory Linkage | 4 featured operator cards | 🟡 Medium | **Issue:** No button below the featured grid to view the full directory of cultural operators.<br>**Fix:** Add an "Explore All Cultural Experiences" button beneath the 4-card grid. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines display unstructured text snippets.<br>**Fix:** Add an impactful meta description (e.g. "Discover how Indigenous Tourism Manitoba advances reconciliation through authentic cultural tourism, community partnerships, and education."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Social shares lack branded preview cards and image thumbnails.<br>**Fix:** Implement `og:title`, `og:description`, and `og:image`. |
| Marketing | Educational Engagement | Solely narrative text | 🟡 Medium | **Issue:** Visitors interested in educational reconciliation resources lack download links.<br>**Fix:** Add downloadable educational PDFs or links to the TRC Call to Action 92 for business. |
| Performance | Image Asset Weight | Featured operator images (`SpenceFProfile-scaled.jpg`, `FCA486D3...jpeg`) | 🟡 Medium | **Issue:** Several photographic assets exceed 400KB - 540KB each.<br>**Fix:** Convert to WebP format (< 100 KB) with proper responsive sub-sizes. |
| Performance | Cumulative Layout Shift (CLS) | Banner block & operator cards | 🟡 Medium | **Issue:** **10 of 12 images** lack explicit `width` and `height` attributes in HTML.<br>**Fix:** Declare explicit dimensions (`width` / `height`) on banner block and `.featured-operator-card-image` templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons v1.11.3 is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Script Loading Efficiency | Theme JS bundles | 🟢 Low | **Issue:** Scripts (`fancybox.umd.js`, `theme.js`, `blocks.js`) load synchronously without `defer`.<br>**Fix:** Apply `defer` attribute to non-critical asset enqueues. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Unify Opening Heading Hierarchy:** Align the template heading order so `<h1>Reconciliation</h1>` opens the content hierarchy.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Add Bottom Action Banner:** Insert an "Explore Authentic Experiences" CTA banner before the footer.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add tailored search description and social sharing metadata to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Operator Cards:** Add explicit `width` and `height` attributes to the featured operator card grid template to eliminate layout jumping.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Remediate Operator Card Alt Text:** Update media library alt tags for featured cards (`Food 1` &rarr; `Bistro on Notre Dame cuisine`, `SpenceFProfile` &rarr; `Spence Custom Carving artwork`, `Monument` &rarr; `National Indigenous Residential School Museum monument`).
- [ ] **[CONTENT] Resource Downloads:** Consider adding downloadable educational resources (e.g. TRC Calls to Action 92 for Business) for tourism operators.
- [ ] **[MARKETING] Directory Routing:** Add a button below the featured operator grid linking to the `/operators/` directory.
- [ ] **[MARKETING] Resource Links:** Provide downloadable educational guides for travelers seeking respectful cultural protocol.
- [ ] **[PERFORMANCE] Compress Featured Images:** Run a WebP compression pass on `SpenceFProfile-scaled.jpg` and `FCA486D3-AC50...jpeg`.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Focus Ring Verification:** Ensure `:focus-visible` outlines remain distinct across operator card hyperlinks.
- [ ] **[CONTENT] Partner Hyperlinks:** Ensure direct cross-links to the National Indigenous Residential School Museum profile page (`/operator/national-indigenous-residential-school-museum-of-canada/`).
- [ ] **[MARKETING] Partner Accreditations:** Highlight community and Elder endorsements where applicable.
- [ ] **[PERFORMANCE] Native Lazy Loading:** Ensure `loading="lazy"` is applied to lower operator cards.

---

### 4.5 Things To Do (`/things-to-do/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/things-to-do/`
- **Template / Structure:** `Experience Landing Page / Map Embed`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/things-to-do_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/things-to-do_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/things-to-do_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/things-to-do_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main `<h1>Things To Do</h1>` in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Pillar Section Outline | Experience Categories | 🟢 Low | **Issue:** `<h2>Explore Authentic Indigenous Experiences</h2>` with subordinate `<h3>` headings (Culture & Heritage, Outdoor & Nature, Culinary Traditions) creates a clean, logical outline.<br>**Fix:** Maintain this structural hierarchy. |
| Accessibility | Alt Text Quality | Logos & Feature Images | 🟢 Low | **Issue:** All 6 images contain valid and descriptive `alt` attributes.<br>**Fix:** Clean alt tag baseline. |
| Accessibility | Map Section Accessibility | Interactive Experience Map | 🟢 Low | **Issue:** Ensure map container or iframe provides an accessible name (`aria-label="Interactive Manitoba Tourism Map"`).<br>**Fix:** Add accessible label to interactive map block. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| Content | Thematic Categorization | 3 Experience Pillars | 🟢 Low | **Issue:** Clear editorial descriptions for Culture & Heritage, Outdoor & Nature, and Culinary Traditions.<br>**Fix:** High editorial baseline maintained. |
| Content | Media Asset Health | Hero & Brand Media Files | 🟢 Low | **Issue:** All 6 images resolve with HTTP 200 without broken paths or staging leaks.<br>**Fix:** Clean media inventory. |
| Marketing | Category Funnel Routing | All 3 pillar buttons link to `/operators/` | 🟡 Medium | **Issue:** Travelers clicking "Explore Culinary" or "View Outdoor" land on the full unfiltered 22-operator list.<br>**Fix:** Deep-link buttons to filtered taxonomy URLs or pass category query parameters (e.g. `/operators/?category=culinary`). |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of tourism activities.<br>**Fix:** Add an enticing meta description (e.g. "Plan your trip with Indigenous Tourism Manitoba: explore cultural heritage sites, authentic guided outdoor adventures, and culinary traditions."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Social shares lack branded rich preview cards and imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Marketing | Seasonal Campaign Block | Static evergreen pillars | 🟡 Medium | **Issue:** No seasonal feature highlights (e.g., Winter Northern Lights & Sledding, Summer Pow Wow Trail).<br>**Fix:** Introduce a dynamic seasonal showcase widget above the category grid. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` dimensions.<br>**Fix:** Add explicit dimensions to the opening card template. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Script Loading Efficiency | Theme JS bundles | 🟢 Low | **Issue:** Scripts (`fancybox.umd.js`, `theme.js`) load synchronously without `defer`.<br>**Fix:** Apply `defer` attribute to non-critical script tags. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Unify Opening Heading Hierarchy:** Align template heading order so `<h1>Things To Do</h1>` opens the content hierarchy.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[MARKETING] Deep-Link Category CTAs:** Route pillar buttons to categorized operator listings rather than the generic archive.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Interactive Map ARIA Label:** Add `aria-label="Manitoba Indigenous Tourism Map"` to the experience map block.
- [ ] **[CONTENT] Seasonal Filter Callouts:** Add seasonal highlights (Summer Pow Wows, Winter Aurora & Dog Sledding, Fall Harvesting).
- [ ] **[MARKETING] Add Seasonal Campaign Spotlight:** Highlight timely seasonal itineraries (e.g., Fall harvest & cultural tours).
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.
- [ ] **[PERFORMANCE] Optimize Hero Media:** Compress `about-itm.jpg` to WebP.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Category Focus States:** Ensure experience pillar cards maintain high-contrast focus rings when navigated via keyboard.
- [ ] **[CONTENT] Featured Operator Snippets:** Embed 2–3 featured operator preview cards directly under each experience category pillar.
- [ ] **[MARKETING] Interactive Map Embed:** Embed a lightweight preview of the experience map directly on the page above the CTA button.
- [ ] **[PERFORMANCE] Asset Deferral:** Add `defer` attribute to theme scripts to optimize main thread parsing.

---

### 4.6 Experience Map (`/experience-map/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/experience-map/`
- **Template / Structure:** `Leaflet Map View / Operator Directory`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/experience-map_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/experience-map_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/experience-map_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/experience-map_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Page Header / Document Root | 🔴 Critical | **Issue:** **No `<h1>` tag exists on the page.** The DOM jumps from top `<h3>` cards directly into `<h3>Operators</h3>` and `<h2>` listings.<br>**Fix:** Insert `<h1>Indigenous Tourism Experience Map</h1>` at the top of the main template (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Map Accessibility | Leaflet Map Container | 🟡 Medium | **Issue:** The dynamic Leaflet map container lacks `role="region"` and `aria-label` descriptors for assistive technologies.<br>**Fix:** Add `role="region" aria-label="Interactive Manitoba Tourism Map"` to the Leaflet map container element. |
| Accessibility | Map Keyboard Traps | Leaflet Interactive Canvas | 🟡 Medium | **Issue:** Map gesture handling requires two-finger / Ctrl+scroll pan; keyboard navigation between map pins needs clear instructions.<br>**Fix:** Ensure map controls and pin popups are focusable and can be bypassed via skip navigation. |
| Accessibility | Alt Text Coverage | Operator Grid Images | 🟢 Low | **Issue:** All 22 operator card images include accurate business name alternative text (`alt="Teekca's Boutique"`, `alt="Wapusk Adventures"`).<br>**Fix:** Clean media alt text baseline. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| Content | Geographic Directory Integrity | 22 Operator Listings | 🟢 Low | **Issue:** All 22 accredited operator businesses are listed with verified links and accurate titles.<br>**Fix:** Comprehensive directory baseline. |
| Content | Media Asset Health | Map & Card Imagery | 🟢 Low | **Issue:** All 28 image assets return HTTP 200 OK without broken file paths.<br>**Fix:** Clean media inventory. |
| Marketing | Regional Map Filtering | Map shows all pins simultaneously | 🟡 Medium | **Issue:** Travelers planning a specific regional trip (e.g. Churchill northern adventure) must manually search and zoom.<br>**Fix:** Add quick regional filter pills (Northern Manitoba, Interlake, Eastman, Winnipeg Area) that dynamically re-center the map and filter the list below. |
| Marketing | Introductory Value Prop | Jumps directly to map canvas | 🟡 Medium | **Issue:** Lacks an opening headline and trip planning orientation.<br>**Fix:** Add an opening headline: `<h1>Explore Indigenous Experiences Across Manitoba</h1>` with brief instructions. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the interactive map tool.<br>**Fix:** Add an engaging meta description (e.g. "Use the interactive Indigenous Tourism Manitoba Experience Map to discover authentic cultural tours, lodgings, and artisan shops across the province."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Social shares lack branded preview cards and visual map thumbnails.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Critical Media Weight | Nonsuch Brewing thumbnail (`Screenshot-2023-09-05-at-11.07.18-AM.png`) | 🔴 Critical | **Issue:** An uncompressed 13.06 MB PNG file is transferred on initial page load.<br>**Fix:** Replace/compress with an optimized WebP thumbnail (< 100 KB), saving 12.9 MB. |
| Performance | Heavy Media Weight | Anne Mulaire thumbnail (`Anne-2024_...png`) | 🟠 High | **Issue:** An uncompressed 2.62 MB PNG file is transferred in the card grid.<br>**Fix:** Convert to WebP format (< 120 KB), saving 2.5 MB. |
| Performance | Cumulative Page Weight | All 22 Operator Thumbnails | 🟠 High | **Issue:** Total page weight exceeds **26.55 MB** across 28 image requests.<br>**Fix:** Batch convert all uploaded operator featured images to WebP (< 100 KB each), bringing total payload under 1.5 MB. |
| Performance | Stylesheet & Script Overhead | Leaflet map extensions & plugins | 🟡 Medium | **Issue:** 17 separate stylesheets and 8 map plugin scripts load without asset concatenation or `defer`.<br>**Fix:** Minify, combine where possible, and apply `defer` to non-critical map scripts. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Insert Primary H1 Heading:** Add `<h1>Indigenous Tourism Experience Map</h1>` to `page-experience-map.php` template.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[MARKETING] Add Header Headline & Orientation:** Insert an explicit `<h1>` title and 1-sentence prompt above the map.
- [ ] **[PERFORMANCE] Compress 13 MB Nonsuch Asset:** Immediately replace `Screenshot-2023-09-05-at-11.07.18-AM.png` with a compressed WebP thumbnail (< 100 KB).
- [ ] **[PERFORMANCE] Compress 2.6 MB Anne Mulaire Asset:** Replace `Anne-2024_...png` with an optimized WebP (< 120 KB).

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Add ARIA Region to Leaflet Map:** Equip the map wrapper with `role="region" aria-label="Interactive Experience Map"`.
- [ ] **[ACCESSIBILITY] Heading Tree Reorganization:** Align operator listing headings under a clear `<h2>` section.
- [ ] **[CONTENT] Add Map Legend / Regional Filters:** Provide quick-filter toggles for Manitoba tourism regions (North, Interlake, Parkland, Central, Eastman, Winnipeg).
- [ ] **[MARKETING] Implement Regional Filter Chips:** Add filter buttons to sort operators by tourism region (Northern, Central, Interlake, Eastman, Winnipeg).
- [ ] **[PERFORMANCE] Batch WebP Conversion:** Compress all 22 operator featured photos to WebP to eliminate >24 MB of transfer.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Map Pin Focus Indicators:** Ensure custom SVG marker pins display high-contrast focus rings when navigated via keyboard.
- [ ] **[CONTENT] Address & Driving Directions:** Display city/town name directly on each card under the map.
- [ ] **[MARKETING] Directions / Routing Integration:** Add a "Get Directions" link in Leaflet marker popups opening Google Maps directly.
- [ ] **[PERFORMANCE] Map Script Deferral:** Add `defer` attribute to Leaflet extension scripts (`gestures_leaflet-js`, `markercluster-js`, `zoomhome-js`).

---

### 4.7 Events (`/events/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/events/`
- **Template / Structure:** `3common Calendar Embed / Iframe`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/events_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/events_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/events_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/events_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Page Header / Main Content | 🔴 Critical | **Issue:** **No `<h1>` tag exists anywhere on the page.** The DOM jumps directly from top `<h3>` feature cards into the embedded iframe.<br>**Fix:** Insert `<h1>Indigenous Events in Manitoba</h1>` or `<h1>Events</h1>` above the iframe embed (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Iframe Accessibility | Embedded Calendar (`<iframe>`) | 🟡 Medium | **Issue:** The iframe uses a vendor-default title attribute: `title="3Common Upcoming and Past"`.<br>**Fix:** Update iframe title to descriptive text: `title="Upcoming Indigenous Tourism Manitoba Events Calendar"`. |
| Accessibility | Non-Visual Fallback | Main Content Area | 🟡 Medium | **Issue:** If the third-party iframe fails to load or JavaScript is restricted, no fallback text or event contact instructions exist.<br>**Fix:** Add accessible fallback text inside or adjacent to the iframe container with contact email for event inquiries. |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| Content | Content Completeness | Main Content Area | 🟡 Medium | **Issue:** The page contains solely an `<iframe>` embed with no introductory text or host page editorial copy.<br>**Fix:** Add an introductory heading and overview paragraph describing upcoming pow wows, artisan workshops, and cultural gatherings across Manitoba. |
| Content | Event Submission Guidance | Content Footer / Submission Block | 🟡 Medium | **Issue:** No instructions or submission links for operators seeking to add community events to the calendar.<br>**Fix:** Add an "Are You Hosting an Indigenous Event? Submit Your Event Details" section with an inquiry link/form. |
| Content | Widget Endpoint Health | 3common Calendar Embed | 🟢 Low | **Issue:** Third-party calendar API and iframe endpoint resolve with HTTP 200 OK.<br>**Fix:** Active integration. |
| Marketing | Operator Event Submission CTA | No submission mechanism on page | 🟡 Medium | **Issue:** First Nations, Métis communities, and operators cannot find where to submit cultural events to the calendar.<br>**Fix:** Add an "Are You Hosting an Event? [Submit Your Event](/contact-us/)" CTA block above/below the calendar. |
| Marketing | Value Proposition & Heading | Page jumps immediately into raw iframe | 🟡 Medium | **Issue:** Misses search ranking opportunity and lacks context on seasonal Manitoba celebrations.<br>**Fix:** Add `<h1>Indigenous Events & Cultural Gatherings</h1>` with a 2-sentence intro. |
| Marketing | Newsletter Lead Capture | No event alert subscription option | 🟡 Medium | **Issue:** Visitors seeking seasonal events leave without a capture mechanism.<br>**Fix:** Embed a "Get Monthly Indigenous Event Updates" email newsletter signup form. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines produce blank or unstructured SERP snippets.<br>**Fix:** Add a targeted meta description (e.g. "Discover upcoming Indigenous events, Pow Wows, cultural festivals, and community gatherings across Manitoba."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Social shares lack branded graphics and descriptions.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Third-Party Script Loading | 3common script (`profile_events.js`) | 🟡 Medium | **Issue:** Third-party script is loaded synchronously in the page body without `defer`.<br>**Fix:** Add `defer` or `async` to `<script src="https://3common.com/scripts/embed/profile_events.js"></script>`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` dimensions.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Insert Primary H1 Heading:** Add `<h1>Upcoming Indigenous Events</h1>` above the iframe in `page-events.php` / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Add Event Submission CTA Banner:** Insert an event submission prompt for community organizers and tourism members.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[MARKETING] Add Primary Page Headline:** Insert `<h1>Indigenous Events in Manitoba</h1>` above the calendar.
- [ ] **[PERFORMANCE] Defer Third-Party Calendar Script:** Add `defer` to the 3common embed script tag.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Update Iframe Title:** Change `title="3Common Upcoming and Past"` to `title="Indigenous Tourism Manitoba Events Calendar"`.
- [ ] **[ACCESSIBILITY] Provide Fallback Contact Copy:** Add a 1-sentence paragraph beneath the iframe: "Having trouble viewing events? Contact us at info@indigenoustourismmanitoba.ca or view our operator calendar."
- [ ] **[CONTENT] Add Introductory Editorial Copy:** Add an `<h1>Indigenous Events in Manitoba</h1>` headline and an introductory paragraph above the calendar.
- [ ] **[CONTENT] Add Event Submission CTA:** Add a closing section inviting community organizers to submit event details to ITM.
- [ ] **[MARKETING] Newsletter Event Alerts:** Add a Constant Contact newsletter signup block for upcoming festival announcements.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Keyboard Iframe Focus Trap Check:** Ensure keyboard users can easily tab into and past the 3common embed.
- [ ] **[CONTENT] Featured Major Annual Events:** Add static highlight cards for signature annual celebrations (e.g., Manito Ahbee Festival).
- [ ] **[MARKETING] Annual Major Festival Spotlights:** Feature permanent promo cards for major annual events like Manito Ahbee Festival.
- [ ] **[PERFORMANCE] Iframe Height Responsiveness:** Ensure the 800px fixed iframe height adjusts dynamically via `postMessage` listener on mobile viewports.

---

### 4.8 Our Operators Directory (`/operators/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/operators/`
- **Template / Structure:** `Operator Archive / Search & Filter`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/operators_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/operators_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/operators_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/operators_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Page Header / Main Content | 🔴 Critical | **Issue:** **No `<h1>` tag exists on the page.** The DOM jumps directly into `<h2>` operator business names.<br>**Fix:** Add an explicit `<h1>Our Operators</h1>` or `<h1>Indigenous Tourism Operators</h1>` at the top of the main content area (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the operator listings in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Pagination Controls | Archive Pagination | 🟡 Medium | **Issue:** Pagination navigation links lack `aria-label` descriptors and `aria-current="page"` on active page indicators.<br>**Fix:** Add `aria-label="Pagination Navigation"` to `<nav>` container and `aria-current="page"` to the active page number link. |
| Accessibility | Alt Text Coverage | Operator Grid Images | 🟢 Low | **Issue:** 100% of operator card photos include business name `alt` tags (`alt="Agowiidiwinan Centre"`, `alt="Anne Mulaire"`).<br>**Fix:** Maintain high alt tag coverage. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| Content | Directory Descriptions | Operator Cards | 🟢 Low | **Issue:** Business titles, categories (Accommodations, Attractions, Culinary, etc.), and regional designations are accurate and formatted consistently.<br>**Fix:** High editorial baseline maintained. |
| Content | Media Asset Health | Operator Photography | 🟢 Low | **Issue:** All 18 operator photographs and logos load with HTTP 200 without broken paths or staging leaks.<br>**Fix:** Clean media inventory. |
| Marketing | Introductory Value Prop | Directory starts immediately at card grid | 🟡 Medium | **Issue:** No intro headline or paragraph orienting travelers on how to explore and book authentic experiences.<br>**Fix:** Add an opening hero header: `<h1>Explore Authentic Indigenous Experiences</h1>` with a 2-sentence intro and category filter pills. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines generate arbitrary directory snippet fragments.<br>**Fix:** Add a targeted meta description (e.g. "Browse authentic Indigenous tourism operators across Manitoba—from cultural tours and culinary dining to outdoor adventures and artisan boutiques."). |
| Marketing | Operator Acquisition CTA | No bottom conversion block | 🟡 Medium | **Issue:** Indigenous business owners browsing the directory have no direct prompt to join the network.<br>**Fix:** Add a closing banner after pagination: "Are You an Indigenous Tourism Operator? [Become an ITM Member](/become-a-member/)". |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links lack rich cards and featured image previews.<br>**Fix:** Implement `og:title`, `og:description`, and `og:image`. |
| Marketing | Filter Usability | Search & Reset buttons present | 🟡 Medium | **Issue:** Text search alone requires user typing; category browsing is friction-heavy.<br>**Fix:** Add quick-filter chips for top sectors (Accommodations, Culinary, Outdoor, Art & Culture). |
| Performance | Critical Asset Weight | Nonsuch Brewing thumbnail (`Screenshot-2023-09-05-at-11.07.18-AM.png`) | 🔴 Critical | **Issue:** A raw uncompressed PNG image of **13.06 MB (13,058 KB)** is downloaded on initial page view.<br>**Fix:** Immediately replace/compress this asset to WebP format (< 100 KB), saving over 12.9 MB. |
| Performance | Heavy Asset Weight | Anne Mulaire thumbnail (`Anne-2024_...png`) | 🟠 High | **Issue:** An uncompressed **2.62 MB (2,619 KB)** PNG is served in the card grid.<br>**Fix:** Convert to WebP format (< 120 KB), saving 2.5 MB. |
| Performance | Cumulative Page Weight | Operator photography (`Copy-of-IMG-3629-scaled.jpg`, `sup-class-scaled.jpg`, etc.) | 🟠 High | **Issue:** Total page weight exceeds **21.9 MB** across 18 images.<br>**Fix:** Run an automated WebP conversion pass across all uploaded operator thumbnails. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟢 Low | **Issue:** 4 top cards lack explicit HTML `width` and `height` dimensions (directory cards correctly include dimensions).<br>**Fix:** Add dimensions to top card templates. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Insert Primary H1 Heading:** Add `<h1>Our Operators</h1>` to the directory archive template (`archive.php` or `page-operators.php`).
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description to `<head>`.
- [ ] **[MARKETING] Add "List Your Business" Bottom CTA:** Insert a member recruitment banner after pagination linking to `/become-a-member/`.
- [ ] **[PERFORMANCE] Compress Nonsuch Brewing Thumbnail:** Immediately replace `Screenshot-2023-09-05-at-11.07.18-AM.png` (13 MB) with an optimized WebP thumbnail (< 100 KB).
- [ ] **[PERFORMANCE] Compress Anne Mulaire Thumbnail:** Replace `Anne-2024_...png` (2.6 MB) with an optimized WebP image (< 120 KB).

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Enhance Pagination Markup:** Add `aria-label="Operators Pagination"` and `aria-current="page"` to the active page number.
- [ ] **[ACCESSIBILITY] Reorder Document Heading Tree:** Ensure operator cards use `<h2>` subordinate to the main `<h1>`.
- [ ] **[CONTENT] Direct Website / Booking Links:** Consider adding direct external website and booking links on the card preview level in addition to the single operator page link.
- [ ] **[MARKETING] Add Directory Header & Intro:** Add an explicit `<h1>` with brief intro copy.
- [ ] **[MARKETING] Category Filter Chips:** Implement visual category filter buttons at the top of the grid.
- [ ] **[PERFORMANCE] Batch WebP Conversion on Operator Uploads:** Convert all operator featured images to WebP to bring entire directory payload under 1.5 MB.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Card Focus Rings:** Ensure clear `:focus-visible` outlines around clickable operator card wrappers.
- [ ] **[CONTENT] Search & Filter Enhancement:** Provide dynamic category filter pills (Culinary, Tours, Accommodations) to improve directory browsing.
- [ ] **[MARKETING] Map View Toggle:** Add a "View on Map" toggle button linking directly to `/experience-map/`.
- [ ] **[PERFORMANCE] Verify Native Lazy Loading:** Ensure all operator cards below the top viewport row utilize `loading="lazy"`.

---

### 4.9 Become A Member (`/become-a-member/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/become-a-member/`
- **Template / Structure:** `Gravity Forms / Multi-tier Intake`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/become-a-member_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/become-a-member_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/become-a-member_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/become-a-member_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` feature cards precede the main `<h1>Become A Member</h1>` in the DOM outline.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Headings Structure | Conditional Form Sections | 🟡 Medium | **Issue:** Two `<h3>Payment Details</h3>` headings exist in conditional branches without unique distinguishing labels.<br>**Fix:** Differentiate conditional section headings (e.g. `<h3>Accredited Member Payment Details</h3>` vs `<h3>Partner Member Payment Details</h3>`). |
| Accessibility | Form Accessibility | Gravity Forms Fields (`#gform_4`) | 🟢 Low | **Issue:** Field labels, required asterisks, radio groupings, and signature canvas controls include accessible names and ARIA attributes.<br>**Fix:** Excellent form accessibility baseline. |
| Accessibility | Signature Canvas | Digital Signature Pad (`input_4_92`) | 🟢 Low | **Issue:** Clear button icon includes descriptive alternative text (`alt="Clear Signature"`).<br>**Fix:** Proper canvas fallback. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| Content | Membership Tier Clarity | Categories & Pricing | 🟢 Low | **Issue:** Clear breakdown of annual dues ($99 for Accredited, $0 for Emerging, $250 for Industry Partners) with explicit eligibility requirements.<br>**Fix:** High editorial clarity. |
| Content | Market Readiness Criteria | Checklist Module | 🟢 Low | **Issue:** Comprehensive market-ready criteria (insurance, operating licenses, booking mechanisms) clearly explained to applicants.<br>**Fix:** Transparent guidelines. |
| Content | Digital Application Form | Gravity Forms Embed | 🟢 Low | **Issue:** Seamless integration with clear input prompts and digital signature canvas.<br>**Fix:** Robust application flow. |
| Marketing | Form Completion Friction | 90+ form fields on a single page | 🟡 Medium | **Issue:** High cognitive load and abandonment risk for busy business owners.<br>**Fix:** Convert Gravity Forms to a multi-page step wizard (Step 1: Contact, Step 2: Category, Step 3: Criteria & Signature) with a progress bar. |
| Marketing | Social Proof & Operator Quotes | Zero member testimonials | 🟡 Medium | **Issue:** Missing credibility proof demonstrating how ITM membership helped existing operators grow bookings.<br>**Fix:** Embed 2–3 short operator quotes with headshots (e.g. from Feast Cafe Bistro or Borealis Beading) along the sidebar. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines produce empty or unstructured SERP snippets.<br>**Fix:** Add a targeted meta description (e.g. "Join Indigenous Tourism Manitoba to access marketing promotion, business development grants, training programs, and network opportunities."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Social sharing produces generic link cards without branded imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Stylesheet Overhead | Gravity Forms, Getwid, Theme styles | 🟡 Medium | **Issue:** 16 separate CSS files are requested on initial load.<br>**Fix:** Combine/minify form styles and conditionally dequeue unused block stylesheets. |
| Performance | Script Stack Volume | Gravity Forms + Signature + ReCAPTCHA | 🟡 Medium | **Issue:** 47 script tags are parsed on the page (though key GF scripts correctly use `defer`).<br>**Fix:** Maintain deferral and tree-shake unused helper modules. |
| Performance | Cumulative Layout Shift (CLS) | Opening cards & form icons | 🟡 Medium | **Issue:** 6 of 8 images lack explicit HTML `width` and `height` dimensions.<br>**Fix:** Add explicit dimensions to top feature cards and portrait logos. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Align Heading Hierarchy:** Reorder top feature card headings beneath the primary `<h1>`.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[MARKETING] Convert Form to Multi-Step Wizard:** Enable Gravity Forms pagination/steps to decrease perceived form friction.
- [ ] **[PERFORMANCE] Declare Image Dimensions:** Add explicit `width` and `height` attributes to top feature cards and portrait branding logos.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Disambiguate Conditional Headings:** Give unique titles to conditional payment subheadings in the Gravity Forms builder.
- [ ] **[CONTENT] Downloadable PDF Member Kit:** Add a link to download the complete ITM Member Benefits & Standards PDF package for offline review.
- [ ] **[MARKETING] Add Member Testimonials:** Feature 2 authentic member quotes highlighting tangible promotional benefits.
- [ ] **[MARKETING] Pre-Application Eligibility Widget:** Add a 3-question interactive modal ("Which membership tier is right for you?").
- [ ] **[PERFORMANCE] Optimize Gravity Forms CSS Enqueue:** Disable unused legacy Gravity Forms CSS files (`gravity_forms_theme_reset-css`, `orbital_theme`) if custom theme styling overrides them.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Form Error Announcement:** Ensure Gravity Forms validation failure banners trigger an `aria-live="assertive"` announcement for screen reader users upon failed submission.
- [ ] **[CONTENT] Member FAQ Accordion:** Add a brief FAQ accordion addressing common questions regarding Indigenous ownership verification and payment methods.
- [ ] **[MARKETING] Application Confirmation Email:** Ensure custom branded auto-responder email is configured with onboarding next steps.
- [ ] **[PERFORMANCE] ReCAPTCHA Optimization:** Configure reCAPTCHA v3 or Cloudflare Turnstile to load asynchronously only when the user focuses on form inputs.

---

### 4.10 Member Benefits (`/member-benefits/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/member-benefits/`
- **Template / Structure:** `Banner Block / 4-Pillar Grid`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/member-benefits_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/member-benefits_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/member-benefits_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/member-benefits_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Member Benefits</h2>`.<br>**Fix:** Upgrade `<h2>Member Benefits</h2>` to `<h1>Member Benefits</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Benefit Pillar Hierarchy | Core Service Pillars | 🟢 Low | **Issue:** The four benefit pillars (`<h3>Marketing & Promotion</h3>`, `<h3>Training & Certification</h3>`, `<h3>Funding & Grants</h3>`, `<h3>Advocacy & Community</h3>`) sit cleanly under `<h2>What ITM Membership Delivers</h2>`.<br>**Fix:** Maintain this clean subordinate hierarchy. |
| Accessibility | Media Alt Text | Logo & Feature Graphics | 🟢 Low | **Issue:** All images include descriptive alternative text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| Content | Benefit Pillar Articulation | Four Core Pillars | 🟢 Low | **Issue:** Clear, actionable descriptions of marketing amplification, training access, grant navigation, and provincial advocacy.<br>**Fix:** High editorial value. |
| Content | Onboarding Flow | Bottom Call to Action | 🟢 Low | **Issue:** Clear closing section prompting prospective operators to submit their membership application.<br>**Fix:** Logical content flow. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Value Pillar Micro-CTAs | Static text descriptions | 🟡 Medium | **Issue:** Users interested specifically in Training or Grants must scroll to bottom to take action.<br>**Fix:** Add contextual micro-links inside each pillar (e.g., "View Guide Training" under Training & Certification; "Contact Grant Navigator" under Funding). |
| Marketing | Social Proof & Impact Metrics | Pure descriptive narrative | 🟡 Medium | **Issue:** Lacks quantifiable proof of community impact and economic support.<br>**Fix:** Add a stat banner highlighting metrics (e.g. "60+ Authentic Indigenous Operators Supported across Manitoba"). |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of membership value and privileges.<br>**Fix:** Add a targeted meta description (e.g. "Explore the benefits of joining Indigenous Tourism Manitoba: promotional marketing, accredited guide training, grant access, and province-wide advocacy."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2>Member Benefits</h2>` to `<h1>Member Benefits</h1>` in `page-member-benefits.php` / block template.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Partner Program Badges:** Add visual trust badges for partner organizations (ITAC, Travel Manitoba, Tourism HR Canada) next to advocacy and grant pillars.
- [ ] **[MARKETING] Add Micro-CTAs to Benefit Pillars:** Insert direct links to `/guide-training-program/` and grant inquiries inside individual pillar cards.
- [ ] **[MARKETING] Add Impact Statistics Counter:** Highlight number of active operators, annual marketing impressions, and training graduates.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Pillar Icon Accessibility:** If icons or glyphs are added to the 4 benefit pillars, ensure they include `aria-hidden="true"`.
- [ ] **[CONTENT] Downloadable One-Pager:** Provide a downloadable 1-page "Member Benefits Summary PDF" for board and community presentations.
- [ ] **[MARKETING] Downloadable Member Brochure:** Add a "Download Benefits Brochure" button next to the primary registration button.
- [ ] **[PERFORMANCE] SVG Vector Icons:** Use lightweight inline SVGs for benefit pillar graphics rather than CSS webfonts.

---

### 4.11 New Account Request (`/new-account-request/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/new-account-request/`
- **Template / Structure:** `Banner Block / Intake Instructions`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/new-account-request_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/new-account-request_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/new-account-request_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/new-account-request_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Hero Banner Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The banner title is marked up as `<h2>New Account Request</h2>`.<br>**Fix:** Upgrade `<h2 class="banner-block-title">` to `<h1>New Account Request</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Section Structure | Instruction Block | 🟢 Low | **Issue:** Body section uses logical hierarchy: `<h2>Request an Operator or Member Account</h2>` followed by `<h3>How to Submit</h3>`.<br>**Fix:** Clean sub-heading outline. |
| Accessibility | Media Alt Text | Logo & Feature Graphics | 🟢 Low | **Issue:** Images and branding logos include valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| Content | Data Intake Mechanism | Account Request Box | 🟡 Medium | **Issue:** Users are currently instructed to draft an email manually rather than completing an integrated intake form.<br>**Fix:** Embed a lightweight 4-field Gravity Form (Business Name, Contact Person, Email, Community Affiliation) to streamline submissions. |
| Content | SLA & Expectation Setting | Timeline Notice | 🟢 Low | **Issue:** Clear commitment to deliver credentials within two business days.<br>**Fix:** High transparency. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Lead Capture Friction | "Email Membership Team" button | 🟡 Medium | **Issue:** Users without a configured default mail client encounter broken click handlers.<br>**Fix:** Replace mailto button with an embedded 4-field quick-intake form (Business Name, Contact, Email, Community). |
| Marketing | Existing Member Pathway | No login link present | 🟡 Medium | **Issue:** Existing operators arriving here looking to log in are not provided a login route.<br>**Fix:** Add a secondary prompt: "Already registered? [Log in to your account](/login/)". |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the operator account request process.<br>**Fix:** Add a targeted meta description (e.g. "Request an Indigenous Tourism Manitoba member account to manage your business listing, update photos, and access partner resources."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Banner Title to H1:** Change `<h2>New Account Request</h2>` to `<h1>New Account Request</h1>` in `page-new-account-request.php` / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Replace Email Link with On-Page Form:** Embed a dedicated 4-field "Request Portal Access" form directly on the page to prevent email friction and missing fields.
- [ ] **[MARKETING] Embed On-Page Intake Form:** Replace the email button with an embedded Gravity Form to capture submissions instantly.
- [ ] **[MARKETING] Add Member Login Link:** Add a clear login redirect for active members.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Direct Mailto Fallback:** Ensure email button includes explicit `aria-label="Email Membership Team at info@indigenoustourismmanitoba.ca"`.
- [ ] **[CONTENT] Direct Member Login Link:** Add a "Already Have An Account? [Log In Here](/login/)" link for existing members who navigated here by mistake.
- [ ] **[MARKETING] Portal Feature Highlights:** Add 3 bullet points highlighting specific portal capabilities (Update business hours, upload tour photos, access grant templates).
- [ ] **[PERFORMANCE] Optimize Banner Overlay:** Use pure CSS gradients for the banner background rather than DOM overlay divs.

---

### 4.12 Guide Training Program (`/guide-training-program/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/guide-training-program/`
- **Template / Structure:** `Banner Block / 3-Step Pathway Hub`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/guide-training-program_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/guide-training-program_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/guide-training-program_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/guide-training-program_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Indigenous Guide Training Program</h2>`.<br>**Fix:** Upgrade `<h2>` to `<h1>Indigenous Guide Training Program</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Curriculum Hierarchy | 3-Step Pathway Section | 🟢 Low | **Issue:** The 3 training phases (`<h3>Introduction</h3>`, `<h3>7-Day Training</h3>`, `<h3>Practicum</h3>`) are logically ordered under `<h2>A Three-Step Pathway to Professional Guiding</h2>`.<br>**Fix:** Maintain this clean sequential outline. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** The menu item "More Learning Opportunities" points to a non-existent standalone slug `/indigenous-guide-training-program-more-learning-opportunities/` (**HTTP 404**).<br>**Fix:** Point the menu item to `/guide-training-program/#additional-learning-opportunities` or create a redirect. |
| Content | Curriculum Outline Quality | 3-Phase Educational Structure | 🟢 Low | **Issue:** Clear articulation of foundational theory, 7-day field intensive, and hands-on operator practicum.<br>**Fix:** High educational clarity. |
| Content | Inquiry & Application Pathway | Closing Call to Action | 🟢 Low | **Issue:** Prominent links guiding prospective trainees to the inquiry form (`/itm-indigenous-guide-training-program-inquiry-form/`).<br>**Fix:** Clean conversion flow. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Broken CTA Link | "More Opportunities" button | 🟡 Medium | **Issue:** Points to non-existent `/indigenous-guide-training-program-more-learning-opportunities/` (**HTTP 404**).<br>**Fix:** Point button to `#additional-learning-opportunities` anchor or update target URL. |
| Marketing | Lead Inquiry Funnel | "Inquire Now" button | 🟡 Medium | **Issue:** Primary conversion button routes smoothly to `/itm-indigenous-guide-training-program-inquiry-form/`.<br>**Fix:** Maintain prominent placement. |
| Marketing | Social Proof & Outcomes | Zero graduate testimonials | 🟡 Medium | **Issue:** Prospective guides cannot see career outcomes or operator hiring stories.<br>**Fix:** Add 2 graduate spotlight quotes with photos detailing their journey into professional guiding. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the training certification curriculum.<br>**Fix:** Add a targeted meta description (e.g. "Become a certified Indigenous tour guide in Manitoba. Discover our 3-step accredited training pathway covering storytelling, safety, and field practicum."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2>Indigenous Guide Training Program</h2>` to `<h1>Indigenous Guide Training Program</h1>` in `page-guide-training-program.php` / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL from `/indigenous-guide-training-program-more-learning-opportunities/` to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Fix Broken "More Opportunities" Button:** Change button target from `/indigenous-guide-training-program-more-learning-opportunities/` to `#additional-learning-opportunities`.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Upcoming Cohort Dates:** Add a callout box listing the next scheduled cohort training dates and locations across Manitoba.
- [ ] **[MARKETING] Add Graduate Testimonials:** Feature 2 authentic guide graduate quotes highlighting employability and mentorship.
- [ ] **[MARKETING] Training Dates Callout:** Add a prominent banner highlighting upcoming cohort start dates.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Step Number Semantics:** Use an ordered list (`<ol>`) for the 3-step pathway to convey sequential progress to screen readers.
- [ ] **[CONTENT] Graduate Spotlight Stories:** Feature 1–2 quotes or short bios of Indigenous guides who completed the program.
- [ ] **[MARKETING] Downloadable Course Syllabus:** Add a "Download Course Syllabus PDF" button for community career coordinators.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.13 Guide Training — Step 1: Introduction (`/indigenous-guide-training-program-step-1/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-1/`
- **Template / Structure:** `Banner Block / Step 1 Syllabus`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-1_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-1_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-1_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-1_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Step 1: Introduction</h2>`.<br>**Fix:** Upgrade `<h2>` to `<h1>Step 1: Introduction – Indigenous Guide Training Program</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Curriculum Structure | Curriculum & Eligibility | 🟢 Low | **Issue:** Clear section division with `<h2>Course Curriculum</h2>` and `<h2>Eligibility & Prerequisites</h2>`.<br>**Fix:** Maintain logical section breaks. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Syllabus Articulation | Course Curriculum Section | 🟢 Low | **Issue:** Well-structured modules detailing storytelling ethics, cultural protocols, and Manitoba Indigenous histories.<br>**Fix:** High instructional clarity. |
| Content | Sequential Step Pathway | Bottom Navigation | 🟢 Low | **Issue:** Clear forward link prompting trainees to review Step 2: 7-Day Training (`/indigenous-guide-training-program-step-2/`).<br>**Fix:** Logical user progression. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Direct Registration CTA | Step progression links only | 🟡 Medium | **Issue:** Users ready to apply for Step 1 must hunt for the top inquiry button.<br>**Fix:** Add a primary "Inquire & Apply for Step 1" button directly below the prerequisites block. |
| Marketing | Sequential Navigation | Hub and Next Step buttons | 🟡 Medium | **Issue:** Clear forward progression to `/indigenous-guide-training-program-step-2/`.<br>**Fix:** Maintain step-by-step breadcrumb/pagination model. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the Step 1 workshop.<br>**Fix:** Add a targeted meta description (e.g. "Step 1: Introduction to Indigenous Tour Guiding in Manitoba. Learn cultural safety, storytelling protocols, and foundational interpretation skills."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2>Step 1: Introduction</h2>` to `<h1>Step 1: Introduction – Indigenous Guide Training Program</h1>` in `page-indigenous-guide-training-program-step-1.php` / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Format & Duration Details:** Add an "At-a-Glance" info box specifying workshop duration (e.g. 2 Days / 16 Hours), delivery format (in-person vs hybrid), and locations.
- [ ] **[MARKETING] Add Bottom Inquiry CTA Button:** Place a gold "Inquire for Step 1 Cohorts" button alongside the "Next: Step 2" button.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Curriculum List Semantics:** Use structured unordered lists (`<ul><li>`) for prerequisite bullet points.
- [ ] **[CONTENT] Instructor Profile:** Mention the master cultural instructors and Elder advisors leading Step 1 workshops.
- [ ] **[MARKETING] Visual Step Indicator:** Add a 3-step visual progress stepper at the top of the content area showing Step 1 as active.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.14 Guide Training — Step 2: 7-Day Intensive (`/indigenous-guide-training-program-step-2/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-2/`
- **Template / Structure:** `Banner Block / Step 2 Curriculum`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-2_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-2_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-2_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-2_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Step 2: 7-Day Training Course</h2>`.<br>**Fix:** Upgrade `<h2>` to `<h1>Step 2: 7-Day Training Course – Indigenous Guide Training Program</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Curriculum Structure | Modules & Certifications | 🟢 Low | **Issue:** Clear section division with `<h2>Field Training Modules</h2>` and `<h2>Industry Certifications</h2>`.<br>**Fix:** Maintain logical section breaks. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Field Curriculum Detail | Training Modules Section | 🟢 Low | **Issue:** Clear articulation of wilderness safety, emergency communication, and land-based storytelling delivery.<br>**Fix:** High instructional clarity. |
| Content | Step Navigation Pathway | Bottom Navigation | 🟢 Low | **Issue:** Clear back and forward links connecting Step 1 (`/indigenous-guide-training-program-step-1/`) and Step 3 (`/indigenous-guide-training-program-step-3/`).<br>**Fix:** Logical user progression. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Direct Registration CTA | Step progression links only | 🟡 Medium | **Issue:** Qualified guides wishing to register directly for Step 2 must hunt for top buttons.<br>**Fix:** Add a primary "Inquire & Apply for Step 2 Intensive" button directly below the certifications block. |
| Marketing | Accreditation Credibility | Plain text certification list | 🟡 Medium | **Issue:** Lacks visual trust badges from certifying bodies (e.g. Red Cross, Tourism HR Canada).<br>**Fix:** Embed certification logo badges alongside Wilderness First Aid & Food Handling headings. |
| Marketing | Sequential Navigation | Step 1 and Step 3 buttons | 🟡 Medium | **Issue:** Clear progression connecting `/indigenous-guide-training-program-step-1/` and `/indigenous-guide-training-program-step-3/`.<br>**Fix:** Maintain step-by-step breadcrumb/pagination model. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the 7-day field intensive course.<br>**Fix:** Add a targeted meta description (e.g. "Step 2: 7-Day Field Intensive Course for Indigenous tour guides. Earn wilderness first aid, food safety, and land interpretation credentials in Manitoba."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2>Step 2: 7-Day Training Course</h2>` to `<h1>Step 2: 7-Day Training Course – Indigenous Guide Training Program</h1>` in `page-indigenous-guide-training-program-step-2.php` / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Certification Logos:** Add visual badges for accredited credentials earned during Step 2 (e.g. Red Cross Wilderness First Aid, Food Safe).
- [ ] **[MARKETING] Add Bottom Inquiry CTA Button:** Place a gold "Apply for Upcoming 7-Day Intensive" button alongside the "Next: Step 3" button.
- [ ] **[MARKETING] Embed Certification Logos:** Display official badges for wilderness first aid and hospitality partners.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Certification Badging Semantics:** Use structured definition lists (`<dl>`) or unordered lists (`<ul>`) for certification credentials (e.g. Wilderness First Aid, Food Handling).
- [ ] **[CONTENT] Gear & Equipment Checklist:** Add a downloadable checklist of required personal gear for the 7-day field intensive.
- [ ] **[MARKETING] Instructor Spotlight:** Add a short bio of the wilderness safety and cultural survival instructors.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.15 Guide Training — Step 3: Practicum (`/indigenous-guide-training-program-step-3/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-3/`
- **Template / Structure:** `Banner Block / Step 3 Practicum`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-3_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-3_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-3_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/indigenous-guide-training-program-step-3_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Step 3: Practicum</h2>`.<br>**Fix:** Upgrade `<h2>` to `<h1>Step 3: Practicum – Indigenous Guide Training Program</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Curriculum Structure | Mentorship & Career Pathways | 🟢 Low | **Issue:** Clear section division with `<h2>Workplace Mentorship</h2>` and `<h2>Career Pathways</h2>`.<br>**Fix:** Maintain logical section breaks. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Practicum Blueprint | Workplace Mentorship Section | 🟢 Low | **Issue:** Clear articulation of 40-hour field placement, senior guide shadowing, and practical evaluation.<br>**Fix:** High instructional clarity. |
| Content | Step Navigation Pathway | Bottom Navigation | 🟢 Low | **Issue:** Clear backward link connecting Step 2 (`/indigenous-guide-training-program-step-2/`) and primary application gateway.<br>**Fix:** Logical user progression. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Lead Conversion Funnel | "Inquire / Apply for Practicum" button | 🟡 Medium | **Issue:** Primary conversion button connects directly to `/itm-indigenous-guide-training-program-inquiry-form/`.<br>**Fix:** Maintain prominent placement. |
| Marketing | Host Operator Social Proof | Pure narrative description | 🟡 Medium | **Issue:** Lacks visual presence of partner operators who actively hire and mentor guides.<br>**Fix:** Add a "Participating Host Operators" logo band. |
| Marketing | Sequential Step Navigation | Step 2 and Hub links | 🟡 Medium | **Issue:** Clear backwards link to Step 2 (`/indigenous-guide-training-program-step-2/`).<br>**Fix:** Logical navigation flow. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the practicum placement.<br>**Fix:** Add a targeted meta description (e.g. "Step 3: Workplace Practicum & Mentorship for Indigenous tour guides. Complete 40 hours of supervised field guiding with Manitoba operators."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2>Step 3: Practicum</h2>` to `<h1>Step 3: Practicum – Indigenous Guide Training Program</h1>` in `page-indigenous-guide-training-program-step-3.php` / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Host Operator Directory:** Add a list or logos of participating Indigenous tourism businesses that host guide practicum placements.
- [ ] **[MARKETING] Add Host Operator Logos:** Feature logos of participating tour operators who host practicum students.
- [ ] **[MARKETING] Career Placement Rate:** Highlight post-graduation employment statistics.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Host Operator Placement List:** Format partner operator placements into an accessible unordered list (`<ul><li>`).
- [ ] **[CONTENT] Practicum Handbook Link:** Provide a downloadable PDF summarizing the supervisor evaluation rubric.
- [ ] **[MARKETING] Full Program Summary Link:** Provide a link back to the main `/guide-training-program/` page for visitors landing on Step 3 directly from search engines.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.16 Guide Training Program Inquiry Form (`/itm-indigenous-guide-training-program-inquiry-form/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/itm-indigenous-guide-training-program-inquiry-form/`
- **Template / Structure:** `Banner Block / Form Gateway`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/itm-indigenous-guide-training-program-inquiry-form_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/itm-indigenous-guide-training-program-inquiry-form_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/itm-indigenous-guide-training-program-inquiry-form_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/itm-indigenous-guide-training-program-inquiry-form_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Banner Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The main title is coded as `<h2 class="banner-block-title">Guide Training Program Inquiry</h2>`.<br>**Fix:** Upgrade `<h2>` to `<h1>Guide Training Program Inquiry</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Form Accessibility | Contact Action Card | 🟢 Low | **Issue:** Currently renders an email contact button rather than an HTML `<form>`. If an interactive form is embedded in the future, ensure explicit `<label for="...">` associations and `aria-required` attributes.<br>**Fix:** Maintain clear CTA button labels; prepare accessible form semantics upon form embed. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Functional Gap | Main Body Content | 🟠 High | **Issue:** **Page lacks an interactive form.** Titled "Inquiry Form" but only provides a direct mailto action button.<br>**Fix:** Embed a structured Contact Form 7 or Gravity Form with fields for Name, Community, Contact Info, and Program Step interest. |
| Content | Broken Fallback Link | Email Button | 🟡 Medium | **Issue:** Cloudflare email obfuscation fallback `<a href="/cdn-cgi/l/email-protection">` returns **HTTP 404** on static/non-JS clients.<br>**Fix:** Implementing an on-page web form eliminates dependence on obfuscated mailto links. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Program Pathways Copy | Pathways Overview | 🟢 Low | **Issue:** Clear concise summary of Step 1 (Intro), Step 2 (7-Day), and Step 3 (Practicum).<br>**Fix:** Excellent summary content. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Lead Capture Funnel | Mailto action button only | 🟡 Medium | **Issue:** Visitors on mobile or webmail must manually open email clients to compose a message, causing massive bounce rates.<br>**Fix:** Embed an instant on-page web form (Name, Email, Phone, Community, Step interest). |
| Marketing | Value Proposition & Funding | Mentions travel subsidies | 🟡 Medium | **Issue:** Explicitly mentioning funding support for Manitoba First Nations, Métis, and Inuit candidates lowers barrier to entry.<br>**Fix:** Keep funding notice highlighted in a high-contrast callout box. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the application process.<br>**Fix:** Add a targeted meta description (e.g. "Apply for the Indigenous Guide Training Program in Manitoba. Submit your expression of interest for accredited guiding courses and mentorship."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Script Injection Overhead | Cloudflare email decode | 🟢 Low | **Issue:** Synchronous script `email-decode.min.js` runs on client to decode mailto string.<br>**Fix:** Embedding a native web form eliminates email decode runtime requirements. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2 class="banner-block-title">Guide Training Program Inquiry</h2>` to `<h1>Guide Training Program Inquiry</h1>` in the page template or block editor.
- [ ] **[CONTENT] Embed Interactive Inquiry Form:** Add a Contact Form 7 or WPForms block with fields:
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Deploy Embedded Inquiry Form:** Add a Contact Form 7 / WPForms block directly into the right column to capture leads instantly without external email app dependency.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] FAQ Section:** Add 3–4 accordion items answering common applicant questions (e.g. course costs, travel funding, dates).
- [ ] **[MARKETING] Applicant Testimonial:** Add a brief quote or photo from a past training cohort graduate next to the inquiry form.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Screen Reader Action Label:** Add `aria-label="Email the Indigenous Tourism Manitoba Training Team"` to the "Email Training Team" button.
- [ ] **[CONTENT] Confirmation Messaging:** Configure an automatic email auto-responder confirming receipt of applicant expressions of interest.
- [ ] **[MARKETING] Response Time Expectation:** Add a note stating "Our team typically replies within 2 business days" below the submit button.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.17 Contact Us (`/contact-us/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/contact-us/`
- **Template / Structure:** `Banner Block / Gravity Forms Embed`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/contact-us_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/contact-us_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/contact-us_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/contact-us_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Banner Title | 🔴 Critical | **Issue:** **No `<h1>` heading exists in the DOM.** The main title is coded as `<h2>Get In Touch</h2>`.<br>**Fix:** Upgrade `<h2>` to `<h1>Contact Indigenous Tourism Manitoba</h1>` (WCAG 1.3.1 / 2.4.6). |
| Accessibility | Headings Structure | Skipped Heading Level | 🟡 Medium | **Issue:** An `<h5>FOLLOW US</h5>` directly follows `<h2>Get In Touch</h2>`, skipping `<h3>` and `<h4>` levels.<br>**Fix:** Change `<h5>FOLLOW US</h5>` to `<h3 class="h5">Follow Us</h3>`. |
| Accessibility | Form Accessibility | Gravity Forms Fields | 🟡 Medium | **Issue:** Form inputs have matching `<label for="...">` tags, but required fields rely on visual `*` without `aria-required="true"`.<br>**Fix:** Enable HTML5 output or declare `aria-required="true"` in Gravity Forms settings. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Contact Coordinates | Contact Info Sidebar | 🟢 Low | **Issue:** Clear address (Portage Ave, Winnipeg), telephone numbers, and email link.<br>**Fix:** Excellent contact transparency. |
| Content | Inquiry Form Fields | Gravity Forms Embed | 🟢 Low | **Issue:** Form contains fields for Full Name, Email, Phone, Subject, and Message with CAPTCHA protection.<br>**Fix:** Complete form structure. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Inbound Lead Routing | Single general contact form | 🟡 Medium | **Issue:** Inquiries from tourists, prospective member operators, and media are mixed into one inbox.<br>**Fix:** Add an "Inquiry Type" dropdown (Tourism Questions, Membership & Business Support, Guide Training, Media/Press). |
| Marketing | Response Time Expectation | No turnaround mentioned | 🟡 Medium | **Issue:** Visitors are unsure how quickly their inquiry will be addressed.<br>**Fix:** Add reassuring microcopy: *"We typically reply to all inquiries within 1–2 business days."* |
| Marketing | Newsletter Sign-up Cross-Sell | Standalone contact form | 🟡 Medium | **Issue:** Missed opportunity to capture contact inquiries into the monthly marketing newsletter list.<br>**Fix:** Add an opt-in checkbox: *"Keep me updated on Indigenous experiences and events in Manitoba."* |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of ITM's contact and office coordinates.<br>**Fix:** Add a targeted meta description (e.g. "Get in touch with Indigenous Tourism Manitoba. Contact our Winnipeg office for operator support, travel guidance, and partnership inquiries."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Form Stylesheet Concatenation | Gravity Forms Orbital CSS | 🟢 Low | **Issue:** Gravity Forms enqueues 4 separate orbital/framework stylesheets.<br>**Fix:** Enable CSS combination/minification via caching plugin. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[ACCESSIBILITY] Upgrade Primary Title to H1:** Change `<h2>Get In Touch</h2>` to `<h1>Get In Touch</h1>` in the template / block editor.
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[MARKETING] Add Response Time Reassurance:** Insert *"Our team responds to all inquiries within 1–2 business days"* above the form submit button.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Fix Heading Levels:** Standardize `<h5>FOLLOW US</h5>` to `<h3>` to maintain logical document hierarchy.
- [ ] **[ACCESSIBILITY] Declare `aria-required="true"`:** Ensure Gravity Forms outputs `aria-required="true"` on Name, Email, Subject, and Message fields.
- [ ] **[CONTENT] Interactive Google Map:** Embed a responsive map or direct Google Maps directions link for the Portage Avenue office.
- [ ] **[CONTENT] Office Hours:** Display public office / inquiry operating hours (e.g. Monday–Friday 9:00 AM – 4:30 PM CST).
- [ ] **[MARKETING] Add Departmental Routing Field:** Introduce a Subject / Department dropdown selector in Gravity Forms.
- [ ] **[MARKETING] Newsletter Opt-in Checkbox:** Enable users to subscribe to ITM news directly from the contact form.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Form Focus Highlighting:** Add a high-contrast 2px gold focus outline (`:focus-visible`) to active form input elements.
- [ ] **[CONTENT] Departmental Contact Routing:** Add a dropdown selector to the form (General Inquiries, Membership, Marketing/Events, Media/Press) to route emails directly to relevant staff.
- [ ] **[MARKETING] Custom Confirmation Screen:** Direct form submissions to a personalized thank-you confirmation highlighting featured experiences.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.18 Privacy Policy (`/privacy-policy/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/privacy-policy/`
- **Template / Structure:** `Legal / Clause Outline`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/privacy-policy_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/privacy-policy_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/privacy-policy_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/privacy-policy_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🟢 Low | **Issue:** `<h1>Privacy Policy</h1>` is correctly declared in the DOM.<br>**Fix:** Maintain existing heading tag structure. |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Policy Clause Hierarchy | Section Headings | 🟢 Low | **Issue:** Clear numerical section division (`<h2>1. Information We Collect</h2>`, `<h2>2. How We Use Information</h2>`, etc.).<br>**Fix:** High reading clarity. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Policy Currency | Page Intro | 🟢 Low | **Issue:** Policy lacks an explicit "Last Updated" or "Effective Date" timestamp.<br>**Fix:** Insert `Last Updated: November 2024` below the main `<h1>`. |
| Content | Third-Party Disclosure | Clause 3 | 🟢 Low | **Issue:** Mentions third-party service providers (Google Analytics, Constant Contact) and data protection compliance.<br>**Fix:** High legal transparency. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Trust & Regulatory Signals | PIPEDA / CASL disclosures | 🟡 Medium | **Issue:** Clear explanation of user data rights, newsletter subscription handling, and third-party tools.<br>**Fix:** Maintain transparent, plain-language privacy clauses. |
| Marketing | Contact & Inquiry Linkage | Text email mention | 🟡 Medium | **Issue:** Users wishing to exercise privacy rights or opt out can benefit from a direct link to `/contact-us/`.<br>**Fix:** Embed a direct clickable link to the Contact page in Section 4. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the privacy policy.<br>**Fix:** Add a targeted meta description (e.g. "Read Indigenous Tourism Manitoba's privacy policy regarding data collection, cookies, and personal information protection."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟢 Low | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | Asset Caching & Delivery | Global Scripts | 🟢 Low | **Issue:** Core scripts load efficiently with clean execution flow.<br>**Fix:** Maintain current caching policies. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Add Effective Date:** Include `Effective Date: [Month, Year]` at the beginning of the document.
- [ ] **[MARKETING] Direct Contact Link:** Hyperlink "contact our team" in Clause 4 to `/contact-us/`.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Table of Contents:** Add an in-page jump link navigation table at the top of long policy text.
- [ ] **[CONTENT] Cookie Preference Center:** Link to an interactive cookie consent preferences manager if detailed tracking categories are used.
- [ ] **[MARKETING] Plain English Summary Callout:** Add a 2-sentence summary banner at the top: *"We respect your privacy. We will never sell your personal information or share it without your consent."*
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

### 4.19 Site Map & Directory (`/sitemap/`)
- **Live URL:** `https://indigenoustourismmanitoba.ca/sitemap/`
- **Template / Structure:** `page-sitemap.php / Full Hierarchy`
- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/sitemap_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/sitemap_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/sitemap_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/sitemap_performance.md)

#### Findings Summary Table

| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |
|---|---|---|---|---|
| Accessibility | Headings Structure | Primary Page Title | 🟢 Low | **Issue:** `<h1>Site Map & Directory</h1>` is declared in the DOM.<br>**Fix:** Maintain existing heading tag structure. |
| Accessibility | Directory Taxonomy | Section Headings | 🟢 Low | **Issue:** Clear thematic sections (`<h2>Experiences & Destinations</h2>`, `<h2>Explore by Region</h2>`, `<h2>Explore by Category</h2>`, etc.).<br>**Fix:** High navigability. |
| Accessibility | List Semantics | Directory Links | 🟢 Low | **Issue:** Directory links are marked up in semantic `<ul>` and `<li>` elements, giving screen readers list counts.<br>**Fix:** High structural compliance. |
| Accessibility | Headings Structure | Top Feature Cards | 🟠 High | **Issue:** Four `<h3>` card headers precede the main content in the DOM tree.<br>**Fix:** Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| Accessibility | Media Alt Text | Feature Visuals | 🟢 Low | **Issue:** All images and logos feature valid, descriptive alt text.<br>**Fix:** High alt text compliance. |
| Content | Broken Directory Link | Explore by Region &rarr; Winnipeg | 🔴 Critical | **Issue:** Link `<a href="/operator-region/winnipeg/">Winnipeg</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Verify if the taxonomy slug is `capital-region` / `central`, create the term, or remove the obsolete link. |
| Content | Broken Directory Link | Explore by Region &rarr; Interlake | 🔴 Critical | **Issue:** Link `<a href="/operator-region/interlake/">Interlake</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Verify if the taxonomy slug is `central`, create the `interlake` term in WordPress, or remove the link. |
| Content | Broken Navigation Link | Header Menu &rarr; Programs | 🟠 High | **Issue:** Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error.<br>**Fix:** Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| Content | Directory Taxonomy | Thematic Sections | 🟢 Low | **Issue:** Directory is logically grouped into 6 clear thematic clusters.<br>**Fix:** High organizational clarity. |
| Content | Media Asset Integrity | Visual Elements | 🟢 Low | **Issue:** All 6 images return HTTP 200 OK with zero broken paths or staging leaks.<br>**Fix:** Clean assets. |
| Marketing | Crawl Budget & Authority | 2 broken directory links | 🟡 Medium | **Issue:** Dead links (`/operator-region/winnipeg/`, `/interlake/`) waste search engine crawl equity.<br>**Fix:** Remove or correct dead taxonomy links immediately. |
| Marketing | Lost Visitor Recovery | Static link lists | 🟡 Medium | **Issue:** Visitors arriving via dead ends or search have no interactive way to filter destinations.<br>**Fix:** Add an in-page search bar or keyword filter at the top of the directory. |
| Marketing | SEO & Search Snippet | `<meta name="description">` missing | 🟡 Medium | **Issue:** Search engines lack a concise summary of the site map.<br>**Fix:** Add a targeted meta description (e.g. "Browse the complete directory of Indigenous Tourism Manitoba experiences, regional guides, training programs, and operator resources."). |
| Marketing | Social Share Previews | Open Graph / Twitter cards missing | 🟡 Medium | **Issue:** Shared links render generic social preview cards without imagery.<br>**Fix:** Implement standard `og:title`, `og:description`, and `og:image`. |
| Performance | Cumulative Layout Shift (CLS) | Top feature cards | 🟡 Medium | **Issue:** 4 of 6 images lack explicit HTML `width` and `height` attributes.<br>**Fix:** Add explicit dimensions to opening card templates. |
| Performance | Duplicate Stylesheet | Bootstrap Icons | 🟡 Medium | **Issue:** Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN).<br>**Fix:** Remove redundant CDN stylesheet enqueue in theme functions. |
| Performance | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | 🟡 Medium | **Issue:** Global top feature image is transferred as an 841 KB JPEG.<br>**Fix:** Convert to WebP format (< 120 KB). |
| Performance | DOM Parsing Efficiency | Directory Link Lists | 🟡 Medium | **Issue:** 93 list items render with negligible layout recalculation overhead.<br>**Fix:** High DOM efficiency. |

#### Prioritized Task Checklist

##### 🔴 High Priority / Immediate Fixes
- [ ] **[CONTENT] Fix Broken Regional Directory Links**
- [ ] **[CONTENT] Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
- [ ] **[MARKETING] Remove / Fix 404 Taxonomy Links:** Clean up dead links to preserve crawl efficiency.
- [ ] **[MARKETING] Implement Meta Description & OG Tags:** Add targeted 155-character description and Open Graph tags to `<head>`.
- [ ] **[PERFORMANCE] Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

##### 🟡 Medium Priority / Improvements
- [ ] **[ACCESSIBILITY] Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.
- [ ] **[CONTENT] Dynamic Sitemap Generation:** Consider generating the HTML directory dynamically via WordPress menu / terms query to prevent dead taxonomy links from lingering.
- [ ] **[MARKETING] Interactive Site Search:** Embed a search box above the directory lists.
- [ ] **[PERFORMANCE] Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

##### 🟢 Low Priority / Polish & Recommendations
- [ ] **[ACCESSIBILITY] Alphabetical Sorting:** Ensure all child links within category lists are alphabetically sorted for faster scanning.
- [ ] **[CONTENT] Operator Count Badges:** Display active operator count next to each category link (e.g. "Culinary (8)").
- [ ] **[MARKETING] Featured Experiences Spotlight:** Highlight 3 top-trending cultural tours at the top of the directory page.
- [ ] **[PERFORMANCE] Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.

---

## 5. Implementation Roadmap & Recommended Phasing

To execute these tasks efficiently without introducing regressions, remediation should proceed across 5 phased milestones:

| Milestone | Focus Area | Key Actions | Estimated Effort | Target Impact |
|---|---|---|---|---|
| **Phase 1: Global Quick Wins** | Shared Components & Assets | - Fix Header Walker heading tag (`<h3>` &rarr; `<span>`)<br>- Add `width`/`height` to mega menu images<br>- Fix Global Menu 404 URL in WordPress<br>- Deduplicate CDN Bootstrap Icons in `functions.php`<br>- Replace 13MB & 2.6MB PNGs with WebP | **Day 1** (3–4 hours) | Clears ~110 audit flags sitewide; reduces total page weight by over 16MB instantly. |
| **Phase 2: Heading Hierarchy & Banner Block** | Document Structure & Templates | - Upgrade `banner_block.php` title to `<h1>`<br>- Insert `<h1>` on `contact-us`, `events`, `experience-map`, `operators`<br>- Remove duplicate `<h1>` on `home`<br>- Add `defer` filter to non-critical scripts | **Day 2** (4–5 hours) | Brings 100% of Core & Content pages into WCAG 2.1 AA heading compliance. |
| **Phase 3: Interactive Forms & Data Ingestion** | Lead Capture & Functional Gaps | - Build interactive form for Guide Training Inquiry page<br>- Build intake form & login route for New Account Request<br>- Add `aria-required` & routing dropdown to Contact Us form<br>- Run DB search-and-replace for `lndo.site` staging URLs | **Day 3** (4–6 hours) | Eliminates user bounce on email actions; scrubs all broken local development assets. |
| **Phase 4: SEO, Open Graph & Conversion CTAs** | Discoverability & Engagement | - Implement dynamic meta descriptions & Open Graph tags in `<head>`<br>- Add bottom exit CTAs on `about-itm`, `our-team`, `reconciliation`, `operators`<br>- Add social proof (testimonials, badges, host operator logos)<br>- Editorial alt text improvements | **Day 4** (4–5 hours) | Optimizes SERP click-through rates, social share previews, and visitor retention. |
| **Phase 5: Verification & Regression Testing** | Automated & Manual QA | - Run automated crawler across all 19 URLs (verify zero 404s)<br>- Run axe-core / Lighthouse accessibility audits (verify zero heading/contrast errors)<br>- Run PageSpeed Insights (verify LCP < 2.5s and CLS < 0.1)<br>- Test form submissions in staging environment | **Day 5** (3–4 hours) | Verifies complete remediation baseline before tackling Category 2 (Operator Profiles). |

---

### Next Steps
1. **Review & Approval:** Review the categorized tasks and confirm priorities.
2. **Execution Kickoff:** Begin with **Phase 1 (Global Quick Wins)** to immediately resolve the majority of repetitive findings across the theme.
3. **Proceed to Category 2:** Once Core & Content remediation is verified, proceed to analyze and generate task lists for **Category 2: Operator Profile Pages**.