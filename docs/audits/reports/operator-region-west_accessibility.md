# Audit Report: West Region Archive — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/west/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Needs Remediation (Missing H1 Region Heading; 100% Populated Card Alt Text for Turtle Village & NIRSM)`  

---

## 1. Executive Summary
The West region operator taxonomy archive indexes Indigenous eco-hospitality and cultural heritage experiences in Western Manitoba, featuring Turtle Village (luxury glamping pods in Riding Mountain National Park / Grandview) and the National Indigenous Residential School Museum of Canada (historic commemorative museum in Long Plain / Portage la Prairie). Listing card thumbnails feature clean, descriptive alt text (`alt="Turtle Village"`, `alt="National Indigenous Residential School Museum of Canada"`), and keyboard navigation flows logically. However, the archive **completely lacks an `<h1>` heading**, creating a major accessibility barrier for screen reader users browsing regional archives.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Region Title / Main Header | **Critical** | The page contains **NO `<h1>` heading** anywhere in the DOM. Screen reader users cannot identify the primary topic or region of the directory archive. | Add `<h1 class="page-title">Western Region</h1>` or `<?php single_term_title('<h1 class="page-title">', '</h1>'); ?>` to `taxonomy-operator-region.php` / archive template. |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the operator listing in the DOM tree. | Restructure top card elements to follow the main page header or render as semantic list items. |
| 3 | Non-text Content (Alt Text) | Listing Card Thumbnails | **Low** | Both operator card images have clean alt text matching the respective business names. | 100% compliance across regional cards. |
| 4 | Keyboard Navigation | Operator Cards | **Low** | Both cards and titles are fully focusable via Tab navigation. | Clean focus flow. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Critical failure — zero `<h1>` tags on archive page.
- [x] **Alt Attribute Presence:** 2 of 2 operator cards have populated alt attributes.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Inject `<h1>` Heading into Regional Taxonomy Template:** Update `taxonomy-operator-region.php` (or archive template) to render `<h1><?php single_term_title(); ?></h1>` above the operator grid.

### 🟡 Medium Priority / Improvements
1. **Adjust Card Heading Hierarchy:** Ensure card titles (`<h2>`) logically follow the new `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Add Results Counter:** Include an `aria-live="polite"` result count (e.g. "Showing 2 Indigenous operators in the Western region").
