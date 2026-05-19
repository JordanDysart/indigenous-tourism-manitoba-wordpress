# Task 02 — Get ACF Pro Plugin from Client

**Status:** `[ ]` Not started
**Blocked by:** Client response
**Required for:** Task 04 (Lando + plugins), local dev working at all

---

## Goal

Obtain the Advanced Custom Fields Pro plugin so it can be installed locally and on any staging environment. Without it, custom blocks (banner, operator map, operator search) will be broken and the theme will throw PHP errors.

---

## Why ACF Pro (not free)

The theme uses two Pro-only functions:
- `acf_register_block_type()` — registers the custom Gutenberg blocks
- `acf_add_options_page()` — adds an options page in wp-admin (currently commented out but wired up)

The free version of ACF does not include these.

---

## What to ask the client

- [ ] Do they have an active ACF Pro license?
- [ ] Can they share the plugin ZIP file? (Download from https://www.advancedcustomfields.com/my-account/)
- [ ] Or can they add your email to their ACF account as a user?

> **Note:** ACF Pro can be installed and used locally without activating a license key — it just won't receive automatic updates. So even an old ZIP from the client is enough to get local dev working.

---

## Once you have the ZIP

Install it into the local Lando environment:
```bash
lando wp plugin install /path/to/advanced-custom-fields-pro.zip --activate
```

Or drop the unzipped folder into:
```
wordpress/wp-content/plugins/advanced-custom-fields-pro/
```

Then activate it:
```bash
lando wp plugin activate advanced-custom-fields-pro
```

---

## Also check: ACF field group exports

The operator CPT fields (coordinates, description, website, images, etc.) are defined as ACF field groups. These may be:
- Stored only in the production database (needs a DB import to bring them local)
- Exported as JSON in the theme's `acf-json/` folder (check if that directory exists on the live site)

Ask the client if there's an `acf-json/` directory on the live server under the theme folder.

---

## Done when

- [ ] ACF Pro ZIP obtained
- [ ] Plugin installed and activated in local Lando environment
- [ ] Field groups loading correctly (check wp-admin > Custom Fields)
