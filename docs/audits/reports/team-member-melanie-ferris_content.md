# Audit Report: Melanie Ferris Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/melanie-ferris/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Grammar Fix: Missing "an"; Missing Portrait Photo; Paragraph Formatting; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Melanie Ferris offers an authentic biographical narrative highlighting her role as an author, Director of Communications for the Southern Chiefs’ Organization, Long Plain First Nation member, and passionate advocate for Manitoba First Nations communities. Content recommendations include adding a missing indefinite article (*"As an intergenerational Survivor..."*), replacing the generic ITM dancer illustration with an authentic portrait photograph, converting `<br><br><br><br>` spacing into distinct semantic paragraphs, styling a role subtitle, and resolving the shared global header 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Editorial Grammar Error | Bio Paragraph 2 | **Medium** | Sentence starts: *"As intergenerational Survivor of the residential schools..."* missing the indefinite article *"an"*. | Update copy to: *"As **an** intergenerational Survivor of the residential schools..."*. |
| 2 | Visual Content / Photography | Featured Image Slot | **High** | The profile uses the generic ITM dancer logo graphic (`ITM_4CP_DANCER.png`) rather than a headshot photo of Melanie Ferris. | Source and upload a professional portrait headshot for Melanie Ferris. |
| 3 | Typography & Formatting | `.entry-content` | **Medium** | Biography is enclosed in a single Kadence heading block with quadruple line breaks (`<br><br><br><br>`) rather than distinct paragraph elements. | Split into four separate semantic `<p class="wp-block-paragraph">` elements. |
| 4 | Role Subtitle | Profile Header | **Medium** | Her position (*Board Director / Director of Communications, SCO*) is not styled as a prominent subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Board Director</p>` beneath the H1. |
| 5 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 6 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |

---

## 3. Checklist Verification

- [ ] **Spelling & Typographical Accuracy:** Missing indefinite article (*"As intergenerational Survivor"* &rarr; *"As an intergenerational Survivor"*).
- [ ] **Media Completeness:** Placeholder dancer graphic used in place of actual portrait photograph.
- [ ] **Paragraph Structure:** Text formatted with quadruple `<br>` tags rather than individual paragraphs.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Insert Missing Article:** Correct copy in the WordPress editor to read *"As an intergenerational Survivor..."*.
2. **Upload Authentic Portrait:** Replace `ITM_4CP_DANCER.png` with a dedicated headshot photo.
3. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Refactor Line Breaks to Paragraphs:** Convert the block with `<br><br><br><br>` tags into distinct `<p>` paragraph blocks.
2. **Elevate Role Headline:** Add an explicit "Board Director" role subtitle beneath the page title.

### 🟢 Low Priority / Polish & Recommendations
1. **Publication Cross-Reference:** Provide a link or citation for her book *“Honouring our Ancestors”*.
