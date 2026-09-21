# Audit Report: Central Region Archive — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/central/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Remediation (Missing H1 Region Heading; 100% Populated Card Alt Text across 13 Operators)`  

---

## 1. Executive Summary
The Central region operator taxonomy archive indexes 13 Indigenous businesses and tourism experiences across Winnipeg and the Central Manitoba region (including Anne Mulaire, Wyndham Garden Winnipeg Airport, Teekca’s Boutique, Spence Custom Carving, Shelly’s Bistro, Sharecuterie, Bistro on Notre Dame, Manito Ahbee Festival, MICEC, La Brasserie Nonsuch, Feast Cafe Bistro, Nature’s Edge Tourism, and Agowiidiwinan Centre). All 13 listing card thumbnails feature clean, descriptive alt text matching business names, and keyboard navigation flows logically. However, the archive **completely lacks an `<h1>` heading**, creating a critical navigation barrier for screen reader users browsing regional directories.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Region Title / Main Header | **Critical** | The page contains **NO `<h1>` heading** anywhere in the DOM. Screen reader users cannot identify the primary topic or region of the directory archive. | Add `<h1 class="page-title">Central Region</h1>` or `<?php single_term_title('<h1 class="page-title">', '</h1>'); ?>` to `taxonomy-operator-region.php` / archive template. |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the operator listing in the DOM tree. | Restructure top card elements to follow the main page header or render as semantic list items. |
| 3 | Non-text Content (Alt Text) | Listing Card Thumbnails | **Low** | All 13 card images have clean alt attributes matching the operator business names. | 100% compliance across regional cards. |
| 4 | Keyboard Navigation | Operator Cards | **Low** | All 13 cards and titles are fully focusable via Tab navigation. | Clean focus flow. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Critical failure — zero `<h1>` tags on archive page.
- [x] **Alt Attribute Presence:** 13 of 13 operator cards have populated alt attributes.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Inject `<h1>` Heading into Regional Taxonomy Template:** Update `taxonomy-operator-region.php` (or archive template) to render `<h1><?php single_term_title(); ?></h1>` above the operator grid.

### 🟡 Medium Priority / Improvements
1. **Adjust Card Heading Hierarchy:** Ensure card titles (`<h2>`) logically follow the new `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Results Counter:** Include an `aria-live="polite"` result count (e.g. "Showing 13 Indigenous operators in the Central region").
