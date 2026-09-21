# Audit Report: About Indigenous Tourism Manitoba — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/about-itm/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Needs Minor Adjustments`  

---

## 1. Executive Summary
The About ITM page provides a clear narrative and compliant landmark regions with an active skip-to-content mechanism and solid image alternative text coverage. The primary accessibility issue is structural heading order: four `<h3>` card headers precede the main `<h1>` in the document outline, and an identical `<h3>Building the Brand</h3>` is redundantly rendered directly beneath an `<h2>Building the Brand</h2>`.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headings appear before the primary page `<h1>` in the DOM outline. | Adjust top card headings to `<h2>` or semantic list items so the `<h1>About Indigenous Tourism Manitoba</h1>` is the opening document header. |
| 2 | Heading Repetition | "Building the Brand" section | **Medium** | An identical `<h3>Building the Brand</h3>` is rendered immediately following the `<h2>Building the Brand</h2>` heading in block markup. | Remove the duplicate inner `<h3>` tag in the block template to prevent confusing screen reader table-of-contents navigation. |
| 3 | Alt Text Quality | Logo & Card Images | **Low** | All 6 images contain valid and descriptive `alt` attributes. | Maintain current quality standards. |
| 4 | Keyboard Focus | Header navigation & footer CTA | **Low** | Interactive links require consistent high-contrast focus rings for keyboard users. | Ensure CSS `:focus-visible` provides clear outline contrast against dark and light background panels. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip Link:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are properly configured.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) and duplicate `<h3>Building the Brand</h3>` need remediation.
- [x] **Image Alt Text:** All 6 images on the page have descriptive alt text.
- [x] **Contrast:** Text meets WCAG 2.1 AA 4.5:1 minimum contrast standards.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Inverted Document Outline:** Restructure top feature cards to follow proper hierarchical order below the main `<h1>`.

### 🟡 Medium Priority / Improvements
1. **Remove Duplicate Heading:** Clean up the nested duplicate `<h3>Building the Brand</h3>` heading inside the content block.

### 🟢 Low Priority / Polish & Recommendations
1. **Keyboard Focus Styling:** Verify visible focus outline across all interactive text links and buttons.
