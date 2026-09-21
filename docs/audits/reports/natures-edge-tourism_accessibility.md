# Audit Report: Nature’s Edge Tourism — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/natures-edge-tourism/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Enrich SUP & Adventure Context; Heading Order Skip)`  

---

## 1. Executive Summary
The Nature’s Edge Tourism operator profile features an outdoor recreation and wilderness expedition provider specializing in stand-up paddleboarding (SUP), guided water journeys, and land-based eco-adventures across Manitoba. The page declares `<html lang="en-US">` and properly renders `<h1>Nature’s Edge Tourism</h1>`. Upgrading concise alt text labels (`alt="sup class"`, `alt="group"`, `alt="Sunset"`, `alt="Calm"`, `alt="SUP"`) with vivid descriptions of guided paddling tours and correcting heading level hierarchy will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | Gallery photos use concise placeholders (`alt="sup class"`, `alt="group"`, `alt="Sunset"`, `alt="Calm"`, `alt="SUP"`). | Enrich alt text in WP Media Library (e.g. "Paddleboard group lesson navigating calm boreal lake waters", "Paddler silhouetted against vibrant sunset over Manitoba waters with Nature's Edge Tourism"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Outdoors and Adventures</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Outdoors and Adventures</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.naturesedgetourism.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Nature's Edge Tourism website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Nature’s Edge Tourism</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Paddleboarding & Eco-Tour Alt Text:** Update SUP and outdoor lake gallery photos with descriptive narrative alt text in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Outdoors and Adventures</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all tour reservation buttons and links.
