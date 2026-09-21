# Audit Report: Shelly’s Bistro — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/shellys-bistro/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Warm Métis Community Bistro Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Shelly’s Bistro operator profile highlights an Indigenous-owned community dining establishment situated in the historic Métis community of St. Laurent, MB along Lake Manitoba. The profile details home-style dining, famous freshly caught Lake Manitoba pickerel dishes, house-made soups, and fresh traditional bannock. Outbound links to `shellysbistro.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Culinary Storytelling | Overview Section | **Low** | Welcoming narrative highlighting Métis community roots, locally caught pickerel, fresh bannock, and daily comfort specials. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear location (St. Laurent, MB), direct telephone link, and valid external website URL (`https://www.shellysbistro.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Bistro Photo | **Low** | All 15 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Culinary Offerings:** Rich presentation of pickerel dinners, bannock, and community hospitality.
- [x] **External Link Integrity:** `https://www.shellysbistro.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 15 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Menu & Specials Link:** Add a direct "View Menu & Daily Specials" link directing visitors to current menu pricing and seasonal specials.

### 🟢 Low Priority / Polish & Recommendations
1. **Operating Hours:** Add operating hours (e.g. breakfast/lunch/dinner schedules) to assist travelers passing through the Interlake region.
