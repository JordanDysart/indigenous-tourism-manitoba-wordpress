# Audit Report: Member Benefits — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/member-benefits/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 Tag)`  

---

## 1. Executive Summary
The Member Benefits page provides an organized overview of the core value pillars offered to ITM members (Marketing, Training, Funding, Advocacy). However, the page lacks a top-level `<h1>` heading element, instead rendering the primary page title as an `<h2>Member Benefits</h2>`. Inverting top feature cards and upgrading the page title to `<h1>` will achieve full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Primary Page Title | **Critical** | **No `<h1>` heading exists in the DOM.** The page title is coded as `<h2>Member Benefits</h2>`. | Upgrade `<h2>Member Benefits</h2>` to `<h1>Member Benefits</h1>` (WCAG 1.3.1 / 2.4.6). |
| 2 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |
| 3 | Benefit Pillar Hierarchy | Core Service Pillars | **Low** | The four benefit pillars (`<h3>Marketing & Promotion</h3>`, `<h3>Training & Certification</h3>`, `<h3>Funding & Grants</h3>`, `<h3>Advocacy & Community</h3>`) sit cleanly under `<h2>What ITM Membership Delivers</h2>`. | Maintain this clean subordinate hierarchy. |
| 4 | Media Alt Text | Logo & Feature Graphics | **Low** | All images include descriptive alternative text. | High alt text compliance. |

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
1. **Upgrade Primary Title to H1:** Change `<h2>Member Benefits</h2>` to `<h1>Member Benefits</h1>` in `page-member-benefits.php` / block template.

### 🟡 Medium Priority / Improvements
1. **Reorder Top Cards in DOM:** Ensure opening feature cards follow the primary `<h1>`.

### 🟢 Low Priority / Polish & Recommendations
1. **Pillar Icon Accessibility:** If icons or glyphs are added to the 4 benefit pillars, ensure they include `aria-hidden="true"`.
