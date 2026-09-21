# Audit Report: Wyndham Garden Winnipeg Airport — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/wyndham-garden-winnipeg-airport/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Enrich Hotel Room & Amenity Descriptions; Heading Order Skip)`  

---

## 1. Executive Summary
The Wyndham Garden Winnipeg Airport operator profile showcases the first Indigenous-owned (Long Plain First Nation) hotel on an urban reserve in Winnipeg. The page declares `<html lang="en-US">` and properly renders `<h1>Wyndham Garden Winnipeg Airport</h1>`. Expanding short 1-word alt attributes (`alt="Exterior"`, `alt="Lobby"`, `alt="Room"`, `alt="Restaurant"`) into descriptive phrases detailing Indigenous design features and guest amenities will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Hotel Gallery Alt Attributes | **Medium** | Gallery photos use generic single-word placeholders (`alt="Exterior"`, `alt="Lobby"`, `alt="Room"`, `alt="Restaurant"`). | Update alt text in WP Media Library (e.g. "Modern exterior of Wyndham Garden Winnipeg Airport hotel on Long Plain First Nation urban reserve land", "Spacious hotel lobby featuring contemporary Indigenous artwork and natural wood accents", "Manito Ahbee Aki restaurant dining room and bar"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Accommodation</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Accommodation</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.wyndhamgardenwinnipeg.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Wyndham Garden Winnipeg Airport website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Wyndham Garden Winnipeg Airport</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have populated alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Hotel Alt Text:** Update gallery photos with rich descriptive details highlighting Long Plain First Nation urban reserve heritage, hotel rooms, and Manito Ahbee Aki restaurant in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Accommodation</h3>` to `<h2>` in the single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` outline indicators across booking and telephone links.
