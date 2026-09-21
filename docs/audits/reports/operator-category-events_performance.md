# Audit Report: Events Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/events/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (Clean Script Execution; 2.48 MB Image Payload; Missing Image Dimensions)`  

---

## 1. Executive Summary
The Events operator category taxonomy archive executes cleanly with zero runtime script exceptions. However, the page transfers **2.48 MB** of image data for a single operator listing, largely driven by an uncompressed 572.3 KB card thumbnail for *Manito Ahbee Festival* (`Two.jpg`) and an 841.7 KB top feature banner (`about-itm.jpg`). In addition, 5 of 7 images lack explicit HTML `width` and `height` attributes, presenting Cumulative Layout Shift (CLS) risks during page rendering.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 5 of 7 images (including the Manito Ahbee card thumbnail) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to stabilize layout during image decoding. |
| 2 | Image Optimization | Manito Ahbee Card Thumbnail | **Medium** | The card thumbnail loads a **572.3 KB** raw JPEG (`Two.jpg`) instead of a generated archive thumbnail size. | Configure taxonomy card loop to load `medium_large` WebP thumbnails (< 60 KB). |
| 3 | Image Optimization | Top Feature Image | **Medium** | `about-itm.jpg` transfers **841.7 KB** as an uncompressed header asset. | Convert and compress to responsive WebP (< 90 KB). |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 5 of 7 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Manito Ahbee thumbnail (572.3 KB) and feature banner (841.7 KB) are unoptimized.
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
