# Audit Report: Wapusk Adventures — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/wapusk-adventures/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (7.35 MB Total Payload; Heavy Recommendation Loop Thumbnails)`  

---

## 1. Executive Summary
The Wapusk Adventures operator profile loads with zero JavaScript runtime errors and clean Fancybox modal lightbox functionality. Direct dog mushing action photography totals **1.50 MB** across 4 high-resolution images. The page's overall image payload of **7.35 MB** is largely driven by uncompressed full-resolution assets served in the footer recommendation cards (`Anne-2024.png` at 2.62 MB, `Agowiidiwinan-Centre-Sideview.png` at 881 KB). Implementing WebP image conversion and responsive thumbnail sizes will reduce page transfer weight by over 80%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Direct Action Gallery (`FCA486D3...jpeg`, `IMG_2583...jpeg`) | **Medium** | 4 direct photography files total 1.50 MB in uncompressed JPEG format. | Convert gallery assets to WebP (< 120 KB each). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 18 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Direct Operator Assets Weight:** 1.50 MB total across 4 dog sledding & aurora photos.
- [ ] **Total Page Weight:** High recommendation loop weight (7.35 MB total payload).
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
1. **Serve Modern WebP Dog Mushing Photos:** Encode action JPEGs to WebP to reduce direct gallery weight below 400 KB.
