# Handoff Report: Technical Investigation of `relish/video-popup-block`

## 1. Observation

### 1.1 Existing Custom Block Architecture in the Theme
- **Block Registration (`add-blocks.php:8-14`)**:
  ```php
  function relish_register_native_blocks() {
      // register_block_type( get_template_directory() . '/blocks/blank_block/block.json' );
      register_block_type( get_template_directory() . '/blocks/banner_block/block.json' );
      register_block_type( get_template_directory() . '/blocks/hero_block/block.json' );
      register_block_type( get_template_directory() . '/blocks/operator-search-block/block.json' );
  }
  add_action('init', 'relish_register_native_blocks');
  ```
- **Asset Enqueueing (`functions.php:123-167`)**:
  - `enqueue_block_assets` enqueues `/blocks/blocks.js` (with jQuery dependency) and `/blocks/blocks.css`.
  - `enqueue_block_editor_assets` enqueues `/blocks/blocks.js` (with `wp-blocks`, `wp-element`) and `/blocks/blocks.css`.
  - Individual native blocks registered with `block.json` specify `"editorScript": "file:./index.js"` and `"render": "file:./[block_name].php"`.
- **Build Pipeline (`webpack.config.js:19-25`)**:
  ```javascript
  const blocksDir = path.resolve( __dirname, 'blocks' );
  fs.readdirSync( blocksDir ).forEach( function( name ) {
      var editFile = path.join( blocksDir, name, 'edit.js' );
      if ( fs.existsSync( editFile ) ) {
          entry[ 'blocks/' + name + '/index' ] = editFile;
      }
  } );
  ```
  Running `npm run build:js` (which triggers `@wordpress/scripts build`) automatically discovers every `blocks/{name}/edit.js` and outputs compiled bundle to `blocks/{name}/index.js`.
- **CSS / LESS Pipeline (`assets/gulpfile.js:8-34`)**:
  ```javascript
  const paths = {
    less:       [ './less/**/*.less', '!./less/blocks/**/*.less' ],
    blocksLess: './less/blocks/*.less',
    blocksWatch: './less/blocks/**/*.less',
    css:        './css/',
    blocksCss:  '../blocks/',
  };
  export const compileBlocksLess = () =>
    gulp.src( paths.blocksLess )
      .pipe( sourcemaps.init() )
      .pipe( less() )
      .pipe( autoprefixer({ overrideBrowserslist: [ 'last 2 versions' ], cascade: false }) )
      .pipe( concat( 'blocks.css' ) )
      .pipe( cleanCSS() )
      .pipe( sourcemaps.write( '.' ) )
      .pipe( gulp.dest( paths.blocksCss ) );
  ```
  Running `npm run build:css` automatically gathers all `assets/less/blocks/*.less` files, compiles LESS, applies autoprefixer, and outputs concatenated `blocks/blocks.css`.
- **Design Tokens (`assets/less/global/_variables.less:14-41`, `tools/config.js:41-88`)**:
  - `@color-orange: #da5225;` (Primary accent)
  - `@color-gold: #E0AC0F;` (Selected states, highlights, play button base)
  - `@color-gold-dark: #dca12b;` (Accent lines, decorative borders)
  - `@color-dark: #212B36;` (Dark background)
  - `@color-body-text: #404040;`
  - `@radius-md: 8px;`, `@radius-lg: 16px;`, `@radius-full: 100%;`
  - `@font-primary: 'Nunito Sans';`, `@font-secondary: 'Ubuntu';`

### 1.2 Authoritative Request Requirements (`ORIGINAL_REQUEST.md:12-18`)
- **Block Identity**: `relish/video-popup-block` registered via `block.json` with zero ACF / Getwid dependencies.
- **Attributes**: Video URL (YouTube, Vimeo, direct video file), cover thumbnail image, caption/title, overlay color/opacity, play button styling.
- **Editor Controls**: `edit.js` with Gutenberg `InspectorControls` sidebar and `MediaUpload`.
- **Server-Side Render**: `video_popup_block.php` emitting responsive thumbnail card + animated pulse play button.
- **Interactive Lightbox Modal**: Fullscreen accessible modal (`<dialog>` or native accessible modal) playing embedded video with autoplay on open.
- **Teardown on Close**: Closing modal via Close '✕' button, clicking backdrop, or pressing `Escape` immediately stops and clears video playback to prevent background audio leakage.
- **Page Replacement**: `/about-itm/` (Building the Brand section) and 15 legacy pages.

---

## 2. Logic Chain

1. **Self-Contained Native Gutenberg Paradigm**:
   - As observed in `blocks/banner_block` and `blocks/hero_block`, the theme uses native `block.json` attributes with PHP server-side rendering (`render: "file:./video_popup_block.php"`) and a React editor component (`edit.js`) where `save()` returns `null`.
   - Creating `blocks/video-popup-block/` (or `blocks/video_popup_block/`) with `block.json`, `edit.js`, and `video_popup_block.php` adheres 100% to existing theme architectural patterns.

2. **Automated Compilation Without Custom Config Modifications**:
   - `webpack.config.js` auto-discovers any `blocks/*/edit.js` entry point and compiles it to `blocks/*/index.js`.
   - `assets/gulpfile.js` auto-discovers any `assets/less/blocks/*.less` and compiles it into `blocks/blocks.css`.
   - Therefore, adding `blocks/video-popup-block/edit.js` and `assets/less/blocks/video_popup_block.less` integrates directly into `npm run build` with zero webpack/gulpfile changes.

3. **Zero-Audio-Leak Video Lifecycle**:
   - If an `<iframe>` or `<video>` is present in the DOM on page load, it incurs unnecessary bandwidth and may trigger audio playback errors.
   - Injecting the `<iframe>` / `<video>` dynamically upon modal opening and completely clearing `embedTarget.innerHTML = ''` and unloading media (`video.pause()`, `video.removeAttribute('src')`) upon closing guarantees zero background audio leaks across YouTube, Vimeo, and direct MP4/WebM files.

4. **WCAG 2.1 AA / WAI-ARIA Accessibility**:
   - HTML5 `<dialog>` natively supports modal dialog semantics, backdrop occlusion, and `Escape` key handling via the `cancel` event.
   - Adding explicit `role="dialog"`, `aria-modal="true"`, `aria-label` / `aria-labelledby`, focus trap on `Tab` / `Shift+Tab`, and returning focus to `activeTrigger` on close ensures full compliance with WCAG 2.1 Success Criteria (2.1.1 Keyboard, 2.1.2 No Keyboard Trap, 2.4.3 Focus Order, 4.1.2 Name, Role, Value).
   - Adding `@media (prefers-reduced-motion: reduce)` disables the continuous pulse wave animation for users with vestibular sensitivity.

---

## 3. Detailed Component Architecture & Specifications

### 3.1 Block Schema (`blocks/video-popup-block/block.json`)
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "relish/video-popup-block",
  "version": "1.0.0",
  "title": "Video Modal Popup",
  "category": "widgets",
  "icon": "format-video",
  "description": "Video cover thumbnail with animated pulse play button that opens a responsive, accessible lightbox modal.",
  "keywords": ["video", "popup", "modal", "lightbox", "youtube", "vimeo", "play"],
  "textdomain": "itm_indigpro",
  "supports": {
    "align": ["wide", "full"],
    "anchor": true,
    "customClassName": true
  },
  "render": "file:./video_popup_block.php",
  "editorScript": "file:./index.js",
  "viewScript": "file:./view.js",
  "attributes": {
    "videoUrl": {
      "type": "string",
      "default": ""
    },
    "posterImage": {
      "type": "object",
      "properties": {
        "id": { "type": "number" },
        "url": { "type": "string" },
        "alt": { "type": "string" }
      }
    },
    "title": {
      "type": "string",
      "default": ""
    },
    "caption": {
      "type": "string",
      "default": ""
    },
    "overlayColor": {
      "type": "string",
      "default": "#000000"
    },
    "overlayOpacity": {
      "type": "number",
      "default": 25
    },
    "playButtonColor": {
      "type": "string",
      "default": "#e0ac0f"
    },
    "playButtonIconColor": {
      "type": "string",
      "default": "#ffffff"
    },
    "playButtonSize": {
      "type": "string",
      "default": "medium"
    },
    "enablePulse": {
      "type": "boolean",
      "default": true
    },
    "aspectRatio": {
      "type": "string",
      "default": "16-9"
    },
    "modalAriaLabel": {
      "type": "string",
      "default": "Video player modal"
    },
    "autoplay": {
      "type": "boolean",
      "default": true
    }
  }
}
```

### 3.2 Server-Side PHP Template (`blocks/video-popup-block/video_popup_block.php`)
- Extracts `$attributes` safely with fallbacks.
- Resolves attachment IDs to URLs via `wp_get_attachment_image_url( $id, 'full' )`.
- Emits wrapper `div.video-popup-block` with aspect ratio class (`ratio-16-9`, `ratio-4-3`, `ratio-1-1`, `ratio-21-9`).
- Emits cover card `div.video-popup-card` with background image style and overlay `div.video-popup-overlay`.
- Emits `<button type="button" class="video-popup-play-btn has-pulse">` with SVG play icon and accessible `aria-label`.
- Emits `<dialog class="video-popup-modal-dialog" aria-modal="true">` with close button `<button class="video-popup-modal-close">` and `<div class="video-popup-embed-target"></div>`.

### 3.3 Editor React Component (`blocks/video-popup-block/edit.js`)
- Imports `@wordpress/blocks` (`registerBlockType`), `@wordpress/block-editor` (`InspectorControls`, `MediaUpload`, `MediaUploadCheck`), `@wordpress/components` (`PanelBody`, `TextControl`, `TextareaControl`, `ColorPicker`, `RangeControl`, `SelectControl`, `ToggleControl`, `Button`), `@wordpress/element` (`Fragment`).
- **Sidebar Panels**:
  1. `Video Settings`: `TextControl` for `videoUrl`, `ToggleControl` for `autoplay`.
  2. `Cover Image`: `MediaUpload` for `posterImage`, `SelectControl` for `aspectRatio`.
  3. `Overlay & Text`: `TextControl` for `title`, `TextareaControl` for `caption`, `ColorPicker` for `overlayColor`, `RangeControl` for `overlayOpacity`.
  4. `Play Button`: `ColorPicker` for `playButtonColor`, `ColorPicker` for `playButtonIconColor`, `SelectControl` for `playButtonSize`, `ToggleControl` for `enablePulse`.
  5. `Accessibility`: `TextControl` for `modalAriaLabel`.
- **Canvas Preview**: Renders card with live styling, cover image, text overlay, and static/pulsing play button icon.
- `save()` returns `null`.

### 3.4 Front-End Interactive Script (`blocks/video-popup-block/view.js` and/or `blocks/blocks.js`)
- Auto-initializes on DOM ready for all `.video-popup-play-btn`.
- Parses Video URLs:
  - **YouTube**: Matches `youtu.be/ID` and `youtube.com/watch?v=ID`, generates iframe with `autoplay=1&enablejsapi=1&rel=0&modestbranding=1`.
  - **Vimeo**: Matches `vimeo.com/ID` and `player.vimeo.com/video/ID`, generates iframe with `autoplay=1&autopause=0`.
  - **Direct MP4/WebM**: Matches `.(mp4|webm|ogg|mov)`, generates `<video controls autoplay playsinline>`.
- Open Modal: Injects iframe/video into `.video-popup-embed-target`, calls `dialog.showModal()`, adds `body.video-modal-open`, focuses close button.
- Close Modal: Clears `embedTarget.innerHTML = ''`, pauses and unloads media, calls `dialog.close()`, removes `body.video-modal-open`, restores focus to triggering play button.
- Event Listeners: Close button click, backdrop click, Escape keydown, `cancel` event, and Tab trap cycling.

### 3.5 Stylesheet (`assets/less/blocks/video_popup_block.less`)
- Emits responsive card styles, aspect ratios, overlays, typography with text-shadow.
- Pulse button animation `@keyframes video-pulse-wave` using expanding pseudo-element rings.
- `@media (prefers-reduced-motion: reduce)` disables pulse animation.
- Modal dialog styles with `::backdrop` blur filter, responsive sizing (`max-width: 1100px`, `90vw`), and top-right close button.

---

## 4. File Modification & Placement Map

| File Path | Action | Description |
|---|---|---|
| `blocks/video-popup-block/block.json` | Create | Gutenberg block metadata, schema, attributes, and file links |
| `blocks/video-popup-block/video_popup_block.php` | Create | Server-side rendering template for trigger card and dialog |
| `blocks/video-popup-block/edit.js` | Create | React editor component with InspectorControls panels |
| `blocks/video-popup-block/view.js` | Create | Front-end interactive controller (modal open/close, video lifecycle, a11y focus trap) |
| `assets/less/blocks/video_popup_block.less` | Create | LESS stylesheet for card, pulse play button, dialog lightbox, and animations |
| `add-blocks.php` | Update | Add `register_block_type( get_template_directory() . '/blocks/video-popup-block/block.json' );` |
| `assets/less/blocks/base.less` | Update | Add `@import 'video_popup_block.less';` |

---

## 5. Caveats

1. **Browser Support for `<dialog>`**:
   - HTML5 `<dialog>` is Baseline Widely Available across all major modern browsers (Chrome 37+, Safari 15.4+, Firefox 98+, Edge 79+). The JavaScript implementation includes a fallback check (`typeof dialog.showModal === 'function'`) and attributes toggling (`open`, `aria-hidden`) to ensure resilience in all execution contexts.
2. **Third-Party Iframe Autoplay Policies**:
   - Modern browsers allow autoplay if the user explicitly interacts with the page (which clicking the play button satisfies) or if muted. Adding `autoplay=1` and `allow="autoplay"` satisfies browser autoplay policies for user-initiated clicks.
3. **Network Mode**:
   - The environment operates in offline sandbox mode; external npm registry calls for ad-hoc tools fail. All compilation and verification must rely on local node dependencies (`@wordpress/scripts`, `gulp`, `playwright`).

---

## 6. Conclusion

The architecture for `relish/video-popup-block` is fully specified, adheres strictly to WordPress Gutenberg native standards, integrates seamlessly into the existing Webpack and Gulp pipelines, and satisfies all accessibility (WCAG 2.1 AA) and video player lifecycle requirements. Implementation can proceed cleanly across the designated files without external plugin dependencies.

---

## 7. Verification Method

To independently verify the implementation when built:

1. **Asset Build Verification**:
   ```sh
   npm run build
   ```
   - Verify `blocks/video-popup-block/index.js` is created by webpack.
   - Verify `blocks/blocks.css` includes `.video-popup-block`, `.video-popup-play-btn`, and `.video-popup-modal-dialog`.
   - Command should exit with code 0.

2. **Automated Health Check**:
   ```sh
   npm run feedback:test
   ```
   - Verify HTTP 200 responses, asset presence, and zero PHP errors/warnings.

3. **Playwright / Browser Verification**:
   - Inspect page with `relish/video-popup-block` inserted (e.g. `/about-itm/`).
   - Trigger click on play button -> verify `<dialog>` opens, video iframe/element is injected with autoplay.
   - Press `Escape` or click close button -> verify `<dialog>` closes, iframe/video is completely removed, audio terminates immediately, and focus returns to play button.
   - Verify keyboard `Tab` navigation is trapped within modal dialog while open.
