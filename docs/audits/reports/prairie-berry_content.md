# Audit Report: Prairie Berry — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/prairie-berry/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Rich Farm-to-Table & Agritourism Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Prairie Berry operator profile showcases an Indigenous-owned farm-to-table dining and agritourism destination located on the banks of the Red River in Glenlea, MB. The profile details seasonal culinary dinners, farm tours, artisan baked goods, and pick-your-own berry harvesting. Outbound links to `prairie-berry.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Farm-to-Table Storytelling | Culinary Overview | **Low** | Engaging narrative detailing seasonal farm dinners, culinary craft, local strawberry and berry harvests, and riverside dining. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear location (Glenlea, MB), direct telephone link, and valid external website URL (`https://prairie-berry.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Farm & Dining Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Culinary Offerings:** Rich presentation of farm dinners, berry picking, and agritourism experiences.
- [x] **External Link Integrity:** `https://prairie-berry.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Farm Dinner Ticket Reservation CTA:** Add an explicit "Book Seasonal Farm Dinner" link pointing directly to Prairie Berry's seasonal dining schedule.

### 🟢 Low Priority / Polish & Recommendations
1. **Berry Season Dates:** Mention typical strawberry harvest weeks (late June – July) to help visitors plan berry picking trips.
