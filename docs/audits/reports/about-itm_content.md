# Audit Report: About Indigenous Tourism Manitoba — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/about-itm/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Pass (Minor Global Menu 404)`  

---

## 1. Executive Summary
The About ITM page delivers well-crafted, culturally respectful, and inspiring editorial copy explaining the origins, mandate, and future trajectory of Indigenous Tourism Manitoba. All page-specific image assets and media banners resolve cleanly with HTTP 200 status codes. The only broken link detected is the global header menu item linking to `/indigenous-guide-training-program-more-learning-opportunities/` (HTTP 404).

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Global submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update the header menu item in WordPress to point to `/guide-training-program/` or publish the missing child page. |
| 2 | Editorial Polish | Body Copy & Mandate | **Low** | Core narrative clearly explains the organization's three pillars (Empowering Indigenous Voices, Discover Authentic Experiences, Grow Your Tourism Business). | No editorial changes required; strong copy. |
| 3 | Media Asset Health | Hero & Content Photos | **Low** | All 6 images return valid HTTP 200 responses with zero broken paths or staging URL leaks. | Maintain current media assets. |

---

## 3. Checklist Verification

- [x] **Spelling & Grammar:** Clean copy with no typos or grammatical errors.
- [x] **Brand Terminology:** Consistent and culturally appropriate use of "Indigenous Tourism Manitoba" and First Nations / Métis references.
- [x] **Hero Banner Presence:** Top hero section displays properly.
- [x] **Media Asset Health:** All 6 image assets load with HTTP 200.
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Placeholders:** No leftover "Lorem Ipsum" or draft notes in body copy.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global 404 Menu Link:** Resolve the dead menu entry `/indigenous-guide-training-program-more-learning-opportunities/` in WP Admin &rarr; Menus.

### 🟡 Medium Priority / Improvements
1. **Explore Adding Video Storytelling:** Consider embedding an introductory video message from leadership or Elders in the "Who We Are" section.

### 🟢 Low Priority / Polish & Recommendations
1. **Periodic Link Audits:** Run quarterly automated scans of header and footer navigation menus.
