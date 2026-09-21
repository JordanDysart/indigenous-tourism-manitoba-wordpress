# Audit Report: Sharecuterie — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/sharecuterie/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Artisanal Charcuterie & Catering Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Sharecuterie operator profile highlights an Indigenous-owned artisanal charcuterie and luxury grazing enterprise based in Winnipeg, MB. The profile details handcrafted charcuterie boxes, corporate event catering, luxury picnic spreads, and gourmet local partnerships. Outbound links to `sharecuteriewpg.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Artisanal Storytelling | Culinary Overview | **Low** | Engaging narrative detailing custom charcuterie craftsmanship, luxury picnic boxes, grazing tables, and corporate gifting. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear city base (Winnipeg, MB), direct telephone link, and valid external website URL (`https://www.sharecuteriewpg.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Grazing & Platter Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Culinary Offerings:** Rich presentation of charcuterie boxes, grazing tables, and catering services.
- [x] **External Link Integrity:** `https://www.sharecuteriewpg.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Direct Grazing Box Order CTA:** Add an explicit "Order Charcuterie & Grazing Boxes" link directing visitors directly to menu ordering on `sharecuteriewpg.com`.

### 🟢 Low Priority / Polish & Recommendations
1. **Custom Event Lead Time:** Note recommended advance notice (e.g. 48-72 hours) for large custom grazing table bookings.
