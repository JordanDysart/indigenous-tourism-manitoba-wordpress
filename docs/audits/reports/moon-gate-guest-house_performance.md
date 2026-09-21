# Audit Report: Moon Gate Guest House — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/operator/moon-gate-guest-house/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Needs Improvement (8.83 MB Total Payload; 1.17 MB Aerial Photo Asset)`  

---

## 1. Executive Summary
The Moon Gate Guest House operator profile loads reliably without console errors or script failures. However, total image payload is heavy at **8.83 MB**, primarily driven by an uncompressed 1.17 MB aerial photography asset (`MoonGateGuestHouse_ITACManitoba...scaled.jpg`) and high-res scaled JPEGs (`Moon-Gate...TMB4263...scaled.jpg` at 746 KB, `Copy-of-IMG-3629-scaled.jpg` at 646 KB), alongside recommendation thumbnail assets (`Anne-2024.png` at 2.62 MB). Converting gallery assets to WebP will reduce transfer weight by over 85%.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | Aerial & Exterior Gallery Photos | **High** | Overhead landscape photo is 1.17 MB (`PhotoByTaylorBurk...scaled.jpg`) and firepit photo is 746 KB. | Compress to WebP format (< 120 KB each) to save ~2.6 MB. |
| 2 | Image Optimization | Recommendation Cards (`Anne-2024.png`) | **High** | Related card thumbnail is served as an uncompressed 2.62 MB PNG. | Serve generated WordPress thumbnail sizes in WebP format (< 50 KB). |
| 3 | Cumulative Layout Shift (CLS) | Social Icons & Feature Cards | **Medium** | 8 of 19 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to social icons and top card templates. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Lightbox Runtime | Fancybox UI bundle | **Low** | Lightbox assets load cleanly with zero runtime exceptions. | Stable modal execution. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Total Page Weight:** Heavy image payload (8.83 MB).
- [ ] **Image Dimensions & CLS:** 8 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Full Retreat Gallery:** Re-encode 1.17 MB aerial photo and high-res retreat JPEGs to WebP format.
2. **Optimize Recommendation Cards:** Ensure "You Might Like" queries fetch `thumbnail` or `medium` sizes instead of `full` source files.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Social Icons & Top Cards:** Prevent layout shift by specifying `width="24" height="24"` on social icon SVGs/PNGs.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading on Gallery:** Ensure `loading="lazy"` is applied to all thumbnail gallery items below the fold.
