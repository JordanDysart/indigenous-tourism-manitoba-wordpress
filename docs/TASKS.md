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
| 2 | Get ACF Pro plugin from client | [task-02-acf-pro.md](task-02-acf-pro.md) | `[ ]` |
| 3 | Identify what registers the Operator CPT | [task-03-operator-cpt.md](task-03-operator-cpt.md) | `[x]` |
| 4 | Set up Lando and install missing plugins | [task-04-lando-plugins.md](task-04-lando-plugins.md) | `[ ]` |
| 5 | Import production database to local | [task-05-import-db.md](task-05-import-db.md) | `[x]` |
| 6 | Set up deployment pipeline | [task-06-deploy-pipeline.md](task-06-deploy-pipeline.md) | `[ ]` |
| 7 | Set up staging environment | [task-07-staging.md](task-07-staging.md) | `[ ]` |

---

## Notes

- Task 01: SSH denied by host. Working via Plesk panel instead. Need Plesk login from client.
- Task 02 (ACF Pro) is still required for the banner block and operator map block to fully function. See [acf-dependencies.md](acf-dependencies.md) for the full migration plan.
- Task 03 is resolved — the `operator` CPT and its taxonomies are registered directly in `functions.php`.
- Task 04 is blocked on Task 02 (ACF Pro ZIP).
- Task 06 updated — SSH rsync replaced with Plesk Git, GitHub Actions SFTP, or WP Pusher. Blocked on Task 01 to confirm which is available.
