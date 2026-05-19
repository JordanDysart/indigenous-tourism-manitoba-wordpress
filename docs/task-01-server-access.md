# Task 01 — Server Access

**Status:** `[~]` In progress — partial
**Blocked by:** Nothing — Plesk panel access needed from client
**Required for:** Task 06 (deploy pipeline)

---

## What we know

SSH access has been denied by the hosting provider for security reasons.
The host uses **Plesk**, which provides:
- A WP-CLI interface through the Plesk panel
- A built-in Git deployment extension
- SFTP access (confirm this with the host — most Plesk installs allow it even without SSH)

---

## What to get from the client / host

- [ ] Plesk panel login URL and credentials (or an invitation to create your own account)
- [ ] Confirmation of whether SFTP is allowed (different from SSH — ask explicitly)
- [ ] The domain / subdomain the WordPress install lives under in Plesk
- [ ] Whether the **Plesk Git extension** is installed (check under Domains > Git in the panel)

---

## WP-CLI via Plesk

Plesk exposes WP-CLI under the domain's PHP settings or via the **WordPress Toolkit**
extension. Common locations:
- Plesk panel > Domains > yourdomain.com > WordPress (if WordPress Toolkit is installed)
- Plesk panel > Domains > yourdomain.com > PHP > WP-CLI

You can run WP-CLI commands from inside the Plesk terminal without SSH.
This covers database exports, search-replace, plugin management, etc.

---

## Done when

- [ ] Plesk panel access confirmed and tested
- [ ] Can run a WP-CLI command via Plesk (e.g. `wp option get siteurl`)
- [ ] SFTP access confirmed or ruled out
- [ ] Git extension presence confirmed (feeds into Task 06)
