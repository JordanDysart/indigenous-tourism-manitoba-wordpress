# Legacy Plugin Page Migration & Block Modernization Plan

**Objective:** Modernize all pages currently utilizing third-party plugins (`kadence/*`, `acf/*`, `getwid/*`) by converting them to standard WordPress Core blocks (`core/cover`, `core/group`, `core/columns`, `core/heading`, `core/embed`) and native theme blocks (`relish/banner-block`, `relish/operator-search-block`).

---

## 1. Inventory of Pages with Legacy Plugin Blocks

| ID | URL Slug | Page Title | Legacy Plugin Blocks Found | Target Core / Theme Native Block Replacement |
|---|---|---|---|---|
| **22** | `/about-itm/` | About Indigenous Tourism Manitoba | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `acf/custom-banner-block`, `getwid/video-popup` | **✅ Migrated:** `core/cover`, `relish/banner-block`, `core/group`, `core/embed` |
| **283** | `/reconciliation/` | Reconciliation | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `acf/custom-banner-block` | `core/cover`, `relish/banner-block`, `core/group`, `core/columns` |
| **433** | `/operators/` | Our Operators | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading` | **✅ Migrated:** `relish/operator-search-block`, `core/query` (Native AJAX filter) |
| **435** | `/our-team/` | Our Team | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `getwid/section`, `getwid/custom-post-type` | `core/group`, `core/columns`, `core/heading`, `core/image` |
| **463** | `/things-to-do/` | Things To Do | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `acf/custom-banner-block`, `getwid/images-stack` | `core/cover`, `relish/banner-block`, `core/gallery` |
| **605** | `/contact-us/` | Contact Us | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `kadence/iconlist`, `kadence/listitem`, `kadence/spacer` | `core/group`, `core/columns`, `core/list`, `core/paragraph` |
| **2367** | `/become-a-member/` | Become a Member | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `kadence/advancedbtn`, `kadence/singlebtn`, `kadence/spacer` | `core/group`, `core/columns`, `core/buttons`, `core/button` |
| **2373** | `/member-benefits/` | Member Benefits | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `kadence/advancedbtn`, `kadence/singlebtn` | `core/cover`, `core/columns`, `core/group`, `core/buttons` |
| **2734** | `/guide-training-program/` | Indigenous Guide Training Program | `kadence/image`, `kadence/advancedheading`, `kadence/rowlayout`, `kadence/column`, `kadence/advancedbtn`, `kadence/singlebtn` | **✅ Migrated:** `core/cover`, `.program-pathway-grid`, `core/buttons` |
| **2534** | `/indigenous-guide-training-program-step-1/` | Guide Training — Step 1 | `kadence/image`, `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `kadence/advancedbtn`, `kadence/singlebtn` | `core/cover`, `core/columns`, `core/buttons` |
| **2537** | `/indigenous-guide-training-program-step-2/` | Guide Training — Step 2 | `kadence/image`, `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `kadence/advancedbtn`, `kadence/singlebtn` | `core/cover`, `core/columns`, `core/buttons` |
| **2542** | `/indigenous-guide-training-program-step-3/` | Guide Training — Step 3 | `kadence/image`, `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading`, `kadence/advancedbtn`, `kadence/singlebtn` | `core/cover`, `core/columns`, `core/buttons` |
| **2572** | `/itm-indigenous-guide-training-program-inquiry-form/` | Guide Training Inquiry Form | `kadence/image` | `core/image` |
| **2676** | `/indigenous-guide-training-program-more-learning-opportunities/` | More Learning Opportunities | `kadence/advancedheading`, `kadence/rowlayout`, `kadence/column` | `core/group`, `core/columns` |
| **1518** | `/new-account-request/` | New Account Request | `kadence/rowlayout`, `kadence/column` | `core/group` |
| **1769** | `/privacy-policy/` | Privacy Policy | `kadence/rowlayout`, `kadence/column`, `kadence/advancedheading` | `core/group`, `core/heading`, `core/paragraph` |

---

## 2. Core Block Replacement Matrix

| Legacy Plugin Block | Replacement WordPress Core / Theme Native Block | Benefits |
|---|---|---|
| `kadence/rowlayout` + `kadence/column` | `core/group` (with constrained layout) or `core/columns` | Semantic HTML, native responsive stacking, zero plugin requirement |
| `kadence/advancedheading` | `core/heading` (`<h1>` – `<h6>`) | Standard HTML typography adhering to theme design system |
| `kadence/advancedbtn` + `singlebtn` | `core/buttons` + `core/button` (or `<a class="btn btn--primary">`) | Native keyboard accessibility, canonical button tokens |
| `acf/custom-banner-block` | `relish/banner-block` (Native Block) | Retains decorative hoop graphic and side photo without ACF Pro |
| `getwid/video-popup` | `core/embed` (YouTube / Vimeo) | Fully responsive 16:9 iframe embed, accessible captions |
| `getwid/images-stack` | `core/gallery` (or masonry CSS) | Native image handling, responsive thumbnails |

---

## 3. Production Rollout Strategy

1. **Local Migration & Review:** Refactor each page locally in WordPress, verify with Playwright visual screenshots across Desktop, Tablet, and Mobile.
2. **Export / Staging Synchronization:** When preparing the production rollout, either:
   - Run a database sync/export of updated `wp_posts` records, OR
   - Copy the clean block markup directly into the production editor after switching themes.
3. **Plugin Deactivation:** Once pages are migrated to core blocks, Kadence Blocks, ACF Pro (if unused elsewhere), and Getwid can be safely deactivated without breaking layouts.
