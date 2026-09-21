# Content Audit Guide

This guide details the editorial, asset integrity, and link verification criteria for auditing pages on the Indigenous Tourism Manitoba website.

---

## 1. Content Evaluation Criteria

### 1.1 Spelling, Grammar & Editorial Tone
- **Spelling & Grammar Checks:** Scan all visible text (headings, body copy, captions, buttons, tooltips, footer notes) for typographical errors, double words, or grammatical awkwardness.
- **Brand & Organization Terminology:** Verify consistent use of:
  - **Indigenous Tourism Manitoba (ITM)** (accurate branding across all headers and copy).
  - Appropriate terminology for Nations, communities, treaties, language groups, and traditional territories.
- **Tone & Voice:** Ensure a welcoming, culturally respectful, inspiring, and informative tone suitable for prospective travelers, industry operators, and community partners.

### 1.2 Media & Hero Banner Health
- **Empty / Broken Hero Images:**
  - Check whether the top hero section contains a valid background photo or displays an empty gray/black box.
  - Verify that the hero title text is legible against the hero image.
- **Image Quality & Aspect Ratio:**
  - Ensure images are not stretched or squashed (check for CSS `object-fit: cover` / proper dimensions).
  - Flag heavily pixelated or low-resolution imagery.
- **Broken Media Elements:** Check that photo galleries, embedded videos (YouTube/Vimeo), and downloadable PDFs load without broken file paths or 404 responses.

### 1.3 Link & Navigation Integrity
- **Internal Links:** Verify all links pointing to `indigenoustourismmanitoba.ca` pages return a valid HTTP 200 response and do not land on a 404 Not Found page.
- **External Links:** Verify external partner links (operator websites, external booking pages, Government of Manitoba, Travel Manitoba) resolve to active destinations.
- **Unlinked & Dead Placeholders:** Flag any buttons or links with `href="#"`, `href=""`, or empty URLs.
- **Action Protocols:** Ensure email links (`mailto:example@domain.ca`) and phone links (`tel:+1204...`) are properly formatted.

### 1.4 Content Completeness & Timeliness
- **Draft & Placeholder Text:** Identify leftover "Lorem Ipsum", "Coming soon", "Test", or developer template strings.
- **Date Validity:** Flag past events presented as upcoming, outdated year references (e.g. copyright footers, past seasons), or expired grant/training application windows.
- **Contact & Operator Details:** For operator and program pages, verify phone numbers, addresses, hours of operation, and contact forms are present and complete.

---

## 2. Step-by-Step Testing Procedure

1. **Text Review:**
   - Extract page body text and parse for typos, spelling errors, and formatting inconsistencies.
2. **Link Extraction & Validation:**
   - Extract all `<a href="...">` attributes on the page.
   - Run HTTP status checks on every internal and external link; flag any 404s, 500s, or dead hashes.
3. **Media Verification:**
   - Extract all `<img>`, `<picture>`, video embeds, and CSS background image URLs.
   - Verify each media asset returns HTTP 200 and renders properly.
4. **Compile Report:**
   - Record exact locations of typos, broken URLs, missing hero banners, and outdated text.
