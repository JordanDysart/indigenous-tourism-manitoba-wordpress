# Audit Report: National Indigenous Residential School Museum of Canada — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/national-indigenous-residential-school-museum-of-canada/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (8.38 MB Total Payload; 966 KB Uncompressed PNG Artwork)`  

---

## 1. Executive Summary
The National Indigenous Residential School Museum of Canada (NIRSM) operator profile operates with high stability and zero JavaScript console errors. However, total image payload is heavy at **8.38 MB**, caused by an uncompressed 966 KB PNG artwork asset (`eagle.png`) and high-res exhibition photography (`Museum-display-3.jpg` is 624 KB, `Museum-Display-2-2.jpg` is 454 KB), alongside recommendation thumbnail assets (`Anne-2024.png` at 2.62 MB). Compressing museum gallery assets into WebP will cut page transfer size by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Eagle Artwork & Exhibit Photos | **High** | `eagle.png` is an uncompressed 966 KB PNG, and museum display photos exceed 420 KB to 625 KB each. | Compress `eagle.png` and exhibition photos to WebP format (< 100 KB each) to save ~2.2 MB. |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (8.38 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Full Museum Gallery:** Re-encode `eagle.png` and exhibition JPEGs (`Museum-display-1.jpg`, `Museum-Display-2-2.jpg`, `Museum-display-3.jpg`) to WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
