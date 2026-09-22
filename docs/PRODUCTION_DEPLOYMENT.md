# Production Deployment Checklist: Updates & Newsletters Architecture

Follow these steps to deploy theme version 1.1.6 (News Mentions, Newsletters, Category Filter, and Patterns Inserter) to the live site at `https://indigenoustourismmanitoba.ca`.

---

## Step 1: Pull Theme Updates via Plesk Git

1. Log in to the **Plesk Control Panel** for `indigenoustourismmanitoba.ca`.
2. Navigate to **Git** (under the domain dashboard).
3. Confirm the branch is set to `main` (commit `88f341b` or later).
4. Click **Pull Updates**.
5. *Note: All compiled assets (`assets/css/styles.css`, `blocks/blocks.css`, and `blocks/*/index.js`) are committed directly to `main`, so no build commands are required on the server.*

---

## Step 2: WordPress Database & Settings Setup

These are database settings that do not travel with theme files and must be configured once in WordPress Admin (or via WP-CLI if SSH is available).

### Option A: Via WordPress Admin (Browser)

1. **Create Categories**:
   - Go to **Posts → Categories**.
   - Create category 1:
     - Name: `News`
     - Slug: `news`
   - Create category 2:
     - Name: `Newsletter`
     - Slug: `newsletter`
   - *(Optional)* Rename or keep "Uncategorized" empty.
2. **Create the Updates ("View All") Page**:
   - Go to **Pages → Add New Page**.
   - Title: `Updates`
   - In the Page Settings sidebar (right side), check that the URL slug is `updates` (`/updates/`).
   - Leave the page body blank (the `home.php` template generates the hero, filter, and Query Loop automatically).
   - Click **Publish**.
3. **Assign the Posts Page**:
   - Go to **Settings → Reading**.
   - Under **Your homepage displays**:
     - Ensure **A static page** is selected.
     - Homepage: `Home` (or current front page).
     - **Posts page**: Select **Updates** from the dropdown.
   - Click **Save Changes**.
4. **Flush Permalinks**:
   - Go to **Settings → Permalinks**.
   - Ensure **Post name** (`/%postname%/`) is selected.
   - Click **Save Changes** (this flushes rewrite rules for `/updates/` and category archives).

---

### Option B: Via WP-CLI (Command Line / SSH)

If SSH access to the production server is available:
```bash
# 1. Create categories
wp term create category "News" --slug=news
wp term create category "Newsletter" --slug=newsletter

# 2. Create the Updates page and assign as Posts page
PAGE_ID=$(wp post create --post_type=page --post_title="Updates" --post_name="updates" --post_status=publish --porcelain)
wp option set page_for_posts "$PAGE_ID"
wp option set show_on_front page

# 3. Flush rewrite rules
wp rewrite structure '/%postname%/'
wp rewrite flush
```

---

## Step 3: Add Newsletter Highlight Section to Home Page

1. In WordPress Admin, go to **Pages → All Pages** and click **Edit** on **Home**.
2. Scroll to the bottom, right above the **"Indigenous Tourism Manitoba Membership"** CTA section (and below the video popup).
3. Click the **+** button (Add block) and search for or click **Patterns → Updates & Stories** (or **ITM Patterns**).
4. Select **Newsletter Highlight Section**.
5. Click **Update** to save the Home page.

---

## Step 4: Verification / Smoke Test

1. Visit `https://indigenoustourismmanitoba.ca/updates/`:
   - Confirm the hero banner displays *"Latest Updates & Stories"*.
   - Confirm the category filter pills (**All**, **News**, **Newsletter**) are visible.
   - Confirm "All" is active.
2. Visit `https://indigenoustourismmanitoba.ca/category/news/` and `.../category/newsletter/`:
   - Confirm the category title and filter active state match.
3. Visit the Home page (`https://indigenoustourismmanitoba.ca/`):
   - Confirm the Newsletter Highlight split section is visible.
   - Confirm the "View All Newsletters" button links to `/category/newsletter/`.
4. Proceed to publish your initial 5–6 news items and 3 newsletters following the [Staff Authoring Guide](AUTHORING_GUIDE.md)!
