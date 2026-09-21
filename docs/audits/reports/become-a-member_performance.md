# Audit Report: Become a Member — Performance & Runtime

**Page URL:** `https://indigenoustourismmanitoba.ca/become-a-member/`  
**Audit Concern:** `performance`  
**Date Audited:** `2026-08-30`  
**Runtime Health:** `Moderate (Complex Plugin Script & CSS Overhead; Zero Console Errors)`  

---

## 1. Executive Summary
The Become a Member page delivers a functional onboarding application powered by Gravity Forms and digital signature canvas integrations. While media payload is well-managed (< 2.1 MB) and execution completes with zero console errors, the page carries a heavy frontend asset payload comprising **16 separate CSS stylesheets and 47 script references**. Optimizing plugin asset enqueues and eliminating duplicate font stylesheets will improve First Input Delay (INP) and Largest Contentful Paint (LCP).

---

## 2. Detailed Findings

| # | Category | Resource / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Stylesheet Overhead | Gravity Forms, Getwid, Theme styles | **Medium** | 16 separate CSS files are requested on initial load. | Combine/minify form styles and conditionally dequeue unused block stylesheets. |
| 2 | Script Stack Volume | Gravity Forms + Signature + ReCAPTCHA | **Medium** | 47 script tags are parsed on the page (though key GF scripts correctly use `defer`). | Maintain deferral and tree-shake unused helper modules. |
| 3 | Cumulative Layout Shift (CLS) | Opening cards & form icons | **Medium** | 6 of 8 images lack explicit HTML `width` and `height` dimensions. | Add explicit dimensions to top feature cards and portrait logos. |
| 4 | Duplicate Stylesheet | Bootstrap Icons | **Medium** | Bootstrap Icons is loaded twice (plugin assets + jsdelivr CDN). | Remove redundant CDN stylesheet enqueue in theme functions. |
| 5 | Hero Asset Optimization | Top feature card imagery (`about-itm.jpg`) | **Low** | Top feature image is transferred as an 841 KB JPEG. | Convert to WebP format (< 120 KB). |

---

## 3. Checklist Verification

- [x] **Runtime Console Errors:** Zero script crashes during complex form rendering.
- [x] **Script Deferral:** Gravity Forms assets utilize `defer` attributes.
- [ ] **CSS Concatenation / Bloat:** 16 independent stylesheets loaded simultaneously.
- [ ] **Image Dimensions & CLS:** 6 images missing explicit dimensions in HTML.
- [ ] **Asset Deduplication:** Redundant Bootstrap Icons stylesheet loaded.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Declare Image Dimensions:** Add explicit `width` and `height` attributes to top feature cards and portrait branding logos.
2. **Deduplicate Font Icons:** Remove duplicate CDN enqueue of `bootstrap-icons.min.css`.

### 🟡 Medium Priority / Improvements
1. **Optimize Gravity Forms CSS Enqueue:** Disable unused legacy Gravity Forms CSS files (`gravity_forms_theme_reset-css`, `orbital_theme`) if custom theme styling overrides them.

### 🟢 Low Priority / Polish & Recommendations
1. **ReCAPTCHA Optimization:** Configure reCAPTCHA v3 or Cloudflare Turnstile to load asynchronously only when the user focuses on form inputs.
