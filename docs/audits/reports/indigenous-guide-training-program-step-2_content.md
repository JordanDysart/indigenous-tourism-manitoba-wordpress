# Audit Report: Guide Training Step 2: 7-Day Training Course — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-2/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Comprehensive Field Syllabus; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Step 2: 7-Day Training Course page delivers an exhaustive, highly practical breakdown of the field training intensive, highlighting wilderness first aid, land navigation, safety protocols, and certified credentials. The editorial copy is professional and error-free. All media assets load reliably with HTTP 200 status.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Field Curriculum Detail | Training Modules Section | **Low** | Clear articulation of wilderness safety, emergency communication, and land-based storytelling delivery. | High instructional clarity. |
| 3 | Step Navigation Pathway | Bottom Navigation | **Low** | Clear back and forward links connecting Step 1 (`/indigenous-guide-training-program-step-1/`) and Step 3 (`/indigenous-guide-training-program-step-3/`). | Logical user progression. |
| 4 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Curriculum Completeness:** 7-day schedule, modules, and certifications detailed.
- [x] **Spelling & Grammar:** Professional and culturally respectful tone.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Next Step Navigation:** Direct links to Step 1, Step 3, and inquiry form present.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Certification Logos:** Add visual badges for accredited credentials earned during Step 2 (e.g. Red Cross Wilderness First Aid, Food Safe).

### 🟢 Low Priority / Polish & Recommendations
1. **Gear & Equipment Checklist:** Add a downloadable checklist of required personal gear for the 7-day field intensive.
