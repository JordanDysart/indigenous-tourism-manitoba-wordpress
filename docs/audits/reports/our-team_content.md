# Audit Report: Our Team — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/our-team/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Pass (Minor Global Menu 404)`  

---

## 1. Executive Summary
The Our Team page provides an accurate, professional directory of Indigenous Tourism Manitoba's executive leadership (6 staff members) and Board of Directors (5 board members). All 17 image assets (headshots, logos, and badges) resolve with HTTP 200 status codes, and individual profile links function properly. Editorial quality and cultural naming conventions are well maintained. The only broken link is the shared global header menu item leading to a 404 error.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| 2 | Placeholder Media | Melanie Ferris Profile Card | **Low** | Uses an illustrated logo graphic (`ITM_4CP_DANCER-298x300.png`) rather than an actual photograph. | Replace with a high-resolution photographic headshot when supplied by the Board member. |
| 3 | Editorial Quality | Staff & Board Titles | **Low** | Names, executive titles, and roles are accurate, properly formatted, and consistent. | Maintain current editorial roster. |
| 4 | Image Asset Health | Headshot Media Files | **Low** | All 17 headshot images and badges load with HTTP 200 without broken paths or staging leaks. | Clean media inventory. |

---

## 3. Checklist Verification

- [x] **Spelling & Names:** Clean copy with correct spelling of leadership and board member names.
- [x] **Titles & Roles:** Accurate organizational titles across executive and board rosters.
- [x] **Media Asset Health:** All 17 images return HTTP 200 OK.
- [ ] **Headshot Completeness:** 1 board member uses an avatar illustration instead of a photographic headshot.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Placeholders:** No leftover "Lorem Ipsum" or raw template code.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in the main navigation menu.

### 🟡 Medium Priority / Improvements
1. **Source Missing Headshot:** Obtain and upload an official headshot photo for Melanie Ferris (Director At Large).

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Contact / LinkedIn Links:** Consider providing public business contact email or LinkedIn links for key executive staff members.
