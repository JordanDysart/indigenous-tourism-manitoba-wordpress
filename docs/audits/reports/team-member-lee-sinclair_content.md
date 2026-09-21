# Audit Report: Lee Sinclair Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/lee-sinclair/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Internal Cross-Link Opportunity to Kikiwak Inn; Acronym Clarifications; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Lee Sinclair provides a distinguished biographical narrative highlighting her leadership as Director of Operations for PBDC, her management of major businesses—including ITM member operator Kikiwak Inn—and her deep commitment to Cree language preservation and youth land-based education. Content enhancements include cross-linking Kikiwak Inn to its operator listing (`/operator/kikiwak-inn/`), spelling out acronyms (PBDC, OCN) on initial reference, adding a role subtitle, and resolving the shared global menu 404 error.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Internal Cross-Linking | Bio Paragraph 1 | **Medium** | The bio mentions *"Kikiwak Inn and Conference Centre"*, but does not hyperlink to ITM's live operator profile. | Hyperlink *"Kikiwak Inn"* directly to `https://indigenoustourismmanitoba.ca/operator/kikiwak-inn/`. |
| 2 | Acronym Expansion | Bio Paragraph 1 | **Low** | Acronyms *PBDC* and *OCN* are used without initial definition for visitors unfamiliar with northern Manitoba governance. | Spell out *"Paskwayak Business Development Corporation (PBDC)"* and *"Opaskwayak Cree Nation (OCN)"* on first mention. |
| 3 | Role Subtitle | Profile Header | **Medium** | Her position (*Board Director / Director of Operations, PBDC*) is not styled as a prominent subtitle beneath her name. | Add a designated role subtitle `<p class="team-member-role">Board Director</p>` beneath the H1. |
| 4 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 5 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 6 | Media Asset Health | Featured Headshot | **Low** | `lee_sinclair.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [x] **Spelling & Typographical Accuracy:** 100% accurate spelling and grammar.
- [ ] **Internal Linking:** Missed opportunity to link to live operator profile for Kikiwak Inn.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.
2. **Hyperlink Kikiwak Inn Operator Profile:** Add a link from *"Kikiwak Inn and Conference Centre"* to `/operator/kikiwak-inn/`.

### 🟡 Medium Priority / Improvements
1. **Clarify Governance Acronyms:** Introduce PBDC and OCN with full names on first reference.
2. **Elevate Role Headline:** Add an explicit "Board Director" role subtitle beneath the page title.

### 🟢 Low Priority / Polish & Recommendations
1. **Populate Custom Quote:** Add an authentic quote regarding northern community tourism or Cree land-based learning.
