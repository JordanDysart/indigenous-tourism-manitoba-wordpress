# Audit Report: Sitemap — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/sitemap/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (Fast DOM Rendering; Dimension Attributes Needed)`  

---

## 1. Executive Summary
The Sitemap / Directory page delivers rapid response times with minimal layout overhead and an overall payload under 2.0 MB. Memory consumption and DOM node count are well within high-performance thresholds. Performance optimizations focus on resolving Cumulative Layout Shift (CLS) on top feature cards and removing redundant Bootstrap Icons stylesheet enqueues.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Cumulative Layout Shift (CLS) | Top feature cards | **Medium** | 4 of 6 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to opening card templates. |
| 2 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 3 | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | **Low** | Global top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |
| 4 | DOM Parsing Efficiency | Directory Link Lists | **Low** | 93 list items render with negligible layout recalculation overhead. | High DOM efficiency. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Total Page Weight:** Lightweight total payload (< 2.0 MB).
- [ ] **Image Dimensions & CLS:** 4 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Modern Image Formats:** Convert JPG assets to next-gen `.webp` or `.avif` for optimal mobile loading speeds.
