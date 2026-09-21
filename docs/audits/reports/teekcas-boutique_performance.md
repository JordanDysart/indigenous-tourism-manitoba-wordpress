# Audit Report: Teekca’s Boutique — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/teekcas-boutique/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (Lightweight Direct Assets 157 KB; Heavy Recommendation Loop 5.88 MB)`  

---

## 1. Executive Summary
The Teekca’s Boutique operator profile executes with high stability and zero JavaScript console errors. Direct boutique gallery assets are lightweight (**157 KB** total across 2 photos). However, the page incurs a total image payload of **6.04 MB** due to unoptimized recommendation card assets served in the footer loop (`Anne-2024.png` at 2.62 MB, `Agowiidiwinan-Centre-Sideview.png` at 881 KB). Converting recommendation cards and header banners to WebP thumbnails will save over 85% in bandwidth.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Top Feature Banners (`about-itm.jpg`) | **Medium** | Global feature card images total over 1.7 MB uncompressed. | Compress to responsive WebP assets. |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 16 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Direct Operator Assets Weight:** Highly optimized (only 157 KB total across product photos).
- [ ] **Total Page Weight:** High recommendation loop weight (6.04 MB total payload).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes in WebP format instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Maintain Clean Direct Asset Sizes:** Direct store photography is excellently optimized at ~60-90 KB each.
