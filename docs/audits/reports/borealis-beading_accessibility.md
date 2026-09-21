# Audit Report: Borealis Beading — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/borealis-beading/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (1 Gallery Image Missing Alt Text; Heading Hierarchy Skip)`  

---

## 1. Executive Summary
The Borealis Beading operator profile page celebrates the Métis beading, quillwork, and cultural storytelling workshops hosted by Melanie Gamache in Sainte-Geneviève, Manitoba. The page correctly renders `<h1>Borealis Beading</h1>` as the primary document title. Accessibility improvements center on adding descriptive alt text to `IMG_8983-scaled.jpg` (`alt=""`), upgrading brief alt captions, and correcting a skipped heading level before the taxonomy section.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Image (`IMG_8983.jpg`) | **Critical** | Gallery photo is missing alt text (`alt=""`), violating WCAG 1.1.1. | Add descriptive alt text in WP Media Library (e.g., "Melanie Gamache instructing a hands-on Métis beading circle"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Workshops, Art & Culture</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Workshops, Art & Culture</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.borealisbeading.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Borealis Beading website (opens in a new tab)"`. |
| 4 | Non-text Content (Alt Text) | Gallery Captions | **Low** | Alt tags "Beading" and "Beaded craft" are minimal. | Enhance to descriptive phrases (e.g., "Traditional Métis floral beadwork on velvet"). |
| 5 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Borealis Beading</h1>` is declared.
- [ ] **Media Alt Text:** 1 gallery photo lacks alt text (`alt=""`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Missing Alt Text:** Update `IMG_8983-scaled.jpg` in WordPress Media Library with descriptive alt text.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Workshops, Art & Culture</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator websites.

### 🟢 Low Priority / Polish & Recommendations
1. **Enhance Beadwork Alt Descriptions:** Provide cultural detail on beadwork styles and materials in the gallery photos.
