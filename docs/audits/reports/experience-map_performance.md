# Audit Report: Experience Map — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/experience-map/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Severe Asset Payload Bottleneck (>26.5 MB Payload)`  

---

## 1. Executive Summary
The Experience Map provides an interactive Leaflet-powered spatial directory that runs without JavaScript runtime crashes. However, the page presents a **critical mobile performance bottleneck, downloading 26.55 MB of media assets across 28 images on initial load**. The primary contributors are a raw 13.06 MB uncompressed PNG for Nonsuch Brewing, a 2.62 MB PNG for Anne Mulaire, and 12 uncompressed JPEG photos exceeding 500KB - 880KB each. In addition, 17 separate stylesheets and 8 map plugin scripts are enqueued without deferral.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Critical Media Weight | Nonsuch Brewing thumbnail (`Screenshot-2023-09-05-at-11.07.18-AM.png`) | **Critical** | An uncompressed 13.06 MB PNG file is transferred on initial page load. | Replace/compress with an optimized WebP thumbnail (< 100 KB), saving 12.9 MB. |
| 2 | Heavy Media Weight | Anne Mulaire thumbnail (`Anne-2024_...png`) | **High** | An uncompressed 2.62 MB PNG file is transferred in the card grid. | Convert to WebP format (< 120 KB), saving 2.5 MB. |
| 3 | Cumulative Page Weight | All 22 Operator Thumbnails | **High** | Total page weight exceeds **26.55 MB** across 28 image requests. | Batch convert all uploaded operator featured images to WebP (< 100 KB each), bringing total payload under 1.5 MB. |
| 4 | Stylesheet & Script Overhead | Leaflet map extensions & plugins | **Medium** | 17 separate stylesheets and 8 map plugin scripts load without asset concatenation or `defer`. | Minify, combine where possible, and apply `defer` to non-critical map scripts. |
| 5 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed HTTP requests.
- [ ] **Image Compression:** Extreme uncompressed media payload (> 26.55 MB total; 13.06 MB single image).
- [x] **Operator Card Dimensions:** 24 of 28 images (including all 22 operator cards) declare explicit dimensions.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [ ] **Script Deferral:** Leaflet extension scripts lack `defer` attributes.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress 13 MB Nonsuch Asset:** Immediately replace `Screenshot-2023-09-05-at-11.07.18-AM.png` with a compressed WebP thumbnail (< 100 KB).
2. **Compress 2.6 MB Anne Mulaire Asset:** Replace `Anne-2024_...png` with an optimized WebP (< 120 KB).

### 🟡 Medium Priority / Improvements
1. **Batch WebP Conversion:** Compress all 22 operator featured photos to WebP to eliminate >24 MB of transfer.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Map Script Deferral:** Add `defer` attribute to Leaflet extension scripts (`gestures_leaflet-js`, `markercluster-js`, `zoomhome-js`).
