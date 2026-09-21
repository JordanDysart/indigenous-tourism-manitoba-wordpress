# Audit Report: Things To Do — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/things-to-do/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Minor Improvements`  

---

## 1. Executive Summary
The Things To Do hub page provides a clean and structured introductory gateway to Manitoba's cultural, outdoor, and culinary tourism offerings. Semantic landmark regions and keyboard skip navigation are properly configured, and images feature descriptive alternative text. The primary accessibility recommendation is resolving the top template heading order where four `<h3>` feature cards precede `<h1>Things To Do</h1>`.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main `<h1>Things To Do</h1>` in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 2 | Pillar Section Outline | Experience Categories | **Low** | `<h2>Explore Authentic Indigenous Experiences</h2>` with subordinate `<h3>` headings (Culture & Heritage, Outdoor & Nature, Culinary Traditions) creates a clean, logical outline. | Maintain this structural hierarchy. |
| 3 | Alt Text Quality | Logos & Feature Images | **Low** | All 6 images contain valid and descriptive `alt` attributes. | Clean alt tag baseline. |
| 4 | Map Section Accessibility | Interactive Experience Map | **Low** | Ensure map container or iframe provides an accessible name (`aria-label="Interactive Manitoba Tourism Map"`). | Add accessible label to interactive map block. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at top of template.
- [x] **Alt Text Quality:** All images have descriptive alt attributes.
- [x] **Contrast:** High text contrast against light backgrounds.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Unify Opening Heading Hierarchy:** Align template heading order so `<h1>Things To Do</h1>` opens the content hierarchy.

### 🟡 Medium Priority / Improvements
1. **Interactive Map ARIA Label:** Add `aria-label="Manitoba Indigenous Tourism Map"` to the experience map block.

### 🟢 Low Priority / Polish & Recommendations
1. **Category Focus States:** Ensure experience pillar cards maintain high-contrast focus rings when navigated via keyboard.
