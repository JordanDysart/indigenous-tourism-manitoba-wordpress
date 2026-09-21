# Audit Report: South Region Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/south/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Boutique Agri-Tourism Directory; Missing Regional Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The South region operator taxonomy archive showcases authentic Indigenous agri-tourism and culinary traditions in Southern Manitoba and the Red River Valley corridor. The directory features Prairie Berry (Métis-owned family berry farm, artisanal market, and farm-to-table dining events in Glenlea). The listing card links directly to Prairie Berry's full operator profile. Adding an introductory narrative celebrating Métis agricultural roots, farm-to-table culinary gatherings, and summer berry harvesting will enrich traveler engagement.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Regional Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Southern Manitoba's fertile Red River Valley, Métis farming heritage, and seasonal culinary gatherings. | Add a descriptive paragraph in WordPress (Region Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 1 active operator accurately represents the South region in culinary agri-tourism. | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 7 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 1 valid southern operator listed with an active single-page profile.
- [ ] **Region Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 7 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "South" (e.g. *"Discover the rich agricultural traditions and culinary heritage of Southern Manitoba. Visit Prairie Berry in Glenlea for fresh farm harvests, outdoor artisanal events, and intimate long-table dining experiences rooted in Métis culture."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Region Switcher Tabs:** Provide quick filter buttons allowing users to switch between operator regions (Central, East, North, South, West).
