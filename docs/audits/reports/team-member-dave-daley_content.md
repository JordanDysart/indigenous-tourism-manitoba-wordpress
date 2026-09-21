# Audit Report: Dave Daley Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/dave-daley/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Internal Cross-Link Opportunity to Wapusk Adventures; Compound Hyphenation; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Dave Daley details his prominent leadership as Chair of Indigenous Tourism Manitoba, Manitoba representative for the Indigenous Tourism Association of Canada (ITAC), founder of the Hudson Bay Quest dog sled race, and co-founder of Wapusk Adventures and Wapusk General Store in Churchill. Content recommendations include hyperlinking Wapusk Adventures to its operator profile (`/operator/wapusk-adventures/`), hyphenating *"award-winning"*, adding a prominent role subtitle, and resolving the shared global header 404 link.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Internal Cross-Linking | Bio Paragraph 1 | **Medium** | The bio mentions *"Wapusk Adventures"*, but does not hyperlink to its live operator profile on ITM. | Hyperlink *"Wapusk Adventures"* directly to `https://indigenoustourismmanitoba.ca/operator/wapusk-adventures/`. |
| 2 | Typographical / Grammar Polish | Bio Paragraph 1 | **Low** | Phrase reads *"an award winning Indigenous Tourism experience"* missing hyphenation in compound modifier. | Update copy to *"an award-winning Indigenous tourism experience"*. |
| 3 | Role Subtitle | Profile Header | **Medium** | His position (*Board Chair / Founder, Wapusk Adventures*) is not styled as a prominent subtitle beneath his name. | Add a designated role subtitle `<p class="team-member-role">Board Chair</p>` beneath the H1. |
| 4 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 5 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 6 | Media Asset Health | Featured Headshot | **Low** | `david-daley-652x652@2x-320x320-1.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [x] **Spelling & Typographical Accuracy:** Accurate narrative with clean paragraph blocks.
- [ ] **Internal Linking:** Missed opportunity to link to live operator profile for Wapusk Adventures.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
2. **Hyperlink Wapusk Adventures:** Add a link from *"Wapusk Adventures"* to `/operator/wapusk-adventures/`.

### 🟡 Medium Priority / Improvements
1. **Elevate Role Headline:** Add an explicit "Board Chair" role subtitle beneath the page title.
2. **Hyphenate Compound Modifier:** Change *"award winning"* to *"award-winning"*.

### 🟢 Low Priority / Polish & Recommendations
1. **Populate Custom Quote:** Add an authentic quote regarding northern dogsledding heritage or Métis tourism leadership in Churchill.
