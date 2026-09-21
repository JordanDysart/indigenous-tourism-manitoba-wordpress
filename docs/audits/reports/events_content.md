# Audit Report: Events — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/events/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Minor Global Menu 404; Editorial Copy Needed)`  

---

## 1. Executive Summary
The Events page integrates an active 3common.com interactive event calendar widget (`profile_events`), which responds with HTTP 200 OK. However, the host page is completely devoid of accompanying editorial content—there is no introductory copy introducing Manitoba's Indigenous cultural events calendar, nor are there instructions on how community organizers and member operators can submit their events.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| 2 | Content Completeness | Main Content Area | **Medium** | The page contains solely an `<iframe>` embed with no introductory text or host page editorial copy. | Add an introductory heading and overview paragraph describing upcoming pow wows, artisan workshops, and cultural gatherings across Manitoba. |
| 3 | Event Submission Guidance | Content Footer / Submission Block | **Medium** | No instructions or submission links for operators seeking to add community events to the calendar. | Add an "Are You Hosting an Indigenous Event? Submit Your Event Details" section with an inquiry link/form. |
| 4 | Widget Endpoint Health | 3common Calendar Embed | **Low** | Third-party calendar API and iframe endpoint resolve with HTTP 200 OK. | Active integration. |

---

## 3. Checklist Verification

- [x] **Calendar Integration Health:** 3common iframe endpoint returns HTTP 200 OK.
- [ ] **Editorial Context:** Page lacks introductory narrative and explanatory copy.
- [ ] **Event Submission Pathway:** No event submission guidelines or forms provided.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Health:** All 6 images return HTTP 200 without broken paths or staging leaks.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Add Introductory Editorial Copy:** Add an `<h1>Indigenous Events in Manitoba</h1>` headline and an introductory paragraph above the calendar.
2. **Add Event Submission CTA:** Add a closing section inviting community organizers to submit event details to ITM.

### 🟢 Low Priority / Polish & Recommendations
1. **Featured Major Annual Events:** Add static highlight cards for signature annual celebrations (e.g., Manito Ahbee Festival).
