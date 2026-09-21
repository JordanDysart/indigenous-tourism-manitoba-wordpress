# Audit Report: Agowiidiwinan Centre — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/agowiidiwinan-centre/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (Heavy 8 MB Media Payload; Uncompressed PNGs)`  

---

## 1. Executive Summary
The Agowiidiwinan Centre operator page maintains a stable JavaScript environment with working Fancybox lightbox popups and zero runtime errors. However, total image payload is notably heavy at **7.99 MB**, primarily caused by large uncompressed PNG photographs in the gallery and related operator cards (`Anne-2024.png` is 2.62 MB alone). Converting photographic PNGs to next-generation WebP formats will dramatically improve Largest Contentful Paint (LCP) and mobile load speeds.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Related Cards (`Anne-2024.png`) | **High** | Related operator thumbnail is transferred as an uncompressed 2.62 MB PNG. | Compress and resize to WebP format (< 100 KB). |
| 2 | Image Optimization | Gallery PNGs | **High** | `Agowiidiwinan-Centre-Sideview.png` (881 KB) and `Entrance.png` (834 KB) are large PNGs. | Convert photographic PNGs to WebP/JPEG formats. |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 17 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (~7.99 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress & Convert PNG Images:** Convert `Anne-2024.png` (2.6 MB), `Sideview.png` (881 KB), and `Entrance.png` (834 KB) to WebP format to reduce page weight by ~7 MB.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
