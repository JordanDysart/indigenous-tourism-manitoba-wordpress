# Audit Report: Renée Simcoe Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/renee-simcoe/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Empty Trailing Paragraph; Empty Quote Field; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Renée Simcoe presents an engaging, well-written narrative detailing her diverse communications and marketing background—including 5 years as communications lead for Southeast Tribal Council and a deep connection to Manitoba's land and outdoors. The editorial copy is consistent and typo-free. Content cleanup recommendations include removing an empty trailing `<p></p>` paragraph block, populating or hiding the empty custom quote container, and fixing the global navigation 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Empty HTML Block | End of `.entry-content` | **Low** | An empty paragraph tag `<p class="wp-block-paragraph"></p>` is rendered at the bottom of the bio text. | Remove the trailing empty paragraph in the WordPress block editor. |
| 2 | Role Positioning | Headline / Subheading | **Medium** | Her designated role at ITM (*Communications & Marketing*) is described narratively rather than highlighted as an explicit subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Communications Specialist</p>` beneath the H1. |
| 3 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 4 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 5 | Media Asset Health | Featured Headshot | **Low** | `Renee-Simcoe-headshot-2025.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [x] **Spelling & Typographical Accuracy:** 100% consistent name spelling and grammar across title, slug, and text.
- [ ] **DOM Cleanliness:** Contains 1 empty trailing `<p></p>` block.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Remove Empty Trailing Paragraph:** Delete empty `<p></p>` block in WordPress editor.
2. **Elevate Role Headline:** Add an explicit "Communications Specialist" role subtitle beneath the page title.

### 🟢 Low Priority / Polish & Recommendations
1. **Southeast Tribal Council Link:** Consider adding a contextual link to Southeast Resource Development Council / Southeast Tribal Council for institutional background.
