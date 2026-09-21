# Audit Report: Tour and Related Services Category Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/tour-and-related-services/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Content Recommendations (Accurate 2-Operator Roster; Missing Category Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Tour and Related Services operator category archive highlights authentic guided cultural tours and Treaty education experiences in Manitoba, featuring Whiteshell Petroforms Authentic Indigenous Tours (sacred teachings and petroform walks in the Whiteshell) and the Agowiidiwinan Centre (Treaty relations and Indigenous heritage centre at The Forks). Both listing cards route cleanly to complete operator profiles. Adding an introductory narrative on guided storytelling, Treaty education, and sacred cultural landscapes will enrich visitor engagement and enhance organic discovery.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Category Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Indigenous guided tours, cultural education, sacred petroform teachings, and Treaty relations history. | Add a descriptive paragraph in WordPress (Category Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 2 active operators represent guided cultural excursions and Treaty education. | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 8 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 2 valid tour & cultural service operators listed with active single-page profiles.
- [ ] **Category Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 8 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "Tour and Related Services" (e.g. *"Experience guided tours and educational programs led by Indigenous Knowledge Keepers, exploring ancient petroform teachings in the Whiteshell and Treaty relations at The Forks."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Category Filter Tabs:** Provide quick filter buttons allowing users to switch between operator categories.
