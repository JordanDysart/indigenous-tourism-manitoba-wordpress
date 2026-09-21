# Audit Report: Experience Map — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/experience-map/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Minor Global Menu 404)`  

---

## 1. Executive Summary
The Experience Map page provides a comprehensive spatial and textual directory encompassing all 22 active Indigenous tourism businesses across Manitoba. All 28 media assets load cleanly with HTTP 200 status codes without staging domain leaks, and all 22 operator destination profile links are valid and active. The only broken link is the shared global navigation item leading to a 404 error.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| 2 | Geographic Directory Integrity | 22 Operator Listings | **Low** | All 22 accredited operator businesses are listed with verified links and accurate titles. | Comprehensive directory baseline. |
| 3 | Media Asset Health | Map & Card Imagery | **Low** | All 28 image assets return HTTP 200 OK without broken file paths. | Clean media inventory. |

---

## 3. Checklist Verification

- [x] **Spelling & Names:** Clean copy with accurate spelling of all 22 operator business names.
- [x] **Directory Coverage:** All 22 active operators are cataloged on the page.
- [x] **Media Asset Health:** All 28 images return HTTP 200 OK.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Placeholders:** No placeholder copy, unrendered shortcodes, or template debug notes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Add Map Legend / Regional Filters:** Provide quick-filter toggles for Manitoba tourism regions (North, Interlake, Parkland, Central, Eastman, Winnipeg).

### 🟢 Low Priority / Polish & Recommendations
1. **Address & Driving Directions:** Display city/town name directly on each card under the map.
