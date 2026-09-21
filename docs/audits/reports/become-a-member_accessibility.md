# Audit Report: Become a Member — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/become-a-member/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Good (Accessible Form Architecture; Minor Heading Hierarchy Flaws)`  

---

## 1. Executive Summary
The Become a Member page houses a detailed multi-tiered Gravity Forms application form for 2026-27 ITM memberships (covering Accredited, Non-Accredited, and Industry Partner categories). The form structure provides robust accessible label associations (`<label for="...">`), fieldsets, and radio/checkbox groups. The main accessibility recommendations include fixing the top-of-page heading hierarchy inversion (`<h3>` cards preceding `<h1>`) and refining duplicate conditional subheadings.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` feature cards precede the main `<h1>Become A Member</h1>` in the DOM outline. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 2 | Headings Structure | Conditional Form Sections | **Medium** | Two `<h3>Payment Details</h3>` headings exist in conditional branches without unique distinguishing labels. | Differentiate conditional section headings (e.g. `<h3>Accredited Member Payment Details</h3>` vs `<h3>Partner Member Payment Details</h3>`). |
| 3 | Form Accessibility | Gravity Forms Fields (`#gform_4`) | **Low** | Field labels, required asterisks, radio groupings, and signature canvas controls include accessible names and ARIA attributes. | Excellent form accessibility baseline. |
| 4 | Signature Canvas | Digital Signature Pad (`input_4_92`) | **Low** | Clear button icon includes descriptive alternative text (`alt="Clear Signature"`). | Proper canvas fallback. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Become A Member</h1>` is correctly rendered.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Form Control Labels:** Extensive input and radio controls feature linked `<label>` tags.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Align Heading Hierarchy:** Reorder top feature card headings beneath the primary `<h1>`.

### 🟡 Medium Priority / Improvements
1. **Disambiguate Conditional Headings:** Give unique titles to conditional payment subheadings in the Gravity Forms builder.

### 🟢 Low Priority / Polish & Recommendations
1. **Form Error Announcement:** Ensure Gravity Forms validation failure banners trigger an `aria-live="assertive"` announcement for screen reader users upon failed submission.
