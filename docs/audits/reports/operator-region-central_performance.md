# Audit Report: Central Region Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-region/central/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Severe Performance Bottleneck (21.88 MB Total Image Payload; 13.06 MB Single Card PNG; Missing Image Dimensions)`  

---

## 1. Executive Summary
While the Central region operator taxonomy archive executes cleanly with zero JavaScript console exceptions, it presents a **severe bandwidth bottleneck**, downloading **21.88 MB** of images across 19 assets. The most critical offender is the La Brasserie Nonsuch Brewing Co. listing card, which loads an uncompressed raw desktop screenshot (`Screenshot-2023-09-05-at-11.07.18-AM.png`) weighing **13.06 MB**. Additional card thumbnails (Anne Mulaire at **2.62 MB**, Agowiidiwinan Centre at **881 KB**, and Wyndham Garden at **782 KB**) contribute massive bloat. In addition, 17 of 19 images lack explicit HTML `width` and `height` dimensions, triggering extensive Cumulative Layout Shift (CLS) on mobile and desktop devices.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Massive Payload | La Brasserie Nonsuch Card | **Critical** | Single card thumbnail `Screenshot-2023-09-05-at-11.07.18-AM.png` transfers **13.06 MB** (13,058.6 KB) uncompressed PNG. | Immediately resize and re-encode to registered WordPress `medium_large` WebP format (< 50 KB; 99.6% size reduction). |
| 2 | Image Bloat / Uncompressed Assets | Anne Mulaire & Regional Cards | **Critical** | Anne Mulaire thumbnail transfers **2.62 MB**, Agowiidiwinan Centre transfers **881 KB**, Wyndham Garden transfers **782 KB**, and Sharecuterie transfers **645 KB**. | Convert all operator post thumbnails to WebP format. |
| 3 | Cumulative Layout Shift (CLS) | Listing Card & Feature Images | **High** | 17 of 19 images (including all 13 card thumbnails) lack explicit `width` and `height` attributes in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shifts. |
| 4 | Image Optimization | Header & Feature Assets | **Medium** | `about-itm.jpg` (841.7 KB) and `4-1-1024x379.png` (462.8 KB) contribute 1.30 MB of uncompressed weight. | Convert top feature images into responsive WebP. |
| 5 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 6 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Dimensions & CLS:** 17 of 19 images missing explicit dimensions in HTML.
- [ ] **Image Compression:** Total image payload is a massive 21.88 MB; individual thumbnail exceeds 13 MB.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Replace 13.06 MB Nonsuch Thumbnail:** Re-encode `Screenshot-2023-09-05-at-11.07.18-AM.png` into a compressed WebP thumbnail (< 50 KB).
2. **Compress Regional Post Thumbnails:** Generate and serve `medium_large` WebP thumbnails for all 13 operator profiles (< 60 KB each; >94% total payload reduction).
3. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Compress Hero / Feature Images:** Re-compress `about-itm.jpg` and `4-1-1024x379.png` into responsive WebP.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
