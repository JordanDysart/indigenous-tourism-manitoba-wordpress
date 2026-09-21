# Audit Report: Events — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/events/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Good (Lightweight Payload; Third-Party Script Deferral Recommended)`  

---

## 1. Executive Summary
The Events page delivers a lightweight local media footprint (< 2.0 MB) with clean execution and zero JavaScript runtime crashes. The primary performance recommendations involve adding `defer`/`async` to the third-party 3common embed script (`profile_events.js`), declaring explicit `width` and `height` dimensions on top feature cards, and removing the duplicate Bootstrap Icons CDN stylesheet.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Third-Party Script Loading | 3common script (`profile_events.js`) | **Medium** | Third-party script is loaded synchronously in the page body without `defer`. | Add `defer` or `async` to `<script src="https://3common.com/scripts/embed/profile_events.js"></script>`. |
| 2 | Cumulative Layout Shift (CLS) | Top feature cards | **Medium** | 4 of 6 images lack explicit HTML `width` and `height` dimensions. | Add explicit dimensions to opening card templates. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 4 | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | **Low** | Global top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed HTTP requests.
- [x] **Total Local Page Weight:** Lightweight local asset footprint (< 2.0 MB).
- [ ] **Third-Party Script Deferral:** `profile_events.js` loads synchronously.
- [ ] **Image Dimensions & CLS:** 4 top cards missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Defer Third-Party Calendar Script:** Add `defer` to the 3common embed script tag.
2. **Declare Image Dimensions on Top Cards:** Add explicit `width` and `height` attributes to top feature card markup.

### 🟡 Medium Priority / Improvements
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Iframe Height Responsiveness:** Ensure the 800px fixed iframe height adjusts dynamically via `postMessage` listener on mobile viewports.
