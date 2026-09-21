# Audit Report: Our Operators — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operators/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Needs Improvement (Missing H1 Tag)`  

---

## 1. Executive Summary
The Our Operators directory presents a responsive grid of authentic Indigenous businesses with solid image alt attribute coverage corresponding to business names. However, the audit identified a critical semantic document failure: the page completely lacks an `<h1>` heading element, jumping directly from top `<h3>` feature cards into `<h2>[Operator Name]</h2>` listings without establishing a primary page title.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Page Header / Main Content | **Critical** | **No `<h1>` tag exists on the page.** The DOM jumps directly into `<h2>` operator business names. | Add an explicit `<h1>Our Operators</h1>` or `<h1>Indigenous Tourism Operators</h1>` at the top of the main content area (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the operator listings in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Pagination Controls | Archive Pagination | **Medium** | Pagination navigation links lack `aria-label` descriptors and `aria-current="page"` on active page indicators. | Add `aria-label="Pagination Navigation"` to `<nav>` container and `aria-current="page"` to the active page number link. |
| 4 | Alt Text Coverage | Operator Grid Images | **Low** | 100% of operator card photos include business name `alt` tags (`alt="Agowiidiwinan Centre"`, `alt="Anne Mulaire"`). | Maintain high alt tag coverage. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Page is missing an `<h1>` heading entirely.
- [ ] **Pagination Accessibility:** Pagination links require `aria-current="page"` and descriptive navigation labels.
- [x] **Operator Alt Text:** All operator card thumbnails contain business name alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Insert Primary H1 Heading:** Add `<h1>Our Operators</h1>` to the directory archive template (`archive.php` or `page-operators.php`).

### 🟡 Medium Priority / Improvements
1. **Enhance Pagination Markup:** Add `aria-label="Operators Pagination"` and `aria-current="page"` to the active page number.
2. **Reorder Document Heading Tree:** Ensure operator cards use `<h2>` subordinate to the main `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Card Focus Rings:** Ensure clear `:focus-visible` outlines around clickable operator card wrappers.
