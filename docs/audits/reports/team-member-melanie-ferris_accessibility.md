# Audit Report: Melanie Ferris Profile — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/melanie-ferris/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Accessibility Enhancements (Valid H1; Placeholder Logo Alt Text "ITM"; Multiple <br> Tags in Bio Block)`  

---

## 1. Executive Summary
The single team member profile for Melanie Ferris provides an accessible biographical narrative with a semantic `<h1 class="entry-title">Melanie Ferris</h1>` heading and strong color contrast. Accessibility findings include the featured image slot using a fallback ITM dancer illustration with generic alt text (`alt="ITM"`), and the use of quadruple `<br><br><br><br>` line breaks inside a single Kadence advanced heading block rather than separate semantic `<p>` paragraph elements.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Featured Image Slot | **Medium** | The featured image uses the ITM graphic illustration (`ITM_4CP_DANCER.png`) with `alt="ITM"`. For assistive users viewing a single staff profile, `alt="ITM"` fails to describe the person or the placeholder nature of the graphic. | Upload Melanie Ferris's portrait photo with `alt="Melanie Ferris"`, or update fallback alt text to describe the placeholder illustration. |
| 2 | Semantic Paragraph Structure | Bio Content Block | **Medium** | The 4 narrative sections are enclosed in a single `<p>` tag using quadruple `<br><br><br><br>` tags and trailing `<br><br>` for spacing. Screen readers announce multiple empty lines. | Split each paragraph into separate semantic `<p class="wp-block-paragraph">` elements. |
| 3 | Headings Hierarchy | Top Feature Cards | **Low** | Four top feature card headings (`<h3>`) precede the main `<h1 class="entry-title">` in DOM source order. | Maintain semantic clarity across child template layouts. |
| 4 | Page Language & Landmarks | Global Wrapper | **Low** | `<html lang="en-US">`, `<header>`, `<main>`, and `<footer>` landmarks are present. | Full WCAG 2.1 AA landmark compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **H1 Heading Presence:** `<h1 class="entry-title">Melanie Ferris</h1>` is present.
- [ ] **Alt Attribute Context:** Fallback image uses non-descriptive `alt="ITM"`.
- [ ] **Semantic Markup:** Bio uses multiple consecutive `<br>` tags rather than separate `<p>` tags.
- [x] **Color Contrast:** High contrast dark text on light neutral background.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Refactor Bio into Semantic Paragraphs:** Replace `<br><br><br><br>` tags with separate `<p>` paragraph blocks in the WordPress editor.

### 🟡 Medium Priority / Improvements
1. **Upload Portrait & Update Alt Text:** Replace `ITM_4CP_DANCER.png` with a dedicated headshot photo and set `alt="Melanie Ferris - Board Director / Author"`.
2. **Bio Role Subtitle:** Add a semantic role subtitle `<p class="team-member-role">Board Director</p>` beneath the H1.

### 🟢 Low Priority / Polish & Recommendations
1. **Back to Team Navigation:** Provide accessible breadcrumb navigation linking back to `/our-team/`.
