---
name: news-post-creator
description: >-
  Quickly creates or drafts WordPress "News Mention" posts for Indigenous Tourism Manitoba (ITM) from external article URLs or text snippets. Automatically extracts or drafts a concise story summary, details ITM's organizational involvement and community impact, and constructs accessible Gutenberg block markup with outbound link styling and news taxonomy.
---

# Skill: ITM News Post Creator

**Trigger:** When the user provides one or more news article URLs, headlines, press releases, or summaries and wants to publish or draft posts for the Indigenous Tourism Manitoba website.

**Objective:**
Rapidly generate lightweight, accessible, and brand-consistent "News Mention" posts on the ITM website featuring:
1. A concise overview summary of the external news article.
2. An explicit section describing **Indigenous Tourism Manitoba (ITM) / Operator Involvement** and community impact.
3. An accessible outbound link button opening the full story in a new tab (`target="_blank"`, `rel="noopener noreferrer"`, screen-reader text, and SVG icon).
4. Taxonomy assignment to the **News** category (slug `news`, term ID `34`) so it displays on `/updates/` and `/category/news/`.

---

## Workflow Steps

### Step 1: Content Ingestion & Extraction
1. If the user provides a **URL**:
   - Use `read_url_content` to fetch the article text.
   - Extract:
     - **Publication Name** (e.g., CBC News, Winnipeg Free Press, Travel Manitoba, APTN National News, CTV News).
     - **Article Headline / Title**.
     - **Publication Date** (formatted as `YYYY-MM-DD HH:MM:SS` for WordPress post date).
     - **Core Story Facts**: Who, what, when, where, why.
     - **ITM / Community Context**: How ITM, indigenous operators, culture, or tourism development in Manitoba are highlighted.
2. If the user provides **raw text or bullet points**:
   - Parse the provided details directly. If publication name or URL is missing, request them or use clear placeholders.

### Step 2: Content Drafting Guidelines
Follow the ITM brand editorial guidelines:
- **Post Title Format**: `[Publication Name]: [Article Headline or Topic]`
  - *Example*: `Winnipeg Free Press: Celebrating Manitoba Indigenous Culinary Tourism`
- **Excerpt**: 1–2 sentences summarizing the story for post card previews on `/updates/`.
- **Story Summary**: 1–2 paragraphs giving a clear, engaging overview of what the news coverage is about.
- **Organization Involvement**: 1 paragraph detailing ITM's role, such as:
  - Highlighting member operators, training programs, or culinary initiatives.
  - Strengthening cultural tourism, economic reconciliation, and visitor experiences across Manitoba's Treaties 1–5 territories.
- **Tone**: Respectful, celebratory, community-focused, and professionally aligned with ITM standards.

### Step 3: Canonical Gutenberg Block Markup
Every news post must use this precise Gutenberg block markup structure:

```html
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Featured in [Publication Name]</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>[Story Summary: Overview of what the publication reported...]</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Our Involvement</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>[ITM Involvement: Details on ITM programs, featured member operators, and community impact...]</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons">
	<!-- wp:button {"className":"btn btn--primary is-external-link","lock":{"remove":true}} -->
	<div class="wp-block-button btn btn--primary is-external-link"><a class="wp-block-button__link wp-element-button" href="[Source URL]" target="_blank" rel="noopener noreferrer">Read the full story at [Publication Name] <span class="screen-reader-text">(opens in a new tab)</span><svg class="external-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div>
	<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
```

### Step 4: Post Creation Options

#### Option A: Direct WP-CLI Creation (Recommended for Live / Local Sites)
Run the built-in CLI utility or WP-CLI directly:
```bash
node tools/create-news-post.js \
  --title="[Publication]: [Title]" \
  --publication="[Publication]" \
  --url="[Article URL]" \
  --date="[YYYY-MM-DD]" \
  --summary="[Summary text]" \
  --involvement="[Involvement text]" \
  --excerpt="[Card excerpt]" \
  --status="draft" # or publish
```
Or directly using WP-CLI:
```bash
lando wp post create \
  --post_type=post \
  --post_title="[Title]" \
  --post_content="[Block Markup]" \
  --post_excerpt="[Excerpt]" \
  --post_category=34 \
  --post_status="draft" \
  --post_date="[YYYY-MM-DD 12:00:00]" \
  --porcelain
```

#### Option B: Output Formatted Blocks for Manual Admin Entry
If the user prefers to review in chat or paste into `wp-admin`:
Output the block HTML inside a markdown code block along with:
- Suggested Post Title
- Category: `News`
- Excerpt
- Publication Date

### Step 5: Verification & Reporting
After creating the post, provide the user with:
- Post ID and Post Title.
- Assigned Category (`News`).
- Status (`draft` or `publish`).
- Quick edit link (`/wp-admin/post.php?post=<ID>&action=edit`).
- Public / Preview link.
- Formatted summary of the story and organization involvement for immediate review.
