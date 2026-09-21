# Audit Report: Doreen Booth Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/doreen-booth/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Minor Grammar Tweak; Paragraph Formatting; Empty Quote Container; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Doreen Booth presents a compelling biographical background highlighting her 16 years of expertise across northern tourism (polar bear viewing, beluga whale watching, northern lights) and relationship building across BC, Yukon, and Manitoba. Content enhancements include adjusting a minor singular/plural noun agreement (*"immersive experience"* &rarr; *"immersive experiences"*), converting `<br><br><br><br>` tags into distinct semantic paragraphs, and addressing the shared global navigation 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Grammatical Agreement | Bio Paragraph 2 | **Low** | Sentence reads: *"Doreen is always on the lookout for authentic and immersive experience..."* (missing article or pluralization). | Update copy to: *"Doreen is always on the lookout for authentic and immersive experiences..."* (or *"an authentic and immersive experience..."*). |
| 2 | Typography & Formatting | `.entry-content` | **Medium** | Biography is enclosed in a single Kadence heading block with quadruple line breaks (`<br><br><br><br>`) rather than distinct paragraph elements. | Split into three separate semantic `<p class="wp-block-paragraph">` elements. |
| 3 | Role Subtitle | Profile Header | **Medium** | Her position (*Project Manager*) is embedded inside the first sentence rather than highlighted as a prominent subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Project Manager</p>` beneath the H1. |
| 4 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 5 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 6 | Media Asset Health | Featured Headshot | **Low** | `Doreen-Booth-HS1-scaled.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [ ] **Spelling & Typographical Accuracy:** Minor noun agreement adjustment in paragraph 2 (*"immersive experience"* &rarr; *"immersive experiences"*).
- [ ] **Paragraph Structure:** Text formatted with quadruple `<br>` tags rather than individual paragraphs.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Refactor Line Breaks to Paragraphs:** Convert the block with `<br><br><br><br>` tags into distinct `<p>` paragraph blocks.
2. **Correct Noun Agreement:** Change *"authentic and immersive experience"* to *"authentic and immersive experiences"*.
3. **Elevate Role Headline:** Add an explicit "Project Manager" role subtitle beneath the page title.

### 🟢 Low Priority / Polish & Recommendations
1. **Populate Custom Quote:** Add an authentic quote regarding northern community initiatives or partner development.
