# Skill: Performance & Runtime Auditor

**Trigger:** When assigned to run a **performance audit** on an individual page of `https://indigenoustourismmanitoba.ca/`.

**Objective:**
Identify detectable runtime errors, console exceptions, broken asset requests, and obvious front-end performance bottlenecks directly in the DOM and code, without requiring external performance benchmark tools.

---

## Audit Checklist & Evaluation Criteria

### 1. Browser Console & Runtime Stability
- [ ] **JavaScript Errors & Exceptions:** Check console for uncaught exceptions, TypeError, ReferenceError, or broken plugin scripts.
- [ ] **Failed Asset Requests (404/403/500):** Check network logs for missing CSS files, JavaScript bundles, web fonts, or background images.
- [ ] **Deprecation & Security Warnings:** Identify mixed content warnings (HTTP assets loaded on HTTPS), insecure script calls, or deprecated JavaScript APIs.
- [ ] **Console Noise / Debug Logs:** Flag leftover `console.log()` statements from development or active plugins.

### 2. Image & Media Asset Delivery
- [ ] **Missing Image Dimensions:** Check if `<img>` and `<iframe>` tags have explicit `width` and `height` attributes (or CSS aspect ratios) to prevent layout shifts.
- [ ] **Oversized Raw Images:** Identify uncompressed, massive image files (> 1MB) loaded where modern compressed formats (WebP, optimized JPEG) should be used.
- [ ] **Native Lazy Loading:** Ensure non-hero images located below the fold include `loading="lazy"`.
- [ ] **Autoplay / Video Embeds:** Verify video embeds or backgrounds have poster fallback images and are not downloading excessive data unprompted.

### 3. Script & Stylesheet Efficiency
- [ ] **Duplicate Library Loading:** Check for duplicate inclusions of major JavaScript libraries or frameworks (e.g., multiple jQuery versions, redundant Bootstrap JS files, duplicate icon sets).
- [ ] **Head Script Blocking:** Identify non-critical scripts placed in `<head>` without `defer` or `async` attributes that block initial HTML parsing.
- [ ] **Excessive / Unused CSS:** Flag large inline style blocks or redundant stylesheet links that delay rendering.

### 4. Third-Party Widgets & Embeds
- [ ] **Heavy Embeds:** Check third-party widgets (Google Maps iframes, Constant Contact forms, social media widgets) for lazy loading or deferral.
- [ ] **Font Loading:** Check if web fonts use `font-display: swap` to prevent Flash of Invisible Text (FOIT).

---

## Output Report Structure

When completing the audit for a page, output the findings in this format:

```markdown
# Performance & Runtime Audit: [Page Title]
**URL:** [Page URL]
**Date:** [YYYY-MM-DD]
**Runtime Health:** [Clean / Warnings / Errors Detected / Severe Bottlenecks]

## Summary of Findings
[Brief 2-3 sentence overview of runtime errors, console status, and detectable asset/DOM performance issues]

## Discovered Issues

| # | Category | Location / Resource | Issue Description | Recommended Fix |
|---|---|---|---|---|
| 1 | Console Error | `theme.js:42` | `Uncaught TypeError: Cannot read properties of null` | Add null check before accessing DOM element |
| 2 | Failed Request | `/wp-content/.../missing-icon.png` | 404 Not Found on header icon | Fix asset path in CSS/template |
| 3 | Asset Size | Hero banner (`banner_large.jpg`) | File size is 4.8MB (3840x2160) | Compress and convert to WebP (< 250KB) |
| 4 | Layout Shift | Operator card images | Missing `width` and `height` attributes | Add explicit dimensions to prevent CLS |

## Action Items & Optimization Steps
1. **[Critical Runtime Fixes]:** ...
2. **[Asset & Loading Optimizations]:** ...
```
