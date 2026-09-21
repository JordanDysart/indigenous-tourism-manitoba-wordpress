# Audit Report: Shelly’s Bistro — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/shellys-bistro/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tag Present; Enrich Bistro Detail; Heading Order Skip)`  

---

## 1. Executive Summary
The Shelly’s Bistro operator profile showcases an Indigenous-owned community dining destination in St. Laurent, MB, celebrated for traditional Métis and comfort food favorites including fresh Lake Manitoba pickerel, homemade soups, and fresh bannock. The page declares `<html lang="en-US">` and properly renders `<h1>Shelly’s Bistro</h1>`. Upgrading the concise alt text attribute (`alt="ShellysBistro"`) to a rich descriptive tag and standardizing heading levels will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Operator Photo Alt Attribute | **Medium** | Main operator photo uses concatenated filename text (`alt="ShellysBistro"`). | Enrich alt text in WP Media Library (e.g. "Shelly's Bistro exterior storefront and dining room in St. Laurent, Manitoba"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Culinary</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Culinary</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.shellysbistro.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Shelly's Bistro website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Shelly’s Bistro</h1>` is declared.
- [x] **Alt Attribute Presence:** Operator photo has a populated alt attribute.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Bistro Alt Text:** Update main profile image alt text to "Shelly's Bistro exterior storefront and dining room in St. Laurent, Manitoba" in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Culinary</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all menu and calling links.
