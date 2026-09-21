# Audit Report: Explore Indigenous at The Forks Market — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/the-forks/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Failed Request Detected (Local Domain Leak)`  

---

## 1. Executive Summary
The Explore Indigenous at The Forks Market page loads quickly with lightweight total assets, but suffers from a **network connection failure** caused by an image resource requesting a local development domain (`indigenous-tourism-manitoba-wordpress.lndo.site`). This causes browser network requests to hang and ultimately fail with an SSL/DNS error. Additionally, 5 of 7 images lack explicit dimensions in HTML (CLS risk), and duplicate icon stylesheets are loaded.

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Failed Network Request | Feature image (`4-1.png`) | **High** | Browser attempts connection to `https://indigenous-tourism-manitoba-wordpress.lndo.site/...`, resulting in a failed request and wasted connection budget. | Replace with production URL `https://indigenoustourismmanitoba.ca/wp-content/uploads/2025/05/4-1.png`. |
| 2 | Cumulative Layout Shift (CLS) | Feature image & top cards | **Medium** | 5 of 7 images lack explicit HTML `width` and `height` attributes. | Add explicit dimensions to image blocks to lock layout geometry. |
| 3 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 4 | Hero Asset Optimization | Top feature card (`about-itm.jpg`) | **Low** | Global top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script exceptions during page execution.
- [ ] **Network Request Health:** 1 failed HTTP request to inaccessible local development domain (`.lndo.site`).
- [ ] **Image Dimensions & CLS:** 5 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.
- [x] **Analytics Loading:** Google Tag Manager loads asynchronously.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Fix Staging Asset URL:** Update image URL to the production CDN/domain to prevent stalled network requests and 404/SSL errors.

### 🟡 Medium Priority / Improvements
1. **Declare Image Dimensions:** Add explicit `width` and `height` attributes to feature imagery and top cards.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟢 Low Priority / Polish & Recommendations
1. **Lazy Loading:** Ensure lower images utilize native `loading="lazy"`.
