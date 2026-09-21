# Audit Report: Whiteshell Petroforms Authentic Indigenous Tours — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/whiteshell-petroforms-authentic-indigenous-tours/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (8.76 MB Total Payload; Heavy Direct Photography & Recommendation Loop Assets)`  

---

## 1. Executive Summary
The Whiteshell Petroforms Authentic Indigenous Tours operator profile executes cleanly with zero JavaScript console errors and responsive Fancybox modal lightbox functionality. However, the total page image payload reaches **8.76 MB**, driven by uncompressed direct tour photos (`Print-0075-1-scaled.jpg` at 1.56 MB, `Print-6466-scaled.jpg` at 858.5 KB) and full-resolution footer recommendation thumbnails (`Anne-2024.png` at 2.62 MB). Implementing modern WebP compression and responsive image sizing will reduce page weight by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Image Optimization | Direct Petroforms Photos (`Print-0075-1-scaled.jpg`, `Print-6466-scaled.jpg`) | **High** | Direct photography assets total over 2.4 MB in uncompressed JPEG format. | Convert gallery photography to WebP (< 150 KB each). |
| 3 | Image Optimization | Award Badge (`Indigenous-Tourism-Award-Recipient-2023.png`) | **Medium** | Award graphic is served as an uncompressed 522.5 KB PNG. | Compress to WebP or optimize PNG to < 50 KB. |
| 4 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 17 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 5 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 6 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Direct Operator Assets Weight:** 2.94 MB across 3 images.
- [ ] **Total Page Weight:** High payload (8.76 MB total transfer).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Direct Petroforms Photography:** Convert `Print-0075-1-scaled.jpg` and `Print-6466-scaled.jpg` to WebP format (< 150 KB).
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes in WebP format instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Optimize Award Graphic:** Compress the 522.5 KB award PNG to WebP.
