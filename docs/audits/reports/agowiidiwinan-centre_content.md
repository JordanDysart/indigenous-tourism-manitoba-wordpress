# Audit Report: Agowiidiwinan Centre — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/agowiidiwinan-centre/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Remediation (Outbound SSL URL Mismatch on Official Website Link)`  

---

## 1. Executive Summary
The Agowiidiwinan Centre profile page delivers an engaging cultural overview of the Treaty Relations Commission of Manitoba (TRCM) educational centre at The Forks in Winnipeg. Content testing identified an SSL hostname mismatch error on the external operator website link (`https://www.trcm.ca`), which triggers browser security warnings. Updating the link to the apex domain `https://trcm.ca` resolves the certificate failure cleanly.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken / Insecure External Link | Operator Website CTA | **Critical** | Link `<a href="https://www.trcm.ca">Visit Website</a>` causes an **SSL Certificate Hostname Mismatch** in modern browsers because the operator's certificate is issued only for `trcm.ca`. | Update operator website field in WP Admin from `https://www.trcm.ca` to `https://trcm.ca`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 3 | Operator Narrative | Bio & Experience Details | **Low** | Rich, authentic copy detailing Treaty history, educational tours, and The Forks location. | High narrative quality. |
| 4 | Media Asset Integrity | Photo Gallery | **Low** | All 17 image assets (sideview, entrance, gallery previews) return HTTP 200 OK without broken links. | Clean asset delivery. |
| 5 | Cross-Linking | "You Might Like" Section | **Low** | Active links to recommended Indigenous operators (Anne Mulaire, Bistro on Notre Dame, Borealis Beading). | Strong internal link network. |

---

## 3. Checklist Verification

- [x] **Operator Story & Overview:** Detailed background on Treaty education and exhibits.
- [ ] **External Link Integrity:** `https://www.trcm.ca` fails SSL validation (requires `https://trcm.ca`).
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 17 image assets return HTTP 200 OK.
- [x] **Contact & Location Details:** Operating location at The Forks clearly communicated.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Operator Website URL:** Change `https://www.trcm.ca` to `https://trcm.ca` in the operator custom post type fields to eliminate browser SSL warnings.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Operating Hours & Tour Booking Info:** Clarify whether walk-ins are accepted or if advance booking is required for school and group tours.

### 🟢 Low Priority / Polish & Recommendations
1. **Interactive Google Maps Embed:** Provide an interactive map marker for The Forks Market location.
