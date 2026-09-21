# Audit Report: West Region Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/west/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Western Manitoba Eco-Tourism & Commemorative Heritage; Missing Regional Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The West region operator taxonomy archive showcases authentic Indigenous experiences across Western Manitoba and the Parkland corridor. The directory features Turtle Village (Anishinaabe luxury eco-glamping pods immersed in nature near Riding Mountain / Grandview) and the National Indigenous Residential School Museum of Canada (historic commemorative museum and truth-telling center in Long Plain First Nation / Portage la Prairie). Both listing cards link directly to active operator profiles. Adding an introductory narrative celebrating the Parkland's boreal landscapes, sacred waters, eco-hospitality, and educational reconciliation journeys will enrich the visitor experience.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Regional Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Western Manitoba's Parkland region, Riding Mountain National Park, Anishinaabe culture, and sacred commemorative heritage sites. | Add a descriptive narrative paragraph in WordPress (Region Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 2 active operators accurately represent the West region across glamping accommodations and commemorative museum attractions. | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 8 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 2 valid western operators listed with active single-page profiles.
- [ ] **Region Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 8 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "West" (e.g. *"Immerse yourself in Western Manitoba's sweeping Parkland landscapes and deep Anishinaabe heritage. From secluded glamping under star-filled skies at Turtle Village in Riding Mountain to powerful commemorative learning at the National Indigenous Residential School Museum in Long Plain, the West region offers unforgettable journeys of reflection and connection."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Region Switcher Tabs:** Provide quick filter buttons allowing users to switch between operator regions (Central, East, North, South, West).
