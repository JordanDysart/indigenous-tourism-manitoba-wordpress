# Audit Report: Kikiwak Inn — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/kikiwak-inn/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (All 4 Gallery Images Missing Alt Text; Skipped Heading Level)`  

---

## 1. Executive Summary
The Kikiwak Inn operator profile features the premier Cree-owned hotel and conference destination in Opaskwayak Cree Nation (The Pas, Northern Manitoba). The single operator template correctly renders `<h1>Kikiwak Inn</h1>` as the primary document title. Accessibility remediation is critically required for the gallery imagery: all four gallery images have completely empty `alt=""` attributes. Additional fixes include correcting a skipped heading level and adding new tab announcements for external links.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Primary Photo Gallery | **Critical** | All 4 gallery images have empty `alt=""` attributes (`DSC04587...`, `IMG_0204...`, `Muskwa-Tipi...`, `Pic-6.jpg`), violating WCAG 1.1.1. | Add descriptive alt text in WP Media Library (e.g., "Kikiwak Inn hotel exterior with traditional architectural elements", "Muskwa Tipi outdoor cultural installation"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Accommodation</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Accommodation</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.kikiwakinn.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Kikiwak Inn website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Kikiwak Inn</h1>` is declared.
- [ ] **Media Alt Text:** 4 of 4 gallery photos lack alt text (`alt=""`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Descriptive Alt Text to All 4 Gallery Images:** Update `DSC04587-scaled.jpg`, `IMG_0204-scaled.jpg`, `Muskwa-Tipi-scaled.jpg`, and `Pic-6.jpg` in the WordPress Media Library with descriptive alt attributes.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Accommodation</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator websites.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Ensure golden `:focus-visible` styling is active across all hotel amenity and booking links.
