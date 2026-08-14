# ITM Theme — Project Architecture & Context

## 1. Project Overview

This repository contains the custom WordPress theme **\`kiwatinook\`** (internal text domain: \`itm_indigpro\`) developed for **Indigenous Tourism Manitoba (ITM)**.
The site serves as the digital hub for authentic Indigenous tourism, storytelling, and operator directories across Manitoba's First Nations, Inuit, and Métis territories.

The goal of current development is to stabilize the theme, eliminate orphaned commercial plugin dependencies (such as ACF Pro licenses, page builder plugins, and unmaintained shortcodes), establish a canonical design system, and implement automated visual/style feedback loops.

---

## 2. Local Environment & Infrastructure

- **Containerization**: Lando (Docker-based)
- **Local Domain**: \`https://indigenous-tourism-manitoba-wordpress.lndo.site\`
- **Fallback HTTP Port**: \`http://localhost:60618\`
- **Database**: MariaDB 10.6 on port \`3308\` (\`database: wordpress\`, \`user: wordpress\`, \`password: wordpress\`)
- **PHP Version**: 8.2 (Apache web server)
- **WordPress Root**: \`/app/wordpress\` (inside container) -> mapped from workspace root

### Essential Lando Commands
```bash
# Start the local environment
lando start

# View container status and endpoints
lando info

# Run WP CLI commands
lando wp plugin list
lando wp post list --post_type=operator
lando wp db export backup.sql

# SSH into the container
lando ssh
```

---

## 3. Theme Architecture & File Structure

```
kiwatinook/
├── assets/                  # CSS/LESS & Fonts Pipeline
│   ├── css/styles.css       # Compiled production CSS
│   ├── fonts/               # Self-hosted Nunito Sans & Ubuntu font files
│   ├── less/                # Modular LESS source files
│   │   ├── global/          # Variables, mixins, typography, buttons, links
│   │   ├── navigation/      # Desktop, mobile drawer, and footer menus
│   │   ├── blocks/          # Styles for custom Gutenberg blocks
│   │   └── template-parts/  # Single operator & post styling
│   ├── gulpfile.js          # Gulp task runner for LESS compilation & minification
│   └── package.json         # Assets build dependencies (Gulp 5, Less, CleanCSS)
├── blocks/                  # Custom Gutenberg Blocks
│   ├── banner_block/        # Full-width hero banner block (block.json, edit.js, PHP)
│   ├── hero_block/          # Alternative hero pattern
│   ├── operator_block/      # Interactive Leaflet map & operator cards
│   └── operator-search-block/ # Category & region AJAX filter
├── docs/                    # Architecture, tasks, style guides, and screenshots
│   ├── PROJECT_CONTEXT.md   # This architecture & system context document
│   ├── TESTING_FEEDBACK_LOOPS.md # Testing and visual feedback SOP
│   ├── STYLE_GUIDE.md       # Full design system & token specification
│   ├── screenshots/         # Captured multi-breakpoint screenshots
│   └── styleguide/          # Interactive HTML Style Guide & audit data JSON
├── inc/                     # Theme modular PHP includes
│   ├── class-header-menu-walker.php # Mega-menu nav walker
│   ├── class-footer-menu-walker.php # Simplified footer nav walker
│   ├── custom-header.php    # WP custom header support
│   ├── customizer.php       # Theme Customizer settings
│   ├── plugin-updates.php   # GitHub Releases theme update checker
│   ├── template-functions.php # Filters and template hooks
│   └── template-tags.php    # Post meta and template tags
├── js/                      # Theme JavaScript files
│   ├── animated-menu.js     # Mobile menu trigger
│   ├── navigation.js        # Keyboard accessibility & dropdown toggles
│   └── theme.js             # General theme scripts & AJAX hooks
├── tools/                   # Automated Agentic Tooling (Playwright)
│   ├── config.js            # Shared server URLs, breakpoints, canonical tokens
│   ├── capture-screenshots.js # Multi-breakpoint & component screenshot runner
│   ├── audit-styles.js      # DOM style extractor & degradation auditor
│   ├── generate-styleguide.js # Interactive HTML & Markdown styleguide builder
│   └── feedback-loop.js     # Health check & regression validator
├── functions.php            # Theme setup, CPT registration, AJAX endpoints
├── header.php               # Site header & navigation container
├── footer.php               # Site footer & copyright
├── index.php / single.php   # Standard WP template files
├── package.json             # Root NPM scripts for dev/build/testing
└── webpack.config.js        # @wordpress/scripts Webpack build config
```

---

## 4. Custom Post Types & Taxonomies

The theme natively registers the **Operator** custom post type and taxonomies in \`functions.php\`. No external plugin is required.

### Post Type: \`operator\`
- **Singular/Plural**: Operator / Operators
- **Slug**: \`/operator/slug/\`
- **Supports**: \`title\`, \`editor\` (post content), \`thumbnail\` (featured image)
- **Key Post Meta**:
  - \`operator_feature_image\`: Attachment ID
  - \`operator_gallery\`: Array of Attachment IDs
  - \`operator_address\`, \`operator_phone\`, \`operator_email\`, \`operator_website\`
  - \`operator_lat\`, \`operator_long\` (for Leaflet map coordinates)

### Taxonomies
1. **\`operator_category\`** (Hierarchical):
   - Categories: Accommodation, Attractions, Culinary, Events, Outdoors & Adventures, Retail, Tours, Workshops/Culture.
2. **\`operator_region\`** (Hierarchical):
   - Regions: Central, East, North, South, West.

---

## 5. Development & Feedback Workflow

```bash
# 1. Start development watcher (JS blocks + LESS CSS)
npm run dev

# 2. Compile production assets
npm run build

# 3. Run automated feedback loop and health check
npm run feedback:test

# 4. Audit live DOM styles and detect degradation
npm run audit:styles

# 5. Capture multi-breakpoint screenshots
npm run screenshot

# 6. Build interactive HTML Style Guide
npm run build:styleguide
```
