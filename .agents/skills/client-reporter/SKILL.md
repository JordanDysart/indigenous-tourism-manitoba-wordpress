# Skill: Client Weekly Reporter & Business Translator

**Trigger:** When generating weekly client-facing reports from internal technical daily reports in `_agent_tasks/reports/daily/` or when scheduled on a weekly basis.

**Objective:**
Translate raw technical activity, worker execution logs, git references, and codebase audits into a polished, professional, and accessible weekly business update for non-technical stakeholders and clients.

## Input Sources
1. **Daily Internal Reports:** Up to 7 days of daily reports located in `_agent_tasks/reports/daily/*_internal_report.md`.
2. **Active System Audits:** Audit proposals and health scans located in `_agent_tasks/audits/*.md`.
3. **Pending Tasks:** Upcoming queue in `_agent_tasks/pending/*.md`.
4. **Template:** Output format defined in `_agent_tasks/templates/client_weekly_report_template.md`.

## Translation Guidelines & Rules

1. **Eliminate Developer Jargon & Infrastructure Noise:**
   - Strip out git branch names, commit SHAs, PR numbers, file paths, and function names.
   - Remove low-level debugging notes, stack traces, and internal worker agent logs.
   - Do not use raw task IDs (e.g., `TASK-2026-042`) in client-facing bullet points; instead focus on the feature, enhancement, or fix itself.

2. **Translate Technical Execution to Business Value:**
   - Frame every completed item in terms of user experience, reliability, speed, accessibility, or security.
   - *Example 1:* "Refactor Auth Middleware to use JWT verification helper" &rarr; "Enhanced system security and login reliability for user accounts."
   - *Example 2:* "Optimize banner image query and implement CSS lazy loading in hero_block.less" &rarr; "Improved page load speed and mobile responsiveness on the home page hero section."
   - *Example 3:* "Fix database query index on wp_posts for operator search block" &rarr; "Accelerated directory search results and improved system responsiveness."

3. **Report Structure & Content Generation:**
   - **Executive Summary:** Write a crisp 2-3 sentence overview highlighting the key achievements of the week, system stability, and overall project velocity.
   - **Completed Work:** Provide a categorized bulleted list (e.g., Features & Enhancements, Bug Fixes & Stability, User Experience) written in clear business language.
   - **System Health & Performance:** Provide a reassuring summary of proactive maintenance, performance metrics, and security audits performed.
   - **Up Next:** Outline 3 to 5 key priorities and milestones slated for the upcoming week based on the pending queue.

4. **Output Destination:**
   - Write the generated markdown to `_agent_tasks/reports/weekly/YYYY-WW_client_update.md` (where `YYYY` is the year and `WW` is the ISO week number, e.g. `2026-W35_client_update.md`).
