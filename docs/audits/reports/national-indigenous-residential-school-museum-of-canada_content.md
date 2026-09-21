# Audit Report: National Indigenous Residential School Museum of Canada — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/national-indigenous-residential-school-museum-of-canada/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Profound Truth-Telling Narrative & National Historic Site Context; Minor Global Menu 404)`  

---

## 1. Executive Summary
The National Indigenous Residential School Museum of Canada (NIRSM) operator profile provides a profound, educational narrative documenting the history, preservation, and survivor legacy of the former Portage la Prairie Indian Residential School on Keeshkeemaquah reserve. Operator contact coordinates and external website links resolve with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Historical Truth & Commemoration | Museum Overview | **Low** | Comprehensive narrative explaining the National Historic Site designation, artifact preservation, and educational tours. | High historical and cultural integrity. |
| 3 | Contact & Location Coordinates | Overview Section | **Low** | Clear address (5000 Crescent Rd W, Keeshkeemaquah MB), direct telephone link, and valid external website URL (`https://nirsmuseum.ca/`). | Complete contact info. |
| 4 | Media Asset Integrity | Museum & Monument Photos | **Low** | All 19 image assets return HTTP 200 OK with zero broken paths or staging leaks. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Functional links to partner Indigenous operators. | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Historical & Educational Story:** Respectful, comprehensive coverage of museum exhibits and survivor legacy.
- [x] **External Link Integrity:** `https://nirsmuseum.ca/` returns HTTP 200 OK with valid SSL.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 19 image assets return HTTP 200 OK.
- [x] **Social Media Presence:** Working links to Facebook, Instagram, LinkedIn, and X.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Guided Tour & Group Booking Callout:** Add an explicit callout for schools, universities, and group delegations seeking to schedule guided educational tours with museum curators.

### 🟢 Low Priority / Polish & Recommendations
1. **Visitor Etiquette & Protocol Notice:** Include brief guidance on respectful conduct, survivor reflection spaces, and photography guidelines when visiting the memorial grounds.
