# Audit Report: Nature’s Edge Tourism — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/natures-edge-tourism/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (7.45 MB Total Payload; Heavy SUP Photos)`  

---

## 1. Executive Summary
The Nature’s Edge Tourism operator profile operates with high stability and zero JavaScript console errors. However, total image payload is heavy at **7.45 MB**, caused by high-resolution outdoor paddling photography (`Lisa-scaled.jpg` is 665 KB, `sup-class-scaled.jpg` is 619 KB), alongside recommendation thumbnail assets (`Anne-2024.png` at 2.62 MB). Compressing paddleboard photos into WebP will cut page transfer size by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | SUP & Lake Action Photos | **High** | `Lisa-scaled.jpg` and `sup-class-scaled.jpg` exceed 600 KB each. | Compress outdoor photography to WebP format (< 100 KB each) to save ~1.1 MB. |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (7.45 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress SUP & Outdoor Photos:** Re-encode `Lisa-scaled.jpg`, `sup-class-scaled.jpg`, and `group.jpg` to WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
