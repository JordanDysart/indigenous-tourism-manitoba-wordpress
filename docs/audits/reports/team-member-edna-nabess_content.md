# Audit Report: Edna Nabess Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/edna-nabess/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Spelling Correction: "Kewantinook" vs "Kewatinook"; Paragraph Formatting; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Edna Nabess provides an inspiring biographical narrative celebrating her Cree heritage (Mathias Colomb Cree Nation / Cormorant), her business leadership as founder of Cree-Ations, and her extensive provincial board service across Manitoba. Content recommendations include correcting the spelling of the provincial electoral district (*"Kewantinook"* &rarr; *"Kewatinook"*), converting `<br><br><br><br>` spacing into distinct semantic paragraphs, styling an explicit role subtitle, and fixing the shared global navigation 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Geographical / Electoral Spelling | Bio Paragraph 2 | **Medium** | Sentence ends: *"...in the riding of Kewantinook."* containing an extra 'n'. The official Manitoba electoral division is *Kewatinook*. | Correct spelling to *"Kewatinook"*. |
| 2 | Typography & Formatting | `.entry-content` | **Medium** | Biography is enclosed in a single Kadence heading block with quadruple line breaks (`<br><br><br><br>`) rather than distinct paragraph elements. | Split into two separate semantic `<p class="wp-block-paragraph">` elements. |
| 3 | Role Subtitle | Profile Header | **Medium** | Her position (*Board Director / Founder, Cree-Ations*) is not styled as a prominent subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Board Director</p>` beneath the H1. |
| 4 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 5 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 6 | Media Asset Health | Featured Headshot | **Low** | `edna.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [ ] **Spelling & Typographical Accuracy:** Extra 'n' in riding name (*"Kewantinook"* &rarr; *"Kewatinook"*).
- [ ] **Paragraph Structure:** Text formatted with quadruple `<br>` tags rather than individual paragraphs.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Correct Electoral Riding Typo:** Change *"Kewantinook"* to *"Kewatinook"* in the WordPress editor.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Refactor Line Breaks to Paragraphs:** Convert the block with `<br><br><br><br>` tags into distinct `<p>` paragraph blocks.
2. **Elevate Role Headline:** Add an explicit "Board Director" role subtitle beneath the page title.

### 🟢 Low Priority / Polish & Recommendations
1. **Populate Custom Quote:** Add an authentic quote regarding Indigenous artisan entrepreneurship or cultural preservation.
