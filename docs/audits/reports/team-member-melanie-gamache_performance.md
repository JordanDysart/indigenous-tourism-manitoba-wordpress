# Audit Report: Melanie Gamache Profile — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/melanie-gamache/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Needs Optimization (2.42 MB Total Image Payload; 510.2 KB Unscaled Headshot Portrait)`  

---

## 1. Executive Summary
The single team member profile for Melanie Gamache executes cleanly with zero JavaScript console errors or runtime failures. However, the featured portrait image loads a scaled 2048x2560 JPEG (`Melanie-Gamache-headshot-2026-scaled.jpg`) transferring **510.2 KB** for a desktop display container of ~350x450px. Serving a properly sized WebP portrait thumbnail will reduce the profile image payload by **>90%** (~465 KB reduction).

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Bloat / Scaled Asset | `Melanie-Gamache-headshot-2026-scaled.jpg` | **High** | The profile headshot is served as a 2048x2560 JPEG transferring **510.2 KB** for a 350px display container. | Serve a registered `medium_large` WebP crop (~400x500px; < 50 KB; 90% reduction). |
| 2 | Total Image Payload | Page-Wide Media Payload | **Medium** | Combined image payload is **2.42 MB** across 7 assets. | Implement WebP conversion and responsive `srcset` delivery across featured and header assets. |
| 3 | Cumulative Layout Shift (CLS) | Feature / Menu Images | **Medium** | 4 of 7 global images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to global header/feature cards. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Compression & Sizing:** Headshot transfers 510.2 KB (unscaled 2048px); total image weight is 2.42 MB.
- [ ] **Image Dimensions & CLS:** 4 global images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress and Size Profile Headshot:** Serve a registered `medium_large` WebP portrait (< 50 KB) in the single team member template rather than the full scaled 2048px image.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Header Assets:** Ensure all global navigation and card images output explicit `width` and `height`.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Apply Image Fetch Priority:** Set `fetchpriority="high"` on the featured profile headshot to accelerate LCP on single profile pages.
