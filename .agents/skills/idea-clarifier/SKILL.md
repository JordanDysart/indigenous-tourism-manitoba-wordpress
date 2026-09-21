# Skill: Idea Clarifier & Task Refiner

**Trigger:** When an idea in `_agent_tasks/ideas/` has the status `inbox` or `refining`.

**Execution Steps:**
1. **Analyze the Raw Idea:** Read the `Raw Idea` section. Compare it against the requirements of a standard executable task, which requires clear Acceptance Criteria and target file paths.
2. **Identify Gaps:** What is missing? Are the technical constraints clear? Is the desired outcome measurable?
3. **Generate Questions:** Update the `Ambiguities & Clarifying Questions` section of the idea markdown file with 1 to 3 specific, multiple-choice, or highly targeted questions to prompt the human for missing context.
4. **Update Status:** Change the frontmatter status to `refining`.
5. **Finalize:** Once the human answers the questions in the markdown file, summarize the total requirements in the `Refined Scope` section. If no ambiguities remain, change the status to `ready_for_task`.
