# Audit Report: Edna Nabess Profile — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/edna-nabess/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Accessibility Enhancements (Valid H1; Populated Alt Text; Multiple <br> Tags in Bio Block)`  

---

## 1. Executive Summary
The single team member profile for Edna Nabess provides an accessible biographical presentation with a semantic `<h1 class="entry-title">Edna Nabess</h1>` heading and a populated alt attribute on her featured portrait (`alt="Edna Nabess"`). The key accessibility finding is the use of quadruple `<br><br><br><br>` line break tags within a single Kadence advanced heading block rather than separate semantic `<p>` paragraph elements, which can cause screen readers to announce multiple empty lines.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Semantic Paragraph Structure | Bio Content Block | **Medium** | The entire biography is wrapped in a single `<p>` tag using quadruple `<br><br><br><br>` tags for spacing instead of separate semantic paragraphs. Screen readers announce repeated blank lines. | Convert each narrative section into separate semantic `<p class="wp-block-paragraph">` elements. |
| 2 | Non-text Content (Alt Text) | Featured Headshot Image | **Low** | The portrait image `<img ... alt="Edna Nabess">` has valid alt text. To enhance assistive context, adding her role is recommended. | Update alt attribute to `alt="Edna Nabess - Board Director / Founder, Cree-Ations"`. |
| 3 | Headings Hierarchy | Top Feature Cards | **Low** | Four top feature card headings (`<h3>`) precede the main `<h1 class="entry-title">` in DOM source order. | Maintain semantic clarity across child template layouts. |
| 4 | Page Language & Landmarks | Global Wrapper | **Low** | `<html lang="en-US">`, `<header>`, `<main>`, and `<footer>` landmarks are present. | Full WCAG 2.1 AA landmark compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **H1 Heading Presence:** `<h1 class="entry-title">Edna Nabess</h1>` is present.
- [x] **Alt Attribute Completeness:** Featured portrait has `alt="Edna Nabess"`.
- [ ] **Semantic Markup:** Bio uses multiple consecutive `<br>` tags rather than separate `<p>` tags.
- [x] **Color Contrast:** High contrast dark text on light neutral background.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Refactor Bio into Semantic Paragraphs:** Replace `<br><br><br><br>` with separate `<p>` paragraph blocks in the WordPress editor.

### 🟡 Medium Priority / Improvements
1. **Enrich Portrait Alt Text:** Set `alt="Edna Nabess - Board Director / Founder, Cree-Ations"` in the Media Library.
2. **Bio Role Subtitle:** Add a semantic role subtitle `<p class="team-member-role">Board Director</p>` beneath the H1.

### 🟢 Low Priority / Polish & Recommendations
1. **Back to Team Navigation:** Provide accessible breadcrumb navigation linking back to `/our-team/`.
