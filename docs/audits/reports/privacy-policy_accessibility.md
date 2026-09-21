# Audit Report: Privacy Policy — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/privacy-policy/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Valid H1 Tag & Logical Section Hierarchy)`  

---

## 1. Executive Summary
The Privacy Policy page adheres closely to WCAG 2.1 AA accessibility standards. Unlike several other subpages, the primary document title is correctly marked up as an `<h1>Privacy Policy</h1>`, and each substantive policy clause is introduced by a logical `<h2>` section heading.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Low** | `<h1>Privacy Policy</h1>` is correctly declared in the DOM. | Maintain existing heading tag structure. |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Policy Clause Hierarchy | Section Headings | **Low** | Clear numerical section division (`<h2>1. Information We Collect</h2>`, `<h2>2. How We Use Information</h2>`, etc.). | High reading clarity. |
| 4 | Media Alt Text | Feature Visuals | **Low** | All images and logos feature valid, descriptive alt text. | High alt text compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Privacy Policy</h1>` is present and declared.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Media Alt Text:** Images include valid alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
*(No critical blockers found on this page).*

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Table of Contents:** Add an in-page jump link navigation table at the top of long policy text.
