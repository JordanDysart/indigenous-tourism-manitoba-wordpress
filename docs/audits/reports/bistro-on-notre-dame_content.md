# Audit Report: Bistro on Notre Dame — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/bistro-on-notre-dame/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Rich Culinary Storytelling & Working Outbound Links; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Bistro on Notre Dame operator profile provides a captivating culinary presentation of this Indigenous-owned Winnipeg restaurant, highlighting seasonal menus, locally sourced Manitoba produce, wild game, and traditional bannock offerings. All operator links, telephone contacts, and food imagery resolve cleanly with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Culinary Storytelling | Narrative Bio | **Low** | Engaging descriptions of farm-to-table Indigenous dining, bannock dishes, and local grower partnerships. | High culinary copy quality. |
| 3 | Contact Coordinates | Sidebar Details | **Low** | Accurate phone number, email link, Winnipeg location address, and valid website link (`https://www.bistroonnotredame.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Food & Patio Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Active links to recommended Indigenous operators (Agowiidiwinan Centre, Anne Mulaire, Borealis Beading). | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Overview:** Detailed background on culinary concept, ingredients, and dining experience.
- [x] **External Link Integrity:** `https://www.bistroonnotredame.com/` returns HTTP 200 OK.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Dining Hours & Reservation Guidance:** Explicitly list weekly opening hours (e.g. Dinner: Tue–Sat 5:00 PM – 10:00 PM) and whether reservations are recommended.

### 🟢 Low Priority / Polish & Recommendations
1. **Menu PDF Download:** Add a direct link to the seasonal dinner and drink menu for tourists planning their dining itinerary.
