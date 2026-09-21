# Audit Report: Tour and Related Services Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/tour-and-related-services/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Optimization (3.62 MB Image Payload; Heavy 881 KB & 858 KB Card Images; Missing Image Dimensions)`  

---

## 1. Executive Summary
The Tour and Related Services operator category taxonomy archive executes cleanly with zero JavaScript console exceptions. However, the archive transfers **3.62 MB** of image assets for a 2-card directory grid. Both listing card thumbnails load heavy uncompressed assets: Whiteshell Petroforms transfers **858.5 KB** (`...Print-6466-scaled.jpg`) and Agowiidiwinan Centre transfers **881.0 KB** (`Agowiidiwinan-Centre-Sideview.png`). In addition, 6 of 8 images lack explicit HTML `width` and `height` dimensions, causing layout instability (CLS) during page render.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Payload | Tour Operator Card Thumbnails | **High** | Listing thumbnails transfer **1.74 MB** across 2 cards (858.5 KB JPEG + 881.0 KB PNG). | Re-encode assets to registered WordPress `medium_large` WebP format (< 60 KB each; 93% size reduction). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 6 of 8 images (including both card thumbnails) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 3 | Image Optimization | Header & Feature Assets | **Medium** | `about-itm.jpg` (841.7 KB) and `4-1-1024x379.png` (462.8 KB) contribute 1.30 MB of uncompressed weight. | Convert top feature images into responsive WebP. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 6 of 8 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Card thumbnails are 858 KB and 881 KB; total image payload is 3.62 MB.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Listing Card Thumbnails:** Generate and serve `medium_large` WebP thumbnails (< 60 KB each) for Whiteshell Petroforms and Agowiidiwinan Centre.
2. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` and `4-1-1024x379.png` into responsive WebP.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
