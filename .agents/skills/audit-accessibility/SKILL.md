# Skill: Accessibility Auditor (WCAG 2.1 AA)

**Trigger:** When assigned to run an **accessibility audit** on an individual page of `https://indigenoustourismmanitoba.ca/`.

**Objective:**
Perform a structured, discoverable accessibility assessment targeting WCAG 2.1 AA compliance. Identify concrete barriers, missing semantic elements, contrast issues, and keyboard navigation obstacles, providing clear remediation steps.

---

## Audit Checklist & Evaluation Criteria

### 1. Image & Non-Text Media Accessibility (WCAG 1.1.1)
- [ ] **Informative Images:** Ensure all informative images have meaningful, descriptive `alt` text explaining their purpose or content.
- [ ] **Decorative Images:** Ensure purely decorative icons, background graphics, and spacers have `alt=""` or `aria-hidden="true"` so screen readers ignore them.
- [ ] **Hero / Banner Images:** Verify background banner images with overlay text don't contain embedded non-accessible text.
- [ ] **Anti-Patterns:** Flag filename placeholders (e.g. `alt="IMG_2024.jpg"`), vague labels (`alt="image"`), or missing `alt` attributes entirely.

### 2. Heading Hierarchy & Document Structure (WCAG 1.3.1, 2.4.6)
- [ ] **Single H1:** Confirm exactly one `<h1>` exists on the page representing the main topic/title.
- [ ] **Heading Order:** Check heading levels follow a logical hierarchy (`<h1>` &rarr; `<h2>` &rarr; `<h3>`) without skipping levels (e.g. `<h2>` jumping to `<h4>`).
- [ ] **Semantic Landmarks:** Verify standard HTML5 landmarks are present (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`).
- [ ] **Pseudo-Headings:** Identify `<div>` or `<p>` elements styled with bold/large fonts acting as visual section titles without semantic heading markup.

### 3. Color Contrast & Readability (WCAG 1.4.3, 1.4.11)
- [ ] **Body Text Contrast:** Minimum contrast ratio of **4.5:1** for regular text (< 18pt / 24px) against its background.
- [ ] **Large Text Contrast:** Minimum contrast ratio of **3.0:1** for large text (&ge; 18pt / 24px or bold &ge; 14pt / 18.5px).
- [ ] **Text Over Images:** Verify dark gradient/scrim overlays exist under text placed on top of hero banners or slider cards.
- [ ] **UI Component Contrast:** Minimum contrast of **3.0:1** for button borders, input outlines, and icon indicators against adjacent colors.

### 4. Keyboard Navigation & Focus Management (WCAG 2.1.1, 2.4.7)
- [ ] **Focus Order:** Ensure the `Tab` navigation order follows the logical visual reading flow.
- [ ] **Visible Focus Indicators:** Ensure active and focused elements have visible focus rings (check that `outline: none` without alternative styling is avoided).
- [ ] **Skip Links:** Verify the "Skip to main content" link is present at the top of the DOM and functions properly.
- [ ] **Interactive Elements:** Ensure clickable elements are native `<a>` or `<button>` elements (not unadorned `<div>` or `<span>` with click handlers missing keyboard listeners).

### 5. Links, Buttons & Interactive Labels (WCAG 2.4.4, 4.1.2)
- [ ] **Descriptive Link Text:** Flag vague links like "Click Here", "Learn More", "Read More", or "View" unless disambiguated with `aria-label` or surrounding context.
- [ ] **Icon-Only Buttons:** Check that hamburger menus, search toggles, and social icons include screen-reader accessible names (`aria-label`, `<span class="sr-only">`).
- [ ] **External Links & New Tabs:** Check if links opening in a new tab (`target="_blank"`) inform users via text or `aria-label` (e.g. "(opens in a new tab)").

### 6. Forms & User Input (WCAG 3.3.2, 4.1.2)
- [ ] **Associated Labels:** Verify every `<input>`, `<select>`, and `<textarea>` has an explicit `<label for="...">` matching the field `id`.
- [ ] **Required Fields:** Ensure required inputs are marked programmatically (`required` or `aria-required="true"`) and visually.
- [ ] **Error Handling & Helper Text:** Check that inline errors are linked via `aria-describedby`.

---

## Output Report Structure

When completing the audit for a page, output the findings in this format:

```markdown
# Accessibility Audit: [Page Title]
**URL:** [Page URL]
**Date:** [YYYY-MM-DD]
**Status:** [Pass / Needs Improvement / Critical Issues]

## Summary of Findings
[Brief 2-3 sentence overview of accessibility compliance and major roadblocks]

## Discovered Issues

| # | Category | Element / Location | WCAG Criteria | Severity | Issue Description & Proposed Fix |
|---|---|---|---|---|---|
| 1 | Alt Text | Hero Banner image | 1.1.1 | Serious | Missing alt attribute on primary banner image. Add descriptive alt text. |
| 2 | Headings | Section "Our Story" | 1.3.1 | Moderate | Skips from H1 directly to H3. Change H3 to H2. |

## Action Items & Remediation Plan
1. **[Critical/High Priority]:** ...
2. **[Medium Priority]:** ...
3. **[Low Priority / Polish]:** ...
```
