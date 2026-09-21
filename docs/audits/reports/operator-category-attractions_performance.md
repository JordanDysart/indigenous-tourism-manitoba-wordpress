# Audit Report: Attractions Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/attractions/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (2.72 MB Total Payload; Sub-Arctic Tours Serves 730 KB Source Image; Layout Shift CLS Risk)`  

---

## 1. Executive Summary
The Attractions operator category taxonomy archive loads with zero JavaScript errors and responsive layout structure. However, the archive card for Sub-Arctic Tours directly loads an unoptimized 730.8 KB JPEG image, and all listing card images lack explicit HTML `width` and `height` attributes. Serving optimized WebP thumbnails with explicit dimension attributes will reduce payload to < 600 KB and eliminate visual layout shifts.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Listing Card Images | **High** | Sub-Arctic Tours card loads an uncompressed 730.8 KB source image (`GettyImages-861535232.jpg`). | Ensure taxonomy card loop requests `medium_large` WebP thumbnails (< 60 KB). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card `<img>` Tags | **High** | Both attraction cards in the archive grid lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 4 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Archive Cards Payload:** Sub-Arctic Tours thumbnail weighs 730.8 KB.
- [ ] **Total Page Weight:** 2.72 MB total transfer.
- [ ] **Image Dimensions & CLS:** 6 of 8 images missing explicit dimensions in HTML.
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
