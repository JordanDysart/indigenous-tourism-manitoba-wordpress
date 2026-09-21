# Audit Report: Prairie Berry — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/prairie-berry/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (8.83 MB Total Payload; Heavy Farm Photography)`  

---

## 1. Executive Summary
The Prairie Berry operator profile operates with high stability and zero JavaScript console errors. However, total image payload is heavy at **8.83 MB**, caused by high-resolution farm and dining photography (`DJI_0020-scaled.jpg` is 862 KB, `0U9A2500-scaled.jpg` is 839 KB, `0U9A2180-1-scaled.jpg` is 581 KB), alongside recommendation thumbnail assets (`Anne-2024.png` at 2.62 MB). Compressing farm dining photography into WebP will cut page transfer size by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Farm & Dining Photography | **High** | Multiple gallery JPEGs exceed 580 KB to 860 KB each. | Compress farm and dining photos to WebP format (< 100 KB each) to save ~2.4 MB. |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (8.83 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Farm & Dining Photography:** Re-encode `DJI_0020-scaled.jpg`, `0U9A2500-scaled.jpg`, `0U9A2180-1-scaled.jpg`, `0U9A1980-scaled.jpg`, and `0U9A1963-1-scaled.jpg` to WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
