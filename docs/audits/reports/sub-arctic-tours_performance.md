# Audit Report: Sub-Arctic Tours — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/sub-arctic-tours/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (7.59 MB Total Payload; Heavy Photography & Recommendation Thumbnails)`  

---

## 1. Executive Summary
The Sub-Arctic Tours operator profile operates with high stability and zero JavaScript console errors. However, total image payload reaches **7.59 MB**, driven by five high-resolution wildlife photos (~1.75 MB total) and heavy footer recommendation card images (`Anne-2024.png` at 2.62 MB, `Agowiidiwinan-Centre-Sideview.png` at 881 KB). Converting gallery assets and card thumbnails to modern WebP format will reduce page weight by more than 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Wildlife Photography Gallery | **High** | 5 polar bear photos total 1.75 MB in JPEG format (`GettyImages-861535232.jpg` at 730 KB, `GettyImages-483257198.jpg` at 528 KB). | Convert to WebP format (< 100 KB each) to accelerate mobile loading. |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** High image payload (7.59 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Wildlife Photography:** Re-encode polar bear gallery JPEGs into compressed WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy-Load Below-The-Fold Images:** Ensure `loading="lazy"` is active on all lower tour photos.
