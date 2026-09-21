# Audit Report: Explore Indigenous at The Forks Market — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/the-forks/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Action Required (Staging Lando URL Leak)`  

---

## 1. Executive Summary
The Explore Indigenous at The Forks Market page contains comprehensive and practical information detailing the physical kiosk, retail hours, member vendor opportunities, and cultural partnerships (Jordan Stranger). However, the audit identified a **critical media defect**: an image source is hardcoded to a local Lando development environment (`https://indigenous-tourism-manitoba-wordpress.lndo.site/...`), resulting in broken image rendering for public website visitors.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Image / Staging Leak | Main feature image block | **Critical** | Image points to local Lando development domain: `https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/2025/05/4-1.png`. Fails to load for public visitors. | Update image URL in page content/database to `https://indigenoustourismmanitoba.ca/wp-content/uploads/2025/05/4-1.png`. |
| 2 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/` or publish the missing page. |
| 3 | Operating Hours & Logistics | Information Section | **Low** | Clear presentation of kiosk location inside The Forks Market and operating days/hours. | High practical utility maintained. |
| 4 | Member Opportunities | Vendor & Workshop Sections | **Low** | Clear editorial descriptions outlining retail placement and workshop booking protocols for ITM members. | Clean editorial copy. |

---

## 3. Checklist Verification

- [x] **Spelling & Grammar:** Clean copy with correct spelling and respectful cultural phrasing.
- [ ] **Media Asset Health (Domain Leaks):** 1 image is hardcoded to `indigenous-tourism-manitoba-wordpress.lndo.site` (broken for public users).
- [ ] **Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Operating Details:** Physical location, operating schedule, and vendor instructions are clearly stated.
- [x] **Placeholders:** No unfinished draft text or developer placeholders found.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Staging Image URL:** Replace `https://indigenous-tourism-manitoba-wordpress.lndo.site/...` with the live production URL `https://indigenoustourismmanitoba.ca/...`.
2. **Fix Global Menu 404 Link:** Correct the broken `/indigenous-guide-training-program-more-learning-opportunities/` link in WordPress Menus.

### 🟡 Medium Priority / Improvements
1. **Vendor Inquiry Form Embed:** Provide an inline application form or direct button for artisans seeking to sell products at The Forks kiosk.

### 🟢 Low Priority / Polish & Recommendations
1. **Photo Gallery Expansion:** Add authentic photographs of the actual retail space and artisan displays inside The Forks Market.
