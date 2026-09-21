# Audit Report: Moon Gate Guest House — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/moon-gate-guest-house/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Inviting Eco-Retreat Storytelling; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Moon Gate Guest House operator profile provides a warm and compelling narrative highlighting their strawbale eco-retreat, wellness gatherings, riverfront kayaking along the Whitemouth River, and artisanal culinary experiences. Operator coordinates and external website links resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Eco-Retreat Storytelling | Guest House Overview | **Low** | Engaging descriptions of strawbale construction, wood-fired pizza ovens, wellness weekends, and river recreation. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Accurate physical location (48 Main St N, Whitemouth MB), clickable telephone link, and valid external website URL (`https://moongateguesthouse.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Guest House & River Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Accommodation Details:** Clear presentation of guest rooms, wellness retreats, and eco-friendly features.
- [x] **External Link Integrity:** `https://moongateguesthouse.ca/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Direct Booking Callout:** Add an explicit "Book a Retreat Stay" link directing guests to the room availability calendar on `moongateguesthouse.ca`.

### 🟢 Low Priority / Polish & Recommendations
1. **Seasonality & Activity Guide:** Highlight seasonal offerings such as winter snowshoeing and summer river paddling.
