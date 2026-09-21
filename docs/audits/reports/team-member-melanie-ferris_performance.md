# Audit Report: Melanie Ferris Profile — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/melanie-ferris/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Good (1.94 MB Total Image Payload; 18.2 KB Placeholder Graphic; Clean Console)`  

---

## 1. Executive Summary
The single team member profile for Melanie Ferris demonstrates strong runtime stability with zero JavaScript console errors or failed network requests. Because the featured image slot currently uses a lightweight dancer illustration (`ITM_4CP_DANCER.png`, 18.2 KB), total image payload is 1.94 MB. Optimization recommendations focus on font stylesheet deduplication, WebP conversion for future portrait uploads, and adding explicit HTML dimensions to global header imagery.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | `ITM_4CP_DANCER.png` | **Low** | Placeholder graphic is lightweight (18.2 KB). When an authentic portrait photo is uploaded, it should be compressed to < 35 KB in WebP. | Ensure future headshot uploads are converted to WebP with responsive `srcset` support. |
| 2 | Total Image Payload | Page-Wide Media Payload | **Medium** | Combined image payload is **1.94 MB** across 7 assets. | Implement WebP conversion and responsive `srcset` delivery across featured and header assets. |
| 3 | Cumulative Layout Shift (CLS) | Feature / Menu Images | **Medium** | 4 of 7 global images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to global header/feature cards. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [x] **Featured Image Weight:** 18.2 KB (compact illustration).
- [ ] **Image Dimensions & CLS:** 4 global images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css` in `functions.php`.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Header Assets:** Ensure all global navigation and card images output explicit `width` and `height`.
2. **WebP Delivery for Headshot:** When Melanie Ferris's headshot photo is uploaded, ensure automated WebP compression is applied.

### 🟢 Low Priority / Polish & Recommendations
1. **Apply Image Fetch Priority:** Set `fetchpriority="high"` on the featured profile image.
