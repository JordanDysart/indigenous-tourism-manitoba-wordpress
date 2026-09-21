# Audit Report: Central Region Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/central/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Content Recommendations (Comprehensive 13-Operator Roster; Missing Regional Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Central region operator taxonomy archive is the largest regional hub in the ITM directory, presenting 13 Indigenous-owned businesses, hotels, culinary destinations, and cultural attractions across Winnipeg and the surrounding Central Manitoba region. All 13 listing cards route cleanly to complete operator profiles. Adding an introductory narrative introducing Winnipeg and Central Manitoba as the vibrant epicentre of urban Indigenous tourism, world-class dining, authentic fashion, and cultural celebrations will enhance visitor engagement and regional SEO.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Regional Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Winnipeg and the Central region's rich tapestry of Indigenous culture, culinary arts, retail, and urban hospitality. | Add a descriptive paragraph in WordPress (Region Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 13 active operators accurately represent the Central region across dining, retail, lodging, and culture. | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 13 valid regional operators listed with active single-page profiles.
- [ ] **Region Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "Central" (e.g. *"Explore the vibrant heart of Manitoba's Indigenous tourism in Winnipeg and the Central region. Discover world-class Indigenous cuisine, sustainable fashion, boutique retail, first-class accommodations, and dynamic cultural festivals."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Region Switcher Tabs:** Provide quick filter buttons allowing users to switch between operator regions (Central, Northern, Western, Eastern).
