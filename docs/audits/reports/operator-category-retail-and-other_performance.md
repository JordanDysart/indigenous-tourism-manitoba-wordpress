# Audit Report: Retail and Other Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/retail-and-other/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Optimization (2.62 MB Uncompressed PNG on Anne Mulaire Card; 4.54 MB Total Image Weight; Missing Image Dimensions)`  

---

## 1. Executive Summary
The Retail and Other operator category taxonomy archive executes cleanly with zero JavaScript console exceptions. However, the archive transfers a heavy **4.54 MB** of image assets for a 2-card directory grid. The listing card thumbnail for Anne Mulaire loads a massive **2.62 MB (2,619.2 KB)** uncompressed source PNG (`Anne-2024...png`). In addition, 6 of 8 images lack explicit HTML `width` and `height` dimensions, causing layout instability (CLS) during page render.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Payload | Anne Mulaire Card Thumbnail | **High** | Card thumbnail transfers **2.62 MB (2,619.2 KB)** as an uncompressed raw PNG (`Anne-2024...png`). | Re-encode asset to registered WordPress `medium_large` WebP format (< 60 KB; 97.7% size reduction). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 6 of 8 images (including both card thumbnails) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 3 | Image Optimization | Header & Feature Assets | **Medium** | `about-itm.jpg` (841.7 KB) and `4-1-1024x379.png` (462.8 KB) contribute 1.30 MB of uncompressed weight. | Convert top feature images into responsive WebP. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 6 of 8 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Anne Mulaire card thumbnail is 2.62 MB; total image payload is 4.54 MB.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Anne Mulaire Card Thumbnail:** Generate and serve a `medium_large` WebP thumbnail (< 60 KB) instead of the 2.62 MB PNG source.
2. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` and `4-1-1024x379.png` into responsive WebP.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
