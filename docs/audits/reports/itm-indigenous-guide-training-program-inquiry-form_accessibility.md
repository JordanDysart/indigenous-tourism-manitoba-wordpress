# Audit Report: Guide Training Inquiry Form — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/itm-indigenous-guide-training-program-inquiry-form/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 Tag; No Interactive Form Inputs)`  

---

## 1. Executive Summary
The Guide Training Program Inquiry Form page currently functions as an inquiry contact and program expression of interest gateway. The primary accessibility issue is that the banner title is marked up as an `<h2>Guide Training Program Inquiry</h2>` rather than a top-level `<h1>`. No interactive form elements (`<input>`, `<textarea>`, `<select>`) currently exist on the page; direct inquiry is handled via an email mailto action button.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Banner Title | **Critical** | **No `<h1>` heading exists in the DOM.** The main title is coded as `<h2 class="banner-block-title">Guide Training Program Inquiry</h2>`. | Upgrade `<h2>` to `<h1>Guide Training Program Inquiry</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Form Accessibility | Contact Action Card | **Low** | Currently renders an email contact button rather than an HTML `<form>`. If an interactive form is embedded in the future, ensure explicit `<label for="...">` associations and `aria-required` attributes. | Maintain clear CTA button labels; prepare accessible form semantics upon form embed. |
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
1. **Upgrade Primary Title to H1:** Change `<h2 class="banner-block-title">Guide Training Program Inquiry</h2>` to `<h1>Guide Training Program Inquiry</h1>` in the page template or block editor.

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Screen Reader Action Label:** Add `aria-label="Email the Indigenous Tourism Manitoba Training Team"` to the "Email Training Team" button.
