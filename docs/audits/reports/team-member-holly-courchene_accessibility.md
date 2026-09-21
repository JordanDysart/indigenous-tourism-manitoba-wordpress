# Audit Report: Holly Courchene (Holly Spence) Profile — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/holly-courchene/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Accessibility Enhancements (Valid H1; Semantic Paragraph Blocks; Missing Alt Text on Featured Headshot)`  

---

## 1. Executive Summary
The single team member profile for Holly Courchene (titled "Holly Spence") demonstrates clean semantic HTML paragraph markup and high color contrast with a valid `<h1 class="entry-title">Holly Spence</h1>`. The primary accessibility finding is that the featured portrait headshot has an empty alt attribute (`alt=""`), causing screen readers to treat the image as decorative.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Featured Portrait Image | **Medium** | The featured headshot image (`Holly-Spence-headshot-2025-scaled.jpg`) has an empty `alt=""` attribute. Screen readers treat it as decorative. | Set `alt="Holly Spence - Executive Director"` in the WordPress Media Library. |
| 2 | Semantic Paragraph Markup | Bio Content Block | **Pass** | Cleanly uses semantic `<p class="wp-block-paragraph">` elements. | Full WCAG 1.3.1 compliance. |
| 3 | Headings Hierarchy | Top Feature Cards | **Low** | Four top feature card headings (`<h3>`) precede the main `<h1 class="entry-title">` in DOM source order. | Maintain semantic clarity across child template layouts. |
| 4 | Page Language & Landmarks | Global Wrapper | **Low** | `<html lang="en-US">`, `<header>`, `<main>`, and `<footer>` landmarks are present. | Full WCAG 2.1 AA landmark compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **H1 Heading Presence:** `<h1 class="entry-title">Holly Spence</h1>` is present.
- [ ] **Alt Attribute Completeness:** Featured portrait has empty `alt=""`.
- [x] **Semantic Paragraphs:** Clean `<p class="wp-block-paragraph">` elements.
- [x] **Color Contrast:** High contrast dark text on light neutral background.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Populate Portrait Alt Text:** Set `alt="Holly Spence - Executive Director"` in the WordPress Media Library for `Holly-Spence-headshot-2025-scaled.jpg`.

### 🟡 Medium Priority / Improvements
1. **Bio Role Subtitle:** Add a semantic role subtitle `<p class="team-member-role">Executive Director</p>` beneath the H1.
2. **Back to Team Navigation:** Provide accessible breadcrumb navigation linking back to `/our-team/`.

### 🟢 Low Priority / Polish & Recommendations
1. **URL Slug Alignment:** Consider syncing the URL slug `/team-member/holly-courchene/` to `/team-member/holly-spence/` (with a 301 redirect) if surname has changed.
