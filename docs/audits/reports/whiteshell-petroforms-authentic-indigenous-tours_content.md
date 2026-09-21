# Audit Report: Whiteshell Petroforms Authentic Indigenous Tours — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/whiteshell-petroforms-authentic-indigenous-tours/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Profound Sacred Site Narrative & Cultural Protocols; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Whiteshell Petroforms Authentic Indigenous Tours operator profile offers a deeply respectful, culturally authentic narrative of Anishinaabe walking tours through the sacred stone alignments at Manidoo-Abi in Whiteshell Provincial Park. The text honors sacred protocols, tobacco offerings, and Elder teachings. Outbound links to `whiteshellpetroforms.com` resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Sacred Cultural Narrative | Overview Section | **Low** | Eloquent copy detailing the ancient petroform teachings (turtle, snake, medicine wheel), Precambrian granite ridges, and spiritual protocols. | Exceptional cultural depth and authenticity. |
| 3 | Contact Coordinates | Overview Section | **Low** | Clear regional base (Whiteshell Provincial Park, MB), direct telephone link, and valid external website URL (`https://whiteshellpetroforms.com/`). | Complete contact info. |
| 4 | Media Asset Integrity | Stone Formation Photos | **Low** | All 17 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Cultural Story & Tour Offerings:** Profound educational narrative covering Manidoo-Abi stone alignments.
- [x] **External Link Integrity:** `https://whiteshellpetroforms.com/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 17 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Tour Preparation & Protocol Callout:** Highlight visitor etiquette tips (e.g., proper footwear for granite walking, tobacco protocol etiquette, seasonal tour schedules from May through October).

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Tour Booking CTA:** Add a "Book Guided Petroforms Tour" action button linking directly to tour booking dates.
