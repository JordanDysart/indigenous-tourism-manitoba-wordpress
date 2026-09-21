# Audit Report: South Region Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/south/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Needs Optimization (2.77 MB Total Image Payload; 861.5 KB Single Card Thumbnail; Missing Image Dimensions)`  

---

## 1. Executive Summary
The South region operator taxonomy archive executes cleanly with zero JavaScript errors. However, the archive transfers **2.77 MB** of image assets for a single-operator directory. Prairie Berry's listing card loads an uncompressed drone aerial photograph at **861.5 KB** (`DJI_0020-scaled.jpg`). In addition, 5 of 7 images lack explicit HTML `width` and `height` dimensions, causing layout instability (CLS) during page render.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Payload | Prairie Berry Card Thumbnail | **High** | Listing thumbnail transfers **861.5 KB** (`DJI_0020-scaled.jpg`) for a small card image slot. | Re-encode asset to registered WordPress `medium_large` WebP format (< 60 KB; 93% payload reduction). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 5 of 7 images (including Prairie Berry thumbnail) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 3 | Image Optimization | Header & Feature Assets | **Medium** | `about-itm.jpg` (841.7 KB) and `4-1-1024x379.png` (462.8 KB) contribute 1.30 MB of uncompressed weight. | Convert top feature images into responsive WebP. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 5 of 7 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Card thumbnail is 861.5 KB; total image payload is 2.77 MB.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Prairie Berry Card Thumbnail:** Generate and serve `medium_large` WebP thumbnail (< 60 KB) for Prairie Berry.
2. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` and `4-1-1024x379.png` into responsive WebP.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
