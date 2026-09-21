# Audit Report: Agowiidiwinan Centre — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/agowiidiwinan-centre/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Declared H1 Heading & High Alt Text Compliance; Minor Heading Skip)`  

---

## 1. Executive Summary
The Agowiidiwinan Centre operator profile features a clean single-operator presentation with high-quality imagery, gallery lightbox support, contact coordinates, and recommended experiences. The primary document title is declared as an `<h1>Agowiidiwinan Centre</h1>`, and all 17 page images feature descriptive `alt` attributes. Accessibility enhancements involve fixing a skipped heading level before the services section and adding `target="_blank"` screen reader warnings on outbound links.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Low** | `<h1>Agowiidiwinan Centre</h1>` is correctly declared in the DOM. | High title compliance. |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Tour and Related Services</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Tour and Related Services</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.trcm.ca" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Agowiidiwinan Centre website (opens in a new tab)"`. |
| 4 | Media Alt Text | Gallery & Cards | **Low** | All 17 image elements feature descriptive, contextual alt text (e.g. "Agowiidiwinan Centre Sideview", "Entrance"). | High alt text compliance. |
| 5 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Agowiidiwinan Centre</h1>` is declared.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.
- [x] **Media Alt Text:** All 17 images include valid alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
*(No critical blockers found on this page).*

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Tour and Related Services</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator websites.

### 🟢 Low Priority / Polish & Recommendations
1. **Operator Gallery Keyboard Navigation:** Verify that Fancybox gallery popups support complete `Escape` key dismissal and left/right arrow navigation.
