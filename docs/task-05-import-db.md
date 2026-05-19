# Task 05 — Import Production Database to Local

**Status:** `[x]` Done

---

## What was done

Production database imported from `https://indigenoustourismmanitoba.ca` and URL search-replaced to local Lando URL.

---

## Commands used

```bash
# Import
lando wp db import production.sql

# Replace production URL with local — REQUIRED after every import
lando wp search-replace 'https://indigenoustourismmanitoba.ca' 'https://indigenous-tourism-manitoba-wordpress.lndo.site' --all-tables

# Flush
lando wp cache flush
lando wp rewrite flush
```

> **Important:** The search-replace step is not optional. WordPress stores the site URL in `wp_options` (and serialized throughout `wp_posts` and `wp_postmeta`), so skipping it causes every page request to redirect to the production site. Always run it immediately after every import.

---

## Reset admin password after import

```bash
lando wp user update jdysart --user_pass=admin
```

---

## Keep SQL out of git

Make sure `*.sql` is in `.gitignore`.
