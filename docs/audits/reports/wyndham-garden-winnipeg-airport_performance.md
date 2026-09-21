# Audit Report: Wyndham Garden Winnipeg Airport — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/wyndham-garden-winnipeg-airport/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (8.25 MB Total Payload; Heavy Direct Gallery Photography & Footer Recommendation Assets)`  

---

## 1. Executive Summary
The Wyndham Garden Winnipeg Airport operator profile executes with zero JavaScript console errors and reliable Fancybox modal lightbox functionality. However, the total page image payload reaches **8.25 MB**, driven by uncompressed direct hotel photos (`WGWA_Exterior-3_resize-scaled.jpg` at 781.7 KB, `WGWA_Lobby-1` at 545.2 KB) and full-resolution footer recommendation thumbnails (`Anne-2024.png` at 2.62 MB). Implementing modern WebP compression and responsive image sizing will reduce page weight by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Direct Hotel Photos (`WGWA_Exterior`, `WGWA_Lobby`, etc.) | **High** | 5 direct hotel photos total 2.42 MB in uncompressed JPEG format. | Convert gallery photography to WebP (< 120 KB each). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Direct Operator Assets Weight:** 2.42 MB across 5 images.
- [ ] **Total Page Weight:** High payload (8.25 MB total transfer).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Direct Hotel Photography:** Convert `WGWA_Exterior`, `WGWA_Lobby`, `WGWA_Restaurant`, `WGWA_NQQ1`, and `WGWA_NK1` to WebP format (< 120 KB).
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes in WebP format instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Enable Browser Caching:** Ensure long `max-age` cache headers are set for static hotel photography.
