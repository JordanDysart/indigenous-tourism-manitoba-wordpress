# Audit Report: Bistro on Notre Dame — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/bistro-on-notre-dame/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (Lightweight Primary Media Assets; Cross-Card Weight Optimization Needed)`  

---

## 1. Executive Summary
The Bistro on Notre Dame operator page runs smoothly with zero JavaScript errors and exceptionally lightweight primary gallery photography (~35 KB average per food photo). Total page payload is 6.06 MB, driven largely by uncompressed external thumbnails in the "You Might Like" recommendation grid (`Anne-2024.png` at 2.62 MB). Compressing related-operator thumbnails and eliminating redundant icon stylesheets will provide optimal load times.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Compress and serve generated thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Primary Gallery Photos | **Low** | Operator food and patio photos are well-sized (27 KB – 46 KB each). | High primary image optimization. |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Primary Media Efficiency:** Restaurant photo gallery is lightweight (< 200 KB combined).
- [ ] **Cross-Card Image Weight:** Recommendation cards pull full-resolution uncompressed assets (2.6 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Optimize Recommendation Card Thumbnails:** Ensure the "You Might Like" loop requests registered WordPress thumbnail sizes (`medium` / `thumbnail`) rather than `full` uncompressed source images.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
