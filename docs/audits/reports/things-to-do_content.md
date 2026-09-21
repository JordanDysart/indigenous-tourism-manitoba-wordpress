# Audit Report: Things To Do — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/things-to-do/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Minor Global Menu 404)`  

---

## 1. Executive Summary
The Things To Do page serves as an effective editorial hub organizing Indigenous experiences into three core thematic pillars: Culture & Heritage, Outdoor & Nature, and Culinary Traditions. Editorial copy is engaging, culturally authentic, and typo-free. All 6 media assets return HTTP 200 status codes. The only broken link is the shared global navigation item leading to a 404 error.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing child page. |
| 2 | Thematic Categorization | 3 Experience Pillars | **Low** | Clear editorial descriptions for Culture & Heritage, Outdoor & Nature, and Culinary Traditions. | High editorial baseline maintained. |
| 3 | Media Asset Health | Hero & Brand Media Files | **Low** | All 6 images resolve with HTTP 200 without broken paths or staging leaks. | Clean media inventory. |

---

## 3. Checklist Verification

- [x] **Spelling & Grammar:** No spelling errors, typos, or grammatical mistakes.
- [x] **Editorial Flow:** Engaging narrative introducing travelers to regional activities.
- [x] **Media Asset Health:** All 6 image assets return HTTP 200 OK.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Placeholders:** No placeholder text, developer debug strings, or unfinished modules.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Seasonal Filter Callouts:** Add seasonal highlights (Summer Pow Wows, Winter Aurora & Dog Sledding, Fall Harvesting).

### 🟢 Low Priority / Polish & Recommendations
1. **Featured Operator Snippets:** Embed 2–3 featured operator preview cards directly under each experience category pillar.
