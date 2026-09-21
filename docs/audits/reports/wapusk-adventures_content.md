# Audit Report: Wapusk Adventures — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/wapusk-adventures/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Legendary Churchill Dog Mushing Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Wapusk Adventures operator profile presents a world-class Indigenous (Métis) dog mushing and northern lights adventure enterprise located in Churchill, Manitoba. Founded by Canadian dog sled champion Dave Daley, the profile effectively conveys the thrill of winter dog sledding, summer tundra carting, and Métis cultural storytelling. Outbound links to `wapuskadventures.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Expedition Storytelling | Overview Section | **Low** | Thrilling narrative covering winter dog sledding, summer tundra cart runs, northern lights viewing, and Métis cultural heritage. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear northern base (Churchill, MB), direct telephone link, and valid external website URL (`https://www.wapuskadventures.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Action Photos | **Low** | All 18 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Tour Offerings:** Rich presentation of winter dog sledding, summer dog carting, and northern lights.
- [x] **External Link Integrity:** `https://www.wapuskadventures.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 18 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Seasonal Adventure Breakdown:** Highlight seasonal packages (Winter/Spring Dog Sledding & Aurora; Summer Dog Carting & Belugas).

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Tour Booking CTA:** Add a "Book Dog Sled Adventure" action button linking directly to tour bookings.
