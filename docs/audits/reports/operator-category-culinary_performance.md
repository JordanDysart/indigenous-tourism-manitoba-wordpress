# Audit Report: Culinary Category Archive — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator-category/culinary/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Critical Degradation (16.41 MB Total Media Payload; 12.75 MB Uncompressed PNG Screenshot on Nonsuch Card)`  

---

## 1. Executive Summary
The Culinary operator category taxonomy archive suffers from severe page bloat, transferring an astonishing **16.41 MB** of image data on initial load. The primary culprit is the card thumbnail for *La Brasserie Nonsuch Brewing Co.*, which serves an uncompressed **12.75 MB PNG screenshot** (`Screenshot-2023-09-05-at-11.07.18-AM.png`). Furthermore, Prairie Berry (861.5 KB) and Sharecuterie (645.3 KB) load heavy full-source JPEGs, and all 6 operator cards lack explicit `width` and `height` attributes. Replacing the Nonsuch PNG with an optimized WebP thumbnail and generating responsive archive sizes will reduce page weight by **over 95%** (down to < 800 KB).

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization & Page Weight | Nonsuch Brewing Card Thumbnail | **Critical** | The listing card directly loads a **12.75 MB (13,058.6 KB)** raw uncompressed PNG screenshot (`Screenshot-2023-09-05-at-11.07.18-AM.png`). | Regenerate/replace featured image with a compressed WebP image sized at `medium_large` (< 80 KB). This single fix saves ~13 MB per page load! |
| 2 | Image Optimization | Prairie Berry & Sharecuterie Cards | **High** | Listing cards load raw `-scaled.jpg` images (861.5 KB and 645.3 KB) instead of generated archive thumbnails. | Configure taxonomy card loop to load `medium_large` WebP thumbnails (< 60 KB each). |
| 3 | Cumulative Layout Shift (CLS) | Listing Card `<img>` Tags | **High** | 6 of 6 culinary cards in the archive grid lack explicit `width` and `height` dimensions in HTML. | Ensure `wp_get_attachment_image()` outputs native dimension attributes to prevent layout shift. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Archive Cards Payload:** Extreme failure — Nonsuch card thumbnail alone is 12.75 MB.
- [ ] **Total Page Weight:** Critical failure — 16.41 MB total transfer.
- [ ] **Image Dimensions & CLS:** 10 of 12 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress and Replace Nonsuch Brewing Featured Image:** In WordPress Media Library, replace `Screenshot-2023-09-05-at-11.07.18-AM.png` (12.75 MB) with an optimized WebP (< 80 KB).
2. **Optimize Archive Card Loop:** Configure category template to request registered WordPress `medium_large` thumbnail sizes rather than full images.
3. **Add Explicit Dimensions to Listing Images:** Add native `width` and `height` attributes to prevent CLS.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **CSS Containment:** Apply `contain: content;` on listing cards to optimize reflow and scrolling performance.
