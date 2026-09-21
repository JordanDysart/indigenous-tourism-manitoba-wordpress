# Audit Report: Feast Cafe Bistro — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/feast-cafe-bistro/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Needs Improvement (Missing & Misspelled Alt Text; Insecure HTTP Outbound Link)`  

---

## 1. Executive Summary
The Feast Cafe Bistro operator profile page highlights the celebrated culinary establishment created by Peguis First Nation Chef Christa Bruneau-Guenther in Winnipeg's West End. The single operator template correctly renders the primary title as `<h1>Feast Cafe Bistro</h1>`. Accessibility improvements require adding missing alt text (`alt=""` on gallery asset `68C913D0...`), fixing typographical and vague alt descriptions (e.g. `alt="Burgur"` and `alt="Lady"` for Chef Christa), and adding screen reader new window notices to outbound links.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Interior Image | **Critical** | Gallery asset `68C913D0...jpg` has an empty alt attribute (`alt=""`), violating WCAG 1.1.1. | Add descriptive alt text in WP Media Library (e.g., "Feast Cafe Bistro cozy dining room and coffee counter"). |
| 2 | Non-text Content (Alt Text) | Chef Portrait & Food Photos | **High** | Alt tags contain misspellings and vague labels: `alt="Burgur"` and `alt="Lady"`. | Update to: `alt="Chef and Owner Christa Bruneau-Guenther"` and `alt="Bannock burger with sweet potato fries"`. |
| 3 | Headings Structure | Services Section | **Medium** | `<h3>Discover Culinary</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Culinary Experiences</h2>`. |
| 4 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="http://www.feastcafebistro.com/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning and uses unencrypted HTTP. | Update URL to `https://` and add `aria-label="Visit Feast Cafe Bistro website (opens in a new tab)"`. |
| 5 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>Feast Cafe Bistro</h1>` is declared.
- [ ] **Media Alt Text:** 1 gallery photo lacks alt text (`alt=""`), and others contain typos (`Burgur`, `Lady`).
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix WP Media Library Alt Descriptions:**
   - Update `IMG_7983-scaled.jpg` from `Lady` to `Chef Christa Bruneau-Guenther preparing modern Indigenous cuisine`.
   - Update `IMG_4234-1-scaled.jpg` from `Burgur` to `Bison bannock burger at Feast Cafe Bistro`.
   - Add alt text to `68C913D0...jpg`.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Culinary</h3>` to `<h2>` in single operator template.
2. **Upgrade Website URL & Add New Window Notice:** Switch outbound link to `https://www.feastcafebistro.com/` and add `aria-label`.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Ensure golden `:focus-visible` styling is applied across all operator interactive elements.
