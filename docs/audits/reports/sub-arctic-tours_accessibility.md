# Audit Report: Sub-Arctic Tours — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/sub-arctic-tours/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Replace Duplicate "polar bear" Text with Descriptive Details; Heading Order Skip)`  

---

## 1. Executive Summary
The Sub-Arctic Tours operator profile showcases an authentic Indigenous-guided wildlife and expedition company based in Churchill, Manitoba, specializing in polar bear viewing excursions, beluga whale encounters, and sub-arctic tundra adventures. The page declares `<html lang="en-US">` and properly renders `<h1>Sub-Arctic Tours</h1>`. Replacing 5 identical duplicate alt attributes (`alt="polar bear"`) with distinct, descriptive wildlife captions and resolving heading hierarchy skips will achieve full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | All 5 gallery photos share the identical generic string `alt="polar bear"`. | Differentiate alt text in WP Media Library with unique descriptions (e.g. "Wild polar bear walking across the tundra in Churchill", "Polar bear sow and cub along the Hudson Bay coastline"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Attractions</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Attractions</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://subarctictours.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Sub-Arctic Tours website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Sub-Arctic Tours</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have populated alt attributes.
- [ ] **Alt Attribute Distinctness:** 5 images share identical repetitive text (`"polar bear"`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Differentiate Wildlife Alt Text:** Update all 5 gallery images in the WordPress Media Library with distinct wildlife and Churchill tundra descriptions.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Attractions</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all tour booking links.
