# Audit Report: Experience Map — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/experience-map/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 & Map ARIA Labels)`  

---

## 1. Executive Summary
The Experience Map page provides an interactive Leaflet-powered map combined with a comprehensive textual list of all 22 operator locations across Manitoba. The presence of the full operator roster provides an accessible non-visual alternative to the interactive map. However, the audit identified two key accessibility gaps: a complete absence of an `<h1>` page heading element and missing accessible ARIA landmark labels on the Leaflet map viewport container.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Page Header / Document Root | **Critical** | **No `<h1>` tag exists on the page.** The DOM jumps from top `<h3>` cards directly into `<h3>Operators</h3>` and `<h2>` listings. | Insert `<h1>Indigenous Tourism Experience Map</h1>` at the top of the main template (WCAG 1.3.1 / 2.4.6). |
| 2 | Map Accessibility | Leaflet Map Container | **Medium** | The dynamic Leaflet map container lacks `role="region"` and `aria-label` descriptors for assistive technologies. | Add `role="region" aria-label="Interactive Manitoba Tourism Map"` to the Leaflet map container element. |
| 3 | Map Keyboard Traps | Leaflet Interactive Canvas | **Medium** | Map gesture handling requires two-finger / Ctrl+scroll pan; keyboard navigation between map pins needs clear instructions. | Ensure map controls and pin popups are focusable and can be bypassed via skip navigation. |
| 4 | Alt Text Coverage | Operator Grid Images | **Low** | All 22 operator card images include accurate business name alternative text (`alt="Teekca's Boutique"`, `alt="Wapusk Adventures"`). | Clean media alt text baseline. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Page is missing an `<h1>` heading element entirely.
- [ ] **Interactive Map ARIA:** Leaflet container lacks accessible name and region role.
- [x] **Non-Visual Fallback:** Textual operator list on page provides a complete non-visual equivalent to map data.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Insert Primary H1 Heading:** Add `<h1>Indigenous Tourism Experience Map</h1>` to `page-experience-map.php` template.

### 🟡 Medium Priority / Improvements
1. **Add ARIA Region to Leaflet Map:** Equip the map wrapper with `role="region" aria-label="Interactive Experience Map"`.
2. **Heading Tree Reorganization:** Align operator listing headings under a clear `<h2>` section.

### 🟢 Low Priority / Polish & Recommendations
1. **Map Pin Focus Indicators:** Ensure custom SVG marker pins display high-contrast focus rings when navigated via keyboard.
