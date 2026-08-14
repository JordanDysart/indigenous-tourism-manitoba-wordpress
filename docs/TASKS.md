# ITM WordPress — Task Tracker

## Status Key
- `[ ]` Not started
- `[~]` In progress
- `[x]` Done
- `[!]` Blocked

---

## Tasks

| # | Task | File | Status |
|---|------|------|--------|
| 1 | Confirm Plesk panel access (SSH unavailable) | [task-01-server-access.md](task-01-server-access.md) | `[~]` |
| 2 | ACF Pro elimination (Native blocks migration) | [acf-dependencies.md](acf-dependencies.md) | `[~]` |
| 3 | Identify what registers the Operator CPT | [task-03-operator-cpt.md](task-03-operator-cpt.md) | `[x]` |
| 4 | Set up Lando & media asset parity sync | [task-04-lando-plugins.md](task-04-lando-plugins.md) | `[x]` |
| 5 | Import production database to local | [task-05-import-db.md](task-05-import-db.md) | `[x]` |
| 6 | Set up deployment pipeline | [task-06-deploy-pipeline.md](task-06-deploy-pipeline.md) | `[ ]` |
| 7 | Set up staging environment | [task-07-staging.md](task-07-staging.md) | `[ ]` |
| 8 | Self-hosted theme updates (Plugin Update Checker) | [task-08-self-hosted-theme-updates.md](task-08-self-hosted-theme-updates.md) | `[x]` |
| 9 | Rebuild Header Mega Menu (Accessible & CSS Grid) | [task-09-mega-menu-rebuild.md](task-09-mega-menu-rebuild.md) | `[x]` |
| 10 | Operator Directory Dynamic Filtering & AJAX | [task-10-operator-filtering.md](task-10-operator-filtering.md) | `[x]` |
| 11 | Accessible Banner Block & Image-Text Migration | [task-11-accessible-banner-migration.md](task-11-accessible-banner-migration.md) | `[x]` |
| 12 | The Forks Location Page Template & Showcase | [task-12-the-forks-page.md](task-12-the-forks-page.md) | `[x]` |
| 13 | Theme Updater Release Pipeline (GitHub Actions) | [task-13-theme-updater-pipeline.md](task-13-theme-updater-pipeline.md) | `[x]` |

---

## Notes

- **Task 04 & 05**: Complete. Local Lando environment is fully operational with 100% production media asset parity (1,325 files synced).
- **Task 09 (Mega Menu)**: High priority. Rebuilding the navigation with a 4-column CSS grid mega panel, hover/focus states, and WP menu item image meta.
- **Task 10 (Operator Filter)**: High priority. Re-registering `relish/operator-search-block` as a native block with live AJAX and URL param state.
- **Task 11 (Accessible Banners)**: High priority. Migrating flat text-in-image banners to native `relish/banner-block`.
- **Task 12 (The Forks Page)**: Modular page template (`page-the-forks.php`) ready for client copy & assets.
- **Task 13 (Updater Pipeline)**: Packaging script + GitHub Actions workflow to enable one-click updates in WordPress Admin.
