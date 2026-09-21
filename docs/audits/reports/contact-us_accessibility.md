# Audit Report: Contact Us — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/contact-us/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 Tag; Skipped Heading Levels)`  

---

## 1. Executive Summary
The Contact Us page features a two-column layout with organizational contact information, social links, and an interactive Gravity Forms contact form. The primary accessibility issue is that the main banner title is marked up as an `<h2>Get In Touch</h2>` rather than an `<h1>`. The form fields maintain excellent label-to-input pairings (`<label for="...">`), but require explicit `aria-required="true"` attributes.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Banner Title | **Critical** | **No `<h1>` heading exists in the DOM.** The main title is coded as `<h2>Get In Touch</h2>`. | Upgrade `<h2>` to `<h1>Contact Indigenous Tourism Manitoba</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Skipped Heading Level | **Medium** | An `<h5>FOLLOW US</h5>` directly follows `<h2>Get In Touch</h2>`, skipping `<h3>` and `<h4>` levels. | Change `<h5>FOLLOW US</h5>` to `<h3 class="h5">Follow Us</h3>`. |
| 3 | Form Accessibility | Gravity Forms Fields | **Medium** | Form inputs have matching `<label for="...">` tags, but required fields rely on visual `*` without `aria-required="true"`. | Enable HTML5 output or declare `aria-required="true"` in Gravity Forms settings. |
| 4 | Media Alt Text | Feature Visuals | **Low** | All images and logos feature valid, descriptive alt text. | High alt text compliance. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Page is missing an `<h1>` heading element.
- [ ] **Heading Order:** Heading levels skipped (`<h2>` to `<h5>`).
- [x] **Form Labels:** `<label for="...">` correctly paired with input IDs.
- [x] **Media Alt Text:** Images include valid alt attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Upgrade Primary Title to H1:** Change `<h2>Get In Touch</h2>` to `<h1>Get In Touch</h1>` in the template / block editor.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h5>FOLLOW US</h5>` to `<h3>` to maintain logical document hierarchy.
2. **Declare `aria-required="true"`:** Ensure Gravity Forms outputs `aria-required="true"` on Name, Email, Subject, and Message fields.

### 🟢 Low Priority / Polish & Recommendations
1. **Form Focus Highlighting:** Add a high-contrast 2px gold focus outline (`:focus-visible`) to active form input elements.
