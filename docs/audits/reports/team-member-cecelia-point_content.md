# Audit Report: Cecelia Point Profile — Content

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/cecelia-point/`  
**Audit Concern:** `content`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Content Recommendations (First Name Spelling Discrepancy Identified; Empty Quote Field; Global Menu 404)`  

---

## 1. Executive Summary
The single team member profile for Cecelia Point highlights her vital leadership as Director of Finance at Indigenous Tourism Manitoba, bringing over 25 years of tourism industry experience and deep community advocacy as a member of the Musqueam Indian Band. A key editorial finding is a first name spelling discrepancy: the H1 title and URL slug use **Cecelia** (with an *e*), whereas the body paragraphs and headshot filename consistently use **Cecilia** (with an *i*). Additionally, the custom quote container is unpopulated in the DOM, and a shared global header link returns an HTTP 404 error.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Editorial Consistency | Title vs. Bio Text & Image | **High** | First name spelling mismatch: `<h1 class="entry-title">Cecelia Point</h1>` vs. `<p>As the Director of Finance, Cecilia contributes...</p>` and `Cecilia-Point-headshot-2026-scaled.jpg`. | Verify preferred legal spelling with Cecelia/Cecilia Point and standardize across page title, slug, and bio text. |
| 2 | Role Positioning | Headline / Subheading | **Medium** | Her executive title (*Director of Finance*) is embedded within body copy rather than displayed as a prominent subtitle beneath her name. | Add a designated role badge or subtitle `<p class="team-member-role">Director of Finance</p>` directly below the H1. |
| 3 | Custom Quote Field | `.entry-quote .custom-quote` | **Low** | DOM outputs an empty `<div class="custom-quote"></div>` container. | Populate the quote custom field in WordPress Admin or hide empty container. |
| 4 | Broken Navigation Link | Header Menu &rarr; Programs | **High** | Shared submenu item `<a href="/indigenous-guide-training-program-more-learning-opportunities/">More Learning Opportunities</a>` returns an **HTTP 404 Not Found** error. | Update menu item in WP Admin to point to `/guide-training-program/#additional-learning-opportunities`. |
| 5 | Media Asset Health | Featured Headshot | **Low** | `Cecilia-Point-headshot-2026-scaled.jpg` returns HTTP 200 OK. | Clean image asset resolution. |

---

## 3. Checklist Verification

- [ ] **Spelling & Typographical Accuracy:** First name spelling discrepancy between H1 (*Cecelia*) and body paragraphs (*Cecilia*).
- [ ] **Role Visibility:** Executive title is buried within paragraph copy rather than showcased as a heading subtitle.
- [ ] **Empty Custom Quote Container:** Renders empty `.custom-quote` DOM element.
- [ ] **Navigation Link Integrity (404 Check):** 1 shared global header link returns 404 (`/indigenous-guide-training-program-more-learning-opportunities/`).
- [x] **Media Asset Health:** Portrait photo returns HTTP 200 OK.
- [x] **Social Media Presence:** Global footer links active.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Harmonize First Name Spelling:** Confirm whether *Cecelia* or *Cecilia* is preferred and ensure 100% consistency across H1, body copy, and metadata.
2. **Fix Global Menu 404 Link:** Update WordPress Menus &rarr; Programs &rarr; "More Learning Opportunities" URL to `/guide-training-program/#additional-learning-opportunities`.

### 🟡 Medium Priority / Improvements
1. **Elevate Role Headline:** Add an explicit "Director of Finance" role subtitle beneath the page title.
2. **Populate Custom Quote:** Insert a quote reflecting her financial governance or community advocacy.

### 🟢 Low Priority / Polish & Recommendations
1. **Musqueam Nation Link:** Consider linking Musqueam Indian Band to their official portal (`https://www.musqueam.bc.ca/`) for cultural context.
