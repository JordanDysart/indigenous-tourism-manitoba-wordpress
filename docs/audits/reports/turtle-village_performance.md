# Audit Report: Turtle Village — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/turtle-village/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (6.64 MB Total Payload; Heavy Recommendation Grid Thumbnails)`  

---

## 1. Executive Summary
The Turtle Village operator profile executes cleanly with zero JavaScript console errors. Direct cabin photography assets are well-managed (**771 KB** total across 5 photos). However, the page incurs an overall image payload of **6.64 MB** caused by uncompressed full-resolution assets served in the footer recommendation cards (`Anne-2024.png` at 2.62 MB, `Agowiidiwinan-Centre-Sideview.png` at 881 KB). Converting recommendation cards and header banners to WebP thumbnails will reduce page weight by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Top Feature Banners (`about-itm.jpg`) | **Medium** | Global feature card images total over 1.7 MB uncompressed. | Compress to responsive WebP assets. |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Direct Operator Assets Weight:** Balanced (771 KB total across 5 cabin photos).
- [ ] **Total Page Weight:** High recommendation loop weight (6.64 MB total payload).
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
1. **Serve Modern WebP Cabin Photos:** Encode cabin JPEGs to WebP to reduce direct gallery weight below 300 KB.
