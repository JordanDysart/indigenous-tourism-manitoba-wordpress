# Task 11 — Accessible Banner Block & Image-Text Migration

**Status:** `[x]` Completed  
**Priority:** High  
**Dependencies:** None  
**Target:** Eliminate inaccessible flat images containing burned-in graphic text across site pages by completing the native Banner Block (`relish/banner-block`) and migrating content to responsive HTML text overlays.

---

## 1. Context & Objectives

Multiple pages across the site (e.g. Guide Training Program steps, Home, About, Member Benefits) currently insert flat PNG/JPG image files that have graphic text baked into the pixels.
- **Accessibility Violation:** Screen readers cannot parse the text inside raster image files (fails WCAG 1.1.1 Non-text Content and WCAG 1.4.3 Contrast).
- **Responsive Degradation:** Text shrinks and becomes unreadable on mobile screens.
- **Editorial Burden:** Site editors cannot update text or translations without re-exporting image graphics.

**Goal:**
1. Complete `relish/banner-block` as a fully native block with complete block editor controls (InspectorControls sidebar).
2. Migrate identified text-in-image instances to native banner blocks rendering real HTML headings, body copy, and button CTAs over background images.
3. Provide a clear editorial guideline document.

---

## 2. Technical Specification & File Map

### A. Modified File: `blocks/banner_block/block.json`
- Define full attributes:
  ```json
  {
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "relish/banner-block",
    "version": "1.0.0",
    "title": "Hero / Banner Section",
    "category": "theme",
    "icon": "cover-image",
    "description": "Accessible full-width hero banner with text overlay and button CTA.",
    "attributes": {
      "bgImageId": { "type": "number" },
      "bgImageUrl": { "type": "string", "default": "" },
      "overlayColor": { "type": "string", "default": "#000000" },
      "overlayOpacity": { "type": "number", "default": 40 },
      "eyebrow": { "type": "string", "default": "" },
      "title": { "type": "string", "default": "" },
      "description": { "type": "string", "default": "" },
      "buttonText": { "type": "string", "default": "" },
      "buttonUrl": { "type": "string", "default": "" },
      "buttonStyle": { "type": "string", "default": "btn--primary" },
      "textAlignment": { "type": "string", "default": "center" },
      "bannerHeight": { "type": "string", "default": "medium" }
    },
    "render": "file:./banner_block.php",
    "editorScript": "file:./index.js",
    "style": "relish-blocks-css"
  }
  ```

### B. Modified File: `blocks/banner_block/edit.js`
- Build rich sidebar controls using `@wordpress/block-editor` and `@wordpress/components`:
  - `MediaUploadCheck` & `MediaUpload` for background image selection.
  - `RangeControl` for overlay opacity (0% to 100%).
  - `ColorPalette` or `ColorPicker` for overlay color.
  - `RichText` fields for in-situ title and description editing.
  - Button text, URL, and style selector (`.btn--primary`, `.btn--dark`, `.btn--gold`, `.btn--outline`).

### C. Modified File: `blocks/banner_block/banner_block.php`
- Remove all ACF guards.
- Read attributes directly from `$attributes`:
  ```php
  <?php
  $bg_url = !empty($attributes['bgImageUrl']) ? $attributes['bgImageUrl'] : '';
  $title = !empty($attributes['title']) ? $attributes['title'] : '';
  $description = !empty($attributes['description']) ? $attributes['description'] : '';
  $btn_text = !empty($attributes['buttonText']) ? $attributes['buttonText'] : '';
  $btn_url = !empty($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '';
  $btn_style = !empty($attributes['buttonStyle']) ? $attributes['buttonStyle'] : 'btn--primary';
  $align = !empty($attributes['textAlignment']) ? $attributes['textAlignment'] : 'center';
  $opacity = isset($attributes['overlayOpacity']) ? intval($attributes['overlayOpacity']) / 100 : 0.4;
  ?>
  <section class="relish-banner-block align-<?php echo esc_attr($align); ?>" style="background-image: url('<?php echo esc_url($bg_url); ?>');">
      <div class="banner-overlay" style="background-color: <?php echo esc_attr($attributes['overlayColor'] ?? '#000'); ?>; opacity: <?php echo esc_attr($opacity); ?>;"></div>
      <div class="banner-container">
          <?php if (!empty($attributes['eyebrow'])): ?>
              <span class="banner-eyebrow"><?php echo esc_html($attributes['eyebrow']); ?></span>
          <?php endif; ?>
          <?php if ($title): ?>
              <h2 class="banner-title"><?php echo esc_html($title); ?></h2>
          <?php endif; ?>
          <?php if ($description): ?>
              <p class="banner-description"><?php echo esc_html($description); ?></p>
          <?php endif; ?>
          <?php if ($btn_text && $btn_url): ?>
              <a href="<?php echo esc_url($btn_url); ?>" class="btn <?php echo esc_attr($btn_style); ?>"><?php echo esc_html($btn_text); ?></a>
          <?php endif; ?>
      </div>
  </section>
  ```

### D. Content Migration Audit
- Run `npm run audit:styles` to inspect flagged inaccessible images.
- For each flagged page (e.g. `/guide-training-program/`, `/about-itm/`), replace the flat raster image block with `relish/banner-block`.

---

## 3. Acceptance Criteria & QA Checklist

- [ ] `relish/banner-block` can be inserted via Gutenberg Inserter on any page.
- [ ] Editor sidebar provides background image upload, overlay opacity slider, and button controls.
- [ ] Text renders as real, semantic HTML (`<h2>`, `<p>`) on the front-end over the background image.
- [ ] Responsive testing across mobile (375px) shows text wrapping cleanly and remaining completely legible.
- [ ] Screen readers announce heading and paragraph content accurately.
- [ ] `npm run audit:styles` inaccessible image flags are resolved.
