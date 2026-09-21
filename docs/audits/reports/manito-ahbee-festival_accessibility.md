# Audit Report: Manito Ahbee Festival — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/manito-ahbee-festival/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present but Generic; Heading Order Skip)`  

---

## 1. Executive Summary
The Manito Ahbee Festival operator profile celebrates one of North America's premier Indigenous cultural gatherings and pow wows. The page properly renders `<h1>Manito Ahbee Festival</h1>` as the document title and declares `<html lang="en-US">`. Unlike previous operator pages where gallery alt text was completely empty, Manito Ahbee includes alt tags on all 5 images; however, the values are generic numbering labels (`alt="Manito Ahbee 1"`, `alt="Manito Ahbee Two"`). Updating these to culturally descriptive captions will bring the page into full WCAG 1.1.1 compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | Gallery photos have non-descriptive numbering alt text (`Manito Ahbee 1`, `Two`, `Three`, `Four`, `Five`). | Update alt text in WP Media Library to describe actual scenes (e.g. "Dancers in vibrant traditional regalia competing at the international pow wow", "Indigenous marketplace artisans"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Events</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Events</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.manitoahbee.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Manito Ahbee Festival website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Manito Ahbee Festival</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have alt attributes (improvement recommended for descriptive quality).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Gallery Alt Text:** Replace generic numbering labels with descriptive cultural alt text in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Events</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all festival schedule interactive links.
