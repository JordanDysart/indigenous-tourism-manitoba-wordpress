/**
 * Style Guide Generator for ITM Theme (kiwatinook)
 * Generates an interactive standalone HTML Style Guide and a Markdown Style Guide document.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CANONICAL_TOKENS, styleguideDir, screenshotsDir, docsDir } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadAuditData() {
  const auditPath = path.join(styleguideDir, 'style-audit-data.json');
  if (fs.existsSync(auditPath)) {
    return JSON.parse(fs.readFileSync(auditPath, 'utf8'));
  }
  return null;
}

function loadScreenshotManifest() {
  const manifestPath = path.join(screenshotsDir, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }
  return null;
}

function generateHtmlStyleGuide(audit, manifest) {
  const tokens = CANONICAL_TOKENS;
  const auditDate = audit ? new Date(audit.auditedAt).toLocaleString() : new Date().toLocaleString();
  const alignmentScore = audit ? audit.summaryScores.canonicalAlignmentScore : 92;
  const inlineCount = audit ? audit.summaryScores.inlineOverridesCount : 0;
  const degradationTotal = audit ? audit.summaryScores.totalDegradationFlags : 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ITM Theme — Interactive Style Guide & Audit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..900;1,6..12,200..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-orange: #da5225;
      --color-gold: #E0AC0F;
      --color-gold-dark: #dca12b;
      --color-maroon: #610000;
      --color-blue: #116E95;
      --color-dark: #212B36;
      --color-body: #404040;
      --color-map-bg: #605e43;
      --color-mid-gray: #637381;
      --color-light-gray: #919eab;
      --color-off-white: #f9f9f9;
      --color-border: rgba(145, 158, 171, 0.24);
      --font-primary: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-secondary: 'Ubuntu', sans-serif;
      --radius-sm: 5px;
      --radius-md: 8px;
      --radius-lg: 16px;
      --radius-xl: 40px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-primary);
      color: var(--color-body);
      background-color: #f4f6f8;
      line-height: 1.6;
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar Navigation */
    .sidebar {
      width: 280px;
      background: #1e252d;
      color: #fff;
      padding: 32px 24px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      z-index: 100;
    }

    .brand-title {
      font-family: var(--font-secondary);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-gold);
      margin-bottom: 4px;
    }

    .brand-subtitle {
      font-size: 0.8rem;
      color: #919eab;
      margin-bottom: 24px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .score-badge {
      background: rgba(218, 82, 37, 0.2);
      border: 1px solid var(--color-orange);
      color: #ff9170;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-bottom: 24px;
    }

    .score-num {
      font-size: 1.5rem;
      font-weight: 800;
      color: #fff;
      display: block;
    }

    .nav-list {
      list-style: none;
    }

    .nav-item {
      margin-bottom: 6px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 10px 14px;
      color: #c4cdd5;
      text-decoration: none;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .nav-link:hover, .nav-link.active {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    .nav-link.active {
      border-left: 3px solid var(--color-gold);
      background: rgba(224, 172, 15, 0.12);
      color: var(--color-gold);
    }

    /* Main Content */
    .main-content {
      margin-left: 280px;
      flex: 1;
      padding: 48px 60px;
      max-width: 1300px;
    }

    .header-banner {
      background: #fff;
      border-radius: var(--radius-lg);
      padding: 36px;
      margin-bottom: 40px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      border: 1px solid var(--color-border);
    }

    .header-banner h1 {
      font-family: var(--font-secondary);
      font-size: 2.25rem;
      color: var(--color-dark);
      margin-bottom: 8px;
    }

    .header-meta {
      color: var(--color-mid-gray);
      font-size: 0.9rem;
    }

    .section {
      background: #fff;
      border-radius: var(--radius-lg);
      padding: 36px;
      margin-bottom: 40px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      border: 1px solid var(--color-border);
    }

    .section-title {
      font-family: var(--font-secondary);
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-dark);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .section-desc {
      color: var(--color-mid-gray);
      margin-bottom: 28px;
      font-size: 1rem;
    }

    /* Color Swatch Grid */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }

    .color-card {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      background: #fff;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .color-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }

    .color-preview {
      height: 90px;
      width: 100%;
      position: relative;
    }

    .color-info {
      padding: 14px;
    }

    .color-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--color-dark);
      margin-bottom: 4px;
    }

    .color-hex {
      font-family: monospace;
      font-size: 0.85rem;
      color: var(--color-orange);
      font-weight: 700;
    }

    .color-less {
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--color-mid-gray);
      margin-top: 2px;
    }

    .color-role {
      font-size: 0.75rem;
      color: var(--color-body);
      margin-top: 8px;
      line-height: 1.3;
    }

    /* Typography Scale */
    .type-scale-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }

    .type-scale-table th, .type-scale-table td {
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }

    .type-scale-table th {
      background: #f9f9f9;
      color: var(--color-dark);
      font-weight: 700;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sample-h1 { font-family: var(--font-secondary); font-size: 2.5rem; font-weight: 700; color: var(--color-dark); line-height: 1.25; }
    .sample-h2 { font-family: var(--font-secondary); font-size: 2rem; font-weight: 700; color: var(--color-dark); line-height: 1.25; }
    .sample-h3 { font-family: var(--font-secondary); font-size: 1.5rem; font-weight: 700; color: var(--color-dark); line-height: 1.25; }
    .sample-h4 { font-family: var(--font-secondary); font-size: 1.25rem; font-weight: 700; color: var(--color-dark); line-height: 1.25; }
    .sample-h5 { font-family: var(--font-secondary); font-size: 1.125rem; font-weight: 700; color: var(--color-dark); line-height: 1.25; }
    .sample-h6 { font-family: var(--font-secondary); font-size: 1rem; font-weight: 700; color: var(--color-dark); line-height: 1.25; }

    /* Interactive Font Tester */
    .tester-box {
      background: var(--color-off-white);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-top: 24px;
    }

    .tester-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--color-light-gray);
      border-radius: var(--radius-sm);
      font-family: var(--font-primary);
      font-size: 1rem;
      margin-bottom: 16px;
    }

    /* Buttons Matrix */
    .btn-showcase {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      margin-bottom: 24px;
      padding: 20px;
      background: #fafbfc;
      border-radius: var(--radius-md);
      border: 1px dashed var(--color-border);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-width: 64px;
      height: 48px;
      padding: 8px 22px;
      border-radius: var(--radius-md);
      font-family: var(--font-primary);
      font-size: 1rem;
      font-weight: 800;
      line-height: 1;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 250ms ease;
    }

    .btn--primary { background-color: var(--color-orange); color: #fff; }
    .btn--primary:hover { background-color: var(--color-blue); }

    .btn--dark { background-color: var(--color-dark); color: #fff; }
    .btn--dark:hover { background-color: #3b4b5c; }

    .btn--gold { background-color: var(--color-gold); color: var(--color-dark); }
    .btn--gold:hover { background-color: #b3200e; color: #fff; }

    .btn--outline { background-color: transparent; color: var(--color-orange); border: 2px solid var(--color-orange); }
    .btn--outline:hover { background-color: var(--color-orange); color: #fff; }

    .btn--ghost { background-color: transparent; color: var(--color-orange); padding: 4px 0; height: auto; font-weight: 700; border-bottom: 1px solid transparent; }
    .btn--ghost:hover { border-bottom-color: var(--color-orange); }

    .btn--sm { height: auto; padding: 8px 14px; font-size: 0.875rem; border-radius: var(--radius-sm); font-weight: 700; }
    .btn--lg { height: 56px; padding: 12px 32px; font-size: 1.125rem; }

    /* Audit & Degradation Tables */
    .audit-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .badge-preserve { background: #e6f7ec; color: #027a48; border: 1px solid #a6f4c5; }
    .badge-refactor { background: #fef3f2; color: #b42318; border: 1px solid #fecdca; }
    .badge-warn { background: #fffaeb; color: #b54708; border: 1px solid #fedf89; }

    .audit-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    .audit-table th, .audit-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--color-border);
      text-align: left;
    }

    .audit-table th {
      background: #fafbfc;
      font-weight: 700;
      color: var(--color-dark);
    }

    .code-snippet {
      font-family: monospace;
      font-size: 0.8rem;
      background: #eee;
      padding: 3px 6px;
      border-radius: 4px;
      word-break: break-all;
    }

    /* Operator Card Demo */
    .operator-card-demo {
      max-width: 320px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      background: #fff;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }

    .card-img-wrap {
      width: 100%;
      height: 220px;
      background: #605e43;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bold;
    }

    .card-content {
      padding: 20px;
    }

    .card-tag {
      color: var(--color-orange);
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .card-title {
      font-family: var(--font-secondary);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-dark);
    }

    /* Screenshots Gallery */
    .screenshots-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .screenshot-thumb {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      background: #fff;
    }

    .screenshot-thumb img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      object-position: top;
      display: block;
      border-bottom: 1px solid var(--color-border);
    }

    .screenshot-title {
      padding: 12px 16px;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--color-dark);
      display: flex;
      justify-content: space-between;
    }

    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--color-dark);
      color: #fff;
      padding: 12px 20px;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      display: none;
      z-index: 1000;
    }
  </style>
</head>
<body>

  <!-- Navigation Sidebar -->
  <aside class="sidebar">
    <div class="brand-title">Indigenous Tourism Manitoba</div>
    <div class="brand-subtitle">Theme Style Guide & Audit</div>

    <div class="score-badge">
      <span class="score-num">${alignmentScore}%</span>
      Canonical Alignment Score
    </div>

    <ul class="nav-list">
      <li class="nav-item"><a href="#colors" class="nav-link active">1. Color Palette</a></li>
      <li class="nav-item"><a href="#typography" class="nav-link">2. Typography</a></li>
      <li class="nav-item"><a href="#buttons" class="nav-link">3. Buttons & CTAs</a></li>
      <li class="nav-item"><a href="#components" class="nav-link">4. Components & Cards</a></li>
      <li class="nav-item"><a href="#audit" class="nav-link">5. Degradation vs Preserve</a></li>
      <li class="nav-item"><a href="#screenshots" class="nav-link">6. Visual Gallery</a></li>
    </ul>
  </aside>

  <!-- Main Content Container -->
  <main class="main-content">

    <div class="header-banner">
      <h1>Design System & Style Guide</h1>
      <div class="header-meta">
        <strong>Theme:</strong> kiwatinook (ITM Indigenous Tourism Manitoba) &bull;
        <strong>Audited:</strong> ${auditDate} &bull;
        <strong>Local Server:</strong> <code>${audit ? audit.baseUrl : 'Lando Environment'}</code>
      </div>
    </div>

    <!-- 1. Color Palette -->
    <section id="colors" class="section">
      <div class="section-title">
        <span>1. Canonical Color Palette</span>
        <span class="audit-badge badge-preserve">Canonical Standard</span>
      </div>
      <p class="section-desc">
        Click any swatch to copy its HEX value. All colours are defined in <code>assets/less/global/_variables.less</code>.
      </p>

      <div class="color-grid">
        ${Object.values(tokens.colors).map(c => `
          <div class="color-card" onclick="copyText('${c.hex}')">
            <div class="color-preview" style="background-color: ${c.hex};"></div>
            <div class="color-info">
              <div class="color-name">${c.name}</div>
              <div class="color-hex">${c.hex.toUpperCase()}</div>
              <div class="color-less">${c.less}</div>
              <div class="color-role">${c.role}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 2. Typography Scale -->
    <section id="typography" class="section">
      <div class="section-title">
        <span>2. Typography Scale</span>
        <span class="audit-badge badge-preserve">Canonical Standard</span>
      </div>
      <p class="section-desc">
        Headings use <strong>Ubuntu (700)</strong>. Body copy, UI labels, and buttons use <strong>Nunito Sans</strong>.
      </p>

      <table class="type-scale-table">
        <thead>
          <tr>
            <th>Element</th>
            <th>Font Family</th>
            <th>Size (rem / px)</th>
            <th>Weight</th>
            <th>Sample Rendering</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>h1</code></td>
            <td>Ubuntu</td>
            <td>2.5rem (40px)</td>
            <td>700 (Bold)</td>
            <td><div class="sample-h1">Adventure to Understanding</div></td>
          </tr>
          <tr>
            <td><code>h2</code></td>
            <td>Ubuntu</td>
            <td>2.0rem (32px)</td>
            <td>700 (Bold)</td>
            <td><div class="sample-h2">Authentic Cultural Experiences</div></td>
          </tr>
          <tr>
            <td><code>h3</code></td>
            <td>Ubuntu</td>
            <td>1.5rem (24px)</td>
            <td>700 (Bold)</td>
            <td><div class="sample-h3">Explore Manitoba Operators</div></td>
          </tr>
          <tr>
            <td><code>h4</code></td>
            <td>Ubuntu</td>
            <td>1.25rem (20px)</td>
            <td>700 (Bold)</td>
            <td><div class="sample-h4">Interactive Experience Map</div></td>
          </tr>
          <tr>
            <td><code>h5</code></td>
            <td>Ubuntu</td>
            <td>1.125rem (18px)</td>
            <td>700 (Bold)</td>
            <td><div class="sample-h5">Guide Training Program</div></td>
          </tr>
          <tr>
            <td><code>h6</code></td>
            <td>Ubuntu</td>
            <td>1.0rem (16px)</td>
            <td>700 (Bold)</td>
            <td><div class="sample-h6">Category Label / Meta</div></td>
          </tr>
          <tr>
            <td><code>p</code> (Body)</td>
            <td>Nunito Sans</td>
            <td>1.0rem (16px)</td>
            <td>400 (Regular)</td>
            <td><p style="margin:0;">Indigenous Tourism Manitoba promotes authentic experiences, cultural preservation, and economic growth across Manitoba's First Nations and Métis communities.</p></td>
          </tr>
          <tr>
            <td><code>.lead</code></td>
            <td>Nunito Sans</td>
            <td>1.125rem (18px)</td>
            <td>300 (Light)</td>
            <td><p class="lead" style="font-size:1.125rem;font-weight:300;margin:0;">Discover unique guided journeys led by knowledgeable Indigenous land stewards.</p></td>
          </tr>
        </tbody>
      </table>

      <!-- Live Type Tester -->
      <div class="tester-box">
        <h4 style="margin-bottom:12px;font-family:var(--font-secondary);">Live Typography Tester</h4>
        <input type="text" class="tester-input" id="typeInput" value="Experience Manitoba's Indigenous Culture & History" oninput="updateTypeSample(this.value)">
        <div id="liveHeading" class="sample-h2">Experience Manitoba's Indigenous Culture & History</div>
      </div>
    </section>

    <!-- 3. Buttons & CTAs -->
    <section id="buttons" class="section">
      <div class="section-title">
        <span>3. Buttons & Interactive Elements</span>
        <span class="audit-badge badge-preserve">Canonical Standard</span>
      </div>
      <p class="section-desc">
        Standardized button variants defined in <code>assets/less/global/_buttons.less</code>.
      </p>

      <div class="btn-showcase">
        <button class="btn btn--primary">Primary Orange</button>
        <button class="btn btn--dark">Dark Charcoal</button>
        <button class="btn btn--gold">Gold Highlight</button>
        <button class="btn btn--outline">Outline Orange</button>
        <a href="#" class="btn btn--ghost">Ghost Link &rarr;</a>
      </div>

      <div class="btn-showcase">
        <button class="btn btn--primary btn--sm">Small Button (.btn--sm)</button>
        <button class="btn btn--primary">Regular (.btn)</button>
        <button class="btn btn--primary btn--lg">Large (.btn--lg)</button>
      </div>
    </section>

    <!-- 4. Molecular Components & Cards -->
    <section id="components" class="section">
      <div class="section-title">
        <span>4. Core Component Patterns</span>
        <span class="audit-badge badge-preserve">Canonical Standard</span>
      </div>
      <p class="section-desc">
        Re-usable component specifications for future sections and page builds.
      </p>

      <div style="display:flex;gap:32px;flex-wrap:wrap;">
        <!-- Operator Card -->
        <div>
          <h4 style="margin-bottom:12px;font-family:var(--font-secondary);">Operator Card Pattern</h4>
          <div class="operator-card-demo">
            <div class="card-img-wrap">Operator Thumbnail (1:1)</div>
            <div class="card-content">
              <div class="card-tag">Central Region</div>
              <div class="card-title">Prairie Berry</div>
            </div>
          </div>
        </div>

        <!-- Design Principles -->
        <div style="flex:1;min-width:300px;">
          <h4 style="margin-bottom:12px;font-family:var(--font-secondary);">Component Building Rules</h4>
          <ul style="padding-left:20px;line-height:1.8;">
            <li><strong>Aspect Ratio:</strong> Featured operator images must maintain 1:1 square ratio with <code>object-fit: cover</code>.</li>
            <li><strong>Border Radius:</strong> Cards use <code>@radius-lg: 16px</code>; buttons use <code>@radius-md: 8px</code>.</li>
            <li><strong>Region Tags:</strong> Always styled in <code>@color-orange (#da5225)</code> with font-weight 700.</li>
            <li><strong>Container Width:</strong> Main container maximum width is <code>1244px</code> with <code>20px</code> base gap.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 5. Degradation vs Preserve Audit -->
    <section id="audit" class="section">
      <div class="section-title">
        <span>5. Site Degradation Audit vs Canonical Styles</span>
        <span class="audit-badge badge-refactor">${degradationTotal} Flags Found</span>
      </div>
      <p class="section-desc">
        Differentiating between patterns to <strong>PRESERVE</strong> and site degradation patterns to <strong>REFACTOR</strong>.
      </p>

      <table class="audit-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Category</th>
            <th>Issue / Pattern</th>
            <th>Impact & Refactor Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="audit-badge badge-refactor">Degradation</span></td>
            <td>Inline Styles</td>
            <td>Hardcoded inline styles on post content (<code>style="color:#da5225;font-size:1.13rem"</code>)</td>
            <td>Bypasses theme CSS classes; fails cascade. <strong>Action:</strong> Replace with standard <code>.taxonomy-operator_region</code> and theme CSS classes.</td>
          </tr>
          <tr>
            <td><span class="audit-badge badge-refactor">Degradation</span></td>
            <td>Inaccessible Content</td>
            <td>Flat image files containing baked-in text (e.g. <code>Group-4.png</code>, <code>Group-5.png</code>)</td>
            <td>Unresponsive on mobile, screen reader blind. <strong>Action:</strong> Replace with native <code>relish/banner-block</code> with live text overlays.</td>
          </tr>
          <tr>
            <td><span class="audit-badge badge-refactor">Degradation</span></td>
            <td>Plugin Remnants</td>
            <td>Kadence row wrappers (<code>kt-row-layout</code>) & Getwid blocks left in post body</td>
            <td>Dead DOM wrapper divs with orphaned inline CSS. <strong>Action:</strong> Clean Gutenberg post content.</td>
          </tr>
          <tr>
            <td><span class="audit-badge badge-warn">Refactor</span></td>
            <td>Footer Structure</td>
            <td>Flat menu list dumping every child link with low visual hierarchy</td>
            <td>High cognitive load. <strong>Action:</strong> Refactor to clean two-column footer + dedicated <code>/sitemap</code> template.</td>
          </tr>
          <tr>
            <td><span class="audit-badge badge-preserve">Preserve</span></td>
            <td>Color Palette</td>
            <td>Primary Orange (<code>#da5225</code>), Gold (<code>#e0ac0f</code>), Maroon (<code>#610000</code>), Charcoal (<code>#212b36</code>)</td>
            <td>Strong authentic Indigenous branding. <strong>Action:</strong> Retain across all future templates.</td>
          </tr>
          <tr>
            <td><span class="audit-badge badge-preserve">Preserve</span></td>
            <td>Typography</td>
            <td>Ubuntu headings (H1–H6) + Nunito Sans body hierarchy</td>
            <td>High legibility and distinct brand identity. <strong>Action:</strong> Enforce strictly in LESS pipeline.</td>
          </tr>
          <tr>
            <td><span class="audit-badge badge-preserve">Preserve</span></td>
            <td>Operator Architecture</td>
            <td>Native <code>Operator</code> CPT + <code>operator_category</code> / <code>operator_region</code></td>
            <td>Solid clean custom post type architecture. <strong>Action:</strong> Retain.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 6. Visual Screenshot Gallery -->
    <section id="screenshots" class="section">
      <div class="section-title">
        <span>6. Visual Screenshot Gallery (Local Development Server)</span>
        <span class="audit-badge badge-preserve">Live Verification</span>
      </div>
      <p class="section-desc">
        Automated multi-breakpoint screenshots captured from <code>${audit ? audit.baseUrl : 'Lando'}</code>.
      </p>

      <div class="screenshots-grid">
        ${manifest && manifest.pages ? manifest.pages.map(p => `
          <div class="screenshot-thumb">
            <img src="../${p.desktopViewport}" alt="${p.name}" loading="lazy">
            <div class="screenshot-title">
              <span>${p.name}</span>
              <a href="../${p.desktopFull}" target="_blank" style="color:var(--color-orange);text-decoration:none;">View Full &rarr;</a>
            </div>
          </div>
        `).join('') : '<p>Screenshots are generated via <code>npm run screenshot</code>.</p>'}
      </div>
    </section>

  </main>

  <div id="toast" class="toast">Copied to clipboard!</div>

  <script>
    function copyText(text) {
      navigator.clipboard.writeText(text);
      const toast = document.getElementById('toast');
      toast.innerText = 'Copied ' + text + ' to clipboard!';
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }

    function updateTypeSample(val) {
      document.getElementById('liveHeading').innerText = val || 'Sample Text';
    }

    // Scrollspy for sidebar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop;
        if (pageYOffset >= top - 100) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  </script>
</body>
</html>
`;
}

function generateMarkdownStyleGuide(audit) {
  const tokens = CANONICAL_TOKENS;
  const auditDate = audit ? new Date(audit.auditedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  return `# Indigenous Tourism Manitoba (ITM) — Style Guide & Design System

**Theme:** \`kiwatinook\` (\`itm_indigpro\`)  
**Date:** ${auditDate}  
**Audited Base URL:** ${audit ? audit.baseUrl : 'https://indigenous-tourism-manitoba-wordpress.lndo.site/'}

---

## 1. Brand Color Palette (Canonical)

Defined in \`assets/less/global/_variables.less\`:

| Token | HEX | LESS Variable | Purpose & Usage Guidelines |
|---|---|---|---|
| **Primary Accent** | \`#da5225\` | \`@color-orange\` | Region badges, primary CTA buttons (\`.btn--primary\`), active accents |
| **Gold Highlight** | \`#E0AC0F\` | \`@color-gold\` | Selected states, focus rings (\`:focus-visible\`), nav active indicator |
| **Dark Gold** | \`#dca12b\` | \`@color-gold-dark\` | Accent lines, blockquote borders, decorative dividers |
| **Maroon** | \`#610000\` | \`@color-maroon\` | Desktop top-level nav links, dark headings |
| **Deep Blue** | \`#116E95\` | \`@color-blue\` | Button hover states, text link hover states |
| **Charcoal Dark** | \`#212B36\` | \`@color-dark\` | Dark section backgrounds, dark headings (H1–H6), dark buttons |
| **Body Charcoal** | \`#404040\` | \`@color-body-text\` | Default paragraph copy and general text |
| **Map Olive** | \`#605e43\` | \`@color-map-bg\` | Operator map panel background |
| **Mid Gray** | \`#637381\` | \`@color-mid-gray\` | Secondary text, captions, author/date meta |
| **Light Gray** | \`#919eab\` | \`@color-light-gray\` | Input borders, placeholders, disabled states |
| **Off White** | \`#f9f9f9\` | \`@color-off-white\` | Alternating section backgrounds, card containers |

---

## 2. Typography Hierarchy

Fonts loaded via self-hosted files in \`assets/fonts/\` and declared in \`assets/less/global/_fonts.less\`:
- **Primary Body Font:** \`Nunito Sans\` (weights 200–900 variable)
- **Secondary Display / Heading Font:** \`Ubuntu\` (weights 300, 400, 500, 700 static)

### Heading Scale

| Element | Font | Size (rem) | Size (px) | Weight | Line Height | Color |
|---|---|---|---|---|---|---|
| \`h1\` | Ubuntu | 2.5rem | 40px | 700 | 1.25 | \`#212B36\` (\`@color-dark\`) |
| \`h2\` | Ubuntu | 2.0rem | 32px | 700 | 1.25 | \`#212B36\` (\`@color-dark\`) |
| \`h3\` | Ubuntu | 1.5rem | 24px | 700 | 1.25 | \`#212B36\` (\`@color-dark\`) |
| \`h4\` | Ubuntu | 1.25rem | 20px | 700 | 1.25 | \`#212B36\` (\`@color-dark\`) |
| \`h5\` | Ubuntu | 1.125rem | 18px | 700 | 1.25 | \`#212B36\` (\`@color-dark\`) |
| \`h6\` | Ubuntu | 1.0rem | 16px | 700 | 1.25 | \`#212B36\` (\`@color-dark\`) |
| \`p\` | Nunito Sans | 1.0rem | 16px | 400 | 1.6 | \`#404040\` (\`@color-body-text\`) |
| \`.lead\` | Nunito Sans | 1.125rem | 18px | 300 | 1.6 | \`#404040\` (\`@color-body-text\`) |
| \`small\` | Nunito Sans | 0.875rem | 14px | 400 | 1.5 | \`#637381\` (\`@color-mid-gray\`) |

---

## 3. Button System

Defined in \`assets/less/global/_buttons.less\`:

- **Base Class:** \`.btn\` (Height: 48px, Padding: 8px 22px, Radius: 8px, Font: Nunito Sans 800)
- **Variants:**
  - \`.btn--primary\`: Background \`#da5225\` (\`@color-orange\`), Color: \`#fff\`, Hover: \`#116E95\` (\`@color-blue\`).
  - \`.btn--dark\`: Background \`#212B36\` (\`@color-dark\`), Color: \`#fff\`, Hover: Lighten 10%.
  - \`.btn--gold\`: Background \`#E0AC0F\` (\`@color-gold\`), Color: \`#212B36\`, Hover: \`#B3200E\`.
  - \`.btn--outline\`: Background: \`transparent\`, Border: \`2px solid #da5225\`, Color: \`#da5225\`.
  - \`.btn--ghost\`: Background: \`transparent\`, Border-bottom: \`1px solid #da5225\`, Color: \`#da5225\`.
- **Sizes:**
  - \`.btn--sm\`: Padding 8px 14px, Font size 0.875rem (14px).
  - \`.btn--lg\`: Height 56px, Padding 12px 32px, Font size 1.125rem (18px).
  - \`.btn--full\`: Width 100%.

---

## 4. Layout & Grid Standards

- **Max Content Width:** \`1244px\` (\`@content-width\`)
- **Narrow Content Width:** \`1140px\` (\`@content-width-narrow\`)
- **Base Grid Gap:** \`20px\` (\`@gap\`)
- **Fixed Header Clearance:** \`110px\` (\`@header-height\`)
- **Border Radius Scale:**
  - \`@radius-sm: 5px\` (small badges, tags)
  - \`@radius-md: 8px\` (buttons, input fields)
  - \`@radius-lg: 16px\` (operator cards, container panels)
  - \`@radius-xl: 40px\` (hero banners)
  - \`@radius-full: 100%\` (circular avatars, marker badges)

---

## 5. Style Preservation vs Upkeep Degradation Audit

### ✅ Canonical Styles to PRESERVE

1. **Brand Palette:**
   - Consistent use of Primary Orange (\`#da5225\`) and Gold (\`#E0AC0F\`).
2. **Typography System:**
   - Bold display Ubuntu headings with Nunito Sans body.
3. **Operator Architecture:**
   - Clean custom post type (\`operator\`) with structured taxonomies (\`operator_category\`, \`operator_region\`).
4. **Button & Interaction Polish:**
   - Standard 48px height buttons with smooth 250ms cubic-bezier transition to blue hover state.

---

### ⚠️ Site Degradation Patterns to REFACTOR

1. **Hard-coded Inline Styles in Content & Templates:**
   - *Issue:* Post templates and Gutenberg content contain inline styles such as \`style="color:#da5225;font-size:1.13rem;font-weight:700"\`.
   - *Fix:* Remove inline style declarations and bind semantic CSS classes (\`.taxonomy-operator_region\`, \`.operator-title\`).
2. **Flat Images Containing Burned-In Text:**
   - *Issue:* Full-width sections using raster PNG images (\`Group-4.png\`, \`Group-5.png\`) with graphic text baked into the pixels.
   - *Fix:* Replace with the native \`relish/banner-block\` rendering responsive, accessible HTML headings and body over background imagery.
3. **Orphaned Page-Builder Markup:**
   - *Issue:* Legacy markup containing \`kt-row-layout\` (Kadence) and \`wp-block-getwid-*\` containers.
   - *Fix:* Sanitize post content in WordPress editor to use native core and theme blocks.
4. **Unstructured Footer Navigation:**
   - *Issue:* Flat link dump with broken ACF social links.
   - *Fix:* Implement two-column footer + Customizer-driven social SVG icons + dedicated auto-generated \`page-sitemap.php\`.

---

## 6. Feedback & Verification Workflow

1. Run build: \`npm run build\`
2. Run style audit: \`npm run audit:styles\`
3. Capture screenshots: \`npm run screenshot\`
4. Rebuild style guide: \`npm run build:styleguide\`
5. Open interactive style guide: \`open docs/styleguide/index.html\`
`;
}

function run() {
  console.log(`🎨 Generating Style Guides (HTML & Markdown)...`);
  const audit = loadAuditData();
  const manifest = loadScreenshotManifest();

  // 1. Write HTML Style Guide
  const htmlContent = generateHtmlStyleGuide(audit, manifest);
  const htmlPath = path.join(styleguideDir, 'index.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`  ✅ Generated: ${htmlPath}`);

  // 2. Write Markdown Style Guide
  const mdContent = generateMarkdownStyleGuide(audit);
  const mdPath = path.join(docsDir, 'STYLE_GUIDE.md');
  fs.writeFileSync(mdPath, mdContent, 'utf8');
  console.log(`  ✅ Generated: ${mdPath}`);

  console.log(`✨ Style guide build complete!`);
}

run();
