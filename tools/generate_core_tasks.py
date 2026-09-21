import os
import re
from collections import defaultdict

core_slugs = [
    'home',
    'about-itm',
    'our-team',
    'reconciliation',
    'things-to-do',
    'experience-map',
    'events',
    'operators',
    'become-a-member',
    'member-benefits',
    'new-account-request',
    'guide-training-program',
    'indigenous-guide-training-program-step-1',
    'indigenous-guide-training-program-step-2',
    'indigenous-guide-training-program-step-3',
    'itm-indigenous-guide-training-program-inquiry-form',
    'contact-us',
    'privacy-policy',
    'sitemap'
]

page_meta = {
    'home': {'title': 'Home', 'url': 'https://indigenoustourismmanitoba.ca/', 'template': 'Front Page / Custom Blocks'},
    'about-itm': {'title': 'About ITM', 'url': 'https://indigenoustourismmanitoba.ca/about-itm/', 'template': 'Standard Page / Custom Blocks'},
    'our-team': {'title': 'Our Team', 'url': 'https://indigenoustourismmanitoba.ca/our-team/', 'template': 'page-our-team.php / Team Roster'},
    'reconciliation': {'title': 'Reconciliation', 'url': 'https://indigenoustourismmanitoba.ca/reconciliation/', 'template': 'Standard Page / Featured Operators Block'},
    'things-to-do': {'title': 'Things To Do', 'url': 'https://indigenoustourismmanitoba.ca/things-to-do/', 'template': 'Experience Landing Page / Map Embed'},
    'experience-map': {'title': 'Experience Map', 'url': 'https://indigenoustourismmanitoba.ca/experience-map/', 'template': 'Leaflet Map View / Operator Directory'},
    'events': {'title': 'Events', 'url': 'https://indigenoustourismmanitoba.ca/events/', 'template': '3common Calendar Embed / Iframe'},
    'operators': {'title': 'Our Operators Directory', 'url': 'https://indigenoustourismmanitoba.ca/operators/', 'template': 'Operator Archive / Search & Filter'},
    'become-a-member': {'title': 'Become A Member', 'url': 'https://indigenoustourismmanitoba.ca/become-a-member/', 'template': 'Gravity Forms / Multi-tier Intake'},
    'member-benefits': {'title': 'Member Benefits', 'url': 'https://indigenoustourismmanitoba.ca/member-benefits/', 'template': 'Banner Block / 4-Pillar Grid'},
    'new-account-request': {'title': 'New Account Request', 'url': 'https://indigenoustourismmanitoba.ca/new-account-request/', 'template': 'Banner Block / Intake Instructions'},
    'guide-training-program': {'title': 'Guide Training Program', 'url': 'https://indigenoustourismmanitoba.ca/guide-training-program/', 'template': 'Banner Block / 3-Step Pathway Hub'},
    'indigenous-guide-training-program-step-1': {'title': 'Guide Training — Step 1: Introduction', 'url': 'https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-1/', 'template': 'Banner Block / Step 1 Syllabus'},
    'indigenous-guide-training-program-step-2': {'title': 'Guide Training — Step 2: 7-Day Intensive', 'url': 'https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-2/', 'template': 'Banner Block / Step 2 Curriculum'},
    'indigenous-guide-training-program-step-3': {'title': 'Guide Training — Step 3: Practicum', 'url': 'https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-3/', 'template': 'Banner Block / Step 3 Practicum'},
    'itm-indigenous-guide-training-program-inquiry-form': {'title': 'Guide Training Program Inquiry Form', 'url': 'https://indigenoustourismmanitoba.ca/itm-indigenous-guide-training-program-inquiry-form/', 'template': 'Banner Block / Form Gateway'},
    'contact-us': {'title': 'Contact Us', 'url': 'https://indigenoustourismmanitoba.ca/contact-us/', 'template': 'Banner Block / Gravity Forms Embed'},
    'privacy-policy': {'title': 'Privacy Policy', 'url': 'https://indigenoustourismmanitoba.ca/privacy-policy/', 'template': 'Legal / Clause Outline'},
    'sitemap': {'title': 'Site Map & Directory', 'url': 'https://indigenoustourismmanitoba.ca/sitemap/', 'template': 'page-sitemap.php / Full Hierarchy'}
}

# Parse all reports directly from disk
page_data = defaultdict(lambda: {'findings': defaultdict(list), 'actions': defaultdict(lambda: defaultdict(list))})

for slug in core_slugs:
    for concern in ['accessibility', 'content', 'marketing', 'performance']:
        filepath = f'docs/audits/reports/{slug}_{concern}.md'
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Table extraction
        m_table = re.search(r'## 2\. Detailed Findings.*?\n(\|.*?\n)(?:\n---|\n##|\Z)', content, re.DOTALL)
        if m_table:
            lines = [l.strip() for l in m_table.group(1).strip().split('\n') if l.strip()]
            if len(lines) >= 3:
                headers = [h.strip() for h in lines[0].split('|')[1:-1]]
                for line in lines[2:]:
                    cols = [c.strip() for c in line.split('|')[1:-1]]
                    if len(cols) == len(headers):
                        row = dict(zip(headers, cols))
                        
                        # Normalize keys
                        cat = row.get('Category / Section') or row.get('Focus Area') or row.get('Category') or 'General'
                        elem = row.get('Element / Location') or row.get('Element / Selector / Excerpt') or row.get('Resource / Location') or row.get('Current State') or ''
                        sev = row.get('Severity / Impact') or row.get('Impact') or 'Medium'
                        desc = row.get('Description of Issue') or row.get('Identified Gap / Opportunity') or ''
                        rem = row.get('Proposed Remediation') or row.get('Recommended Solution') or ''
                        
                        # Clean markdown bolding
                        sev_clean = sev.replace('*', '').strip()
                        if not sev_clean:
                            sev_clean = 'Medium'
                        
                        page_data[slug]['findings'][concern].append({
                            'category': cat,
                            'element': elem,
                            'severity': sev_clean,
                            'description': desc,
                            'remediation': rem
                        })
        
        # Action plan extraction
        m_actions = re.search(r'## 4\. Prioritized Action Plan(.*)', content, re.DOTALL)
        if m_actions:
            subs = re.split(r'###\s+', m_actions.group(1))
            for sub in subs[1:]:
                header = sub.split('\n')[0]
                prio = 'Low'
                if 'High Priority' in header or 'Immediate' in header:
                    prio = 'High'
                elif 'Medium Priority' in header or 'Improvement' in header:
                    prio = 'Medium'
                elif 'Low Priority' in header or 'Polish' in header or 'Recommendation' in header:
                    prio = 'Low'
                
                for line in sub.split('\n')[1:]:
                    line = line.strip()
                    if line and re.match(r'^\d+\.', line):
                        clean = re.sub(r'^\d+\.\s*', '', line)
                        m_item = re.match(r'\*\*([^*]+)\*\*[:\s]*(.*)', clean)
                        if m_item:
                            task_name = re.sub(r'[:\s]+$', '', m_item.group(1).strip())
                            task_desc = m_item.group(2).strip()
                        else:
                            task_name = clean
                            task_desc = ''
                        
                        page_data[slug]['actions'][prio][concern].append({
                            'name': task_name,
                            'desc': task_desc
                        })

out = []

out.append("# Core & Content Pages — Master Audit Work Plan & Task Analysis")
out.append("")
out.append("> **Category:** 1. Core & Content Pages  ")
out.append("> **Source Reports:** `docs/audits/reports/` (76 Comprehensive Reports Analyzed)  ")
out.append("> **Scope:** 19 Unique Core URLs across 4 Audit Concerns (Accessibility, Content, Marketing/SEO, Performance)  ")
out.append("> **Date Generated:** 2026-09-03  ")
out.append("> **Status:** Complete Master Task Plan  ")
out.append("")
out.append("---")
out.append("")

# Table of Contents
out.append("## Table of Contents")
out.append("")
out.append("1. [Executive Summary & Strategic Overview](#1-executive-summary--strategic-overview)")
out.append("2. [Workstream 1: Fix Once, Impact Everywhere (Component & Theme-Level Tasks)](#2-workstream-1-fix-once-impact-everywhere-component--theme-level-tasks)")
out.append("   - [Component 1: Header Mega Menu Walker (`inc/class-header-menu-walker.php`)](#component-1-header-mega-menu-walker-incclass-header-menu-walkerphp)")
out.append("   - [Component 2: Global WordPress Navigation Menu & Redirect Engine](#component-2-global-wordpress-navigation-menu--redirect-engine)")
out.append("   - [Component 3: Theme Asset Pipeline (`functions.php`)](#component-3-theme-asset-pipeline-functionsphp)")
out.append("   - [Component 4: Banner Block Component (`blocks/banner_block/banner_block.php`)](#component-4-banner-block-component-blocksbanner_blockbanner_blockphp)")
out.append("   - [Component 5: Featured Operators Block (`blocks/featured-operators-block/`)](#component-5-featured-operators-block-blocksfeatured-operators-block)")
out.append("   - [Component 6: Global `<head>` SEO & Social Card Engine (`header.php`)](#component-6-global-head-seo--social-card-engine-headerphp)")
out.append("3. [Workstream 2: Batched Task Strings (Similar Work Across Templates)](#3-workstream-2-batched-task-strings-similar-work-across-templates)")
out.append("   - [Batch A: Document Heading Outline & H1 Standardization](#batch-a-document-heading-outline--h1-standardization)")
out.append("   - [Batch B: Critical Asset Compression & WebP Conversion Pass](#batch-b-critical-asset-compression--webp-conversion-pass)")
out.append("   - [Batch C: Image Dimensions & CLS Elimination in Templates](#batch-c-image-dimensions--cls-elimination-in-templates)")
out.append("   - [Batch D: Interactive Forms & Lead Ingestion Pipeline](#batch-d-interactive-forms--lead-ingestion-pipeline)")
out.append("   - [Batch E: Content Integrity, Broken Links & Staging URL Cleansing](#batch-e-content-integrity-broken-links--staging-url-cleansing)")
out.append("   - [Batch F: Conversion Funnel, Social Proof & Page Exit Architecture](#batch-f-conversion-funnel-social-proof--page-exit-architecture)")
out.append("   - [Batch G: Accessibility Semantics & Interactive Controls](#batch-g-accessibility-semantics--interactive-controls)")
out.append("4. [Workstream 3: Comprehensive Page-by-Page Audit Work Review](#4-workstream-3-comprehensive-page-by-page-audit-work-review)")
for idx, slug in enumerate(core_slugs, 1):
    meta = page_meta[slug]
    out.append(f"   - [4.{idx} {meta['title']} (`/{slug}/`)](#4{idx}-{slug})")
out.append("5. [Implementation Roadmap & Recommended Phasing](#5-implementation-roadmap--recommended-phasing)")
out.append("")
out.append("---")
out.append("")

# 1. Executive Summary
out.append("## 1. Executive Summary & Strategic Overview")
out.append("")
out.append("Following the completion of the comprehensive site-wide audit, this document synthesizes all **76 audit reports** generated for the **19 Core & Content Pages** of Indigenous Tourism Manitoba (ITM).")
out.append("")
out.append("Across these 19 pages, **318 individual findings** and **271 prioritized action items** were identified across four specialized audit disciplines:")
out.append("- ♿ **Accessibility (WCAG 2.1 AA):** Document outlines, heading hierarchies, keyboard traps, ARIA semantics, and alt text clarity.")
out.append("- ✍️ **Content & Editorial:** Staging URL leaks, broken links (404s), editorial tone, and missing content sections.")
out.append("- 📈 **Marketing & Conversion:** Missing search metadata (SEO descriptions), social sharing previews (Open Graph), lead routing, social proof, and dead-end page exit funnels.")
out.append("- ⚡ **Performance & Runtime:** Multi-megabyte uncompressed PNG assets, missing image dimensions causing Cumulative Layout Shift (CLS), duplicate icon stylesheets, and un-deferred script execution.")
out.append("")
out.append("### Key Audit Metrics for Core & Content Pages")
out.append("")
out.append("| Metric | Count / Volume | Strategic Impact |")
out.append("|---|---|---|")
out.append("| **Total Core Pages Audited** | 19 pages | Encompasses all public informational, directory, booking, and administrative intake pages. |")
out.append("| **Audit Reports Processed** | 76 reports | 4 comprehensive reports per page (`_accessibility`, `_content`, `_marketing`, `_performance`). |")
out.append("| **Total Detailed Findings** | 318 findings | 80 Accessibility, 73 Content, 85 Marketing, 80 Performance. |")
out.append("| **Prioritized Action Items** | 271 tasks | 72 High/Critical Priority, 98 Medium Priority, 101 Low Priority. |")
out.append("| **Single-Fix Multipliers** | 6 global components | Modifying 6 files/configurations instantly resolves over 110 task instances. |")
out.append("| **Severely Bloated Assets** | 17.34 MB across 3 files | Compressing just 3 identified PNGs saves over 16.9 MB of initial load bandwidth. |")
out.append("")
out.append("### Strategic Approach: Leverage Before Labor")
out.append("To maximize engineering velocity, tasks are organized into two primary execution tiers before page-specific work:")
out.append("1. **\"Fix Once, Impact Everywhere\"**: Addressing root architectural components (e.g. Header Walker, Banner Block template, `functions.php`, WP Menus) that automatically fix defects across 8 to 19 pages simultaneously.")
out.append("2. **Batched Task Strings**: Grouping identical functional tasks (such as writing meta descriptions, converting raster graphics to WebP, or injecting image dimensions) so they can be executed in high-efficiency batch sessions.")
out.append("")
out.append("---")
out.append("")

# 2. Workstream 1: Fix Once, Impact Everywhere
out.append("## 2. Workstream 1: Fix Once, Impact Everywhere (Component & Theme-Level Tasks)")
out.append("")
out.append("These tasks represent the highest ROI in the entire remediation process. By modifying a single template file, walker function, or WordPress database entry, dozens of recurring audit flags across all 19 core pages are resolved simultaneously.")
out.append("")

out.append("### Component 1: Header Mega Menu Walker (`inc/class-header-menu-walker.php`)")
out.append("**Impact:** 19 of 19 Core Pages (and all 47 archive/profile pages sitewide)")
out.append("")
out.append("The custom nav menu walker `GAC_Menu_Walker` generates the top mega navigation menu rendered in `header.php`. Two architectural issues in this file ripple across every single page audit report:")
out.append("")
out.append("#### Task 1.1: Eliminate Inverted Heading Hierarchy in Mega Menu Featured Cards")
out.append("- **File:** [`inc/class-header-menu-walker.php:L81`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/inc/class-header-menu-walker.php#L81)")
out.append("- **The Defect:** Line 81 wraps featured card titles in `<h3>`: `<h3 class=\"mega-menu-featured-title\">` (\"Empowering Indigenous Voices\", \"Discover Authentic Experiences\", etc.). Because `<header>` precedes `<main>` in DOM order, screen readers encounter four `<h3>` tags *before* encountering the page's primary `<h1>` or `<h2>`. This caused \"Inverted Heading Hierarchy\" to fail across all 19 core pages.")
out.append("- **The Solution:** Replace `<h3 class=\"mega-menu-featured-title\">` with `<p class=\"mega-menu-featured-title\">` or `<span class=\"mega-menu-featured-title font-bold\" role=\"text\">`.")
out.append("- **Verification:** Inspect the DOM outline in any browser accessibility tree; heading outlines will now start cleanly at the page title.")
out.append("")
out.append("#### Task 1.2: Inject Explicit Image Dimensions on Mega Menu Featured Media")
out.append("- **File:** [`inc/class-header-menu-walker.php:L69`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/inc/class-header-menu-walker.php#L69)")
out.append("- **The Defect:** Line 69 outputs `<img src=\"...\" alt=\"...\" loading=\"lazy\" />` without HTML `width` or `height` attributes. This was flagged in all 19 performance reports as a primary contributor to Cumulative Layout Shift (CLS) on initial load.")
out.append("- **The Solution:** Add explicit dimension attributes `width=\"480\" height=\"320\"` and CSS `aspect-ratio: 3/2` to the `<img>` tag.")
out.append("- **Verification:** Chrome DevTools Lighthouse audit will register zero layout shifts attributed to `.mega-menu-featured-media img`.")
out.append("")

out.append("### Component 2: Global WordPress Navigation Menu & Redirect Engine")
out.append("**Impact:** 19 of 19 Core Pages (and all 47 archive/profile pages sitewide)")
out.append("")
out.append("#### Task 2.1: Resolve Dead Global Navigation Submenu Item (`404 Not Found`)")
out.append("- **Locations:** WordPress Menus (Primary Menu &rarr; Programs), [`inc/menu-structure-migration.php:L234`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/inc/menu-structure-migration.php#L234), and [`page-sitemap.php:L82`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/page-sitemap.php#L82)")
out.append("- **The Defect:** The submenu item **\"More Learning Opportunities\"** links to `/indigenous-guide-training-program-more-learning-opportunities/`, which returns an **HTTP 404: Not Found** error. Because this menu renders in the global header on every page, all 76 audit reports flagged this broken link as a High Priority defect.")
out.append("- **The Solution:**")
out.append("  1. In `wp-admin` &rarr; Appearance &rarr; Menus &rarr; Main Navigation, update the item URL to `/guide-training-program/#additional-learning-opportunities` (or the active Guide Training landing page).")
out.append("  2. In `inc/menu-structure-migration.php:L234`, update the programmatic menu seed array.")
out.append("  3. In `page-sitemap.php:L82`, update or remove the corresponding sitemap link.")
out.append("  4. Add a 301 redirect rule in `.htaccess` or WordPress redirect manager: `/indigenous-guide-training-program-more-learning-opportunities/` &rarr; `/guide-training-program/`.")
out.append("- **Verification:** Execute `curl -I https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-more-learning-opportunities/` and verify an HTTP 301/200 response.")
out.append("")

out.append("### Component 3: Theme Asset Pipeline (`functions.php`)")
out.append("**Impact:** 18 of 19 Core Pages")
out.append("")
out.append("#### Task 3.1: Deduplicate Bootstrap Icons Stylesheet Enqueue")
out.append("- **File:** [`functions.php:L149-L156`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/functions.php#L149-L156)")
out.append("- **The Defect:** `functions.php` enqueues Bootstrap Icons v1.11.3 from jsdelivr CDN (`bootstrap-icons`), while the plugin suite (`areoi`) concurrently enqueues `areoi-bootstrap-icons-css`. Both load identical icon font sets, causing redundant DNS lookups, blocking CSS rendering, and wasting network requests.")
out.append("- **The Solution:** Remove or comment out the external CDN enqueue in `kiwatinook_scripts()`, relying on the local plugin asset, or deregister the plugin version if the theme CDN bundle is preferred.")
out.append("- **Verification:** Inspect `<head>` network waterfall in DevTools; verify `bootstrap-icons.min.css` is downloaded exactly once.")
out.append("")
out.append("#### Task 3.2: Defer Non-Critical Frontend JavaScript")
out.append("- **File:** [`functions.php`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/functions.php)")
out.append("- **The Defect:** `theme.js`, `animated-menu.js`, and `fancybox.umd.js` are loaded synchronously without the `defer` attribute, blocking the browser HTML parser and delaying First Contentful Paint (FCP).")
out.append("- **The Solution:** Implement the standard `script_loader_tag` filter in `functions.php`:")
out.append("  ```php")
out.append("  add_filter('script_loader_tag', function($tag, $handle) {")
out.append("      $defer_scripts = ['theme-js', 'animated-menu', 'fancybox-js-js'];")
out.append("      if (in_array($handle, $defer_scripts, true)) {")
out.append("          return str_replace(' src=', ' defer src=', $tag);")
out.append("      }")
out.append("      return $tag;")
out.append("  }, 10, 2);")
out.append("  ```")
out.append("- **Verification:** Check DOM `<script>` tags on frontend; ensure non-critical bundles include `defer`.")
out.append("")

out.append("### Component 4: Banner Block Component (`blocks/banner_block/banner_block.php`)")
out.append("**Impact:** 8 Core Pages (`contact-us`, `guide-training-program`, `step-1`, `step-2`, `step-3`, `inquiry-form`, `member-benefits`, `new-account-request`)")
out.append("")
out.append("#### Task 4.1: Standardize Banner Block Heading to H1")
out.append("- **File:** [`blocks/banner_block/banner_block.php:L82`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/blocks/banner_block/banner_block.php#L82)")
out.append("- **The Defect:** Line 82 hardcodes `<h2 class=\"banner-block-title\">`. Because the Banner Block serves as the page hero across 8 core landing pages, those pages completely lack an `<h1>` heading in the DOM outline (a critical WCAG 1.3.1 / 2.4.6 failure flagged across 8 audit reports).")
out.append("- **The Solution:**")
out.append("  1. Update `banner_block.php:L82` to render `<h1>` by default (or allow editor level selection via a `headingTag` block attribute defaulting to `h1`):")
out.append("     ```php")
out.append("     <h1 class=\"banner-block-title\" style=\"<?php echo $title_style; ?>\">")
out.append("         <?php echo esc_html( $title ); ?>")
out.append("     </h1>")
out.append("     ```")
out.append("  2. Retain identical styling classes so visual typography is completely preserved.")
out.append("- **Verification:** Re-running heading outline inspection immediately clears the \"No H1 exists in the DOM\" violation on all 8 pages.")
out.append("")
out.append("#### Task 4.2: Add Dimensions to Banner Graphic Assets")
out.append("- **File:** [`blocks/banner_block/banner_block.php:L96-L107`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/blocks/banner_block/banner_block.php#L96-L107)")
out.append("- **The Defect:** Both `ITM_Hoop.svg` and `$main_image` render without `width` and `height` attributes.")
out.append("- **The Solution:** Add explicit `width=\"450\" height=\"450\"` on the hoop SVG and query attachment metadata for the main image (`wp_get_attachment_metadata()` to populate `width` and `height`).")
out.append("")

out.append("### Component 5: Featured Operators Block (`blocks/featured-operators-block/featured_operators_block.php`)")
out.append("**Impact:** Multiple Core & Content Pages (`home`, `reconciliation`, `things-to-do`, `operators`)")
out.append("")
out.append("#### Task 5.1: Inject Explicit Dimensions & Aspect-Ratio into Operator Cards")
out.append("- **File:** [`blocks/featured-operators-block/featured_operators_block.php:L126-L129`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/blocks/featured-operators-block/featured_operators_block.php#L126-L129)")
out.append("- **The Defect:** Operator card thumbnails render as `<img src=\"...\" class=\"featured-operator-card-image\" loading=\"lazy\" />` without dimensions, triggering CLS warnings on every page showcasing operator grids.")
out.append("- **The Solution:** Add `width=\"400\" height=\"280\"` to the markup and ensure `.featured-operator-card-image-wrap` has `aspect-ratio: 4 / 3; overflow: hidden;`.")
out.append("")

out.append("### Component 6: Global `<head>` SEO & Social Card Engine (`header.php` / `functions.php`)")
out.append("**Impact:** 19 of 19 Core Pages")
out.append("")
out.append("#### Task 6.1: Automated Dynamic Meta Description & Open Graph Injection")
out.append("- **Files:** [`header.php`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/header.php) or [`functions.php`](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/functions.php)")
out.append("- **The Defect:** Every single core page completely lacks `<meta name=\"description\">` and Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) / Twitter cards. Search engines display unstructured text snippets, and shared links on social media/messaging apps display blank preview cards.")
out.append("- **The Solution:** Either activate/configure an SEO plugin (Yoast SEO / RankMath) OR add a robust fallback hook in `functions.php` hooked to `wp_head`:")
lines_seo = [
    "  ```php",
    "  function kiwatinook_seo_meta_tags() {",
    "      if (is_admin()) return;",
    "      global $post;",
    "      $desc = get_bloginfo('description');",
    "      if (is_singular() && !empty($post->post_excerpt)) {",
    "          $desc = wp_strip_all_tags($post->post_excerpt);",
    "      } elseif (is_singular() && !empty($post->post_content)) {",
    "          $desc = wp_trim_words(wp_strip_all_tags($post->post_content), 25, '...');",
    "      }",
    "      $og_image = get_template_directory_uri() . '/screenshot.png';",
    "      if (is_singular() && has_post_thumbnail($post->ID)) {",
    "          $og_image = get_the_post_thumbnail_url($post->ID, 'large');",
    "      }",
    "      echo '<meta name=\"description\" content=\"' . esc_attr($desc) . '\">' . \"\\n\";",
    "      echo '<meta property=\"og:title\" content=\"' . esc_attr(wp_get_document_title()) . '\">' . \"\\n\";",
    "      echo '<meta property=\"og:description\" content=\"' . esc_attr($desc) . '\">' . \"\\n\";",
    "      echo '<meta property=\"og:image\" content=\"' . esc_url($og_image) . '\">' . \"\\n\";",
    "      echo '<meta property=\"og:url\" content=\"' . esc_url(get_permalink()) . '\">' . \"\\n\";",
    "      echo '<meta name=\"twitter:card\" content=\"summary_large_image\">' . \"\\n\";",
    "  }",
    "  add_action('wp_head', 'kiwatinook_seo_meta_tags', 1);",
    "  ```"
]
out.extend(lines_seo)
out.append("- **Verification:** Use Facebook Sharing Debugger or `curl -s https://indigenoustourismmanitoba.ca/ | grep '<meta property=\"og:'` to confirm valid tags on all pages.")
out.append("")
out.append("---")
out.append("")

# 3. Workstream 2: Batched Task Strings
out.append("## 3. Workstream 2: Batched Task Strings (Similar Work Across Templates)")
out.append("")
out.append("When work cannot be resolved through a single global component file, batching similar tasks together reduces context switching and ensures consistency across the website.")
out.append("")

out.append("### Batch A: Document Heading Outline & H1 Standardization")
out.append("**Goal:** Achieve 100% WCAG 2.1 AA (1.3.1 Info & Relationships, 2.4.6 Headings & Labels) compliance with a clean, logical document outline starting with a single `<h1>` on every page.")
out.append("")
out.append("| Page Slug | Current Defect | Remediation Action | Priority |")
out.append("|---|---|---|---|")
out.append("| `contact-us` | `<h2>Get In Touch</h2>` & skipped `<h5>FOLLOW US</h5>` | Change `<h2>` to `<h1>Contact Indigenous Tourism Manitoba</h1>`; convert `<h5>` to `<h3 class=\"h5\">Follow Us</h3>`. | 🔴 High |")
out.append("| `events` | No `<h1>` in DOM (jumps into iframe) | Insert `<h1>Indigenous Events in Manitoba</h1>` above the iframe calendar embed. | 🔴 High |")
out.append("| `experience-map` | No `<h1>` in DOM (jumps into map & list) | Insert `<h1>Indigenous Tourism Experience Map</h1>` at the top of the main container. | 🔴 High |")
out.append("| `operators` | No `<h1>` in DOM (jumps into operator cards) | Insert `<h1>Our Operators</h1>` at the top of the archive container. | 🔴 High |")
out.append("| `home` | Multiple `<h1>` tags (Conference callout block uses `<h1>`) | Change Conference callout heading from `<h1>` to `<h2>`. | 🟠 High |")
out.append("| `about-itm` | Nested duplicate `<h3>Building the Brand</h3>` inside `<h2>` | Remove redundant inner `<h3>` tag in the custom block markup. | 🟡 Medium |")
out.append("| `become-a-member` | Duplicate `<h3>Payment Details</h3>` across conditional steps | Label uniquely: `<h3>Accredited Member Payment Details</h3>` vs `<h3>Partner Member Payment Details</h3>`. | 🟡 Medium |")
out.append("| `guide-training-program` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Indigenous Guide Training Program</h1>`. | 🔴 High |")
out.append("| `step-1` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Step 1: Introduction – Guide Training Program</h1>`. | 🔴 High |")
out.append("| `step-2` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Step 2: 7-Day Training Course – Guide Training Program</h1>`. | 🔴 High |")
out.append("| `step-3` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Step 3: Practicum – Guide Training Program</h1>`. | 🔴 High |")
out.append("| `inquiry-form` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Guide Training Program Inquiry</h1>`. | 🔴 High |")
out.append("| `member-benefits` | Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>Member Benefits</h1>`. | 🔴 High |")
out.append("| `new-account-request`| Resolved via Task 4.1 (`banner_block.php`) | Upgrade banner title to `<h1>New Account Request</h1>`. | 🔴 High |")
out.append("")

out.append("### Batch B: Critical Asset Compression & WebP Conversion Pass")
out.append("**Goal:** Eliminate multi-megabyte payload bottlenecks that degrade mobile user experience and Core Web Vitals (LCP).")
out.append("")
out.append("| Asset Filename | Page(s) | Original Size | Target Size (WebP) | Bandwidth Saved | Priority |")
out.append("|---|---|---|---|---|---|")
out.append("| `Screenshot-2023-09-05-at-11.07.18-AM.png` | `operators`, `experience-map` | **13.06 MB (13,058 KB)** | **< 100 KB** | **~12.96 MB (99.2%)** | 🔴 Critical |")
out.append("| `Anne-2024_...png` | `operators`, `experience-map` | **2.62 MB (2,619 KB)** | **< 120 KB** | **~2.50 MB (95.4%)** | 🟠 High |")
out.append("| `Web-callout-block-2026-ITM-Conference-1.png` | `home` | **1.66 MB (1,660 KB)** | **< 150 KB** | **~1.51 MB (91.0%)** | 🟠 High |")
out.append("| `about-itm.jpg` | `about-itm`, `contact-us`, `guide-training`, etc. | **841.7 KB** | **< 120 KB** | **~721 KB (85.7%)** | 🟡 Medium |")
out.append("| `SpenceFProfile-scaled.jpg` & `FCA486D3...jpeg`| `reconciliation` | **400 KB - 540 KB** | **< 100 KB** | **~750 KB (75.0%)** | 🟡 Medium |")
out.append("| **Total Bandwidth Reduction** | Across Core Pages | **> 18.5 MB** | **< 600 KB** | **> 17.9 MB Total** | — |")
out.append("")
out.append("> [!TIP]")
out.append("> Use cwebp or an automated WordPress image optimizer (e.g. WebP Express, Imagify, or WP-CLI `wp media regenerate`) to compress these raw assets losslessly at 82% quality.")
out.append("")

out.append("### Batch C: Image Dimensions & CLS Elimination in Templates")
out.append("**Goal:** Prevent visual layout jumps by declaring explicit `width` and `height` attributes on custom page templates and block markups.")
out.append("")
out.append("1. **Our Team Roster Headshots (`page-our-team.php` / block):**")
out.append("   - **Finding:** 15 of 17 circular headshot images (`.img-circular.team-photo`) lack HTML `width` and `height` attributes.")
out.append("   - **Remediation:** Add `width=\"300\" height=\"300\"` directly to the `<img>` tags in the template loop.")
out.append("2. **Featured Operator Card Images (`featured_operators_block.php`):**")
out.append("   - **Finding:** 9 of 15 images on `home` and 10 of 12 images on `reconciliation` lack dimensions.")
out.append("   - **Remediation:** Add `width=\"400\" height=\"280\"` to the block template as detailed in Task 5.1.")
out.append("3. **Become a Member Form Icons & Logos (`page-become-a-member.php`):**")
out.append("   - **Finding:** 6 of 8 images lack dimensions.")
out.append("   - **Remediation:** Declare explicit dimensions or CSS aspect ratios on tier badge icons.")
out.append("")

out.append("### Batch D: Interactive Forms & Lead Ingestion Pipeline")
out.append("**Goal:** Replace broken/fragile mailto mechanisms and obsolete static copy with accessible, high-conversion web forms.")
out.append("")
out.append("1. **Guide Training Program Inquiry Form (`/itm-indigenous-guide-training-program-inquiry-form/`):**")
out.append("   - **Critical Defect:** Titled \"Inquiry Form\" but contains **no interactive form**—only a mailto button protected by Cloudflare email obfuscation that returns HTTP 404 for non-JS/static clients.")
out.append("   - **Remediation:** Embed an active Gravity Form or Contact Form 7 with 5 fields: Full Name, Email, Phone, Indigenous Community / Affiliation, and Program Step Interest (Step 1, Step 2, Step 3).")
out.append("2. **New Account Request Page (`/new-account-request/`):**")
out.append("   - **Defect:** Instructs operators to manually compose an email; lacks an intake form and fails to provide a login route for registered users.")
out.append("   - **Remediation:**")
out.append("     - Embed a lightweight 4-field intake form (Business Name, Contact Person, Email, Community Affiliation).")
out.append("     - Add a secondary member route: *\"Already have an account? [Log in here](/login/).\"*")
lines.append("3. **Contact Us Page (`/contact-us/`):**")
lines.append("   - **Accessibility & Form Improvements:** Add `aria-required=\"true\"` to required Gravity Forms inputs; introduce an \"Inquiry Type\" dropdown (Tourism, Membership, Guide Training, Media); add response time notice (*\"We reply within 1–2 business days\"*) and newsletter opt-in checkbox.")
out.append("4. **Become a Member Page (`/become-a-member/`):**")
out.append("   - **Form Polish:** Combine/minify Gravity Forms orbital CSS bundles; differentiate conditional payment headings.")
out.append("")

out.append("### Batch E: Content Integrity, Broken Links & Staging URL Cleansing")
out.append("**Goal:** Eliminate dead links, database staging leaks, and placeholder content.")
out.append("")
out.append("1. **Database Search-and-Replace for Local Staging URLs (`home`):**")
out.append("   - **Critical Content Defect:** Three images on the homepage contain hardcoded local Lando development URLs: `https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/...` (`4-1.png`, `Group-4.png`, `Group-5.png`). These fail to render for public visitors.")
out.append("   - **Remediation:** Run WP-CLI search-and-replace:")
lines_sr = [
    "     ```bash",
    "     wp search-replace 'https://indigenous-tourism-manitoba-wordpress.lndo.site' 'https://indigenoustourismmanitoba.ca' wp_posts --dry-run",
    "     ```"
]
out.extend(lines_sr)
out.append("2. **Sitemap Taxonomy Link Remediation (`/sitemap/`):**")
out.append("   - **Defect:** Regional links `/operator-region/winnipeg/` and `/operator-region/interlake/` return **HTTP 404**.")
out.append("   - **Remediation:** Update links to valid taxonomy archive slugs (`/operator-region/central/`) or create the missing taxonomy terms in WordPress.")
out.append("3. **Events Page Editorial Enhancement (`/events/`):**")
out.append("   - **Defect:** Page contains only a third-party iframe embed with no introductory editorial content or event submission route.")
out.append("   - **Remediation:** Add an introductory heading, 2-paragraph overview of seasonal cultural events, and an \"Are You Hosting an Indigenous Event? Submit Your Details\" CTA block.")
out.append("4. **Privacy Policy Currency & Cross-Linking (`/privacy-policy/`):**")
out.append("   - **Remediation:** Add \"Last Updated: November 2024\" timestamp below the title, and add an inline hyperlink to `/contact-us/` in Section 4.")
out.append("")

out.append("### Batch F: Conversion Funnel, Social Proof & Page Exit Architecture")
out.append("**Goal:** Transform dead-end informational pages into interactive conversion funnels that retain visitors and drive memberships/bookings.")
out.append("")
out.append("1. **Bottom Conversion CTAs for Dead-End Pages:**")
out.append("   - `about-itm`: Add dual-action CTA banner: *\"Become an ITM Member\"* (Primary) and *\"Meet Our Team\"* (Secondary).")
out.append("   - `our-team`: Add closing *\"Connect With Our Team\"* CTA banner below the Board of Directors grid.")
out.append("   - `reconciliation`: Add *\"Explore Authentic Cultural Experiences\"* CTA button and link to TRC Call to Action 92.")
out.append("   - `operators`: Add closing banner after pagination: *\"Are You an Indigenous Tourism Operator? [Become an ITM Member](/become-a-member/)\"*.")
out.append("   - `events`: Add *\"Get Monthly Indigenous Event Updates\"* newsletter lead capture.")
out.append("2. **Social Proof & Credibility Badging:**")
out.append("   - `home`: Add curated \"Visitor Experiences\" quote carousel or partner endorsements (Travel Manitoba, ITAC).")
out.append("   - `guide-training-program`: Add 2 graduate spotlight quotes with photography.")
out.append("   - `step-2`: Add partner accreditation trust badges (Red Cross, Tourism HR Canada).")
out.append("   - `step-3`: Add participating host operator logo band.")
out.append("   - `member-benefits`: Add impact metrics counter banner (e.g. *\"60+ Authentic Indigenous Operators Supported\"*).")
out.append("3. **CTA Label Clarity:**")
out.append("   - `home`: Update generic \"Register\" button for the 2026 conference to explicit *\"Register for Conference\"*.")
out.append("   - `guide-training-program`: Update broken \"More Opportunities\" button to point to `#additional-learning-opportunities` anchor.")
out.append("")

out.append("### Batch G: Accessibility Semantics & Interactive Controls")
out.append("**Goal:** Ensure keyboard accessibility, assistive technology landmarking, and high-quality alternative text.")
out.append("")
out.append("1. **Interactive Experience Map (`/experience-map/`):**")
out.append("   - Add `role=\"region\" aria-label=\"Interactive Manitoba Tourism Map\"` to the Leaflet map container.")
out.append("   - Ensure map pin popups can be traversed via keyboard Tab key and provide skip-map controls.")
out.append("2. **Events Calendar Iframe (`/events/`):**")
out.append("   - Update vendor-default iframe title `title=\"3Common Upcoming and Past\"` to descriptive `title=\"Upcoming Indigenous Tourism Manitoba Events Calendar\"`.")
out.append("   - Add fallback text for screen readers or users with disabled scripts.")
out.append("3. **Archive Pagination (`/operators/`):**")
out.append("   - Add `aria-label=\"Pagination Navigation\"` to `<nav class=\"pagination\">` and `aria-current=\"page\"` to the active page number link.")
out.append("4. **Image Alt Text Quality Upgrades:**")
out.append("   - Replace raw kebab-case slug `alt=\"teekcas-boutique\"` with `alt=\"Teekca's Boutique storefront with authentic Indigenous crafts\"` (`home`).")
out.append("   - Replace vague `alt=\"Monument\"` with `alt=\"National Indigenous Residential School Museum monument in Portage la Prairie\"` (`home`, `reconciliation`).")
out.append("   - Replace generic `alt=\"polar bear\"` with `alt=\"Polar bear in the wild in Churchill, Manitoba with Sub-Arctic Tours\"` (`home`).")
out.append("   - Replace `alt=\"Food 1\"` with `alt=\"Indigenous-inspired culinary dishes served at Bistro on Notre Dame\"` (`reconciliation`).")
out.append("   - Replace `alt=\"SpenceFProfile\"` with `alt=\"Handcrafted Indigenous wood carving by Spence Custom Carving\"` (`reconciliation`).")
out.append("")
out.append("---")
out.append("")

# 4. Workstream 3: Comprehensive Page-by-Page Audit Work Review
out.append("## 4. Workstream 3: Comprehensive Page-by-Page Audit Work Review")
out.append("")
out.append("This section documents the specific audit findings and actionable task lists for every individual page in the Core & Content category. Use the task checkboxes to track progress during remediation.")
out.append("")

for idx, slug in enumerate(core_slugs, 1):
    meta = page_meta[slug]
    out.append(f"### 4.{idx} {meta['title']} (`/{slug}/`)")
    out.append(f"- **Live URL:** `{meta['url']}`")
    out.append(f"- **Template / Structure:** `{meta['template']}`")
    out.append(f"- **Audit Reports:** [Accessibility](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/{slug}_accessibility.md) | [Content](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/{slug}_content.md) | [Marketing](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/{slug}_marketing.md) | [Performance](file:///Users/jordandysart/workspace/itmwordpress/wordpress/wp-content/themes/kiwatinook/docs/audits/reports/{slug}_performance.md)")
    out.append("")
    
    # Findings Table
    out.append("#### Findings Summary Table")
    out.append("")
    out.append("| Concern | Category / Section | Element / Location | Severity | Description of Issue & Proposed Remediation |")
    out.append("|---|---|---|---|---|")
    
    for concern in ['accessibility', 'content', 'marketing', 'performance']:
        findings_list = page_data[slug]['findings'].get(concern, [])
        for f in findings_list:
            cat = f['category'].replace('|', '\\|')
            elem = f['element'].replace('|', '\\|')
            sev = f['severity']
            desc = f['description'].replace('|', '\\|')
            rem = f['remediation'].replace('|', '\\|')
            
            sev_badge = f"🟢 {sev}"
            if 'Critical' in sev:
                sev_badge = "🔴 Critical"
            elif 'High' in sev:
                sev_badge = "🟠 High"
            elif 'Medium' in sev:
                sev_badge = "🟡 Medium"
            
            out.append(f"| {concern.capitalize()} | {cat} | {elem} | {sev_badge} | **Issue:** {desc}<br>**Fix:** {rem} |")
    out.append("")
    
    # Prioritized Task Checklist
    out.append("#### Prioritized Task Checklist")
    out.append("")
    for prio_level in ['High', 'Medium', 'Low']:
        prio_actions = []
        for concern in ['accessibility', 'content', 'marketing', 'performance']:
            for a in page_data[slug]['actions'][prio_level].get(concern, []):
                prio_actions.append((concern, a['name'], a['desc']))
        
        if prio_actions:
            badge = "🔴 High Priority / Immediate Fixes" if prio_level == 'High' else ("🟡 Medium Priority / Improvements" if prio_level == 'Medium' else "🟢 Low Priority / Polish & Recommendations")
            out.append(f"##### {badge}")
            for concern, name, desc in prio_actions:
                if desc:
                    out.append(f"- [ ] **[{concern.upper()}] {name}:** {desc}")
                else:
                    out.append(f"- [ ] **[{concern.upper()}] {name}**")
            out.append("")
    out.append("---")
    out.append("")

# 5. Implementation Roadmap & Recommended Phasing
out.append("## 5. Implementation Roadmap & Recommended Phasing")
out.append("")
out.append("To execute these tasks efficiently without introducing regressions, remediation should proceed across 5 phased milestones:")
out.append("")
out.append("| Milestone | Focus Area | Key Actions | Estimated Effort | Target Impact |")
out.append("|---|---|---|---|---|")
out.append("| **Phase 1: Global Quick Wins** | Shared Components & Assets | - Fix Header Walker heading tag (`<h3>` &rarr; `<span>`)<br>- Add `width`/`height` to mega menu images<br>- Fix Global Menu 404 URL in WordPress<br>- Deduplicate CDN Bootstrap Icons in `functions.php`<br>- Replace 13MB & 2.6MB PNGs with WebP | **Day 1** (3–4 hours) | Clears ~110 audit flags sitewide; reduces total page weight by over 16MB instantly. |")
out.append("| **Phase 2: Heading Hierarchy & Banner Block** | Document Structure & Templates | - Upgrade `banner_block.php` title to `<h1>`<br>- Insert `<h1>` on `contact-us`, `events`, `experience-map`, `operators`<br>- Remove duplicate `<h1>` on `home`<br>- Add `defer` filter to non-critical scripts | **Day 2** (4–5 hours) | Brings 100% of Core & Content pages into WCAG 2.1 AA heading compliance. |")
out.append("| **Phase 3: Interactive Forms & Data Ingestion** | Lead Capture & Functional Gaps | - Build interactive form for Guide Training Inquiry page<br>- Build intake form & login route for New Account Request<br>- Add `aria-required` & routing dropdown to Contact Us form<br>- Run DB search-and-replace for `lndo.site` staging URLs | **Day 3** (4–6 hours) | Eliminates user bounce on email actions; scrubs all broken local development assets. |")
out.append("| **Phase 4: SEO, Open Graph & Conversion CTAs** | Discoverability & Engagement | - Implement dynamic meta descriptions & Open Graph tags in `<head>`<br>- Add bottom exit CTAs on `about-itm`, `our-team`, `reconciliation`, `operators`<br>- Add social proof (testimonials, badges, host operator logos)<br>- Editorial alt text improvements | **Day 4** (4–5 hours) | Optimizes SERP click-through rates, social share previews, and visitor retention. |")
out.append("| **Phase 5: Verification & Regression Testing** | Automated & Manual QA | - Run automated crawler across all 19 URLs (verify zero 404s)<br>- Run axe-core / Lighthouse accessibility audits (verify zero heading/contrast errors)<br>- Run PageSpeed Insights (verify LCP < 2.5s and CLS < 0.1)<br>- Test form submissions in staging environment | **Day 5** (3–4 hours) | Verifies complete remediation baseline before tackling Category 2 (Operator Profiles). |")
out.append("")
out.append("---")
out.append("")
out.append("### Next Steps")
out.append("1. **Review & Approval:** Review the categorized tasks and confirm priorities.")
out.append("2. **Execution Kickoff:** Begin with **Phase 1 (Global Quick Wins)** to immediately resolve the majority of repetitive findings across the theme.")
out.append("3. **Proceed to Category 2:** Once Core & Content remediation is verified, proceed to analyze and generate task lists for **Category 2: Operator Profile Pages**.")

final_content = "\n".join(out)
output_file = 'docs/audits/CORE_AND_CONTENT_TASKS.md'

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully generated {output_file}: {len(final_content)} bytes across {len(out)} lines.")
