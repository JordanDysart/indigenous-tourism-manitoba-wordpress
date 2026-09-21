# Audit Report: Sitemap — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/sitemap/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Remediation (2 Broken Taxonomy Links Identified in Directory)`  

---

## 1. Executive Summary
The Sitemap / Directory page provides a structured index of Indigenous Tourism Manitoba's public web architecture. Link validation identified two critical broken regional taxonomy links directly inside the directory listing (`/operator-region/winnipeg/` and `/operator-region/interlake/`), in addition to the site-wide broken header link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Directory Link | Explore by Region &rarr; Winnipeg | **Critical** | Link `<a href="/operator-region/winnipeg/">Winnipeg</a>` returns an **HTTP 404 Not Found** error. | Verify if the taxonomy slug is `capital-region` / `central`, create the term, or remove the obsolete link. |
| 2 | Broken Directory Link | Explore by Region &rarr; Interlake | **Critical** | Link `<a href="/operator-region/interlake/">Interlake</a>` returns an **HTTP 404 Not Found** error. | Verify if the taxonomy slug is `central`, create the `interlake` term in WordPress, or remove the link. |
| 3 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 4 | Directory Taxonomy | Thematic Sections | **Low** | Directory is logically grouped into 6 clear thematic clusters. | High organizational clarity. |
| 5 | Media Asset Integrity | Visual Elements | **Low** | All 6 images return HTTP 200 OK with zero broken paths or staging leaks. | Clean assets. |

---

## 3. Checklist Verification

- [x] **Comprehensive Directory Listing:** Core pages and resource links indexed.
- [ ] **Link Integrity (404 Check):** 2 broken directory links (`/operator-region/winnipeg/`, `/operator-region/interlake/`) + 1 global header link.
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [x] **Copy Formatting:** Clean typography and logical list groupings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Broken Regional Directory Links:**
   - Correct `/operator-region/winnipeg/` to the active regional taxonomy URL or create the term.
   - Correct `/operator-region/interlake/` to the active regional taxonomy URL or create the term.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Dynamic Sitemap Generation:** Consider generating the HTML directory dynamically via WordPress menu / terms query to prevent dead taxonomy links from lingering.

### 🟢 Low Priority / Polish & Recommendations
1. **Operator Count Badges:** Display active operator count next to each category link (e.g. "Culinary (8)").
