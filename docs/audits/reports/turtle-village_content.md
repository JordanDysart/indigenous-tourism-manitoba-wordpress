# Audit Report: Turtle Village — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/turtle-village/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Inviting Eco-Resort Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Turtle Village operator profile highlights an authentic Indigenous-owned eco-luxury cabin destination near Grand Beach Provincial Park on Lake Winnipeg. The page effectively details unique geodesic turtle dome cabins, off-grid solar amenities, and serene lakeside surroundings. Outbound links to `turtlevillage.ca` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Resort Storytelling | Overview Section | **Low** | Inspiring copy detailing geodesic eco-cabins, peaceful boreal forest immersion, and Lake Winnipeg beach access. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear regional coordinates (Grand Beach, Lake Winnipeg, MB), direct telephone link, and valid external website URL (`https://turtlevillage.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Cabin Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Accommodation Offerings:** Rich presentation of eco-cabins, dome architecture, and glamping comfort.
- [x] **External Link Integrity:** `https://turtlevillage.ca/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Seasonality & Booking Details:** Highlight seasonal operating dates (spring through autumn glamping) and pet/family policies.

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Reservation CTA:** Add a "Book Your Cabin Stay" action button linking directly to the reservation engine on `turtlevillage.ca`.
