# Audit Report: Anne Mulaire — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/anne-mulaire/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (5 Gallery Images Missing Alt Text; Heading Hierarchy Skip)`  

---

## 1. Executive Summary
The Anne Mulaire operator profile page showcases the Métis-owned eco-luxury fashion house and boutique in Winnipeg. While the primary title is declared as an `<h1>Anne Mulaire</h1>`, the profile exhibits a critical accessibility deficiency: all 5 gallery showcase images have empty `alt=""` attributes. Providing descriptive alt attributes for fashion designs, manufacturing, and boutique visuals is necessary to comply with WCAG 1.1.1.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Operator Gallery Images | **Critical** | 5 gallery photos (designer portrait, manufacturing studio, boutique interior, garment showcases) have empty `alt=""` attributes. | Add descriptive alt text in WP Media Library (e.g., "Anne Mulaire Métis fashion designer in studio", "Sustainable garment manufacturing in Winnipeg boutique"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Retail and Other</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Retail and Other Services</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://annemulaire.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Anne Mulaire website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Anne Mulaire</h1>` is declared.
- [ ] **Media Alt Text:** 5 gallery photos lack descriptive alt text (`alt=""`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Descriptive Alt Text to Gallery Assets:** Update WordPress Media Library entries for all 5 Anne Mulaire gallery photos with descriptive captions.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Retail and Other</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator websites.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Add gold 2px `:focus-visible` styling to operator contact buttons.
