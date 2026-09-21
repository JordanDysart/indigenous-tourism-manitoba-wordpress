#!/bin/bash

# 1. Decouple from main project git
if grep -q "^_agent_tasks/$" .gitignore; then
  echo "_agent_tasks/ is already in .gitignore"
else
  echo "_agent_tasks/" >> .gitignore
  echo "Added _agent_tasks/ to main project .gitignore"
fi

# 2. Build the directory state machine
mkdir -p _agent_tasks/{pending,completed,failed,audits,summaries}

# 3. Initialize isolated git repository for task management
cd _agent_tasks
git init
echo "Initialized standalone git repository in _agent_tasks/"

# 4. Generate the Task Template
cat << 'EOF' > task_template.md
---
id: TASK-YYYY-XXX
title: 
priority: high # critical | high | medium | low
status: pending # pending | in_progress | completed | failed
created_at: 
started_at: null
completed_at: null
base_branch: main
branch: 
pr_url: null
required_assets:
  - 
tags:
  - 
---

### Task Description

#### Acceptance Criteria
- [ ] 

#### Technical Notes & Context

---
#### Execution Log (Appended by Worker Agent)
EOF
echo "Created task_template.md"

# 5. Generate the Audit Template
cat << 'EOF' > audit_template.md
---
id: AUDIT-YYYYMMDD-HHMM
title: 
category: performance # performance | security | architecture | tech_debt | modularity
impact: high # high | medium | low
effort: small # small | medium | large
target_paths:
  - 
created_at: 
status: draft_proposal # draft_proposal | accepted | rejected | converted_to_task
related_task_id: null
---

### Problem Analysis

#### Proposed Solution

#### Implementation Strategy
1. 

#### Estimated Scope & Risk
* **Risk:** 
* **Estimated Lines of Code:** 
EOF
echo "Created audit_template.md"

echo "Setup complete. Directory structure and templates are ready."