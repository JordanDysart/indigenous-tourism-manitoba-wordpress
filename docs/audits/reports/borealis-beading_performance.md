# Audit Report: Borealis Beading — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/borealis-beading/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (9.44 MB Heavy Media Payload; Uncompressed Scaled JPEGs)`  

---

## 1. Executive Summary
The Borealis Beading operator profile page delivers a smooth interactive experience with zero console errors and functional Fancybox gallery modals. However, total image payload is substantial at **9.44 MB**, with several gallery photos exceeding 900 KB to 1.05 MB each (`Ste-Genevieve_Borealis-Beading...-26-scaled.jpg` is 1.05 MB). Compressing the workshop gallery photos and related-operator recommendation cards to WebP will dramatically improve page load speed and Core Web Vitals.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Workshop Gallery Photos | **High** | Multiple gallery images exceed 500 KB to 1.05 MB (`TravelManitoba-26-scaled.jpg` is 1.05 MB, `IMG_8983.jpeg` is 940 KB). | Compress and serve modern WebP formats (< 150 KB each). |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (9.44 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Full Workshop Gallery:** Re-encode high-res JPEGs (`TravelManitoba-26.jpg`, `IMG_8983.jpeg`) to WebP to save ~3 MB of payload.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
