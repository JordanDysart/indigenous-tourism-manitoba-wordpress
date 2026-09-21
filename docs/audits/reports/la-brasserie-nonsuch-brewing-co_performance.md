# Audit Report: La Brasserie Nonsuch Brewing Co. — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/la-brasserie-nonsuch-brewing-co/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Critical (Severe 44.78 MB Page Payload; Uncompressed Multi-Megabyte PNG Screenshots)`  

---

## 1. Executive Summary
The La Brasserie Nonsuch Brewing Co. operator profile suffers from a severe payload bloat totaling **44.78 MB**, making it the heaviest operator page on the website. Four gallery images are uncompressed macOS raw PNG screenshots ranging from 4.94 MB to **13.06 MB** each (`Screenshot-2023-09-05-at-11.07.18-AM.png` is 13.06 MB alone). This causes massive mobile latency and excessive data consumption. Immediate image re-encoding to WebP will reduce total transferred payload by **97%** (~43 MB savings).

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Gallery PNG Screenshots | **Critical** | Four raw PNG screenshots total **39.3 MB** (`13.06 MB`, `11.30 MB`, `9.96 MB`, and `4.94 MB`). | Replace raw PNG screenshots with compressed WebP/JPEG photos (< 120 KB each) to save 39 MB. |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Critical payload failure (44.78 MB).
- [ ] **Gallery Asset Compression:** 4 raw desktop PNG screenshots uploaded without compression.
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress & Replace 4 Gallery Screenshots (Save 39 MB):**
   - Download and convert `Screenshot-2023-09-05-at-11.07.18-AM.png` (13.1 MB &rarr; 95 KB WebP).
   - Convert `Screenshot-2023-09-05-at-11.07.00-AM.png` (11.3 MB &rarr; 90 KB WebP).
   - Convert `Screenshot-2023-09-05-at-11.08.59-AM.png` (10.0 MB &rarr; 85 KB WebP).
   - Convert `11.png` (4.9 MB &rarr; 70 KB WebP).
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
