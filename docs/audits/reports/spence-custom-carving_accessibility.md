# Audit Report: Spence Custom Carving — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/spence-custom-carving/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Enrich Artisan Carving Descriptions; Heading Order Skip)`  

---

## 1. Executive Summary
The Spence Custom Carving operator profile showcases master Indigenous woodcarver and artist Fred Spence, specializing in custom handcrafted wildlife carvings, cultural totem sculptures, and immersive carving workshops. The page declares `<html lang="en-US">` and properly renders `<h1>Spence Custom Carving</h1>`. Upgrading generic placeholder alt text attributes (`alt="SpenceFProfile"`, `alt="Craft"`, `alt="art and craft"`, `alt="teekcas-boutique craft"`) to rich artistic descriptions and standardizing heading levels will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | Gallery photos use concise placeholders (`alt="SpenceFProfile"`, `alt="Craft"`, `alt="art and craft"`). | Enrich alt text in WP Media Library (e.g. "Master woodcarver Fred Spence in artist workshop", "Handcrafted traditional Indigenous wood carving featuring detailed wildlife sculpture"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Workshops, Art & Culture</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Workshops, Art & Culture</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.spencecustomcarving.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Spence Custom Carving website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Spence Custom Carving</h1>` is declared.
- [x] **Alt Attribute Presence:** 4 of 4 gallery photos have populated alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Art & Carving Alt Text:** Update wood carving gallery photos with descriptive narrative alt text highlighting materials (cedar, soapstone, antler) and subject matter in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Workshops, Art & Culture</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all commission and workshop inquiry links.
