# Audit Report: Accommodation Category Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/accommodation/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Content Recommendations (Accurate Operator Roster; Missing Category Description Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Accommodation category archive indexes 4 premier Indigenous hospitality operators across Manitoba: Wyndham Garden Winnipeg Airport (urban hotel), Turtle Village (geodesic cabins at Grand Beach), Moon Gate Guest House (Whitemouth River eco-retreat), and Kikiwak Inn (The Pas gateway). All listing cards link accurately to their respective operator profiles. Adding an introductory category narrative explaining Indigenous accommodation styles in Manitoba will enhance user engagement and SEO.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Category Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description or lead paragraph contextualizing Indigenous lodging in Manitoba. | Add a descriptive paragraph in WordPress (Category Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 4 active operators accurately reflect diverse regional lodging types (Winnipeg urban reserve, East beaches, Eastman boreal forest, Northern hub). | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 10 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 4 valid accommodation operators listed with active single-page profiles.
- [ ] **Category Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 10 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "Accommodation" (e.g. *"Discover warm Indigenous hospitality across Manitoba, from luxury urban hotels and riverside eco-retreats to lakeside geodesic domes and northern lodges."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Category Filter Tabs:** Provide quick filter buttons allowing users to switch between operator categories (Culinary, Attractions, Outdoors, etc.).
