# Audit Report: Holly Courchene (Holly Spence) Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/holly-courchene/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Name/Slug Discrepancy: Courchene vs Spence; Strategy Alignment; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Holly Courchene (displayed on-page as "Holly Spence") outlines her executive leadership as Executive Director of Indigenous Tourism Manitoba, driving the Manitoba Indigenous Tourism Strategy in partnership with Travel Manitoba and ITAC. Content findings include a name discrepancy between the URL slug (`holly-courchene`) and on-page title (*"Holly Spence"*), compound modifier polish (*"market-ready and export-ready"*), styling an explicit role subtitle, and resolving the shared global header 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Name / URL Permalinks | URL Slug vs H1 Title | **Medium** | The URL slug is `/team-member/holly-courchene/`, while the H1 heading and portrait filename read *"Holly Spence"*. | Verify current official surname and update permalink to `/team-member/holly-spence/` (with a 301 redirect) if appropriate. |
| 2 | Typographical / Grammar Polish | Bio Paragraph 2 | **Low** | Phrase reads *"...to strengthen their offerings into market and export-ready products."* | Standardize compound modifier to *"...into market-ready and export-ready products."* to match paragraph 1. |
| 3 | Role Subtitle | Profile Header | **Medium** | Her executive position (*Executive Director*) is described in narrative rather than highlighted as an explicit subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Executive Director</p>` beneath the H1. |
| 4 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 5 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 6 | Media Asset Health | Featured Headshot | **Low** | `Holly-Spence-headshot-2025-scaled.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [ ] **Name & Slug Consistency:** Discrepancy between URL permalink (`holly-courchene`) and on-page title (*"Holly Spence"*).
- [x] **Spelling & Typographical Accuracy:** Clean narrative and proper paragraph block structure.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Headshot photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
2. **Clarify Surname & Permalinks:** Confirm surname convention and implement 301 redirect if renaming slug.

### 🟡 Medium Priority / Improvements
1. **Elevate Role Headline:** Add an explicit "Executive Director" role subtitle beneath the page title.
2. **Standardize Strategy Terminology:** Use consistent *"market-ready and export-ready"* phrasing throughout.

### 🟢 Low Priority / Polish & Recommendations
1. **Populate Custom Quote:** Add an executive quote regarding the Manitoba Indigenous Tourism Strategy vision.
