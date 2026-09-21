# Audit Report: Home — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Needs Minor Adjustments`  

---

## 1. Executive Summary
The homepage establishes solid accessibility foundations with valid landmark regions (`<header>`, `<nav>`, `<main>`, `<footer>`), an active skip-to-content link, and descriptive alt text on most primary imagery. However, key structural and semantic issues were discovered—notably an inverted heading hierarchy where `<h3>` cards precede the main `<h1>`, multiple `<h1>` elements on a single page, and placeholder/slug alt attributes on several featured operator cards.

---

## 2. Detailed Findings

| # | Category / Section | Element / Selector / Excerpt | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` headings ("Empowering Indigenous Voices", "Discover Authentic Experiences", etc.) precede the first `<h1>` in DOM order. | Restructure heading hierarchy so `<h1>` opens the page content, and top feature cards use `<h2>` or semantic list elements. |
| 2 | Headings Structure | Conference Banner | **High** | A second `<h1>` is defined for "4th Annual Indigenous Tourism Manitoba Conference...". | Change the conference heading from `<h1>` to `<h2>` to maintain a single unique `<h1>` per page (WCAG 1.3.1). |
| 3 | Alt Text Quality | Featured Operator: Teekca's Boutique | **Medium** | Alt attribute contains raw kebab-case slug: `alt="teekcas-boutique"`. | Update alt attribute to human-readable descriptive text: `alt="Teekca's Boutique storefront with authentic Indigenous crafts"`. |
| 4 | Alt Text Quality | Featured Operator: Residential School Museum | **Medium** | Alt attribute is vague: `alt="Monument"`. | Update alt attribute to provide specific context: `alt="National Indigenous Residential School Museum monument in Portage la Prairie"`. |
| 5 | Alt Text Quality | Featured Operator: Sub-Arctic Tours | **Medium** | Alt attribute is generic: `alt="polar bear"`. | Update alt attribute to provide context: `alt="Polar bear in the wild in Churchill, Manitoba with Sub-Arctic Tours"`. |
| 6 | Interactive Landmarks | Submenu Navigation | **Low** | Submenu links contain nested `<span>` without explicit active focus indicators on high contrast modes. | Ensure CSS `:focus-visible` styling provides minimum 3:1 contrast against adjacent background colors. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is present and valid.
- [x] **Skip to Content:** Skip link `<a class="skip-link screen-reader-text" href="#content">Skip to content</a>` exists and points to valid ID.
- [x] **Semantic Landmarks:** `<header role="banner">`, `<nav role="navigation">`, `<main id="main">`, and `<footer role="contentinfo">` are properly implemented.
- [ ] **Heading Hierarchy:** Inverted heading order (`<h3>` before `<h1>`) and multiple `<h1>` tags require adjustment.
- [ ] **Alt Text Quality:** All images have `alt` tags, but several require editorial improvements for screen reader clarity.
- [x] **Contrast:** Primary text elements meet WCAG 2.1 AA 4.5:1 minimum contrast ratios.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Unify Heading Hierarchy:** Change the conference banner heading from `<h1>` to `<h2>`. Adjust top card block headings from `<h3>` to `<h2>` so the document outline follows a clean top-down tree starting at `<h1>Welcome to Indigenous Tourism Manitoba</h1>`.

### 🟡 Medium Priority / Improvements
1. **Refine Operator Image Alt Tags:** Update media library alt tags for featured cards on the homepage (`teekcas-boutique` &rarr; `Teekca's Boutique`, `Monument` &rarr; `National Indigenous Residential School Museum Monument`, `polar bear` &rarr; `Polar bear in Churchill, Manitoba - Sub-Arctic Tours`).

### 🟢 Low Priority / Polish & Recommendations
1. **Focus Ring Verification:** Verify high-contrast keyboard focus outlines across navigation items and CTA cards across Firefox and Safari.
