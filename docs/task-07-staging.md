# Task 07 — Set Up Staging Environment

**Status:** `[ ]` Not started
**Blocked by:** Task 01 (SSH access), Task 06 (deploy pipeline)
**Required for:** Safely testing changes before they go live

---

## Goal

Create a staging environment that mirrors the live site so you can test theme changes against real content without risking the production site.

---

## Option A — Staging subdomain on the same server (recommended)

1. Create the subdomain in the host's control panel pointing to a new directory
2. Clone the live database into a new staging database
3. Copy the WordPress files to the staging directory
4. Update `wp-config.php` to point at the staging database
5. Run search-replace on the staging URL
6. Add staging to the deploy workflow

---

## Option B — Use a managed staging environment

If the client's host offers one-click staging (WP Engine, Kinsta, Flywheel), use that.

---

## Option C — Lando as your staging (simplest short-term)

Treat your Lando environment as staging:
- Regularly sync the production DB to local (Task 05 process, repeated)
- Test locally before pushing to `main`

---

## Done when

- [ ] Staging URL is live and loads the site
- [ ] Staging database is a copy of production
- [ ] `staging` branch in GitHub deploys to staging server
- [ ] A test theme change verified on staging before going to `main`
