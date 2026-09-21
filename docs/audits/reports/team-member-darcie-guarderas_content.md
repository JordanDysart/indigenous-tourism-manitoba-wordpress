# Audit Report: Darcie Guarderas Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/darcie-guarderas/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Typographical Fix: "Operator's" vs "Operators"; Paragraph Formatting; Empty Quote Container; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Darcie Guarderas highlights her 25 years of worldwide travel consulting and leadership in Product Development and Mentorship for Indigenous tourism businesses. The primary editorial finding is an erroneous possessive apostrophe in paragraph 1 (*"Operator's"* instead of plural *"Operators"*). Additional recommendations include refactoring line break spacing into distinct paragraph blocks, styling a prominent role subtitle, and resolving the shared global header 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Typographical / Grammar Error | Bio Paragraph 1 | **High** | Sentence reads: *"...works closely with our Indigenous Operator's to elevate them..."* containing an incorrect possessive apostrophe on plural noun. | Change *"Operator's"* to plural *"operators"* (e.g. *"...works closely with our Indigenous operators to elevate them..."*). |
| 2 | Typography & Formatting | `.entry-content` | **Medium** | Biography is enclosed in a single Kadence heading block with quadruple line breaks (`<br><br><br><br>`) and trailing `<br><br>` rather than distinct paragraph elements. | Split into two separate semantic `<p class="wp-block-paragraph">` elements. |
| 3 | Role Subtitle | Profile Header | **Medium** | Her designated focus (*Product Development & Mentorship*) is described inside the narrative rather than highlighted as an explicit subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Product Development & Mentorship</p>` beneath the H1. |
| 4 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 5 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 6 | Media Asset Health | Featured Headshot | **Low** | `Outlook-0dql1hgw.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [ ] **Spelling & Typographical Accuracy:** Erroneous apostrophe on plural noun (*"Operator's"* &rarr; *"operators"*).
- [ ] **Paragraph Structure:** Text formatted with quadruple `<br>` tags rather than individual paragraphs.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Correct Pluralization Typo:** In WordPress editor, change *"our Indigenous Operator's"* to *"our Indigenous operators"*.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Refactor Line Breaks to Paragraphs:** Convert the block with `<br><br><br><br>` tags into distinct `<p>` paragraph blocks.
2. **Elevate Role Headline:** Add an explicit "Product Development & Mentorship" role subtitle beneath the page title.

### 🟢 Low Priority / Polish & Recommendations
1. **Operator Support Cross-Links:** Consider linking mentions of product development to `/become-a-member/` or `/guide-training-program/`.
