# Audit Report: Lee Sinclair Profile — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/lee-sinclair/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Minor Enhancements (Valid H1; Populated Alt Text; Clear Contrast)`  

---

## 1. Executive Summary
The single team member profile for Lee Sinclair demonstrates solid accessibility compliance with a semantic `<h1 class="entry-title">Lee Sinclair</h1>` heading, high color contrast, full landmark regions, and a populated alt attribute on her featured portrait (`alt="Lee Sinclair"`). Accessibility can be further refined by enriching the alt text to reflect her leadership role and splitting the single dense biographical block into two distinct semantic paragraphs.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Featured Headshot Image | **Low** | The portrait image `<img ... alt="Lee Sinclair">` is valid. Adding her board or executive role provides richer assistive context. | Update alt attribute to `alt="Lee Sinclair - Board Director / Director of Operations"`. |
| 2 | Readability & Paragraph Sizing | Bio Content Block | **Low** | The entire biography is wrapped in a single dense paragraph of 180+ words. | Split into two distinct semantic `<p class="wp-block-paragraph">` elements to enhance reading comprehension. |
| 3 | Headings Hierarchy | Top Feature Cards | **Low** | Four top feature card headings (`<h3>`) precede the main `<h1 class="entry-title">` in DOM source order. | Maintain semantic clarity across child template layouts. |
| 4 | Page Language & Landmarks | Global Wrapper | **Low** | `<html lang="en-US">`, `<header>`, `<main>`, and `<footer>` landmarks are present. | Full WCAG 2.1 AA landmark compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **H1 Heading Presence:** `<h1 class="entry-title">Lee Sinclair</h1>` is present.
- [x] **Alt Attribute Completeness:** Featured portrait has `alt="Lee Sinclair"`.
- [x] **Color Contrast:** High contrast dark text on light neutral background.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
*No critical accessibility blockers identified.*

### 🟡 Medium Priority / Improvements
1. **Enrich Portrait Alt Text:** Set `alt="Lee Sinclair - Board Director / Director of Operations"` in the Media Library.
2. **Bio Role Subtitle:** Add a semantic role subtitle `<p class="team-member-role">Board Director</p>` beneath the H1.

### 🟢 Low Priority / Polish & Recommendations
1. **Back to Team Navigation:** Provide accessible breadcrumb navigation linking back to `/our-team/`.
