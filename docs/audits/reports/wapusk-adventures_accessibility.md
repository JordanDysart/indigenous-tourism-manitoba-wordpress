# Audit Report: Wapusk Adventures — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/wapusk-adventures/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Enrich Dog Mushing Descriptions; Heading Order Skip)`  

---

## 1. Executive Summary
The Wapusk Adventures operator profile highlights a world-renowned Indigenous (Métis) dog sledding and northern lights adventure company founded by Canadian dog sled champion Dave Daley in Churchill, Manitoba. The page declares `<html lang="en-US">` and properly renders `<h1>Wapusk Adventures</h1>`. Expanding short alt text attributes (`alt="Wapusk Winter"`, `alt="Wapusk Dave"`) into vivid descriptive phrases and resolving heading hierarchy skips will ensure full WCAG 2.1 AA compliance.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Dog Mushing Gallery Alt Attributes | **Medium** | Gallery photos use concise placeholders (`alt="Wapusk Winter"`, `alt="Wapusk Dave"`, `alt="Wapusk Northern lights"`). | Update alt text in WP Media Library (e.g. "Sled dog team running through snow-covered boreal trails in Churchill with Wapusk Adventures", "Founder and Métis dog musher Dave Daley interacting with sled dogs in Churchill"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Outdoors and Adventures</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Outdoors and Adventures</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://www.wapuskadventures.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit Wapusk Adventures website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Wapusk Adventures</h1>` is declared.
- [x] **Alt Attribute Presence:** 4 of 4 gallery photos have populated alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Dog Mushing Alt Text:** Update gallery photos with rich narrative descriptions of dog sledding, northern lights, and musher Dave Daley in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Outdoors and Adventures</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across booking and contact links.
