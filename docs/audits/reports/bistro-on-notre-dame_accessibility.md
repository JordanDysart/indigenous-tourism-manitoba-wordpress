# Audit Report: Bistro on Notre Dame — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/bistro-on-notre-dame/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Declared H1 Heading & Non-Empty Alt Text; Minor Heading Skip)`  

---

## 1. Executive Summary
The Bistro on Notre Dame operator profile page introduces the Indigenous-owned culinary destination in Winnipeg. The single operator template properly renders the primary page title as `<h1>Bistro on Notre Dame</h1>`, and all 19 image elements have non-empty `alt` attributes. Minor accessibility recommendations include improving vague alt descriptions (e.g., "Food 1", "Food") to describe specific culinary offerings, correcting the skipped heading level before the taxonomy section, and adding screen reader new window notices on outbound links.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Low** | `<h1>Bistro on Notre Dame</h1>` is correctly declared in the DOM. | High title compliance. |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Culinary</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Culinary Experiences</h2>`. |
| 3 | Non-text Content (Alt Text) | Gallery Photos | **Low** | Alt attributes are populated but generic ("Food 1", "Food", "Restaurant", "Patio"). | Enhance alt descriptions (e.g. "Indigenous-inspired culinary plating at Bistro on Notre Dame", "Outdoor dining patio on Notre Dame Ave"). |
| 4 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.bistroonnotredame.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Bistro on Notre Dame website (opens in a new tab)"`. |
| 5 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Bistro on Notre Dame</h1>` is declared.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.
- [x] **Media Alt Text:** All 19 images feature non-empty alt text.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
*(No critical blockers found on this page).*

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Culinary</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator websites.

### 🟢 Low Priority / Polish & Recommendations
1. **Enhance Culinary Alt Descriptions:** Update WP Media Library descriptions with specific dish names (e.g. bannock burgers, wild rice bowls, berry parfaits).
