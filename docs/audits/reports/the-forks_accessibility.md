# Audit Report: Explore Indigenous at The Forks Market — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/the-forks/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Empty H1 Tag)`  

---

## 1. Executive Summary
The Explore Indigenous at The Forks Market page features a well-structured informational outline detailing the physical kiosk, retail opportunities, artist partnerships (Jordan Stranger), and member benefits. However, the audit revealed a critical accessibility failure: the primary `<h1>` element on the page is **completely empty** (`<h1></h1>`), depriving screen reader users of a declared document title. Additionally, top feature cards invert the heading outline prior to the main content.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Critical** | **The `<h1>` heading tag is completely empty** in the DOM tree, producing an unnamed heading node for assistive devices. | Populate the `<h1>` element with `<h1>Explore Indigenous at The Forks Market</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content area in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Section Structure | Retail & Member Sections | **Low** | `<h2>` section headers with subordinate `<h3>` operational cards (Operating Hours, Workshop Space, Retail Opportunities) follow a clean, logical outline. | Maintain this hierarchical structure. |
| 4 | Alt Text Quality | Feature Photography | **Low** | Image alternative text is descriptive: `alt="Indigenous Artisan Crafting at The Forks Market"`. | Excellent alt text quality. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Name:** Page contains an empty `<h1>` element.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Media Alt Text:** Images include meaningful descriptive alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Populate Primary H1 Title:** Ensure the page title `<h1>Explore Indigenous at The Forks Market</h1>` renders with visible and accessible text in `page-the-forks.php` / block template.

### 🟡 Medium Priority / Improvements
1. **Reorder Document Heading Tree:** Align top feature cards subordinate to the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Operating Hours Table/List Semantics:** Ensure the operating hours and location section uses semantic `<dl>` or `<ul>` markup for screen readers.
