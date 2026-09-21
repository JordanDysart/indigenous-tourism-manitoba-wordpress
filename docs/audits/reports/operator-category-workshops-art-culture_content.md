# Audit Report: Workshops, Art & Culture Category Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/workshops-art-culture/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Content Recommendations (Rich 3-Operator Directory; Missing Category Narrative Copy; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Workshops, Art & Culture operator category archive showcases traditional Indigenous artistry, hands-on craft workshops, and cultural preservation institutions across Manitoba. The directory features Spence Custom Carving (soapstone sculpture & carving classes), Borealis Beading (immersive Métis beadwork workshops), and the Manitoba Indigenous Cultural Education Centre Inc. (cultural programming, archives, and workshops). All 3 listing cards link directly to complete operator profiles. Adding an introductory narrative celebrating traditional craftsmanship, artistic traditions, and immersive cultural workshops will enrich visitor engagement.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Category Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing hands-on Indigenous workshops, soapstone carving, traditional Métis beadwork, and cultural education programs. | Add a descriptive paragraph in WordPress (Category Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Directory Accuracy | Grid Listings | **Low** | 3 active operators represent distinct workshop and artistic disciplines (carving, beadwork, cultural education). | Complete and accurate directory. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 9 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** 3 valid workshop and cultural operators listed with active single-page profiles.
- [ ] **Category Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 9 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "Workshops, Art & Culture" (e.g. *"Immerse yourself in authentic Indigenous traditions through hands-on soapstone carving, traditional Métis floral beadwork workshops, and rich cultural heritage education across Manitoba."*).

### 🟢 Low Priority / Polish & Recommendations
1. **Category Filter Tabs:** Provide quick filter buttons allowing users to switch between operator categories.
