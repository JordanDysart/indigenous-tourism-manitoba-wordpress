# News Mention Posting Workflow Guide

This guide describes how to quickly create **News Mention** posts on the Indigenous Tourism Manitoba (ITM) website. Every news post includes:
1. An overview summary of the external news article.
2. An explicit **Our Involvement** section describing ITM and member operator relevance.
3. An accessible outbound link button opening the original news source in a new tab (`target="_blank"`, `rel="noopener noreferrer"`, screen-reader text, and SVG icon).
4. Automatic classification under the **News** category (`ID: 34`) so it appears in `/updates/` and `/category/news/`.

---

## Method 1: Conversational AI Skill (Fastest)

You can ask the Antigravity agent directly in chat. The agent activates the `news-post-creator` skill to read the source, draft the content, and create the post in WordPress.

### Single Article Example:
> *"Create a news post draft for this article: https://www.winnipegfreepress.com/arts-and-life/life/faith/2024/08/celebrating-manitoba-indigenous-culinary-tourism"*

### Batch Articles Example:
> *"Here is a list of 4 recent news articles mentioning ITM. Please summarize each, add ITM's involvement, and create drafts in WordPress:*
> *1. https://www.cbc.ca/news/...*
> *2. https://winnipegfreepress.com/...*
> *3. https://aptnnews.ca/...*
> *4. https://travelmanitoba.com/..."*

The agent will:
1. Fetch and read each article.
2. Extract the publication name, publication date, and headline.
3. Write a 1–2 paragraph story summary.
4. Highlight ITM's role, community impact, and featured operators.
5. Create the post in WordPress as a `draft` (or `publish` if requested).
6. Provide the post ID, preview URL, and direct edit link for quick review.

---

## Method 2: Command Line (CLI) & Batch Processing

You can also create posts directly from your terminal using the npm script.

### Single Post via Command Line:
```bash
npm run create:news -- \
  --publication="CBC News" \
  --title="CBC News: Indigenous Tourism in Manitoba Experiencing Surge" \
  --url="https://www.cbc.ca/news/indigenous-tourism-surge" \
  --summary="CBC News reports on the unprecedented surge in visitors seeking authentic Indigenous cultural and culinary tourism experiences across Manitoba." \
  --involvement="Indigenous Tourism Manitoba supports over 85 Indigenous-owned tourism businesses through market-readiness programs, guide certifications, and promotional campaigns." \
  --excerpt="CBC News highlights the surge in visitors seeking authentic Indigenous cultural experiences across Manitoba." \
  --status="draft" # or publish
```

### Dry Run (Preview Gutenberg Blocks without DB writes):
```bash
npm run create:news -- --dry-run \
  --publication="Winnipeg Free Press" \
  --title="Winnipeg Free Press: Culinary Tourism" \
  --url="https://winnipegfreepress.com/sample" \
  --summary="Story summary..." \
  --involvement="ITM involvement..."
```

### Batch JSON Processing:
Create a JSON file (e.g. `articles.json`):
```json
[
  {
    "publication": "Winnipeg Free Press",
    "title": "Winnipeg Free Press: Indigenous Culinary Tourism",
    "url": "https://www.winnipegfreepress.com/example-1",
    "date": "2025-08-20",
    "summary": "The Winnipeg Free Press highlighted our vibrant Indigenous food sovereignty and culinary tourism programs.",
    "involvement": "ITM is supporting regional operators in treaty territories to develop guided food tastings and traditional gatherings.",
    "excerpt": "Winnipeg Free Press covers the growth of authentic culinary tourism and traditional feast dining across Manitoba.",
    "status": "draft"
  },
  {
    "publication": "CBC News",
    "title": "CBC News: Cultural Experiences on Treaty Territories",
    "url": "https://www.cbc.ca/news/example-2",
    "date": "2025-09-10",
    "summary": "CBC News covered the expansion of land-based learning and cultural tours across Manitoba.",
    "involvement": "ITM worked alongside knowledge keepers and community leaders to ensure cultural protocols are respected.",
    "excerpt": "CBC News explores authentic operator experiences connecting visitors with traditional knowledge.",
    "status": "draft"
  }
]
```
Then run:
```bash
npm run create:news -- --file=articles.json
```

---

## Method 3: WordPress Admin Gutenberg Block Editor

For team members editing directly in the WordPress dashboard:

1. Log into WordPress Admin (`/wp-admin/`) and navigate to **Posts > Add New Post**.
2. Set the post title (convention: `[Publication Name]: [Headline]`).
3. In the post settings sidebar on the right:
   - Select Category: **News**.
   - Set the **Featured Image** (optional, recommended 16:9 ratio).
   - Enter a 1–2 sentence **Excerpt** (used on `/updates/` post card cards).
4. In the block editor content canvas:
   - Click the **+** (Block Inserter) at the top left.
   - Switch to the **Patterns** tab.
   - Select **Updates & Stories** (or search for *"News Mention"*).
   - Click **News Mention** to insert the template.
5. Fill in the pre-templated fields:
   - Headline: `Featured in [Publication Name]`
   - Story Summary paragraph
   - `Our Involvement` paragraph
   - Click the button link to set the outbound URL and change button text to `Read the full story at [Publication Name]`.
6. Click **Save Draft** or **Publish**.

---

## Verification & Architecture Notes
- **Outbound Link Accessibility**: The external link button uses class `.is-external-link`, opens in a new tab (`target="_blank"`), sets `rel="noopener noreferrer"`, contains hidden screen-reader text `(opens in a new tab)`, and renders an accessible SVG external link icon.
- **Archive Display**: Posts with category `News` automatically display on `/updates/` sorted by date descending, and are filtered under `/category/news/`.
