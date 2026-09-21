# Performance & Runtime Audit Guide

This guide details the methodology for practical, discoverable runtime and front-end performance checks on the Indigenous Tourism Manitoba website, without requiring heavy external benchmark analysis services.

---

## 1. Performance Evaluation Criteria

### 1.1 Browser Console & Runtime Errors
- **JavaScript Runtime Exceptions:**
  - Check browser developer tools / console output for uncaught exceptions, `TypeError`, `ReferenceError`, or broken script executions.
  - Check for failed WordPress block scripts or plugin initialization failures.
- **Failed Asset Requests (404/403/500):**
  - Check network activity for missing JS files, CSS stylesheets, fonts, or images failing to load.
- **Console Warnings & Deprecations:**
  - Flag mixed content warnings (HTTP resources loaded on HTTPS), insecure third-party scripts, or deprecated JavaScript APIs.
- **Development Console Artifacts:**
  - Identify leftover `console.log()` statements or verbose debug outputs left in production assets.

### 1.2 Media Assets & Cumulative Layout Shift (CLS)
- **Missing Explicit Dimensions:**
  - Inspect `<img>` and `<iframe>` elements to ensure `width` and `height` attributes (or CSS aspect ratios) are explicitly declared to prevent layout shifts as media loads.
- **Uncompressed Raw Media:**
  - Identify excessively large images (> 1MB or full 4K camera resolutions) loaded directly on web pages where optimized WebP or resized JPEGs should be used.
- **Lazy Loading Implementation:**
  - Check that non-hero images located below the fold use `loading="lazy"`.
- **Autoplaying Media:**
  - Ensure background video or slider media includes fallback poster images and does not download excessive video data unprompted on mobile networks.

### 1.3 Script & Stylesheet Loading Efficiency
- **Duplicate Asset Inclusions:**
  - Check for duplicate inclusions of major JavaScript libraries (e.g. multiple jQuery versions, duplicate Bootstrap bundles, or multiple icon libraries).
- **Head Blocking Scripts:**
  - Identify non-critical scripts loaded synchronously inside `<head>` without `defer` or `async` attributes.
- **Inline Style & Script Bloat:**
  - Flag massive blocks of inline CSS or JavaScript that could be bundled and cached efficiently.

### 1.4 Third-Party Widgets & Web Fonts
- **Heavy Third-Party Embeds:**
  - Check if third-party widgets (Google Maps iframes, Constant Contact forms, embedded social feeds) delay initial page responsiveness or lack lazy loading.
- **Font Display Optimization:**
  - Ensure custom `@font-face` declarations include `font-display: swap` to prevent Flash of Invisible Text (FOIT) during page load.

---

## 2. Step-by-Step Testing Procedure

1. **Console & Network Inspection:**
   - Load the page in a browser session / fetch DOM and review browser console output for runtime errors and failed network requests.
2. **DOM Media Dimension Inspection:**
   - Query all `<img>` tags for missing `width`, `height`, or `loading` attributes.
3. **Asset Size Spot-Check:**
   - Inspect key hero and card image file sizes to flag assets exceeding 500KB - 1MB.
4. **Script & Dependency Review:**
   - Scan `<head>` and `<body>` script tags for duplicates and non-deferred blocking scripts.
5. **Log Actionable Fixes:**
   - Document the exact script filename, line number, or image URL causing runtime errors or layout shifts.
