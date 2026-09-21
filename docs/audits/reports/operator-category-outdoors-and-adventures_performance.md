# Audit Report: Outdoors and Adventures Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/outdoors-and-adventures/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (Clean Script Execution; 2.96 MB Image Payload; Missing Image Dimensions)`  

---

## 1. Executive Summary
The Outdoors and Adventures operator category taxonomy archive executes cleanly with zero JavaScript runtime errors. However, the archive transfers **2.96 MB** of image data for a 2-operator directory grid. Both listing card thumbnails load heavy uncompressed full-resolution source JPEGs (Nature’s Edge: 619.0 KB; Wapusk Adventures: 444.5 KB), and 6 of 8 images lack explicit HTML `width` and `height` attributes, causing Cumulative Layout Shift (CLS) risk during page rendering.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 6 of 8 images (including both card thumbnails) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 2 | Image Optimization | Listing Card Thumbnails | **High** | Both listing cards load raw full-resolution `-scaled.jpg` images (619.0 KB and 444.5 KB) instead of generated archive thumbnails. | Configure taxonomy card loop to load `medium_large` WebP thumbnails (< 60 KB each). |
| 3 | Image Optimization | Top Feature Image | **Medium** | `about-itm.jpg` transfers **841.7 KB** as an uncompressed header asset. | Convert and compress to responsive WebP (< 90 KB). |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 6 of 8 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Card thumbnails (619.0 KB & 444.5 KB) and feature banner (841.7 KB) are unoptimized.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.
2. **Optimize Archive Card Thumbnails:** Configure category template to request registered WordPress `medium_large` thumbnail sizes (< 60 KB WebP).

### 🟡 Medium Priority / Improvements
1. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` into responsive WebP.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
