# Audit Report: Renée Simcoe Profile — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/renee-simcoe/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-31`  
**Runtime Health:** `Good (2.15 MB Total Image Payload; 227.1 KB Headshot Portrait; Clean Console)`  

---

## 1. Executive Summary
The single team member profile for Renée Simcoe executes cleanly with zero JavaScript console errors or runtime failures. The main optimization opportunities include serving modern WebP image formats for the featured portrait (`Renee-Simcoe-headshot-2025.jpg` transfers 227.1 KB), eliminating redundant Bootstrap Icons stylesheets, and providing explicit dimensions for global card/header imagery to prevent layout shifts.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Image Optimization | `Renee-Simcoe-headshot-2025.jpg` | **Medium** | The profile headshot is served as an 896x1195 JPEG transferring **227.1 KB** for a ~350px display container. | Serve a registered `medium_large` WebP crop (~400px width; < 35 KB; 85% reduction). |
| 2 | Total Image Payload | Page-Wide Media Payload | **Medium** | Combined image payload is **2.15 MB** across 7 assets. | Implement WebP conversion and responsive `srcset` delivery across featured and header assets. |
| 3 | Cumulative Layout Shift (CLS) | Feature / Menu Images | **Medium** | 4 of 7 global images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to global header/feature cards. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Runtime Scripts | Theme and Analytics Scripts | **Low** | Scripts execute cleanly with zero console exceptions. | High runtime stability. |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions or failed network requests.
- [ ] **Image Compression & Sizing:** Headshot transfers 227.1 KB (uncompressed JPEG); total image weight is 2.15 MB.
- [ ] **Image Dimensions & CLS:** 4 global images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Compress and Size Profile Headshot:** Serve a registered `medium_large` WebP portrait (< 35 KB) in the single team member template.

### 🟡 Medium Priority / Improvements
1. **Add Dimensions to Header Assets:** Ensure all global navigation and card images output explicit `width` and `height`.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Apply Image Fetch Priority:** Set `fetchpriority="high"` on the featured profile headshot to accelerate LCP on single profile pages.
