# Task 08 — Self-Hosted Theme Updates (GitHub Releases)

**Status:** `[~]` In progress — code shipped, production token setup pending
**Blocked by:** Nothing — independent of Task 01 / Task 06
**Required for:** Letting the site admin see and apply theme updates from
Appearance > Themes without waiting on the (still-blocked) Plesk auto-deploy
pipeline

---

## Context

This is a separate, unblocked update path from the Plesk Git-pull auto-deploy
effort in [task-06-deploy-pipeline.md](task-06-deploy-pipeline.md). It does not
touch how code reaches Plesk. Instead, the theme itself now checks GitHub for
new tagged Releases and surfaces a normal WordPress "Update available" notice.
The site admin reviews it, takes their own backup, and clicks "Update Now" on
their own schedule — same UX as any WordPress.org theme update, just pointed at
this private repo instead.

**How a release ships:**

1. Bump `Version:` in `style.css` (and `Stable tag:` in `readme.txt`) and commit.
2. Push a tag matching `v*.*.*` (e.g. `v1.1.0`).
3. `.github/workflows/release.yml` builds a `kiwatinook-<version>.zip` from the
   tagged commit and attaches it to a new GitHub Release automatically.
4. The [Plugin Update Checker](https://github.com/YahnisElsts/plugin-update-checker)
   library, vendored at `inc/plugin-update-checker/` and bootstrapped from
   `inc/plugin-updates.php`, polls the repo's Releases and tells WordPress core
   there's an update once it sees a higher version.

Because the repo is **private**, the WordPress site itself needs read access to
call the GitHub API and download the release zip asset. That requires a GitHub
Personal Access Token (PAT) installed on the server — this is the one manual,
per-environment step this doc covers. It is **not** the same token GitHub
Actions uses to publish releases (that's the automatic `secrets.GITHUB_TOKEN`,
already wired up, no action needed).

---

## Steps

### 1. Generate a read-only PAT

1. Go to <https://github.com/settings/personal-access-tokens/new> (fine-grained
   tokens, not classic).
2. Resource owner: `JordanDysart`.
3. Repository access: **Only select repositories** → `indigenous-tourism-manitoba-wordpress`.
4. Permissions → Repository permissions → **Contents: Read-only**. Nothing else
   is needed.
5. Set an expiration (recommend 1 year, not "No expiration") and note a
   reminder to rotate it before it lapses.
6. Generate and copy the token (`github_pat_...`) — it's only shown once.

### 2. Install it on the live server

In the WP-root `wp-config.php` (not inside the theme — this keeps the token
out of git entirely, since Plesk Git-pull only manages the theme subdirectory
per Task 06), add above the `/* That's all, stop editing! */` line:

```php
define( 'ITM_INDIGPRO_UPDATE_TOKEN', 'github_pat_XXXXXXXXXXXXXXXXXXXXXX' );
```

Access `wp-config.php` via Plesk's file manager (no SSH available — see
[task-01-server-access.md](task-01-server-access.md)).

### 3. Install it locally for testing (Lando)

Same constant, same pattern, in Lando's `wp-config.php`
(`wordpress/wp-config.php` at the workspace root — confirmed outside any git
repo, safe to edit directly).

### 4. Verify

- Appearance > Themes loads with no PHP warnings/notices.
- With `WP_DEBUG` on (Lando sets this via `.lando.yml`), a "Check for updates"
  link becomes available so you don't have to wait out PUC's cache to test.

---

## ⚠️ Never commit this token

If the PAT value is ever pasted into a commit, a `.env`, or any tracked file,
treat it as compromised — revoke it immediately at
<https://github.com/settings/personal-access-tokens> and generate a new one.
Git history is permanent; deleting the file afterward does not remove it from
history.

---

## Done when

- [x] Plugin Update Checker vendored (`inc/plugin-update-checker/`) and
      bootstrapped (`inc/plugin-updates.php`, required from `functions.php`)
- [x] `style.css` `Version:` set to real semver (`1.0.0`)
- [x] `.github/workflows/release.yml` builds and publishes a Release zip on
      tag push
- [ ] PAT generated and scoped to `Contents: Read-only` on this repo only
- [ ] PAT installed in production `wp-config.php`
- [ ] PAT installed in local Lando `wp-config.php`
- [ ] A real tag push produces a Release whose zip installs cleanly and is
      detected as an update by a site running an older version
