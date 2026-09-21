# Audit Report: Home — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Broken Assets Found`  

---

## 1. Executive Summary
The homepage presents rich storytelling and engaging editorial copy supporting Indigenous Tourism Manitoba's mission. However, the audit identified critical content defects: hardcoded local development URLs (`*.lndo.site`) referencing image assets that fail to render for public visitors, and a broken navigation link in the main header dropdown ("More Learning Opportunities") leading to a 404 error page.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Broken Images / Dev URLs | "Grow Your Tourism Business" card & icons | **Critical** | Three images have hardcoded local Lando development URLs: `https://indigenous-tourism-manitoba-wordpress.lndo.site/wp-content/uploads/...` (`4-1.png`, `Group-4.png`, `Group-5.png`). These fail to load on production browsers. | Update image URLs in database/block markup to point to production domain `https://indigenoustourismmanitoba.ca/wp-content/uploads/...`. |
| 2 | Broken Navigation Link | Header Navigation &rarr; Programs &rarr; Guide Training | **High** | Submenu link `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404: Not Found** error. | Either restore/create the missing page or update the navigation menu item to point to the active Guide Training Program landing page (`/guide-training-program/`). |
| 3 | Asset Formatting | Conference Callout Block | **Low** | Image markup contains an empty `alt=""` tag on the conference promotional banner graphic (`Web-callout-block-2026-ITM-Conference-1.png`). | Add descriptive alt copy: `alt="4th Annual Indigenous Tourism Manitoba Conference - September 22 & 23, 2026"`. |
| 4 | Editorial Review | Footer Copyright & Info | **Low** | Organization naming and acknowledgments are culturally appropriate and well-aligned with ITM brand standards. | None required; good baseline. |

---

## 3. Checklist Verification

- [x] **Spelling & Grammar:** No notable spelling mistakes or grammar issues detected in main headlines or body paragraphs.
- [x] **Brand Terminology:** Consistent and accurate use of "Indigenous Tourism Manitoba" and community nomenclature.
- [x] **Hero Banner Presence:** Top hero section displays valid photography with good visual alignment.
- [ ] **Image Asset Resolution & URLs:** 3 images fail to load externally due to hardcoded `*.lndo.site` staging URLs.
- [ ] **Link Integrity (404 Check):** 1 broken navigation link discovered in header submenu (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Placeholders:** No leftover "Lorem Ipsum" or raw template strings found in body copy.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Search-and-Replace Staging URLs in DB:** Replace all instances of `https://indigenous-tourism-manitoba-wordpress.lndo.site` with `https://indigenoustourismmanitoba.ca` in WordPress database `wp_posts.post_content` to fix broken images (`4-1.png`, `Group-4.png`, `Group-5.png`).
2. **Fix 404 Submenu Link:** In WordPress Menus (`wp-admin` &rarr; Appearance &rarr; Menus &rarr; Main Navigation), update or remove the dead item linking to `/indigenous-guide-training-program-more-learning-opportunities/`.

### 🟡 Medium Priority / Improvements
1. **Promotional Banner Alt Copy:** Add informative alt text to the 2026 Conference promotional callout block.

### 🟢 Low Priority / Polish & Recommendations
1. **Automated Broken Link Monitoring:** Periodically scan navigation dropdowns to prevent orphaned menu links when pages are renamed or drafted.
