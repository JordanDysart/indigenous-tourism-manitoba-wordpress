# Audit Report: West Region Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/west/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Needs Optimization (2.18 MB Total Image Payload; 259.1 KB Across 2 Card Thumbnails; Missing Image Dimensions)`  

---

## 1. Executive Summary
The West region operator taxonomy archive executes cleanly with zero JavaScript console exceptions. The archive transfers **2.18 MB** of total image payload for a 2-card directory grid. Listing card thumbnails load moderately compressed JPEG assets: Turtle Village transfers **178.9 KB** (`TV5.jpg`) and NIRSM transfers **80.2 KB** (`IRS-Monument-RB-Russel-school.jpg`). In addition, 6 of 8 images lack explicit HTML `width` and `height` dimensions, causing layout instability (CLS) during page render.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Payload | Turtle Village & NIRSM Thumbnails | **Medium** | Listing thumbnails transfer **259.1 KB** across 2 cards (179 KB + 80 KB). | Re-encode assets to registered WordPress `medium_large` WebP format (< 50 KB each; >65% size reduction). |
| 2 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 6 of 8 images (including both card thumbnails) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 3 | Image Optimization | Header & Feature Assets | **Medium** | `about-itm.jpg` (841.7 KB) and `4-1-1024x379.png` (462.8 KB) contribute 1.30 MB of uncompressed weight. | Convert top feature images into responsive WebP. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 6 of 8 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Card thumbnails are 178.9 KB and 80.2 KB; total image payload is 2.18 MB.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Add Explicit Dimensions to Listing Images:** Ensure `width` and `height` attributes are output on listing cards to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Compress Listing Card Thumbnails:** Generate and serve `medium_large` WebP thumbnails (< 50 KB each) for Turtle Village and NIRSM.
2. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` and `4-1-1024x379.png` into responsive WebP.
3. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
