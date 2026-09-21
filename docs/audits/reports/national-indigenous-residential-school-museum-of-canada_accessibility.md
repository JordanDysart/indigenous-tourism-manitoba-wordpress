# Audit Report: National Indigenous Residential School Museum of Canada — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/national-indigenous-residential-school-museum-of-canada/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-30`  
**Overall Status:** `Pass with Recommendations (Alt Tags Present; Enrich Museum Context; Heading Order Skip)`  

---

## 1. Executive Summary
The National Indigenous Residential School Museum of Canada (NIRSM) operator profile presents a site of national historical significance and truth-telling, located at the former Portage la Prairie Indian Residential School on Keeshkeemaquah Reserve. The page declares `<html lang="en-US">` and properly renders `<h1>National Indigenous Residential School Museum of Canada</h1>`. Enhancing the existing basic alt text tags (`alt="Monument"`, `alt="Display 1"`, `alt="Eagle"`) with descriptive survivor and museum commemoration context alongside standardizing heading levels will optimize accessibility.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Gallery Photo Alt Attributes | **Medium** | Gallery photos use concise placeholders (`alt="Monument"`, `alt="Display 1"`, `alt="Eagle"`, `alt="Display 2"`). | Enrich alt text in WP Media Library (e.g. "Commemorative monument honoring Indian Residential School survivors at Keeshkeemaquah", "Exhibition display featuring archival school photographs, artifacts, and survivor stories"). |
| 2 | Headings Structure | Category Subtitle | **Medium** | `<h3>Discover Attractions</h3>` directly follows `<h1>`, skipping an `<h2>` level. | Change heading to `<h2 class="h3">Discover Attractions</h2>`. |
| 3 | Link Accessibility | Outbound Operator Link | **Medium** | `<a href="https://nirsmuseum.ca/" target="_blank">Visit Website</a>` opens in a new tab without screen reader warning. | Add `aria-label="Visit NIRSM website (opens in a new tab)"`. |
| 4 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` card headers precede the main content in the DOM tree. | Restructure top card elements to follow the main `<h1>` or render as semantic list items. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are configured.
- [x] **H1 Heading Presence:** `<h1>National Indigenous Residential School Museum of Canada</h1>` is declared.
- [x] **Alt Attribute Presence:** 5 of 5 gallery photos have alt attributes.
- [ ] **Heading Order:** Heading levels skipped (`<h1>` directly to `<h3>`).
- [ ] **Outbound Link Disclosures:** `target="_blank"` links lack new window screen reader notifications.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Enrich Museum & Memorial Alt Text:** Update commemorative monument and artifact exhibition photos with informative descriptive alt text in the WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Fix Heading Levels:** Standardize `<h3>Discover Attractions</h3>` to `<h2>` in single operator template.
2. **Add New Window Notice:** Append `(opens in a new tab)` screen reader text or `aria-label` to external operator website link.

### 🟢 Low Priority / Polish & Recommendations
1. **High Contrast Focus Rings:** Verify `:focus-visible` ring clarity across all visitor educational links.
