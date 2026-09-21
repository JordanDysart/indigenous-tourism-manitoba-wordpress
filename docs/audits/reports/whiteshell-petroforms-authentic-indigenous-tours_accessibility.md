# Audit Report: Whiteshell Petroforms Authentic Indigenous Tours — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/whiteshell-petroforms-authentic-indigenous-tours/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing Alt Text on Sacred Petroforms Imagery; Heading Order Skip)`  

---

## 1. Executive Summary
The Whiteshell Petroforms Authentic Indigenous Tours operator profile showcases sacred Anishinaabe teaching tours and ancient stone alignments (Manidoo-Abi) in Whiteshell Provincial Park. The page declares `<html lang="en-US">` and renders `<h1>Whiteshell Petroforms Authentic Indigenous Tours</h1>`. However, two of the three main tour gallery images have empty `alt=""` attributes and one uses an unspaced filename slug (`alt="Indigenous-Tourism-Award-Recipient"`). Remediating these alt attributes is necessary to meet WCAG 1.1.1 Level A compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Petroforms Gallery Photos | **High** | 2 gallery images have empty `alt=""` attributes, leaving screen reader users unaware of the ancient rock formations. | Populate alt text in WP Media Library (e.g. "Sacred granite stone petroform alignment resembling a turtle in Whiteshell Provincial Park", "Knowledge Keeper guiding visitors across Precambrian granite rock ridges"). |
| 2 | Non-text Content (Alt Text) | Tourism Award Image | **Medium** | Alt text uses a hyphenated string (`alt="Indigenous-Tourism-Award-Recipient"`). | Update alt text to "Whiteshell Petroforms receiving the Indigenous Tourism Award of Excellence". |
| 3 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Tour and Related Services</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Tour and Related Services</h2>`. |
| 4 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://whiteshellpetroforms.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader notice. | Add `aria-label="Visit Whiteshell Petroforms Authentic Indigenous Tours website (opens in a new tab)"`. |
| 5 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Whiteshell Petroforms Authentic Indigenous Tours</h1>` is declared.
- [ ] **Alt Attribute Presence:** 2 gallery images have empty `alt=""` attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Populate Petroforms Alt Text:** Add descriptive alt attributes to sacred stone alignment images and the tourism award photo in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Tour and Related Services</h3>` to `<h2>` in the single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` outline indicators across booking and telephone links.
