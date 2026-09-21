# Audit Report: Indigenous Guide Training Program — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/guide-training-program/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 Tag)`  

---

## 1. Executive Summary
The Indigenous Guide Training Program page outlines a structured 3-step educational pathway (Introduction, 7-Day Training, Practicum) alongside additional learning opportunities. The primary accessibility issue is that the main page title is marked up as an `<h2>Indigenous Guide Training Program</h2>` rather than a top-level `<h1>`. Fixing the heading level and reordering opening feature cards will bring the page into full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Critical** | **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Indigenous Guide Training Program</h2>`. | Upgrade `<h2>` to `<h1>Indigenous Guide Training Program</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Curriculum Hierarchy | 3-Step Pathway Section | **Low** | The 3 training phases (`<h3>Introduction</h3>`, `<h3>7-Day Training</h3>`, `<h3>Practicum</h3>`) are logically ordered under `<h2>A Three-Step Pathway to Professional Guiding</h2>`. | Maintain this clean sequential outline. |
| 4 | Media Alt Text | Feature Visuals | **Low** | All images and logos feature valid, descriptive alt text. | High alt text compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Page is missing an `<h1>` heading element.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Media Alt Text:** Images include valid alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Upgrade Primary Title to H1:** Change `<h2>Indigenous Guide Training Program</h2>` to `<h1>Indigenous Guide Training Program</h1>` in `page-guide-training-program.php` / block editor.

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Step Number Semantics:** Use an ordered list (`<ol>`) for the 3-step pathway to convey sequential progress to screen readers.
