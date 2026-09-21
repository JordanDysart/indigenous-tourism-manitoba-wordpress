# Audit Report: Accommodation Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/accommodation/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (3.94 MB Total Payload; Archive Cards Serve Full Scaled JPEGs; Layout Shift CLS Risk)`  

---

## 1. Executive Summary
The Accommodation operator category taxonomy archive performs with zero JavaScript runtime errors and responsive grid formatting. However, the archive cards currently request full-sized `-scaled.jpg` source files rather than optimized WebP thumbnails (e.g. `WGWA_Exterior` at 781.7 KB, `Copy-of-IMG-3629` at 646.4 KB), and all 4 listing card images lack explicit HTML `width` and `height` attributes. Serving compressed WebP thumbnails with explicit dimensions will reduce payload to < 800 KB and eliminate CLS.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Listing Card Images | **High** | Archive cards load full `-scaled.jpg` images totaling > 2.0 MB for 4 thumbnails. | Configure taxonomy card loop to fetch `medium_large` or `medium` thumbnail size in WebP format (< 60 KB each). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card `<img>` Tags | **High** | 4 of 4 operator cards in the archive grid lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 4 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Archive Cards Payload:** 2.06 MB across 4 thumbnails.
- [ ] **Total Page Weight:** 3.94 MB total transfer.
- [ ] **Image Dimensions & CLS:** 8 of 10 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Optimize Archive Card Thumbnails:** Serve generated WordPress thumbnail sizes (`medium_large`) in WebP format (< 60 KB).
2. **Add Explicit Dimensions to Archive Images:** Prevent layout shift by adding `width` and `height` attributes to archive listing templates.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
