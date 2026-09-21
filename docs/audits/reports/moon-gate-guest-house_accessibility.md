# Audit Report: Moon Gate Guest House — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/moon-gate-guest-house/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Heading Order Skip)`  

---

## 1. Executive Summary
The Moon Gate Guest House operator profile showcases an eco-friendly retreat and wellness destination situated along the Whitemouth River in Whitemouth, Manitoba. The page declares `<html lang="en-US">` and properly renders `<h1>Moon Gate Guest House</h1>` as the document title. Gallery images feature basic alt attributes (`alt="Moon Gate Room"`, `alt="Moon Gate Firepit"`); enriching these with contextual descriptions of the eco-retreat setting alongside fixing skipped heading levels will elevate accessibility compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | Gallery photos use concise labels (`Moon Gate Ladies`, `Moon Gate Room`, `Moon Gate Firepit`). | Enrich alt text in WP Media Library (e.g. "Cozy guest room with rustic wooden decor at Moon Gate Guest House", "Outdoor firepit gathering area overlooking the Whitemouth River"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Accommodation</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Accommodation</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://moongateguesthouse.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Moon Gate Guest House website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Moon Gate Guest House</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Gallery Alt Text:** Update retreat and accommodation gallery images with detailed descriptive alt text in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Accommodation</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all retreat booking interactive links.
