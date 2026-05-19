# Task 04 — Set Up Lando and Install Missing Plugins

**Status:** `[ ]` Not started
**Blocked by:** Task 02 (ACF Pro ZIP)
**Required for:** Any local development

---

## Goal

Get the local Lando environment fully running with all required plugins installed and activated, matching the live site's plugin set.

---

## Step 1 — Start Lando

From the workspace root (where `.lando.yml` lives):
```bash
cd /Users/jordandysart/workspace/itmwordpress
lando start
```

---

## Step 2 — Install free plugins

```bash
lando wp plugin install woocommerce --activate
lando wp plugin install getwid --activate
lando wp plugin install leaflet-map --activate
lando wp plugin activate wordpress-importer
```

---

## Step 3 — Install ACF Pro (requires ZIP from Task 02)

```bash
lando wp plugin install /path/to/advanced-custom-fields-pro.zip --activate
```

---

## Step 4 — Activate the theme

```bash
lando wp theme activate kiwatinook
```

---

## Plugin checklist

- [ ] ACF Pro — installed and activated
- [ ] WooCommerce — installed and activated
- [ ] Getwid — installed and activated
- [ ] Leaflet Map — installed and activated
- [ ] Theme activated

---

## Done when

- [ ] `lando wp plugin list` shows all above plugins as active
- [ ] Site loads without fatal PHP errors
- [ ] wp-admin is accessible
