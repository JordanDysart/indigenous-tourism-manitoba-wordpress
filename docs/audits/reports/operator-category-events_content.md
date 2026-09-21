# Audit Report: Events Category Archive — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/events/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Content Recommendations (Accurate Event Operator Entry; Missing Editorial Intro; Cross-Link to Events Calendar Needed)`  

---

## 1. Executive Summary
The Events operator category archive indexes businesses and non-profit organizations primarily organized around Indigenous festivals and cultural events (currently featuring the internationally acclaimed Manito Ahbee Festival). The operator card links accurately to its single profile. To improve visitor utility, the archive needs an introductory narrative explaining Indigenous annual gatherings in Manitoba and a prominent cross-link to the dedicated ITM Events Calendar (`/events/`).

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Category Description | Taxonomy Header | **Medium** | The archive page lacks an introductory description contextualizing Indigenous festivals, pow wows, and cultural events across Manitoba. | Add a descriptive paragraph in WordPress (Category Description) and render `<?php the_archive_description('<div class="taxonomy-description lead">', '</div>'); ?>`. |
| 2 | Content Clarity & Navigation | Page Header / Banner | **Medium** | Users browsing this operator category may confuse it with the live event calendar. | Add a helpful note and banner link: *"Looking for upcoming dates and schedules? View our full [ITM Events Calendar](/events/)."* |
| 3 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 4 | Media Asset Integrity | Card Thumbnails | **Low** | All 7 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |

---

## 3. Checklist Verification

- [x] **Listing Accuracy:** Manito Ahbee Festival listed with active single-page profile.
- [ ] **Category Description Text:** Archive lacks introductory editorial text.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 7 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Lead Paragraph:** Populate the WordPress term description for "Events" (e.g. *"Celebrate Indigenous music, dance, arts, and cultural gatherings across Manitoba. Connect with event organizers and festival hosts."*).
2. **Cross-Link to Main Events Calendar:** Add a callout banner directing visitors to `/events/` for active event schedules.

### 🟢 Low Priority / Polish & Recommendations
1. **Category Filter Tabs:** Provide quick filter buttons allowing users to switch between operator categories.
