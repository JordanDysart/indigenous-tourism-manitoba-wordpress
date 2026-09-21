# Audit Report: Melanie Gamache Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/melanie-gamache/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Authentic Leadership Bio; Empty Custom Quote Field; Cross-Link Opportunity to Borealis Beading; Minor Global Menu 404)`  

---

## 1. Executive Summary
The team member profile for Melanie Gamache (ITM Board Chair & Founder of Borealis Beading) provides an articulate narrative highlighting her Francophone Red River Métis heritage, beadwork cultural immersion workshops in Ste. Geneviève, and advocacy for rural Indigenous operators. The bio is cleanly written with zero typos. Key content opportunities include linking the text mention of Borealis Beading directly to her operator profile (`/operator/borealis-beading/`) and either populating or hiding the empty `.custom-quote` container.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Operator Cross-Link | Bio Paragraph 1 & Role Title | **Medium** | The bio mentions "Borealis Beading" twice as plain text without linking to her featured operator listing. | Hyperlink "Borealis Beading" to `https://indigenoustourismmanitoba.ca/operator/borealis-beading/` for seamless cross-site discovery. |
| 2 | Empty Custom Field / DOM Node | Entry Quote Section | **Low** | `<div class="entry-quote"><div class="custom-quote"></div></div>` renders an empty quote block in the DOM. | Populate Melanie's leadership quote in ACF custom fields (e.g. *"Strengthening connections between operators helps build a stronger Indigenous tourism network."*) or wrap the template container in a conditional `if ( get_field('quote') )`. |
| 3 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 4 | Biographical Accuracy | Main Content | **Low** | Narrative accurately reflects board role and cultural enterprise in Manitoba. | High editorial quality. |
| 5 | Media Asset Health | Featured Headshot | **Low** | `Melanie-Gamache-headshot-2026-scaled.jpg` returns HTTP 200 OK. | Clean image delivery. |

---

## 3. Checklist Verification

- [x] **Biographical Accuracy:** Accurately articulates Melanie Gamache's cultural artistry, business, and board leadership.
- [ ] **Cross-Directory Linking:** Mentions Borealis Beading without hyperlinking to the operator profile.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Link to Borealis Beading Operator Profile:** Add inline hyperlink to `/operator/borealis-beading/` in the role subtitle and paragraph 1.
2. **Populate Custom Quote:** Add Melanie Gamache's personal quote in WordPress Admin or hide empty container.

### 🟢 Low Priority / Polish & Recommendations
1. **Board Designation Badge:** Add a visual badge highlighting "Board Chair" alongside "Owner/Operator, Borealis Beading".
