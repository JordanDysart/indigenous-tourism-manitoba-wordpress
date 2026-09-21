# Audit Report: Workshops, Art & Culture Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/workshops-art-culture/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Optimization (3.35 MB Image Payload; 1.45 MB Across 3 Card Thumbnails; Missing Image Dimensions)`  

---

## 1. Executive Summary
The Workshops, Art & Culture operator category taxonomy archive executes cleanly with zero JavaScript console exceptions. However, the archive transfers **3.35 MB** of image assets for a 3-card directory grid. Listing card thumbnails load heavy uncompressed assets: Spence Custom Carving transfers **537.4 KB** (`SpenceFProfile-scaled.jpg`), Borealis Beading transfers **524.4 KB** (`beading-in-progress-scaled.jpg`), and MICEC transfers **394.8 KB** (`Presentation-Set-up2-1.jpg`). In addition, 7 of 9 images lack explicit HTML `width` and `height` dimensions, causing layout instability (CLS) during page render.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Payload | Workshop Card Thumbnails | **High** | Listing thumbnails transfer **1.45 MB** across 3 cards (537 KB + 524 KB + 395 KB). | Re-encode assets to registered WordPress `medium_large` WebP format (< 60 KB each; >88% size reduction). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 7 of 9 images (including all 3 card thumbnails) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 3 | Image Optimization | Header & Feature Assets | **Medium** | `about-itm.jpg` (841.7 KB) and `4-1-1024x379.png` (462.8 KB) contribute 1.30 MB of uncompressed weight. | Convert top feature images into responsive WebP. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 7 of 9 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Card thumbnails are 537 KB, 524 KB, and 395 KB; total image payload is 3.35 MB.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Listing Card Thumbnails:** Generate and serve `medium_large` WebP thumbnails (< 60 KB each) for Spence Custom Carving, Borealis Beading, and MICEC.
2. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` and `4-1-1024x379.png` into responsive WebP.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
