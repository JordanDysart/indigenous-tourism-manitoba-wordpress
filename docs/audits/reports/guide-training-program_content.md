# Audit Report: Indigenous Guide Training Program — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/guide-training-program/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Exemplary Curriculum Detail; Root Cause of Global Menu 404 Discovered)`  

---

## 1. Executive Summary
The Indigenous Guide Training Program page features high-quality, comprehensive educational content outlining a 3-step pathway (Introduction, 7-Day Training, Practicum) to guide certification. Notably, this audit identified the root cause of the site-wide global menu 404 error: the menu item "More Learning Opportunities" links to `/indigenous-guide-training-program-more-learning-opportunities/`, whereas this content resides directly on this page under `<h2>Additional Learning Opportunities</h2>`.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | The menu item "More Learning Opportunities" points to a non-existent standalone slug `/indigenous-guide-training-program-more-learning-opportunities/` (**HTTP 404**). | Point the menu item to `/guide-training-program/#additional-learning-opportunities` or create a redirect. |
| 2 | Curriculum Outline Quality | 3-Phase Educational Structure | **Low** | Clear articulation of foundational theory, 7-day field intensive, and hands-on operator practicum. | High educational clarity. |
| 3 | Inquiry & Application Pathway | Closing Call to Action | **Low** | Prominent links guiding prospective trainees to the inquiry form (`/itm-indigenous-guide-training-program-inquiry-form/`). | Clean conversion flow. |
| 4 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Curriculum Completeness:** All 3 training phases and additional learning modules detailed.
- [x] **Spelling & Grammar:** Culturally respectful and professional tone.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Application Funnel:** Link to active inquiry form verified.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL from `/indigenous-guide-training-program-more-learning-opportunities/` to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Upcoming Cohort Dates:** Add a callout box listing the next scheduled cohort training dates and locations across Manitoba.

### 🟢 Low Priority / Polish & Recommendations
1. **Graduate Spotlight Stories:** Feature 1–2 quotes or short bios of Indigenous guides who completed the program.
