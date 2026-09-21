# Audit Report: Feast Cafe Bistro — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/feast-cafe-bistro/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (Zero Console Errors; Recommendation Image Weight Optimization Needed)`  

---

## 1. Executive Summary
The Feast Cafe Bistro operator profile executes with high stability and zero JavaScript console errors. The primary restaurant gallery photography averages ~250 KB per photo across four dishes and interior shots. Total page payload stands at **6.91 MB**, largely driven by uncompressed full-resolution assets in the "You Might Like" recommendation grid (`Anne-2024.png` at 2.62 MB). Compressing related-operator thumbnails to WebP and removing duplicate icon stylesheets will optimize rendering performance.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Primary Gallery Photos | **Medium** | Food images (`IMG_4234-1-scaled.jpg`, `IMG_7983-scaled.jpg`) are 400–470 KB JPEGs. | Compress to WebP format (< 120 KB each). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 18 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Primary Media Efficiency:** Restaurant photo gallery is moderately sized (~1 MB combined).
- [ ] **Cross-Card Image Weight:** Recommendation cards pull full-resolution uncompressed assets (2.6 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Optimize Recommendation Card Thumbnails:** Ensure the "You Might Like" loop requests registered WordPress thumbnail sizes (`medium` / `thumbnail`) rather than `full` uncompressed source images.

### 🟡 Medium Priority / Improvements
1. **Compress Primary Food Photos:** Convert gallery photos to WebP format to save ~600 KB.
2. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
3. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
