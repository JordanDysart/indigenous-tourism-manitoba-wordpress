# Skill: Content Auditor

**Trigger:** When assigned to run a **content audit** on an individual page of `https://indigenoustourismmanitoba.ca/`.

**Objective:**
Perform a thorough editorial and asset integrity audit. Detect spelling and grammar mistakes, empty or broken hero images, dead links (404s), placeholder copy, outdated dates or facts, and cultural nomenclature consistency.

---

## Audit Checklist & Evaluation Criteria

### 1. Typography, Spelling & Editorial Polish
- [ ] **Spelling & Grammar:** Scan body copy, headings, callouts, and button text for misspelled words, duplicate words, or syntax errors.
- [ ] **Organization Nomenclature:** Verify accurate and consistent usage of official naming:
  - "Indigenous Tourism Manitoba" (or "ITM" where appropriate).
  - Appropriate terminology for Nations, communities, treaties, and cultural experiences.
- [ ] **Punctuation & Capitalization:** Check for consistent title-casing vs sentence-casing in headers, bullet list formatting, and proper quotation marks.

### 2. Media & Hero Asset Integrity
- [ ] **Hero Banners:** Verify the page has a valid, rendered hero image/banner and is not displaying a blank container, broken placeholder, or fallback gray background.
- [ ] **Image Rendering:** Check that all inline images, thumbnails, and logos load without broken paths or broken visual artifacts.
- [ ] **Image Cropping & Resolution:** Ensure photos are not visibly stretched, distorted, or low-resolution pixelated.
- [ ] **Captions & Credits:** Check that photo credits, photographer attributions, or cultural permissions are present where applicable.

### 3. Link Verification & Navigation Integrity
- [ ] **Internal Links:** Test all internal links on the page to ensure none return 404 (Not Found), 500 errors, or unintended redirect chains.
- [ ] **External Links:** Verify outbound links (e.g. operator websites, external booking engines, partner resources) are valid and active.
- [ ] **Dead End Links:** Flag empty links, placeholder anchors (e.g. `href="#"`, `href=""`, `href="javascript:void(0)"`), or unlinked button styles.
- [ ] **Email & Phone Links:** Ensure `mailto:` and `tel:` links are correctly formatted and functional.

### 4. Content Completeness, Timeliness & Accuracy
- [ ] **Placeholder Text:** Check for leftover "Lorem ipsum", "Coming Soon", draft notes, or developer placeholder strings.
- [ ] **Outdated Information:** Flag expired event dates, past year references presented as upcoming, expired registration deadlines, or obsolete contact personnel.
- [ ] **Contact & Support Details:** Ensure necessary contact info (inquiry form, email, phone, location address) is complete and accurate for the context of the page.
- [ ] **Formatting Glitches:** Check for raw unrendered shortcodes (e.g. `[acf ...]` or `[contact-form-7 ...]`), HTML entity leaks (`&amp;`, `&#8217;` shown as literal text), or unintended double line breaks.

---

## Output Report Structure

When completing the audit for a page, output the findings in this format:

```markdown
# Content Audit: [Page Title]
**URL:** [Page URL]
**Date:** [YYYY-MM-DD]
**Status:** [Pass / Needs Content Edits / Broken Assets Found]

## Summary of Findings
[Brief 2-3 sentence overview of content quality, editorial tone, and broken asset status]

## Discovered Issues

| # | Type | Location / Text Excerpt | Issue Description | Recommended Correction |
|---|---|---|---|---|
| 1 | Typo / Spelling | Section 2 paragraph 1 | "expereince" misspelled | Replace with "experience" |
| 2 | Broken Link | "Register Now" button | Links to `/guide-training-2023/` (404) | Update URL to current active registration page |
| 3 | Missing Media | Hero banner | Empty background style | Add high-resolution hero photo featuring Manitoba landscapes |

## Action Items & Copy Recommendations
1. **[Immediate Fixes]:** ...
2. **[Editorial Improvements]:** ...
```
