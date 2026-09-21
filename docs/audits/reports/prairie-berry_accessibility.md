# Audit Report: Prairie Berry — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/prairie-berry/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (1 Missing Alt Tag; Typo in Alt Tag "waater"; Heading Order Skip)`  

---

## 1. Executive Summary
The Prairie Berry operator profile features an Indigenous-owned agritourism and culinary dining destination located along the Red River near Glenlea, offering farm-to-table dining events, berry picking, and artisan catering. The page declares `<html lang="en-US">` and properly renders `<h1>Prairie Berry</h1>`. However, 1 gallery image has an empty `alt=""` attribute, another contains a typo (`alt="waater"`), and the remaining images use vague placeholders (`alt="Berry"`, `alt="Restaurant"`).

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo 5 (`0U9A2180-1-scale`) | **High** | Gallery image has an empty `alt=""` tag, causing screen readers to skip this informative culinary photograph. | Populate descriptive alt text (e.g. "Artisan culinary plating featuring fresh organic prairie berries and locally sourced ingredients"). |
| 2 | Non-text Content (Alt Text) | Aerial Photo (`DJI_0020-scaled`) | **Medium** | Alt text contains a typo (`alt="waater"`). | Correct and enrich to "Aerial drone view of the Red River meandering past Prairie Berry farm grounds". |
| 3 | Non-text Content (Alt Text) | Gallery Photos 2-4 | **Medium** | Gallery photos use repetitive placeholders (`alt="Berry"`, `alt="Restaurant"`). | Enrich with descriptive agritourism context (e.g. "Guests gathering for an outdoor farm-to-table culinary dinner", "Fresh berry harvest baskets"). |
| 4 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Culinary</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Culinary</h2>`. |
| 5 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://prairie-berry.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Prairie Berry website (opens in a new tab)"`. |
| 6 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Prairie Berry</h1>` is declared.
- [ ] **Alt Attribute Completeness:** 1 gallery photo lacks alt text (`alt=""`), and 1 has a typo (`alt="waater"`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Missing & Typo Alt Tags:** Populate `alt=""` on `0U9A2180-1-scale` and fix `alt="waater"` to descriptive text in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Enrich Agritourism & Farm-to-Table Alt Text:** Replace generic `alt="Berry"` and `alt="Restaurant"` tags with rich culinary descriptions.
2. **Fix Heading Levels:** Standardize `<h3>Discover Culinary</h3>` to `<h2>` in single operator template.
3. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all dining and event booking links.
