# Audit Report: Guide Training Step 1: Introduction — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-1/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Thorough Introductory Syllabus; Minor Global Menu 404)`  

---

## 1. Executive Summary
The Step 1: Introduction page delivers a comprehensive, culturally anchored introduction to Indigenous tour guiding in Manitoba. The syllabus clearly establishes expectations around storytelling protocols, cultural safety, and foundational land-based interpretation. All media assets load reliably with zero broken paths.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 2 | Syllabus Articulation | Course Curriculum Section | **Low** | Well-structured modules detailing storytelling ethics, cultural protocols, and Manitoba Indigenous histories. | High instructional clarity. |
| 3 | Sequential Step Pathway | Bottom Navigation | **Low** | Clear forward link prompting trainees to review Step 2: 7-Day Training (`/indigenous-guide-training-program-step-2/`). | Logical user progression. |
| 4 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Curriculum Completeness:** Introductory modules and eligibility prerequisites detailed.
- [x] **Spelling & Grammar:** Professional and culturally appropriate editorial tone.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Next Step Navigation:** Direct links to Step 2 and inquiry form present.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Format & Duration Details:** Add an "At-a-Glance" info box specifying workshop duration (e.g. 2 Days / 16 Hours), delivery format (in-person vs hybrid), and locations.

### 🟢 Low Priority / Polish & Recommendations
1. **Instructor Profile:** Mention the master cultural instructors and Elder advisors leading Step 1 workshops.
