# Audit Report: Our Team — Accessibility (WCAG 2.1 AA)

**Page URL:** `https://indigenoustourismmanitoba.ca/our-team/`  
**Audit Concern:** `accessibility`  
**Date Audited:** `2026-08-29`  
**Overall Status:** `Pass with Minor Improvements`  

---

## 1. Executive Summary
The Our Team page demonstrates strong accessibility implementation, particularly in non-text media alternatives: all executive staff and board member headshots feature high-quality, descriptive `alt` text incorporating both the individual's full name and their official organizational role. The primary improvement area is adjusting the top feature cards so `<h1>Our Team</h1>` serves as the opening document header.

---

## 2. Detailed Findings

| # | Category / Section | Element / Location | Severity / Impact | Description of Issue | Proposed Remediation |
|---|---|---|---|---|---|
| 1 | Headings Structure | Top Feature Cards | **High** | Four `<h3>` feature card headings precede the main `<h1>Our Team</h1>` in the DOM tree. | Restructure top card elements to follow the main `<h1>` or use semantic list items. |
| 2 | Team Section Hierarchy | Staff & Board Sections | **Low** | `<h2>Staff & Executive Leadership</h2>` and `<h2>Board of Directors</h2>` with subordinate `<h3>[Name]</h3>` elements follow a clean, logical outline. | Maintain this clean hierarchy across other directory pages. |
| 3 | Media Alt Quality | Headshot Gallery | **Low** | Headshot alt tags consistently follow the pattern `"[Name] - [Title]"`. | Exemplary alt tag practice. |
| 4 | Avatar Placeholder | Melanie Ferris profile card | **Low** | Uses generic brand graphic (`ITM_4CP_DANCER-298x300.png`) as a placeholder. Alt text describes role accurately. | When available, update image asset to a photographic headshot. |

---

## 3. Checklist Verification

- [x] **Page Language:** `<html lang="en-US">` is declared.
- [x] **Skip to Content:** Skip link to `#content` is present and functional.
- [x] **Semantic Landmarks:** `<header>`, `<nav>`, `<main>`, and `<footer>` are properly configured.
- [ ] **Heading Order:** Inverted heading hierarchy (`<h3>` before `<h1>`) at the top of the template.
- [x] **Headshot Alt Text:** 100% of team member images have descriptive name + title alt attributes.
- [x] **Contrast:** High contrast between text and background surfaces throughout the team grid.

---

## 4. Prioritized Action Plan

### 🔴 High Priority / Immediate Fixes
1. **Unify Opening Heading Hierarchy:** Align the template heading order so `<h1>Our Team</h1>` opens the content hierarchy.

### 🟡 Medium Priority / Improvements
1. **Focus State Consistency:** Ensure team member card links have clear `:focus-visible` outline styling.

### 🟢 Low Priority / Polish & Recommendations
1. **Photograph Update:** Replace the dancer logo avatar for Melanie Ferris with an official team photograph when provided.
