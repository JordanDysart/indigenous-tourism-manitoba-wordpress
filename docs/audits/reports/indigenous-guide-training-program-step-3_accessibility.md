# Audit Report: Guide Training Step 3: Practicum — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/indigenous-guide-training-program-step-3/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 Tag)`  

---

## 1. Executive Summary
The Step 3: Practicum page outlines on-the-job mentorship, operator placement requirements, and long-term career pathways for newly certified Indigenous tour guides. The primary accessibility issue is that the main page title is marked up as an `<h2>Step 3: Practicum</h2>` rather than a top-level `<h1>`. Upgrading the primary heading and reordering opening feature cards will bring the page into full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Critical** | **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Step 3: Practicum</h2>`. | Upgrade `<h2>` to `<h1>Step 3: Practicum – Indigenous Guide Training Program</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Curriculum Structure | Mentorship & Career Pathways | **Low** | Clear section division with `<h2>Workplace Mentorship</h2>` and `<h2>Career Pathways</h2>`. | Maintain logical section breaks. |
| 4 | Media Alt Text | Feature Visuals | **Low** | All images and logos feature valid, descriptive alt text. | High alt text compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Page is missing an `<h1>` heading element.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Media Alt Text:** Images include valid alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Upgrade Primary Title to H1:** Change `<h2>Step 3: Practicum</h2>` to `<h1>Step 3: Practicum – Indigenous Guide Training Program</h1>` in `page-indigenous-guide-training-program-step-3.php` / block editor.

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Host Operator Placement List:** Format partner operator placements into an accessible unordered list (`<ul><li>`).
