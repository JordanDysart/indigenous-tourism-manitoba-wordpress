# ITM Theme — Testing & Feedback Loops SOP

This document defines the automated and manual feedback loops established for developing, maintaining, and auditing the **\`kiwatinook\`** WordPress theme.

---

## 1. Quick Feedback Loops (Development Phase)

When actively writing LESS stylesheets, building template parts, or writing Gutenberg block components:

### A. Asset Compilation Loop
```bash
# Watch mode — automatically rebuilds JS blocks and LESS styles on file save
npm run dev
```
- **LESS watcher** triggers Gulp to compile \`assets/less/style.less\` -> \`assets/css/styles.css\` with sourcemaps and autoprefixer.
- **JS watcher** triggers wp-scripts to compile \`blocks/*/edit.js\` -> \`blocks/*/index.js\`.

### B. Health & Server Connectivity Check
```bash
npm run feedback:test
```
Runs a headless browser check against the local Lando server:
1. Verifies production CSS assets are compiled and non-empty.
2. Initializes headless Playwright browser.
3. Visits core routes (\`/\`, \`/about-itm/\`, \`/operators/\`, \`/operator/prairie-berry/\`, \`/experience-map/\`).
4. Checks for HTTP 200 responses, absence of PHP Fatal/Warning notices in HTML, and valid header/footer container elements.

---

## 2. Style Audit & Degradation Detection Loop

To ensure new code respects canonical design tokens and prevents site degradation from lack of upkeep:

```bash
npm run audit:styles
```

### What this automated audit checks:
1. **Computed Typography**: Scans all \`<h1>\`–\`<h6>\` and body elements to verify font-families match **Ubuntu** (headings) and **Nunito Sans** (body). Flags rogue fonts.
2. **Color Inventory**: Scans computed colors and background-colors, matching them against canonical tokens in \`_variables.less\` (\`#da5225\`, \`#E0AC0F\`, \`#610000\`, \`#116E95\`, \`#212B36\`, \`#404040\`, \`#605e43\`, \`#637381\`, \`#919eab\`, \`#f9f9f9\`). Flags unmapped arbitrary hex codes.
3. **Inline Style Overrides**: Flags HTML elements with inline \`style="..."\` declarations that bypass stylesheet classes.
4. **Inaccessible Images**: Identifies \`<img>\` tags missing alt attributes or raster banner images containing burned-in graphic text.
5. **Orphaned Plugin Markups**: Detects abandoned classes from Kadence (\`kt-*\`) and Getwid (\`wp-block-getwid-*\`).

**Output Location**: \`docs/styleguide/style-audit-data.json\`

---

## 3. Visual Regression & Multi-Breakpoint Screenshot Loop

To visually inspect responsive layouts across devices:

```bash
npm run screenshot
```

### Capture Matrix:
- **Desktop**: 1280 × 800 (Viewport + Full Page)
- **Tablet**: 768 × 1024 (Viewport + Full Page)
- **Mobile**: 375 × 812 (Viewport + Full Page + Opened Mobile Drawer)
- **Components**:
  - Header & Desktop Navigation
  - Footer
  - Operator Card Grid & Single Operator Card
  - Operator Filter Bar
  - Mobile Menu Drawer

**Output Location**: \`docs/screenshots/\` (and synced to \`manifest.json\`)

---

## 4. Production Parity & Media Synchronization Loop

To synchronize missing media library uploads from the live production site and run visual diffs:

```bash
# High-speed parallel download of all missing media assets from production
npm run sync:media

# Crawl and capture production viewports & mega menu structures for side-by-side comparison
npm run compare:prod
```

---

## 5. Interactive Style Guide Generation

To generate the browsable client-facing Style Guide and developer documentation:

```bash
npm run build:styleguide
```
Or run audit and styleguide generation together:
```bash
npm run styleguide
```

- **Interactive HTML App**: \`docs/styleguide/index.html\` (can be opened in any browser or served statically).
- **Markdown Documentation**: \`docs/STYLE_GUIDE.md\`.

---

## 5. Verification Checklist Before Committing Changes

- [ ] \`npm run build\` passes with 0 errors.
- [ ] \`npm run feedback:test\` passes with 0 failures.
- [ ] \`npm run audit:styles\` alignment score is maintained or improved.
- [ ] \`npm run screenshot\` confirms responsive layouts on mobile, tablet, and desktop.
- [ ] No new inline \`style="..."\` attributes introduced into PHP templates.
