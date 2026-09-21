# Audit Report: Turtle Village — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/turtle-village/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Clarify 'TV Room' Abbreviations; Heading Order Skip)`  

---

## 1. Executive Summary
The Turtle Village operator profile presents an eco-luxury cabin resort located near Grand Beach Provincial Park on Lake Winnipeg, featuring unique dome-shaped turtle eco-cabins with solar power, woodstoves, and nature trails. The page declares `<html lang="en-US">` and properly renders `<h1>Turtle Village</h1>`. Updating ambiguous alt text attributes (`alt="TV Room"`, which screen readers announce as "Television Room" rather than "Turtle Village Room") to descriptive resort narratives and correcting heading hierarchy skips will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Cabin Gallery Alt Attributes | **Medium** | Cabin photos use ambiguous abbreviations (`alt="TV Room"`, `alt="TV Room 2"`) announced as "television room" by screen readers. | Update alt attributes to descriptive phrases (e.g. "Interior living space of luxury turtle dome cabin with woodstove and forest views", "Exterior view of signature geodesic turtle-shaped cabin nestled in the boreal forest"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Accommodation</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Accommodation</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://turtlevillage.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Turtle Village website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Turtle Village</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have populated alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Clarify Resort Alt Text:** Replace `TV Room` and `TV Room 2` in the WordPress Media Library with descriptive resort room and eco-cabin descriptions.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Accommodation</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across booking and contact links.
