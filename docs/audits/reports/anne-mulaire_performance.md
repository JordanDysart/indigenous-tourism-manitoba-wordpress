# Audit Report: Anne Mulaire — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/anne-mulaire/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Immediate Remediation (10.33 MB Heavy Media Payload; 2.6 MB Featured PNG)`  

---

## 1. Executive Summary
The Anne Mulaire operator profile page runs with zero JavaScript errors and responsive Fancybox lightbox popups. However, the total media payload exceeds **10.33 MB**, severely degrading mobile page speed and Core Web Vitals (Largest Contentful Paint). The main culprit is `Anne-2024.png` (transferred at **2.62 MB** uncompressed PNG), which appears twice in the DOM. Converting this image and gallery photos to WebP will reduce the transfer weight by over 80%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization (LCP) | Main Operator Portrait (`Anne-2024.png`) | **Critical** | Hero image is served as an uncompressed 2.62 MB PNG, impacting LCP and data usage. | Convert PNG to WebP format (< 120 KB) with responsive `srcset` breakpoints. |
| 2 | Image Optimization | Gallery Assets (`Boutique_2025.jpg`, `Manufacture.jpg`) | **High** | High-resolution photography assets range from 540 KB to 770 KB each. | Compress and resize to WebP/AVIF (< 150 KB each). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Extremely heavy image payload (10.33 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress & Convert Featured Image:** Convert `Anne-2024.png` (2.62 MB) to WebP format to save over 2.5 MB immediately.
2. **Compress Full Gallery:** Re-encode `Manufacture_anne3-scaled.jpg` and `Anne_Mulaire_Boutique_2025-2-scaled.jpg` to modern WebP.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
