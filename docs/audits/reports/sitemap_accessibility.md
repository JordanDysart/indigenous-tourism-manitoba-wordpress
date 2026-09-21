# Audit Report: Sitemap — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/sitemap/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass (Valid H1 Tag & Semantic Categorized Directory Lists)`  

---

## 1. Executive Summary
The Sitemap / Directory page provides an accessible overview of the entire website taxonomy. The primary document title is declared as an `<h1>Site Map & Directory</h1>`, with directory branches grouped under descriptive `<h2>` headings and structured in semantic `<ul>` unordered lists.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Low** | `<h1>Site Map & Directory</h1>` is declared in the DOM. | Maintain existing heading tag structure. |
| 2 | Directory Taxonomy | Section Headings | **Low** | Clear thematic sections (`<h2>Experiences & Destinations</h2>`, `<h2>Explore by Region</h2>`, `<h2>Explore by Category</h2>`, etc.). | High navigability. |
| 3 | List Semantics | Directory Links | **Low** | Directory links are marked up in semantic `<ul>` and `<li>` elements, giving screen readers list counts. | High structural compliance. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 5 | Media Alt Text | Feature Visuals | **Low** | All images and logos feature valid, descriptive alt text. | High alt text compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Site Map & Directory</h1>` is present and declared.
- [x] **List Semantics:** Links grouped in `<ul>` / `<li>` tags.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Media Alt Text:** Images include valid alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
*(No critical blockers found on this page).*

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Alphabetical Sorting:** Ensure all child links within category lists are alphabetically sorted for faster scanning.
