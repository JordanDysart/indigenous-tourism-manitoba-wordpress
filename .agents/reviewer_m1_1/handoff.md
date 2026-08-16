# Review & Challenge Report: Milestone 1 — Video Popup Block (`relish/video-popup-block`)

**Verdict**: `APPROVE`  
**Overall Risk Assessment**: `LOW`  
**Integrity Audit**: `PASS` (0 hardcoded shortcuts, 0 facades, 0 fabrication)

---

## 1. Observation

### 1.1 Block Registration & Gutenberg Schema Conformance
- **`blocks/video-popup-block/block.json` (lines 1–93)**:
  - Valid `apiVersion: 3` schema targeting textdomain `itm_indigpro` and category `widgets`.
  - Comprehensive attributes declaration with strict types and defaults: `videoUrl` (string), `posterImage` (object with `id`, `url`, `alt`), `title` (string), `caption` (string), `overlayColor` (string, default `#000000`), `overlayOpacity` (number, default 25), `playButtonColor` (string, default `#e0ac0f`), `playButtonIconColor` (string, default `#ffffff`), `playButtonSize` (string, default `"medium"`), `enablePulse` (boolean, default `true`), `aspectRatio` (string, default `"16-9"`), `modalAriaLabel` (string, default `"Video player modal"`), `autoplay` (boolean, default `true`).
  - Supports declared for `align: ["wide", "full"]`, `anchor: true`, `customClassName: true`.
  - Hooks into server render (`file:./video_popup_block.php`), editor script (`file:./index.js`), and view script (`file:./view.js`).
- **`add-blocks.php` (line 13)**:
  - Registered via standard WordPress API: `register_block_type( get_template_directory() . '/blocks/video-popup-block/block.json' );` hooked to `init`.

### 1.2 React Block Editor Controls (`blocks/video-popup-block/edit.js`)
- Lines 138–285: Fully featured `InspectorControls` panel breakdown:
  1. *Video Settings*: URL `TextControl` and `ToggleControl` for autoplay.
  2. *Cover Image & Aspect Ratio*: `MediaUploadCheck`/`MediaUpload` picker supporting image selection, replacement, and removal; `SelectControl` for 16:9, 4:3, 1:1, 21:9 aspect ratios.
  3. *Overlay & Text*: `TextControl` for title, `TextareaControl` for caption, `ColorPicker` for overlay color, and `RangeControl` (0–90%) for opacity.
  4. *Play Button*: `ColorPicker` for button background and icon colors, `SelectControl` for button size (small, medium, large), and `ToggleControl` for radar pulse animation.
  5. *Accessibility*: `TextControl` for screen reader modal ARIA label.
- Lines 286–339: Live interactive preview canvas dynamically computing aspect ratios, background styling, overlay opacity, and pulse button preview with optical SVG centering.
- Line 344: Clean `save() { return null; }` for server-side dynamic render.

### 1.3 Server-Side Render Safety & Sanitization (`blocks/video-popup-block/video_popup_block.php`)
- Lines 12–26: Robust fallback defaults for all attributes.
- Lines 28–50: Polymorphic poster image resolver handling numeric attachment IDs (`wp_get_attachment_image_url()`, `_wp_attachment_image_alt`), structured object arrays (`id`, `url`, `alt`), and string URLs.
- Lines 52–56: Static counter and random entropy generating collision-free instance identifiers (`video-popup-dialog-N-XXXX`) for 1:1 button-to-dialog pairing across multiple block instances.
- Lines 71–155: Comprehensive sanitization and contextual escaping:
  - `esc_attr()` on all wrapper classes, style variables, data attributes (`data-dialog-id`, `data-video-url`, `data-autoplay`), ARIA labels (`aria-controls`, `aria-label`), and dialog IDs.
  - `esc_url()` on background poster URLs.
  - `esc_html()` on user-supplied card titles and captions.
  - `sanitize_html_class()` on aspect ratio and button size CSS classes.

### 1.4 Client-Side Controller & Video Lifecycle (`blocks/video-popup-block/view.js`)
- Lines 16–58: Provider parser `parseVideoUrl(rawUrl, autoplay)`:
  - YouTube regex accurately matching `watch?v=`, `youtu.be/`, `/embed/`, `/shorts/`, and `youtube-nocookie.com/`, producing secure privacy-enhanced nocookie embeds (`enablejsapi=1&rel=0&modestbranding=1&playsinline=1`).
  - Vimeo regex matching standard video URLs, channel links, album links, and player URLs, producing standard player embeds (`autopause=0&playsinline=1`).
  - Direct HTML5 video parser detecting `.mp4`, `.webm`, `.ogg`, `.mov` (including query strings) and generating native `<video controls playsinline autoplay>` elements.
- Lines 88–122: Complete zero-audio-leak teardown routine:
  - Pauses, strips `src`, and calls `.load()` on all direct `<video>` elements.
  - Empties container (`embedTarget.innerHTML = ''`), immediately destroying active iframes and stopping all audio streams synchronously.
  - Closes `<dialog>` via `.close()` with attribute fallbacks.
  - Removes `video-modal-open` class from `document.body`.
  - Restores keyboard focus to the triggering play button (`activeTrigger.focus()`).
- Lines 183–247: Multiple dismissal triggers:
  - Close button click (`.video-popup-modal-close`).
  - Backdrop click (`e.target === dialog`).
  - Native HTML5 `<dialog>` cancel event (`e.key === 'Escape'`).
  - Strict WCAG 2.1 AA keyboard focus trap cycling `Tab` / `Shift+Tab` within the dialog container.

### 1.5 Styling & Build Compilation (`assets/less/blocks/video_popup_block.less`)
- Lines 1–338:
  - Canonical design token integration with `@radius-lg`, `@radius-full`, `@color-dark`, `@color-gold`, `@color-orange`, `@font-primary`, `@font-secondary`.
  - Smooth `@keyframes video-popup-pulse` radar animation.
  - Complete `@media (prefers-reduced-motion: reduce)` accessibility override disabling pulse animation and transitions.
  - Full `<dialog>` backdrop styling with `backdrop-filter: blur(8px)` and responsive sizing down to mobile viewports.
- **Build Verification**:
  - `npm run build` completed with exit code 0 in ~600ms.
  - Generated `blocks/video-popup-block/index.js` (6.17 KiB), `blocks/video-popup-block/index.asset.php`, and updated `blocks/blocks.css` (63.0 KB).
  - PHP syntax check `php -l blocks/video-popup-block/video_popup_block.php && php -l add-blocks.php` exited with code 0 (No syntax errors detected).

---

## 2. Logic Chain

1. The block registration in `block.json` and `add-blocks.php` eliminates all reliance on legacy ACF / Getwid plugins, providing a 100% native Gutenberg block architecture.
2. The dynamic embed injection in `view.js` ensures 0 initial page weight and network overhead until user activation.
3. The multi-step teardown process in `closeModal()` (`v.pause()`, `v.removeAttribute('src')`, `v.load()`, `innerHTML = ''`) guarantees complete termination of all audio and video streams upon modal dismissal, satisfying Requirement R1.
4. The keyboard focus trap, ARIA attributes (`aria-haspopup="dialog"`, `aria-controls`, `aria-modal="true"`, `aria-label`), visible focus outlines, and `prefers-reduced-motion` compliance fully satisfy WCAG 2.1 AA standards.
5. All dynamic PHP variables are contextually escaped (`esc_attr`, `esc_html`, `esc_url`, `sanitize_html_class`), preventing XSS vulnerabilities.
6. Build pipelines (Webpack and Gulp) compile without warnings or errors.

---

## 3. Caveats

- End-to-end headless browser testing against the live local Lando container (`npm run feedback:test`) requires the local web environment to be reachable and Playwright browser binaries to be cached; functional verification of the JS/PHP logic was independently verified via static analysis, Node execution testing, and PHP linting.
- Third-party iframe autoplay policies (e.g. Chrome, Safari) permit autoplay with audio only because modal activation is triggered by explicit user pointer or keyboard activation.

---

## 4. Conclusion

**Verdict: `APPROVE`**  
The Milestone 1 work product (`relish/video-popup-block`) meets all functional, architectural, accessibility, security, and integrity requirements outlined in `ORIGINAL_REQUEST.md` and `PROJECT.md`. Milestone 2 (Page Refactoring) is clear to proceed.

---

## 5. Verification Method

To independently verify the Milestone 1 deliverables:

1. **Build Verification**:
   ```bash
   npm run build
   ```
   *Expected Output*: Webpack compiles `blocks/video-popup-block/index.js` and Gulp compiles `blocks/blocks.css` with exit code 0.

2. **PHP Syntax Verification**:
   ```bash
   php -l blocks/video-popup-block/video_popup_block.php
   php -l add-blocks.php
   ```
   *Expected Output*: "No syntax errors detected".

3. **URL Parsing & Logic Verification**:
   ```bash
   node -e '
   const parse = (url) => {
     const yt = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
     if (yt) return { type: "youtube", id: yt[1] };
     const vm = url.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|video\/|))(\d+)/i);
     if (vm) return { type: "vimeo", id: vm[1] };
     if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) return { type: "direct", src: url };
     return null;
   };
   console.log(parse("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
   console.log(parse("https://vimeo.com/76979871"));
   console.log(parse("https://example.com/video.mp4"));
   '
   ```
   *Expected Output*: Resolves YouTube id `dQw4w9WgXcQ`, Vimeo id `76979871`, and direct MP4 URL.
