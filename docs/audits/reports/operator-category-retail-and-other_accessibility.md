# Audit Report: Retail and Other Category Archive — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/retail-and-other/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Remediation (Missing H1 Category Heading; Clean Card Alt Text)`  

---

## 1. Executive Summary
The Retail and Other operator category archive showcases Indigenous-owned fashion, apparel, and artisan gift boutiques in Manitoba (featuring Anne Mulaire and Teekca’s Boutique). The listing card images feature clean descriptive alt text matching business names, and the keyboard navigation sequence is logical. However, the archive **completely lacks an `<h1>` heading**, creating a critical navigation barrier for screen reader users browsing directory categories.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Category Title / Main Header | **Critical** | The page contains **NO `<h1>` heading** anywhere in the DOM. Screen reader users cannot identify the primary topic of the directory archive. | Add `<h1 class="page-title">Retail and Other</h1>` or `<?php single_term_title('<h1 class="page-title">', '</h1>'); ?>` to `taxonomy-operator-category.php` / archive template. |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the operator listing in the DOM tree. | Restructure top card elements to follow the main page header or render as semantic list items. |
| 3 | Non-text Content (Alt Text) | Listing Card Thumbnails | **Low** | Both card images have clean alt attributes matching the operator business names (Anne Mulaire, Teekca’s Boutique). | Good baseline compliance. |
| 4 | Keyboard Navigation | Operator Cards | **Low** | Cards and titles are fully focusable via Tab navigation. | Clean focus flow. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Critical failure — zero `<h1>` tags on archive page.
- [x] **Alt Attribute Presence:** 2 of 2 retail operator cards have populated alt attributes.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Inject `<h1>` Heading into Taxonomy Template:** Update `taxonomy-operator-category.php` (or archive template) to render `<h1><?php single_term_title(); ?></h1>` above the operator grid.

### 🟡 Medium Priority / Improvements
1. **Adjust Card Heading Hierarchy:** Ensure card titles (`<h2>`) logically follow the new `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Results Counter:** Include an `aria-live="polite"` result count (e.g. "Showing 2 Indigenous retail & artisan operators in Manitoba").
