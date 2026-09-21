# Audit Report: Taytum Assinaboine Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/taytum-assinaboine/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (Surname Spelling Discrepancy Identified; Cross-Link Opportunity to The Forks; Empty Quote Field; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Taytum Assinaboine details her impactful leadership as Store Manager at Indigenous Tourism Manitoba (Explore Indigenous at The Forks) and Board Director at SEED Winnipeg. The bio articulates her dedication to Indigenous entrepreneurship and economic empowerment. A key editorial finding is a surname spelling discrepancy: the H1 title and URL slug use **Assinaboine** (with an *a*), whereas the opening bio sentence spells her name **Assiniboine** (with an *i*). Additionally, the page should hyperlink her store management role to `/the-forks/` and populate the custom quote block with her key statement on tourism and economic empowerment.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Editorial Consistency | Title vs. Bio Sentence 1 | **High** | Surname spelling mismatch: `<h1 class="entry-title">Taytum Assinaboine</h1>` vs. `<p>Taytum Assiniboine is a proud Indigenous leader...</p>`. | Verify exact legal/preferred spelling with Taytum Assinaboine and standardize across page title, slug, and bio text. |
| 2 | Internal Cross-Link | Store Manager Text Mention | **Medium** | The bio notes her role as *"Store Manager at Indigenous Tourism Manitoba"*, but does not hyperlink to the dedicated Explore Indigenous at The Forks Market retail page. | Hyperlink to `https://indigenoustourismmanitoba.ca/the-forks/` to bridge team leadership with the flagship retail boutique. |
| 3 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin using her statement: *"Tourism is more than travel, it is storytelling, connection, and a pathway to economic empowerment."* |
| 4 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 5 | Media Asset Health | Featured Headshot | **Low** | `Taytum-Assinaboine-headshot-2025-scaled.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [ ] **Spelling & Typographical Accuracy:** Surname spelling discrepancy between H1 (*Assinaboine*) and paragraph 1 (*Assiniboine*).
- [ ] **Cross-Directory Linking:** Mentions ITM store management without linking to `/the-forks/`.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Harmonize Surname Spelling:** Confirm whether *Assinaboine* or *Assiniboine* is correct and ensure 100% consistency across H1, body copy, and metadata.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Link to Explore Indigenous Boutique:** Hyperlink "Store Manager at Indigenous Tourism Manitoba" to `/the-forks/`.
2. **Populate Custom Quote:** Insert her empowerment quote into the ACF custom field.

### 🟢 Low Priority / Polish & Recommendations
1. **SEED Winnipeg Link:** Consider an outbound link (`rel="noopener" target="_blank"`) to SEED Winnipeg (`https://seedwinnipeg.ca/`) to showcase community governance.
