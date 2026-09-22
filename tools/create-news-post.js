#!/usr/bin/env node
/**
 * ITM News Mention Post Creator
 * 
 * Rapidly creates WordPress "News Mention" posts with:
 * - News story overview summary
 * - Explicit Organization / ITM Involvement section
 * - Accessible external link button
 * - Automatic "News" category assignment (ID: 34)
 * - Single-command CLI flags, batch JSON processing, or dry-run inspection
 * 
 * Usage:
 *   node tools/create-news-post.js --url="https://..." --title="..." --summary="..." --involvement="..."
 *   node tools/create-news-post.js --file=articles.json
 *   node tools/create-news-post.js --dry-run [options]
 */

import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const NEWS_CATEGORY_ID = 34; // News category in ITM WordPress

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
ITM News Mention Post Creator
==============================
Quickly create formatted, accessible News Mention posts on Indigenous Tourism Manitoba.

Options:
  --title        Post title (e.g. "CBC News: Indigenous Culinary Tourism in Manitoba")
  --publication  Name of the news source (e.g. "CBC News", "Winnipeg Free Press")
  --url          Target outbound URL to the original news article
  --summary      Short summary paragraph of the news article
  --involvement  Paragraph describing ITM / member operator involvement and impact
  --excerpt      1-2 sentence card excerpt for /updates/ (defaults to summary if omitted)
  --date         Post publication date (YYYY-MM-DD or YYYY-MM-DD HH:MM:SS)
  --status       Post status: 'draft' (default) or 'publish'
  --file         Path to a JSON file containing an array of article objects for batch creation
  --dry-run      Preview generated Gutenberg block markup and WP command without database writes
  --help, -h     Show this help message

Batch JSON File Format:
  [
    {
      "publication": "CBC News",
      "title": "CBC News: Indigenous Tourism Surge",
      "url": "https://www.cbc.ca/news/...",
      "summary": "CBC News reports on the growing demand...",
      "involvement": "ITM is supporting member operators...",
      "excerpt": "CBC News highlights the surge in Manitoba Indigenous tourism.",
      "date": "2025-06-12",
      "status": "draft"
    }
  ]
`);
}

/**
 * Escape HTML special characters for safe block output
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Build canonical Gutenberg block markup for an ITM News Mention
 */
export function buildGutenbergContent({ publication, summary, involvement, url }) {
  const pubName = publication ? publication.trim() : 'External Publication';
  const cleanSummary = summary ? summary.trim() : '';
  const cleanInvolvement = involvement ? involvement.trim() : '';
  const cleanUrl = url ? url.trim() : '#';

  // Split into paragraphs if multi-line text provided
  const formatParagraphs = (text) => {
    return text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<!-- wp:paragraph -->\n<p>${escapeHtml(p)}</p>\n<!-- /wp:paragraph -->`)
      .join('\n');
  };

  const summaryBlocks = formatParagraphs(cleanSummary);
  const involvementBlocks = formatParagraphs(cleanInvolvement);

  let content = `<!-- wp:heading {"level":2} -->\n<h2 class="wp-block-heading">Featured in ${escapeHtml(pubName)}</h2>\n<!-- /wp:heading -->\n\n`;
  content += `${summaryBlocks}\n\n`;

  if (cleanInvolvement) {
    content += `<!-- wp:heading {"level":3} -->\n<h3 class="wp-block-heading">Our Involvement</h3>\n<!-- /wp:heading -->\n\n`;
    content += `${involvementBlocks}\n\n`;
  }

  content += `<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"left"}} -->
<div class="wp-block-buttons">
\t<!-- wp:button {"className":"btn btn--primary is-external-link","lock":{"remove":true}} -->
\t<div class="wp-block-button btn btn--primary is-external-link"><a class="wp-block-button__link wp-element-button" href="${escapeHtml(cleanUrl)}" target="_blank" rel="noopener noreferrer">Read the full story at ${escapeHtml(pubName)} <span class="screen-reader-text">(opens in a new tab)</span><svg class="external-link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div>
\t<!-- /wp:button -->
</div>
<!-- /wp:buttons -->`;

  return content;
}

/**
 * Detect whether lando wp or local wp is available
 */
function getWpCommandPrefix() {
  try {
    execSync('lando wp --version 2>/dev/null', { stdio: 'pipe' });
    return 'lando wp';
  } catch {
    try {
      execSync('wp --version 2>/dev/null', { stdio: 'pipe' });
      return 'wp';
    } catch {
      return null;
    }
  }
}

/**
 * Execute post creation via WP-CLI
 */
export function createWordPressPost(article, options = {}) {
  const { dryRun = false } = options;
  const wpPrefix = getWpCommandPrefix();

  const publication = article.publication || (article.title ? article.title.split(':')[0].trim() : 'News');
  let title = article.title;
  if (!title) {
    title = `${publication}: News Coverage`;
  }

  const content = buildGutenbergContent({
    publication,
    summary: article.summary || '',
    involvement: article.involvement || '',
    url: article.url || '#'
  });

  const excerpt = article.excerpt || article.summary || '';
  const status = article.status || 'draft';
  const postDate = article.date ? (article.date.includes(':') ? article.date : `${article.date} 12:00:00`) : null;

  if (dryRun) {
    console.log('\n--- [DRY RUN PREVIEW] ---');
    console.log(`Title:    ${title}`);
    console.log(`Status:   ${status}`);
    console.log(`Category: News (ID: ${NEWS_CATEGORY_ID})`);
    if (postDate) console.log(`Date:     ${postDate}`);
    console.log(`Excerpt:  ${excerpt}`);
    console.log('\nGenerated Gutenberg Content:\n');
    console.log(content);
    console.log('\nWP-CLI Command Preview:');
    console.log(`${wpPrefix || 'lando wp'} post create --post_type=post --post_title="${title}" --post_status="${status}" --post_category=${NEWS_CATEGORY_ID} ...\n`);
    return { success: true, dryRun: true, title, content };
  }

  if (!wpPrefix) {
    throw new Error('Neither "lando wp" nor "wp" CLI was found in your PATH.');
  }

  try {
    const cmdArgs = [
      'post',
      'create',
      '-',
      `--post_type=post`,
      `--post_title=${title}`,
      `--post_status=${status}`,
      `--post_category=${NEWS_CATEGORY_ID}`,
      `--post_excerpt=${excerpt}`,
      '--porcelain'
    ];

    if (postDate) {
      cmdArgs.push(`--post_date=${postDate}`);
    }

    let result;
    if (wpPrefix === 'lando wp') {
      result = spawnSync('lando', ['wp', ...cmdArgs], { input: content, encoding: 'utf8' });
    } else {
      result = spawnSync('wp', cmdArgs, { input: content, encoding: 'utf8' });
    }

    if (result.error) {
      throw result.error;
    }

    const output = (result.stdout || '').trim();
    const postIdMatch = output.match(/(\d+)/);
    const postId = postIdMatch ? postIdMatch[1] : output;

    if (result.status !== 0 || !postId) {
      throw new Error(`WP-CLI post creation failed: ${result.stderr || result.stdout}`);
    }

    return {
      success: true,
      postId,
      title,
      status,
      category: 'News',
      editUrl: `/wp-admin/post.php?post=${postId}&action=edit`,
      previewUrl: `/?p=${postId}&preview=true`
    };
  } catch (err) {
    throw err;
  }
}

// Main execution
async function main() {
  const args = parseArgs();

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  // Batch file processing
  if (args.file) {
    const filePath = path.resolve(process.cwd(), args.file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: File not found at ${filePath}`);
      process.exit(1);
    }

    const rawData = fs.readFileSync(filePath, 'utf8');
    let articles;
    try {
      articles = JSON.parse(rawData);
      if (!Array.isArray(articles)) {
        articles = [articles];
      }
    } catch (e) {
      console.error(`❌ Error parsing JSON file: ${e.message}`);
      process.exit(1);
    }

    console.log(`\n🚀 Processing batch of ${articles.length} news article(s)...\n`);
    const results = [];

    for (let i = 0; i < articles.length; i++) {
      const item = articles[i];
      console.log(`[${i + 1}/${articles.length}] Creating post: "${item.title || item.url || 'Untitled'}"...`);
      try {
        const res = createWordPressPost(item, { dryRun: args.dryRun });
        results.push(res);
        if (res.dryRun) {
          console.log(`  🔎 Dry run preview generated.`);
        } else {
          console.log(`  ✅ Created post ID #${res.postId} (${res.status})`);
          console.log(`     Edit: ${res.editUrl}`);
        }
      } catch (err) {
        console.error(`  ❌ Failed: ${err.message}`);
      }
    }

    console.log(`\n🎉 Batch processing complete! ${results.length} processed.`);
    return;
  }

  // Single article processing
  if (!args.url && !args.title && !args.summary) {
    console.log('No article parameters provided. Showing help:');
    printHelp();
    process.exit(0);
  }

  console.log('\n📰 Creating ITM News Mention Post...');
  try {
    const result = createWordPressPost(args, { dryRun: args.dryRun });

    if (result.dryRun) {
      console.log('✅ Dry run completed successfully.');
    } else {
      console.log('\n🎉 Post successfully created in WordPress!');
      console.log(`  ID:          ${result.postId}`);
      console.log(`  Title:       ${result.title}`);
      console.log(`  Status:      ${result.status}`);
      console.log(`  Category:    News (ID: 34)`);
      console.log(`  Admin Edit:  ${result.editUrl}`);
      console.log(`  Preview URL: ${result.previewUrl}\n`);
    }
  } catch (err) {
    console.error(`\n❌ Error creating post: ${err.message}\n`);
    process.exit(1);
  }
}

// Only run CLI if invoked directly
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isDirectRun) {
  main();
}
