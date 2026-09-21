# Audit Report: Kikiwak Inn — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/kikiwak-inn/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Comprehensive Northern Hospitality Overview; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Kikiwak Inn operator profile presents an authentic and detailed overview of Opaskwayak Cree Nation's premier hospitality and conference destination near The Pas, Manitoba. The narrative covers full-service accommodation features, banquet/meeting facilities, on-site dining, and Northern cultural roots. All operator contact coordinates and outbound links resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Hospitality Narrative | Hotel Overview | **Low** | Well-written copy covering 60 guest rooms, indoor pool/whirlpool, dining room, and Cree cultural hospitality. | High copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Accurate physical address on Highway 10 in Opaskwayak, active phone link, and valid website URL (`https://www.kikiwakinn.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Hotel & Amenity Photos | **Low** | All 18 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional recommendation links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Amenity Highlights:** Comprehensive coverage of Opaskwayak Cree Nation hotel and conference center.
- [x] **External Link Integrity:** `https://www.kikiwakinn.ca/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 18 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Direct Booking Callout:** Add a prominent "Book a Room Online" action link for travelers booking Northern Manitoba itineraries.

### 🟢 Low Priority / Polish & Recommendations
1. **Regional Activity Tips:** Add brief mentions of nearby Northern Manitoba attractions (Clearwater Lake Provincial Park, Trappers' Festival) accessible from Kikiwak Inn.
