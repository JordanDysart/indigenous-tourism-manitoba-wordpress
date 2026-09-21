# Accessibility Audit Guide (WCAG 2.1 AA)

This guide provides technical benchmarks and testing procedures for accessibility audits on the Indigenous Tourism Manitoba website.

---

## 1. Core Principles & WCAG 2.1 AA Criteria

### 1.1 Text Alternatives (WCAG 1.1.1)
- **Informative Images:** Must have concise, descriptive `alt` text describing the image's content or function (e.g., `alt="Traditional birch bark canoe on the Winnipeg River"`).
- **Decorative Images:** Background patterns, purely visual dividers, and decorative icons must have `alt=""` or `aria-hidden="true"`.
- **Complex Graphics / Maps:** Interactive maps or infographics must provide equivalent text alternatives or a summary table nearby.
- **Images of Text:** Avoid rasterized text inside images. If unavoidable, the `alt` text must contain the exact text shown.

### 1.2 Info & Relationships / Headings (WCAG 1.3.1)
- **Single Page H1:** Each page must have exactly one `<h1>` that describes the primary topic of the page.
- **Hierarchical Nesting:** Headings must be ordered logically (`<h1>` &rarr; `<h2>` &rarr; `<h3>`). Do not skip levels for visual sizing (use CSS classes for sizing instead of skipping heading tags).
- **Landmark Regions:** Use `<header role="banner">`, `<nav role="navigation">`, `<main role="main">`, `<footer role="contentinfo">`, and `<aside role="complementary">`.
- **List Structures:** Ensure lists of items (operators, navigation links, benefits) are wrapped in semantic `<ul>`, `<ol>`, and `<li>` elements.

### 1.3 Contrast Minimums (WCAG 1.4.3 & 1.4.11)
- **Regular Text (< 18pt / 24px regular, < 14pt / 18.5px bold):** Minimum contrast ratio of **4.5:1** against the background.
- **Large Text (&ge; 18pt / 24px regular, &ge; 14pt / 18.5px bold):** Minimum contrast ratio of **3.0:1**.
- **Hero & Card Image Overlays:** Any text placed over photos must have a backing scrim or CSS gradient overlay to maintain minimum contrast across varying screen brightness levels.
- **Interactive UI Components:** Button boundaries, form field borders, and status icons must have at least **3.0:1** contrast against adjacent backgrounds.

### 1.4 Keyboard Navigation & Focus (WCAG 2.1.1 & 2.4.7)
- **Full Keyboard Operability:** Users must be able to navigate to and activate all interactive controls using `Tab`, `Shift+Tab`, `Enter`, `Space`, and Arrow keys.
- **No Keyboard Traps (WCAG 2.1.2):** Modal dialogues, popups, and dropdown menus must allow the user to tab out or dismiss via `Escape`.
- **Focus Visibility (WCAG 2.4.7):** Active elements must display an obvious visual focus ring or border change when focused.
- **Skip Links (WCAG 2.4.1):** A "Skip to content" link must appear as the first focusable element on the page and jump focus to `<main id="content">`.

### 1.5 Forms, Labels & Errors (WCAG 3.3.2 & 4.1.2)
- **Explicit Labels:** Every input field (`<input>`, `<select>`, `<textarea>`) must have an associated `<label for="[field_id]">`.
- **Required Fields:** Mark required inputs clearly with text `(required)` or `aria-required="true"`.
- **Error Identification & Association:** Form error messages must be clearly described in text and programmatically linked using `aria-describedby` or `aria-errormessage`.

---

## 2. Step-by-Step Testing Procedure

1. **DOM Structure Inspection:**
   - Fetch the page HTML and extract all `<h1-h6>` elements to check nesting hierarchy.
   - Inspect all `<img>` tags for presence and quality of `alt` attributes.
   - Inspect all `<form>` controls for `<label>` pairings.
2. **Interactive & Focus Testing:**
   - Inspect CSS stylesheets for `outline: none` or missing `:focus` styles.
   - Verify modal windows and navigation dropdowns handle keyboard focus.
3. **Contrast Analysis:**
   - Review text colors on dark brand backgrounds (e.g. brand blues/greens/reds) and image hero overlays.
4. **Log Issues & Remediations:**
   - Document specific selectors and exact HTML fixes in the audit report.
