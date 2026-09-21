# Audit Report: Sub-Arctic Tours — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/sub-arctic-tours/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Exhilarating Churchill Eco-Tour Narrative; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Sub-Arctic Tours operator profile showcases an authentic Indigenous-owned wildlife expedition operator based in Churchill, Manitoba, specializing in polar bear viewing, beluga whale encounters, tundra ecology tours, and aurora borealis excursions. Outbound links to `subarctictours.ca` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Expedition Storytelling | Overview Section | **Low** | Compelling narrative highlighting Churchill wildlife seasons (summer belugas & fall polar bears), traditional knowledge, and personalized eco-guiding. | High experiential copy quality. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear northern base (Churchill, MB), direct telephone link, and valid external website URL (`https://subarctictours.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Wildlife Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Tour Offerings:** Rich presentation of polar bear viewing, beluga boat tours, and northern lights.
- [x] **External Link Integrity:** `https://subarctictours.ca/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Seasonal Wildlife Breakdown:** Add a bulleted seasonal guide (e.g. July–August: Belugas & Tundra Blooms; October–November: Polar Bears; Winter: Aurora Borealis).

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Booking CTA:** Add a "Book Churchill Tour" action link directing visitors directly into tour reservations.
