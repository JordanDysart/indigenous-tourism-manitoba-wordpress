# Audit Report: Teekca’s Boutique — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/teekcas-boutique/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Fix Typo & Enrich Retail Descriptions; Heading Order Skip)`  

---

## 1. Executive Summary
The Teekca’s Boutique operator profile highlights a premier Indigenous-owned retail destination in Winnipeg (The Forks Market and St. Boniface), featuring authentic handmade moccasins, mukluks, beadwork, fine silver jewelry, and artisan gifts. The page declares `<html lang="en-US">` and properly renders `<h1>Teekca’s Boutique</h1>`. Enhancing concise/typo alt text attributes (`alt="teekcas-boutique"`, `alt="blue retangle bolo"`) into rich descriptive phrases and addressing heading order skips will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | Gallery photos use brief placeholders (`alt="teekcas-boutique"`, `alt="blue retangle bolo"` containing typo 'retangle'). | Enrich alt text in WP Media Library (e.g. "Teekca's Boutique retail store interior showcasing handcrafted Indigenous moccasins, artwork, and gifts", "Handcrafted blue turquoise rectangular bolo tie with silver setting"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Retail and Other</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Retail and Other</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://teekcasboutique.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Teekca's Boutique website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Teekca’s Boutique</h1>` is declared.
- [x] **Alt Attribute Presence:** 2 of 2 gallery photos have populated alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Retail Alt Text:** Update store gallery photos with descriptive narrative alt text highlighting authentic moccasins, jewelry, and artisan crafts in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Retail and Other</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all online store links.
