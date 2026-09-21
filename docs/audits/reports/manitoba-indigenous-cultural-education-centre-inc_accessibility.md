# Audit Report: Manitoba Indigenous Cultural Education Centre Inc. — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/manitoba-indigenous-cultural-education-centre-inc/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing & Vague "Group" Alt Attributes; Heading Level Skip)`  

---

## 1. Executive Summary
The Manitoba Indigenous Cultural Education Centre Inc. (MICEC) operator profile presents an essential educational institution dedicated to promoting awareness and understanding of Indigenous cultures, languages, and histories in Manitoba. The page declares `<html lang="en-US">` and properly renders `<h1>Manitoba Indigenous Cultural Education Centre Inc.</h1>`. Accessibility remediation requires replacing empty and vague placeholder alt text (`alt=""`, `alt="group"`, `alt="group event"`) with descriptive workshop descriptions, fixing skipped heading levels, and adding new window notices to external links.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Critical** | 1 image has empty alt text (`Presentation-Set`) and 4 images use vague non-descriptive placeholders (`alt="group"`, `alt="group event"`). | Update alt text in WP Media Library (e.g. "Participants gathered around traditional craft workshop tables at MICEC", "Archival Indigenous library and education materials"). |
| 2 | Headings Structure | Services Section | **Medium** | `<h3>Discover Workshops, Art & Culture</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Workshops, Art & Culture</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://micec.com" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit MICEC website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Manitoba Indigenous Cultural Education Centre Inc.</h1>` is declared.
- [ ] **Media Alt Text:** 1 empty alt attribute and 4 non-descriptive `alt="group"` placeholders.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Workshop & Centre Alt Text:** Replace `alt="group"` and empty attributes with rich descriptions of MICEC cultural education programs in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Workshops, Art & Culture</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all educational workshop links.
