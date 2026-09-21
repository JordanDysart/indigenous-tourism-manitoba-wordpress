# Audit Report: Events — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/events/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing H1 & Iframe Fallback)`  

---

## 1. Executive Summary
The Events page relies entirely on an embedded third-party `<iframe>` widget from 3common.com (`profile_events`) to render calendar listings. The primary accessibility failures are a complete absence of an `<h1>` page heading element in the host DOM tree and a generic iframe title (`title="3Common Upcoming and Past"`) that lacks clear context for screen reader users.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Page Header / Main Content | **Critical** | **No `<h1>` tag exists anywhere on the page.** The DOM jumps directly from top `<h3>` feature cards into the embedded iframe. | Insert `<h1>Indigenous Events in Manitoba</h1>` or `<h1>Events</h1>` above the iframe embed (WCAG 1.3.1 / 2.4.6). |
| 2 | Iframe Accessibility | Embedded Calendar (`<iframe>`) | **Medium** | The iframe uses a vendor-default title attribute: `title="3Common Upcoming and Past"`. | Update iframe title to descriptive text: `title="Upcoming Indigenous Tourism Manitoba Events Calendar"`. |
| 3 | Non-Visual Fallback | Main Content Area | **Medium** | If the third-party iframe fails to load or JavaScript is restricted, no fallback text or event contact instructions exist. | Add accessible fallback text inside or adjacent to the iframe container with contact email for event inquiries. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [ ] **H1 Heading Presence:** Page is missing an `<h1>` heading element entirely.
- [ ] **Iframe Title Quality:** Generic vendor title used on calendar iframe.
- [x] **Media Alt Text:** Top feature card images include valid alt tags.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Insert Primary H1 Heading:** Add `<h1>Upcoming Indigenous Events</h1>` above the iframe in `page-events.php` / block editor.

### 🟡 Medium Priority / Improvements
1. **Update Iframe Title:** Change `title="3Common Upcoming and Past"` to `title="Indigenous Tourism Manitoba Events Calendar"`.
2. **Provide Fallback Contact Copy:** Add a 1-sentence paragraph beneath the iframe: "Having trouble viewing events? Contact us at info@indigenoustourismmanitoba.ca or view our operator calendar."

### 🟢 Low Priority / Polish & Recommendations
1. **Keyboard Iframe Focus Trap Check:** Ensure keyboard users can easily tab into and past the 3common embed.
