# Audit Report: Wyndham Garden Winnipeg Airport — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/wyndham-garden-winnipeg-airport/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Comprehensive Urban Indigenous Hospitality Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Wyndham Garden Winnipeg Airport operator profile effectively communicates a premier Indigenous-owned hospitality property located on Long Plain First Nation's Madison Urban Reserve. The page thoroughly details hotel amenities (132 guest rooms, Manito Ahbee Aki Restaurant & Bar, indoor pool/waterslide, meeting spaces, airport shuttle). Outbound links to `wyndhamgardenwinnipeg.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Hotel Storytelling | Overview Section | **Low** | Inspiring copy detailing urban reserve sovereignty, cultural artwork, contemporary accommodations, and dining. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear civic address (460 Madison St, Winnipeg, MB), direct telephone link, and valid external website URL (`https://www.wyndhamgardenwinnipeg.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Hotel Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Hotel Offerings:** Rich presentation of rooms, dining, conferences, and urban reserve heritage.
- [x] **External Link Integrity:** `https://www.wyndhamgardenwinnipeg.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Dining & Meeting Highlights:** Add a dedicated callout for Manito Ahbee Aki Restaurant menus and conference room bookings.

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Room Reservation CTA:** Add a "Book Your Room" action button linking directly to the Wyndham reservation engine.
