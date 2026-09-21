# Audit Report: Our Operators — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/operators/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Pass (Minor Global Menu 404)`  

---

## 1. Executive Summary
The Our Operators directory presents a vibrant, well-maintained roster of authentic Indigenous businesses across Manitoba. All 18 operator profile images and logos resolve cleanly with HTTP 200 status codes, and individual business links function properly across all pagination pages. The only broken link is the shared global navigation item leading to a 404 error.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| 2 | Directory Descriptions | Operator Cards | **Low** | Business titles, categories (Accommodations, Attractions, Culinary, etc.), and regional designations are accurate and formatted consistently. | High editorial baseline maintained. |
| 3 | Media Asset Health | Operator Photography | **Low** | All 18 operator photographs and logos load with HTTP 200 without broken paths or staging leaks. | Clean media inventory. |

---

## 3. Checklist Verification

- [x] **Spelling & Names:** Clean copy with correct spelling of all operator business names.
- [x] **Category Taxonomies:** Accurate categorization across cultural tourism sectors.
- [x] **Media Asset Health:** All 18 images return HTTP 200 OK.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Placeholders:** No placeholder copy or developer notes found.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Direct Website / Booking Links:** Consider adding direct external website and booking links on the card preview level in addition to the single operator page link.

### 🟢 Low Priority / Polish & Recommendations
1. **Search & Filter Enhancement:** Provide dynamic category filter pills (Culinary, Tours, Accommodations) to improve directory browsing.
