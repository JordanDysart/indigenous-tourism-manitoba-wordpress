# Orchestration Plan: Kiwatinook Theme Refactor & Video Popup Block

## Overview
1. **Survey (Phase 0)**:
   - Explorer 1: Analyze block architecture, WordPress block editor structure, and requirements for `relish/video-popup-block` (accessible lightbox modal, custom cover image, pulse play button, YouTube/Vimeo/MP4 support, focus trap, aria attributes).
   - Explorer 2: Enumerate all 15 remaining WordPress pages (or template files/content JSON/exports), identifying legacy third-party plugin dependencies (`kadence/*`, `acf/*`, `getwid/*`) and defining native block replacement strategies.
   - Explorer 3: Investigate build scripts (`npm run build`), test suite (`npm run feedback:test`), and Playwright visual screenshot configuration/harness.
2. **Decomposition (Phase 1)**:
   - Synthesize survey findings into `PROJECT.md`.
   - Formulate milestones with clear boundaries and interface contracts.
3. **Dual Track Dispatch (Phase 2)**:
   - Track A: E2E Testing Orchestrator (Tiers 1-4 tests, Playwright visual tests, `TEST_READY.md`).
   - Track B: Implementation Milestones (Milestone 1: `relish/video-popup-block`, Milestone 2: 15-Page Refactoring batches, Milestone 3: Full Integration & E2E Test Suite Pass, Milestone 4: Adversarial Hardening).
4. **Verification & Audit (Phase 3)**:
   - Reviewer verification + Challenger verification + Forensic Audit (Zero Tolerance).
5. **Completion Report (Phase 4)**:
   - Report final completion to Sentinel.
