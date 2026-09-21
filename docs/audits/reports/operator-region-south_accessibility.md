# Audit Report: South Region Archive — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/south/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Needs Remediation (Missing H1 Region Heading; 100% Populated Card Alt Text for Prairie Berry)`  

---

## 1. Executive Summary
The South region operator taxonomy archive indexes Indigenous agri-tourism and culinary experiences in Southern Manitoba, featuring Prairie Berry (Métis-owned farm-to-table dining, strawberry farm, and artisan events in Glenlea / Red River Valley). The listing card thumbnail features clean, descriptive alt text (`alt="Prairie Berry"`), and keyboard navigation flows logically. However, the archive **completely lacks an `<h1>` heading**, creating a critical navigation barrier for screen reader users browsing regional directories.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Region Title / Main Header | **Critical** | The page contains **NO `<h1>` heading** anywhere in the DOM. Screen reader users cannot identify the primary topic or region of the directory archive. | Add `<h1 class="page-title">Southern Region</h1>` or `<?php single_term_title('<h1 class="page-title">', '</h1>'); ?>` to `taxonomy-operator-region.php` / archive template. |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the operator listing in the DOM tree. | Restructure top card elements to follow the main page header or render as semantic list items. |
| 3 | Non-text Content (Alt Text) | Listing Card Thumbnail | **Low** | Prairie Berry card image has clean alt text matching the business name. | 100% compliance across regional cards. |
| 4 | Keyboard Navigation | Operator Cards | **Low** | Prairie Berry card and title are fully focusable via Tab navigation. | Clean focus flow. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Critical failure — zero `<h1>` tags on archive page.
- [x] **Alt Attribute Presence:** 1 of 1 operator cards has populated alt attributes.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Inject `<h1>` Heading into Regional Taxonomy Template:** Update `taxonomy-operator-region.php` (or archive template) to render `<h1><?php single_term_title(); ?></h1>` above the operator grid.

### 🟡 Medium Priority / Improvements
1. **Adjust Card Heading Hierarchy:** Ensure card titles (`<h2>`) logically follow the new `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Results Counter:** Include an `aria-live="polite"` result count (e.g. "Showing 1 Indigenous operator in the Southern region").
