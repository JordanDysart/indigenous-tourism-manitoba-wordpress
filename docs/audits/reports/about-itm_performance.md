# Audit Report: About Indigenous Tourism Manitoba — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/about-itm/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-29`  
**Runtime Health:** `Good (Minor Layout Shift & Image Optimization Needed)`  

---

## 1. Executive Summary
The About ITM page is significantly leaner than the media-heavy homepage, transferring only 8 stylesheets and 6 image assets. JavaScript executes cleanly with zero runtime exceptions. Main performance opportunities include optimizing the uncompressed 841 KB hero image (`about-itm.jpg`), adding explicit `width`/`height` dimensions to 4 top card images to prevent Cumulative Layout Shift (CLS), and removing the duplicate Bootstrap Icons stylesheet.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Asset Weight | Hero image (`/wp-content/uploads/2024/10/about-itm.jpg`) | **Medium** | Hero JPEG image is **841.7 KB**. | Convert to WebP format and compress to under 120 KB. |
| 2 | Cumulative Layout Shift (CLS) | Top feature cards | **Medium** | 4 of 6 images lack explicit `width` and `height` attributes in HTML. | Declare explicit dimensions or CSS aspect ratios on card image containers. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin local file + jsdelivr CDN). | Deregister redundant CDN stylesheet in theme setup. |
| 4 | Script Loading Efficiency | Theme JS bundles | **Low** | Non-critical scripts (`fancybox-js-js`, `theme.js`) load synchronously without `defer`. | Add `defer` attribute via script loader filters. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or 404 asset failures.
- [ ] **Image Compression:** Hero image exceeds 800KB; WebP not enabled.
- [ ] **Image Dimensions & CLS:** 4 card images lack explicit dimensions.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager and Cloudflare Beacon load asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress Hero Banner:** Optimize `about-itm.jpg` to modern WebP format (< 120KB).

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Top Card Images:** Include explicit `width` and `height` attributes on the 4 feature cards.
2. **Deduplicate Font Stylesheets:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Enable Native Lazy Loading:** Add `loading="lazy"` to below-the-fold images.
