# Audit Report: Reconciliation — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/reconciliation/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Needs Minor Adjustments`  

---

## 1. Executive Summary
The Reconciliation page features a solemn, respectful presentation with proper landmark roles and keyboard skip navigation. However, the audit identified two primary accessibility issues: an inverted heading outline at the top of the template (`<h3>` feature cards preceding `<h1>Reconciliation`), and several featured operator cards with low-quality or filename-based alt text (e.g. `alt="Food 1"`, `alt="SpenceFProfile"`).

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the primary `<h1>Reconciliation</h1>` in the DOM tree. | Restructure top card elements to follow the main `<h1>` or use semantic list items. |
| 2 | Alt Text Quality | Featured Operator: Bistro on Notre Dame | **Medium** | Alt attribute is a generic camera label: `alt="Food 1"`. | Update alt attribute to descriptive copy: `alt="Indigenous-inspired culinary dishes served at Bistro on Notre Dame"`. |
| 3 | Alt Text Quality | Featured Operator: Spence Custom Carving | **Medium** | Alt attribute contains a raw filename slug: `alt="SpenceFProfile"`. | Update alt attribute to: `alt="Handcrafted Indigenous wood carving by Spence Custom Carving"`. |
| 4 | Alt Text Quality | Featured Operator: Residential School Museum | **Medium** | Alt attribute is vague: `alt="Monument"`. | Update alt attribute to: `alt="National Indigenous Residential School Museum monument in Portage la Prairie"`. |
| 5 | Alt Text Quality | Featured Operator: Wapusk Adventures | **Low** | Alt text is minimal: `alt="Wapusk Winter"`. | Update alt attribute to: `alt="Dog sledding winter adventure in Churchill with Wapusk Adventures"`. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **Heading Hierarchy:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the page.
- [ ] **Alt Text Quality:** Several featured cards use filename slugs or vague labels (`Food 1`, `SpenceFProfile`).
- [x] **Contrast:** High contrast between text and background surfaces throughout the narrative sections.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Unify Opening Heading Hierarchy:** Align the template heading order so `<h1>Reconciliation</h1>` opens the content hierarchy.

### 🟡 Medium Priority / Improvements
1. **Remediate Operator Card Alt Text:** Update media library alt tags for featured cards (`Food 1` &rarr; `Bistro on Notre Dame cuisine`, `SpenceFProfile` &rarr; `Spence Custom Carving artwork`, `Monument` &rarr; `National Indigenous Residential School Museum monument`).

### 🟢 Low Priority / Polish & Recommendations
1. **Focus Ring Verification:** Ensure `:focus-visible` outlines remain distinct across operator card hyperlinks.
