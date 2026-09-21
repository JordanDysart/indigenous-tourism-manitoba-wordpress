# Audit Report: North Region Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/north/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Iconic 3-Operator Sub-Arctic Roster; Missing Regional Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The North region operator taxonomy archive showcases world-class Indigenous tourism experiences across Northern Manitoba and the sub-Arctic coast of Hudson Bay. The directory features Kikiwak Inn (First Nations-owned hotel and conference center in Opaskwayak Cree Nation / The Pas), Wapusk Adventures (champion dogsledding expeditions and Aurora viewing in Churchill), and Sub-Arctic Tours (custom tundra, beluga whale, and polar bear excursions in Churchill). All 3 listing cards link directly to complete operator profiles. Adding an introductory editorial narrative celebrating Cree traditions, sub-Arctic wildlife, dog mushing, and Aurora Borealis will greatly elevate traveler inspiration.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Regional Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Northern Manitoba's sub-Arctic wilderness, Churchill wildlife (belugas, polar bears, auroras), Cree cultural heritage, and indigenous dogsledding traditions. | Add a descriptive paragraph in WordPress (Region Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 3 active operators accurately represent the North region across cultural accommodation, dog mushing, and sub-Arctic tundra tours. | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 9 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 3 valid northern operators listed with active single-page profiles.
- [ ] **Region Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 9 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "North" (e.g. *"Embark on an unforgettable sub-Arctic journey across Northern Manitoba. From authentic Cree hospitality at Kikiwak Inn to exhilarating dog mushing and polar bear expeditions in Churchill with Wapusk Adventures and Sub-Arctic Tours, discover the extraordinary majesty of the North."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Region Switcher Tabs:** Provide quick filter buttons allowing users to switch between operator regions (Central, East, North, West).
