# Audit Report: Melanie Gamache Profile — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/team-member/melanie-gamache/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-31`  
**Overall Status:** `Pass with Accessibility Enhancements (Valid H1 Entry Title; Empty Alt Text on Featured Portrait)`  

---

## 1. Executive Summary
The single team member profile for Melanie Gamache (ITM Board Chair & Founder of Borealis Beading) provides a clear biographical layout with an explicit `<h1 class="entry-title">Melanie Gamache</h1>` heading and structured paragraph copy. The primary accessibility opportunity is that the featured portrait image renders with an empty alt attribute (`alt=""`). Adding descriptive alt text (e.g. `alt="Melanie Gamache - Board Chair"`) ensures assistive technology users understand the visual representation.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Non-text Content (Alt Text) | Featured Headshot Image | **Medium** | The featured portrait `<img ... src="...Melanie-Gamache-headshot-2026-scaled.jpg">` outputs `alt=""`. On a dedicated bio page, the portrait is informative rather than purely decorative. | In WordPress Media Library or template, set alt text to `Melanie Gamache - Board Chair` (or `alt="Portrait of Melanie Gamache"`). |
| 2 | Headings Hierarchy | Top Feature Cards | **Low** | Four top feature card headings (`<h3>`) precede the main `<h1 class="entry-title">` in DOM source order. | Consider restructuring DOM or nesting top feature elements after main content. |
| 3 | Page Language & Landmarks | Global Wrapper | **Low** | `<html lang="en-US">`, `<header>`, `<main>`, and `<footer>` landmarks are present. | Semantic compliance met. |
| 4 | Keyboard Navigation | Body & Footer Links | **Low** | Interactive elements and links receive default visible focus rings. | Clean focus flow. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **H1 Heading Presence:** `<h1 class="entry-title">Melanie Gamache</h1>` is present.
- [ ] **Alt Attribute Completeness:** Featured headshot portrait has empty `alt=""`.
- [x] **Color Contrast:** High contrast dark text on light neutral background.
- [x] **Focus Ring Visibility:** Links show default focus rings.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Populate Profile Portrait Alt Text:** Set `alt="Melanie Gamache - Board Chair"` on the featured image attachment in WordPress Media Library.

### 🟡 Medium Priority / Improvements
1. **Bio Meta / Role Labeling:** Include a semantic `<p class="team-member-role">` or `aria-label` identifying Melanie Gamache's role as Board Chair.

### 🟢 Low Priority / Polish & Recommendations
1. **Social / Operator Profile Backlink:** Include an accessible link to Melanie Gamache's business profile (`/operator/borealis-beading/`) with explicit aria-label.
