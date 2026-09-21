# Audit Report: New Account Request — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/new-account-request/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 Tag)`  

---

## 1. Executive Summary
The New Account Request page provides clear instructions and email contact pathways for Indigenous operators seeking portal login credentials. The primary accessibility issue is that the banner title is coded as an `<h2>New Account Request</h2>` rather than a top-level `<h1>`, resulting in a page without a declared primary heading.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Hero Banner Title | **Critical** | **No `<h1>` heading exists in the DOM.** The banner title is marked up as `<h2>New Account Request</h2>`. | Upgrade `<h2 class="banner-block-title">` to `<h1>New Account Request</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Section Structure | Instruction Block | **Low** | Body section uses logical hierarchy: `<h2>Request an Operator or Member Account</h2>` followed by `<h3>How to Submit</h3>`. | Clean sub-heading outline. |
| 4 | Media Alt Text | Logo & Feature Graphics | **Low** | Images and branding logos include valid, descriptive alt text. | High alt text compliance. |

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
1. **Upgrade Banner Title to H1:** Change `<h2>New Account Request</h2>` to `<h1>New Account Request</h1>` in `page-new-account-request.php` / block editor.

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Direct Mailto Fallback:** Ensure email button includes explicit `aria-label="Email Membership Team at info@indigenoustourismmanitoba.ca"`.
