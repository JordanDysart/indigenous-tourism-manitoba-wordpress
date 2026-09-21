# Audit Report: Sharecuterie — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/sharecuterie/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (9.11 MB Total Payload; Heavy Platter Photography)`  

---

## 1. Executive Summary
The Sharecuterie operator profile operates with high stability and zero JavaScript console errors. However, total image payload is heavy at **9.11 MB**, caused by high-resolution grazing board and storefront photography (`SharecuterieStorefront.RJP2024-17-scaled.jpg` is 801 KB, `SharecuterieStorefront.RJP2024-69-scaled.jpg` is 688 KB, `SharecuteriePicnicRJP2024-scaled.jpg` is 645 KB), alongside recommendation thumbnail assets (`Anne-2024.png` at 2.62 MB). Compressing charcuterie gallery photography into WebP will cut page transfer size by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Charcuterie & Grazing Photography | **High** | Multiple gallery JPEGs exceed 540 KB to 800 KB each. | Compress charcuterie and grazing photos to WebP format (< 100 KB each) to save ~2.7 MB. |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (9.11 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Charcuterie & Grazing Photography:** Re-encode `SharecuterieStorefront.RJP2024-17-scaled.jpg`, `SharecuterieStorefront.RJP2024-69-scaled.jpg`, `SharecuteriePicnicRJP2024-scaled.jpg`, `SharecuterieStorefront.RJP2024-85-scaled.jpg`, and `SharecuterieStorefront.RJP2024-29-scaled.jpg` to WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
