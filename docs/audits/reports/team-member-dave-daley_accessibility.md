# Audit Report: Dave Daley Profile — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/dave-daley/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Minor Enhancements (Valid H1; Semantic Paragraph Blocks; First-Name Alt Text)`  

---

## 1. Executive Summary
The single team member profile for Dave Daley demonstrates strong accessibility compliance. It features a semantic `<h1 class="entry-title">Dave Daley</h1>` heading, clean paragraph markup (`<p class="wp-block-paragraph">`), structured landmark regions, and high color contrast. Accessibility recommendations focus on enriching the portrait alt text from the first name (`alt="David"`) to include his full name and Board Chair title, and adding a role subtitle.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Featured Portrait Image | **Low** | The portrait image uses first name only: `<img ... alt="David">`. Screen readers benefit from full name and leadership context. | Update alt attribute in the Media Library to `alt="Dave Daley - Board Chair / Founder, Wapusk Adventures"`. |
| 2 | Semantic Paragraph Markup | Bio Content Block | **Pass** | Uses semantic `<p class="wp-block-paragraph">` blocks cleanly without superfluous `<br>` spacing. | Fully compliant semantic paragraph markup. |
| 3 | Headings Hierarchy | Top Feature Cards | **Low** | Four top feature card headings (`<h3>`) precede the main `<h1 class="entry-title">` in DOM source order. | Maintain semantic clarity across child template layouts. |
| 4 | Page Language & Landmarks | Global Wrapper | **Low** | `<html lang="en-US">`, `<header>`, `<main>`, and `<footer>` landmarks are present. | Full WCAG 2.1 AA landmark compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **H1 Heading Presence:** `<h1 class="entry-title">Dave Daley</h1>` is present.
- [x] **Semantic Paragraphs:** Clean `<p class="wp-block-paragraph">` elements.
- [x] **Color Contrast:** High contrast dark text on light neutral background.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
*No critical accessibility blockers identified.*

### 🟡 Medium Priority / Improvements
1. **Enrich Portrait Alt Text:** Set `alt="Dave Daley - Board Chair / Founder, Wapusk Adventures"` in the Media Library.
2. **Bio Role Subtitle:** Add a semantic role subtitle `<p class="team-member-role">Board Chair</p>` beneath the H1.

### 🟢 Low Priority / Polish & Recommendations
1. **Back to Team Navigation:** Provide accessible breadcrumb navigation linking back to `/our-team/`.
