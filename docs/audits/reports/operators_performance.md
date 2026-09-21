# Audit Report: Our Operators — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operators/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Severe Asset Payload Bottleneck Detected`  

---

## 1. Executive Summary
While the directory JavaScript executes cleanly without console runtime crashes, the Our Operators page suffers from a **critical media payload bottleneck exceeding 21.9 MB on initial page load**. The primary culprit is a raw, uncompressed 13.06 MB PNG screenshot for La Brasserie Nonsuch Brewing Co., followed by a 2.62 MB PNG for Anne Mulaire. Compressing these raw thumbnails to modern WebP format will reduce page weight by over **95%** (from 21.9 MB down to under 1.2 MB).

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Critical Asset Weight | Nonsuch Brewing thumbnail (`Screenshot-2023-09-05-at-11.07.18-AM.png`) | **Critical** | A raw uncompressed PNG image of **13.06 MB (13,058 KB)** is downloaded on initial page view. | Immediately replace/compress this asset to WebP format (< 100 KB), saving over 12.9 MB. |
| 2 | Heavy Asset Weight | Anne Mulaire thumbnail (`Anne-2024_...png`) | **High** | An uncompressed **2.62 MB (2,619 KB)** PNG is served in the card grid. | Convert to WebP format (< 120 KB), saving 2.5 MB. |
| 3 | Cumulative Page Weight | Operator photography (`Copy-of-IMG-3629-scaled.jpg`, `sup-class-scaled.jpg`, etc.) | **High** | Total page weight exceeds **21.9 MB** across 18 images. | Run an automated WebP conversion pass across all uploaded operator thumbnails. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue. |
| 5 | Cumulative Layout Shift (CLS) | Top feature cards | **Low** | 4 top cards lack explicit HTML `width` and `height` dimensions (directory cards correctly include dimensions). | Add dimensions to top card templates. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed HTTP requests.
- [ ] **Image Compression:** Extreme uncompressed image payloads (13.06 MB single image; 21.9 MB total).
- [x] **Directory Card Dimensions:** Operator card thumbnails include explicit HTML dimensions.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Asynchronous Analytics:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Nonsuch Brewing Thumbnail:** Immediately replace `Screenshot-2023-09-05-at-11.07.18-AM.png` (13 MB) with an optimized WebP thumbnail (< 100 KB).
2. **Compress Anne Mulaire Thumbnail:** Replace `Anne-2024_...png` (2.6 MB) with an optimized WebP image (< 120 KB).

### 🟡 Medium Priority / Improvements
1. **Batch WebP Conversion on Operator Uploads:** Convert all operator featured images to WebP to bring entire directory payload under 1.5 MB.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Verify Native Lazy Loading:** Ensure all operator cards below the top viewport row utilize `loading="lazy"`.
