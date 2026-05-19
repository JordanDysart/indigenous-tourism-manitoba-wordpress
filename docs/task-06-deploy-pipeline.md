# Task 06 — Set Up Deployment Pipeline

**Status:** `[ ]` Not started
**Blocked by:** Task 01 (Plesk panel access)
**Required for:** Reliably shipping theme changes to the live site

---

## Context

SSH access is not available on this host. The deployment approach must work
through Plesk or a WordPress-native mechanism. Three options are listed below
in recommended order.

---

## Option A — Plesk Git extension (recommended)

Plesk has a built-in Git deployment feature. Once connected to your GitHub repo,
it can pull and deploy automatically via a webhook on every push to `main`.

### Setup steps

1. **In the Plesk panel:**
   - Go to Domains > your domain > Git
   - Click "Add Repository"
   - Paste your GitHub repo URL
   - Set the deployment path to the theme directory
   - Set the branch to `main`
   - Copy the **Webhook URL** that Plesk generates

2. **In your GitHub repo:**
   - Go to Settings > Webhooks > Add webhook
   - Paste the Plesk webhook URL
   - Set Content type to `application/json`
   - Choose "Just the push event"

3. **Test it:** Push a small change to `main` and check the Plesk deployment log.

---

## Option B — GitHub Actions + SFTP

If Plesk allows SFTP, GitHub Actions can push changed files directly.

```yaml
name: Deploy Theme

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASS }}
          port: ${{ secrets.FTP_PORT }}
          local-dir: ./
          server-dir: /wp-content/themes/kiwatinook/
          exclude: |
            **/.git*
            **/node_modules/**
            **/.serena/**
            **/docs/**
            **/*.sql
```

---

## Option C — WP Pusher plugin

WordPress plugin that watches a GitHub repo and pulls changes from inside WordPress. No panel access needed — just a GitHub personal access token.

---

## Done when

- [ ] Deployment method chosen (A, B, or C)
- [ ] First automatic deploy triggered by a push to `main`
- [ ] Change confirmed visible on live site
