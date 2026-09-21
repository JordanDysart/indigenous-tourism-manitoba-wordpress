# Audit Report: La Brasserie Nonsuch Brewing Co. — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/la-brasserie-nonsuch-brewing-co/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (All 5 Gallery Images Missing Alt Text; Heading Order Skip)`  

---

## 1. Executive Summary
The La Brasserie Nonsuch Brewing Co. operator profile highlights the Indigenous and Francophone-owned craft brewery and taproom located in Winnipeg's Exchange District. The single operator template correctly renders `<h1>La Brasserie Nonsuch Brewing Co.</h1>` as the document title. Primary accessibility remediation requires adding descriptive alt attributes to all 5 gallery images (which currently possess empty `alt=""` tags), resolving skipped heading levels, and adding new window announcements to outbound links.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Primary Photo Gallery | **Critical** | All 5 gallery images have empty `alt=""` attributes (`Screenshot...`, `11.png`, `beeeeeerbannock3...`), violating WCAG 1.1.1. | Add descriptive alt text in WP Media Library (e.g., "Nonsuch Brewing taproom interior with golden ambient lighting", "Craft beer pairing with traditional bannock"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Culinary</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Culinary</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.nonsuch.beer/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Nonsuch Brewing Co. website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>La Brasserie Nonsuch Brewing Co.</h1>` is declared.
- [ ] **Media Alt Text:** 5 of 5 gallery photos lack alt text (`alt=""`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Descriptive Alt Text to Gallery Assets:** Update all 5 brewery gallery images in the WordPress Media Library with descriptive alt attributes.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Culinary</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator websites.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Ensure golden `:focus-visible` styling is active across all taproom interactive links.
