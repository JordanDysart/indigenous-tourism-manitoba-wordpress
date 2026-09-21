# Audit Report: Guide Training Step 3: Practicum — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-3/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Exemplary Mentorship Blueprint; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Step 3: Practicum page details the capstone workplace placement and mentorship requirements connecting trainees with operational Indigenous tourism businesses across Manitoba. The editorial content is thorough, inspiring, and error-free. All media assets load reliably with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Practicum Blueprint | Workplace Mentorship Section | **Low** | Clear articulation of 40-hour field placement, senior guide shadowing, and practical evaluation. | High instructional clarity. |
| 3 | Step Navigation Pathway | Bottom Navigation | **Low** | Clear backward link connecting Step 2 (`/indigenous-guide-training-program-step-2/`) and primary application gateway. | Logical user progression. |
| 4 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Curriculum Completeness:** 40-hour placement, mentorship hours, and certification exit criteria detailed.
- [x] **Spelling & Grammar:** Professional and culturally respectful tone.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Next Step Navigation:** Direct links to Step 2 and inquiry form present.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Host Operator Directory:** Add a list or logos of participating Indigenous tourism businesses that host guide practicum placements.

### 🟢 Low Priority / Polish & Recommendations
1. **Practicum Handbook Link:** Provide a downloadable PDF summarizing the supervisor evaluation rubric.
