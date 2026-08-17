# Kiwatinook — Indigenous Tourism Manitoba Theme

**Kiwatinook** (Cree for *"North"*) is the bespoke, production-ready WordPress theme developed by **[Midflight](https://midflight.ca/)** for **[Indigenous Tourism Manitoba (ITM)](https://indigenoustourismmanitoba.ca/)**.

---

## 🌲 Overview

Kiwatinook combines modern WordPress Block Editor (Gutenberg) architecture with tailored cultural design tokens, high-performance styling, interactive Leaflet operator mapping, and self-hosted automated updates via GitHub Releases.

### Key Capabilities
- **Native Block System**: Clean Gutenberg blocks (`midflight/*`) eliminating third-party page builder overhead.
- **Interactive Experience Map**: Leaflet.js-powered tourism operator map with custom categories and location markers.
- **Video Modal Lightbox**: Accessible, zero-dependency video popup modal with animated pulse play button and zero audio leakage.
- **Mega Menu Navigation**: Multi-column navigation with hover-intent buffer delay, region/category breakdowns, and visual showcase cards.
- **Breadcrumbs Navigation**: Clean breadcrumb trails for operators, stories, taxonomies, and child pages.
- **Automated Updater**: Integrated with [Plugin Update Checker (PUC)](https://github.com/YahnisElsts/plugin-update-checker) for one-click updates via GitHub Releases.

---

## 🛠️ Development & Build Workflow

The theme uses `@wordpress/scripts` for React block compilation and Gulp for LESS stylesheet compilation.

### Prerequisites
- Node.js 18+ & npm
- WordPress 6.0+ with PHP 8.0+

### Available Commands

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles production JavaScript and CSS bundles |
| `npm run dev` | Watches JS and LESS files concurrently for local development |
| `npm test` | Runs the full 9-tier end-to-end automated test suite |
| `npm run package:release` | Builds production assets and archives `dist/kiwatinook.zip` |
| `npm run styleguide` | Audits design tokens and regenerates the styleguide |

---

## 📦 Theme Structure

```
kiwatinook/
├── assets/                  # Source LESS stylesheets, fonts, and Gulp build config
│   ├── css/styles.css       # Compiled production theme stylesheet
│   └── less/                # LESS partials (global tokens, navigation, templates)
├── blocks/                  # Custom native Gutenberg blocks (midflight/*)
│   ├── banner_block/        # Hero banner with circular cultural badge
│   ├── featured-operators-block/ # Featured operator cards grid
│   ├── hero_block/          # Full-bleed cover hero block
│   ├── operator_block/      # Interactive Leaflet map block
│   ├── operator-search-block/ # Dynamic region and category filter
│   └── video-popup-block/   # Accessible video modal popup
├── dist/                    # Packaged release archives (kiwatinook.zip)
├── inc/                     # Backend functionality & migration routines
│   ├── m2-pages-migration.php # Gutenberg page content definitions & migrations
│   ├── plugin-update-checker/ # Vendored PUC library
│   └── plugin-updates.php   # GitHub Releases automated update checker
├── js/                      # Frontend JavaScript (navigation, animations)
├── template-parts/          # PHP partials for post types and operators
├── functions.php            # Main theme setup, asset enqueuing, and helpers
├── style.css                # Theme header metadata and CSS imports
└── readme.txt               # WordPress theme description and changelog
```

---

## 🚀 Release Process

1. Bump `Version:` in `style.css`, `Stable tag:` in `readme.txt`, and `"version":` in `package.json`.
2. Commit changes and push a Git tag:
   ```bash
   git add style.css readme.txt package.json
   git commit -m "Release v1.1.1"
   git tag v1.1.1
   git push origin main --tags
   ```
3. GitHub Actions builds `dist/kiwatinook.zip` and attaches it to the GitHub Release.
4. Sites running Kiwatinook will detect the update in **Appearance > Themes**.

---

## 📄 License & Credits

- Developed and maintained by **Midflight** for **Indigenous Tourism Manitoba**.
- Licensed under the [GNU General Public License v2 or later](https://www.gnu.org/licenses/gpl-2.0.html).
