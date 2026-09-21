# Audit Report: Shelly’s Bistro — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/shellys-bistro/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (6.02 MB Total Payload; Primary Weight in Footer Recommendation Cards)`  

---

## 1. Executive Summary
The Shelly’s Bistro operator profile operates with high stability and zero JavaScript console errors. The operator's main badge asset (`ShellysBistro_round-label-2-1-1.png`) is reasonably compact at **142.6 KB**. However, total image payload reaches **6.02 MB**, dominated by recommendation thumbnail assets (`Anne-2024.png` at 2.62 MB, `Agowiidiwinan-Centre-Sideview.png` at 881 KB). Compressing recommendation cards and feature graphics into WebP will cut page transfer size by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 2 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 15 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 4 | Operator Logo Asset | Main Profile Image | **Low** | Main operator logo/badge is served at 142.6 KB PNG. | Convert to WebP format (< 30 KB) for optimal mobile delivery. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Moderate-to-heavy image payload (6.02 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Compress Main Bistro Logo:** Re-encode `ShellysBistro_round-label-2-1-1.png` to WebP format.
