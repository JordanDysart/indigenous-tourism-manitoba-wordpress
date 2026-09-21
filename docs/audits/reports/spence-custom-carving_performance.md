# Audit Report: Spence Custom Carving — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/spence-custom-carving/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (7.45 MB Total Payload; Heavy Photography & Recommendation Thumbnails)`  

---

## 1. Executive Summary
The Spence Custom Carving operator profile runs smoothly with zero JavaScript console exceptions. However, total image payload reaches **7.45 MB**, driven by four full-resolution artisan carving photos (~1.60 MB total) and heavy footer recommendation card images (`Anne-2024.png` at 2.62 MB, `Agowiidiwinan-Centre-Sideview.png` at 881 KB). Converting gallery assets and card thumbnails to modern WebP format will reduce page weight by more than 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Artisan Carving Gallery | **High** | 4 woodcarving photos total 1.60 MB in JPEG format (`SpenceFProfile-scaled.jpg` at 537 KB, `20221115_212535-scaled.jpg` at 448 KB). | Convert to WebP format (< 100 KB each) to accelerate mobile loading. |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 18 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** High image payload (7.45 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Artisan Gallery Photos:** Re-encode carving gallery JPEGs into compressed WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy-Load Below-The-Fold Images:** Ensure `loading="lazy"` is active on all lower carving photos.
