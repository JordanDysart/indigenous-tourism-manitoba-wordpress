#!/usr/bin/env node
/**
 * ITM Newsletter Duplication & Sync CLI Tool
 *
 * Duplicates Constant Contact newsletters into native WordPress posts
 * under the "Newsletter" category (ID: 35), defaulting to `draft` status
 * so staff can quickly review before publishing.
 *
 * Modes:
 *   1. API Sync Mode (Default):
 *      Polls Constant Contact v3 API (`GET /v3/emails`) for completed ("Done")
 *      campaigns sent to the e-Newsletter list (`5aa6bf4a-fbb1-11f0-b6d2-0242a2ded4be`).
 *      Usage: `npm run sync:newsletter`
 *
 *   2. Archive URL / HTML File Mode:
 *      Imports a specific Constant Contact share URL (`https://conta.cc/...`)
 *      or local HTML file and converts it into Gutenberg blocks.
 *      Usage: `npm run sync:newsletter -- --url="https://conta.cc/..." --title="Spring 2026 Newsletter"`
 *      Usage: `npm run sync:newsletter -- --html-file="./sample-email.html" --title="..." --dry-run`
 */

import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      params.help = true;
    } else if (arg === '--dry-run') {
      params.dryRun = true;
    } else if (arg.startsWith('--')) {
      const eqIndex = arg.indexOf('=');
      if (eqIndex !== -1) {
        const key = arg.slice(2, eqIndex);
        const val = arg.slice(eqIndex + 1);
        params[key] = val;
      } else {
        const key = arg.slice(2);
        const next = args[i + 1];
        if (next && !next.startsWith('--')) {
          params[key] = next;
          i++;
        } else {
          params[key] = true;
        }
      }
    }
  }

  return params;
}

function printHelp() {
  console.log(`
ITM Constant Contact -> WordPress Newsletter Sync
=================================================
Duplicates sent Constant Contact e-Newsletters into native WordPress posts
assigned to the "Newsletter" category (status: draft by default).

Usage:
  npm run sync:newsletter
  npm run sync:newsletter -- --url="https://conta.cc/..." [--title="..."] [--date="YYYY-MM-DD"]
  npm run sync:newsletter -- --html-file="./email.html" --title="Spring 2026 Newsletter" [--dry-run]

Options:
  --sync-api     Poll Constant Contact v3 API for sent campaigns on the e-Newsletter list (default if no URL/file passed)
  --url          Import a specific Constant Contact hosted archive URL (e.g. https://conta.cc/...)
  --html-file    Import from a local Constant Contact HTML export file
  --title        Override the WordPress post title (defaults to email subject)
  --date         Override the post publication date (YYYY-MM-DD or ISO timestamp)
  --edition      Optional edition badge label (e.g. "Spring 2026" or "Vol. 3, Issue 3")
  --status       Post status: 'draft' (default) or 'publish'
  --limit        Max campaigns to inspect during API sync (default: 15)
  --dry-run      Preview generated Gutenberg block markup without writing to the database
  --help, -h     Show this help message
`);
}

function getWpCommandPrefix() {
  try {
    execSync('lando wp --version 2>/dev/null', { stdio: 'pipe' });
    return 'lando';
  } catch {
    try {
      execSync('wp --version 2>/dev/null', { stdio: 'pipe' });
      return 'wp';
    } catch {
      return null;
    }
  }
}

function runWpEval(phpCode, stdinData = '') {
  const wpRunner = getWpCommandPrefix();
  if (!wpRunner) {
    throw new Error('Neither "lando wp" nor "wp" CLI was found in PATH.');
  }

  const cmdArgs = wpRunner === 'lando' ? ['wp', 'eval', phpCode] : ['eval', phpCode];
  const result = spawnSync(wpRunner, cmdArgs, {
    input: stdinData,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`WP-CLI eval failed: ${result.stderr || result.stdout}`);
  }

  return (result.stdout || '').trim();
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const status = args.status || 'draft';
  const dryRun = Boolean(args.dryRun);

  // Mode 1: Local HTML file transformation / import
  if (args['html-file']) {
    const filePath = path.resolve(process.cwd(), args['html-file']);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: HTML file not found at ${filePath}`);
      process.exit(1);
    }

    const rawHtml = fs.readFileSync(filePath, 'utf8');
    const title = args.title || 'Indigenous Tourism Manitoba e-Newsletter';
    const permalinkUrl = args.url || '';
    const sentDate = args.date || '';
    const editionLabel = args.edition || '';

    if (dryRun) {
      const phpCode = `
        $html = file_get_contents('php://stdin');
        $res = itm_transform_ctct_html_to_blocks($html, ${JSON.stringify(permalinkUrl)}, '');
        echo wp_json_encode($res);
      `;
      const out = runWpEval(phpCode, rawHtml);
      const parsed = JSON.parse(out);
      console.log('\n--- [DRY RUN: HTML -> GUTENBERG BLOCKS] ---');
      console.log(`Title:      ${title}`);
      console.log(`Status:     ${status}`);
      console.log(`Category:   Newsletter`);
      console.log(`Hero Image: ${parsed.hero_image || '(none)'}`);
      console.log(`Excerpt:    ${parsed.excerpt}`);
      console.log('\nGenerated Gutenberg Content:\n');
      console.log(parsed.block_content);
      return;
    }

    const phpCode = `
      $html = file_get_contents('php://stdin');
      $res = itm_create_newsletter_post_from_campaign(array(
        'campaign_id'   => 'file_' . md5($html),
        'title'         => ${JSON.stringify(title)},
        'html_content'  => $html,
        'permalink_url' => ${JSON.stringify(permalinkUrl)},
        'sent_date'     => ${JSON.stringify(sentDate)},
        'edition_label' => ${JSON.stringify(editionLabel)},
        'post_status'   => ${JSON.stringify(status)},
      ));
      echo wp_json_encode($res);
    `;
    const out = runWpEval(phpCode, rawHtml);
    const res = JSON.parse(out);

    if (res.created) {
      console.log(`\n✅ Created Newsletter Draft Post #${res.post_id}: "${res.title}"`);
      console.log(`   Status:   ${res.status}`);
      console.log(`   Edit URL: ${res.edit_url}`);
      console.log(`   Preview:  ${res.view_url}\n`);
    } else if (res.skipped) {
      console.log(`\nℹ️  Skipped (already imported as Post #${res.post_id}): "${res.title}"`);
      console.log(`   Edit URL: ${res.edit_url}\n`);
    } else {
      console.error(`\n❌ Failed to create post: ${res.error || 'Unknown error'}\n`);
      process.exit(1);
    }
    return;
  }

  // Mode 2: Constant Contact Archive URL Import
  if (args.url) {
    console.log(`\n🌐 Fetching Constant Contact archive URL: ${args.url} ...`);
    const phpCode = `
      $res = itm_import_newsletter_from_archive_url(
        ${JSON.stringify(args.url)},
        array(
          'title'         => ${JSON.stringify(args.title || '')},
          'date'          => ${JSON.stringify(args.date || '')},
          'edition_label' => ${JSON.stringify(args.edition || '')},
          'post_status'   => ${JSON.stringify(status)},
        )
      );
      echo wp_json_encode($res);
    `;
    const out = runWpEval(phpCode);
    const res = JSON.parse(out);

    if (res.created) {
      console.log(`\n✅ Created Newsletter Post #${res.post_id}: "${res.title}"`);
      console.log(`   Status:   ${res.status}`);
      console.log(`   Edit URL: ${res.edit_url}`);
      console.log(`   Preview:  ${res.view_url}\n`);
    } else if (res.skipped) {
      console.log(`\nℹ️  Skipped (already imported as Post #${res.post_id}): "${res.title}"`);
      console.log(`   Edit URL: ${res.edit_url}\n`);
    } else {
      console.error(`\n❌ Failed to import URL: ${res.error || 'Unknown error'}\n`);
      process.exit(1);
    }
    return;
  }

  // Mode 3: Constant Contact v3 API Sync (Default)
  const limit = parseInt(args.limit || '15', 10);
  console.log(`\n🔄 Polling Constant Contact v3 API for sent campaigns on the e-Newsletter list...`);
  const phpCode = `
    if (!defined('ITM_ALLOW_LOCAL_CTCT_SYNC')) {
      define('ITM_ALLOW_LOCAL_CTCT_SYNC', true);
    }
    $res = itm_sync_sent_newsletters_from_constant_contact(array(
      'limit'       => ${limit},
      'post_status' => ${JSON.stringify(status)},
    ));
    echo wp_json_encode($res);
  `;

  const out = runWpEval(phpCode);
  const res = JSON.parse(out);

  if (!res.success) {
    console.error(`\n⚠️  Constant Contact API sync returned an error: ${res.error}`);
    console.log(`   Note: If running locally without an active production OAuth token, use --url="https://conta.cc/..." or --html-file="..." to test importing directly.\n`);
    process.exit(1);
  }

  console.log(`\n🎉 Sync complete!`);
  console.log(`   Newly Created Drafts: ${(res.imported || []).length}`);
  console.log(`   Skipped Campaigns:    ${(res.skipped || []).length}`);

  if (res.imported && res.imported.length > 0) {
    console.log('\nCreated Newsletter Posts:');
    for (const item of res.imported) {
      console.log(`  - [#${item.post_id}] "${item.title}" (${item.status})`);
      console.log(`    Edit: ${item.edit_url}`);
    }
  }
  console.log('');
}

main().catch(err => {
  console.error(`\n❌ Error: ${err.message}\n`);
  process.exit(1);
});
