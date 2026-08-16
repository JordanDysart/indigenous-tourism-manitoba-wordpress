import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '../..');

const migrationPhpPath = path.join(themeRoot, 'inc', 'm2-pages-migration.php');
const migrationPhp = fs.readFileSync(migrationPhpPath, 'utf8');

console.log('=== ADVERSARIAL STRESS TEST: GUTENBERG BLOCK GRAMMAR & JSON INTEGRITY ===');

const PAGE_IDS = [22, 283, 463, 435, 2367, 2373, 605, 1769, 1518, 2572, 2734, 2534, 2537, 2542, 2676];

let syntaxErrors = 0;
let jsonCount = 0;

for (const id of PAGE_IDS) {
  const startIdx = migrationPhp.indexOf(`${id} => [`);
  const endIdx = migrationPhp.indexOf('],', startIdx);
  const blockData = migrationPhp.substring(startIdx, endIdx + 2);
  const contentStart = blockData.indexOf("'content' => '");
  const rawContentStr = blockData.substring(contentStart + "'content' => '".length);
  const contentEnd = rawContentStr.lastIndexOf("',");
  const content = rawContentStr.substring(0, contentEnd).replace(/\\'/g, "'").replace(/\\\\/g, "\\");

  // Find all Gutenberg block comments
  const blockRegex = /<!--\s*(wp:|\/wp:)([a-z0-9\/-]+)(?:\s+(\{[\s\S]*?\}))?\s*(\/)?-->/g;
  let match;
  const blockStack = [];

  while ((match = blockRegex.exec(content)) !== null) {
    const isClosing = match[1] === '/wp:';
    const blockName = match[2];
    const jsonStr = match[3];
    const isSelfClosing = match[4] === '/';

    if (jsonStr) {
      jsonCount++;
      try {
        JSON.parse(jsonStr);
      } catch (err) {
        console.error(`❌ Page ID ${id}: Invalid JSON attributes in block <!-- wp:${blockName} ${jsonStr} -->`);
        console.error(err.message);
        syntaxErrors++;
      }
    }

    if (isSelfClosing) {
      // Self closing, e.g. <!-- wp:relish/banner-block {...} /-->
      continue;
    } else if (isClosing) {
      if (blockStack.length === 0) {
        console.error(`❌ Page ID ${id}: Unexpected closing block <!-- /wp:${blockName} --> with empty stack!`);
        syntaxErrors++;
      } else {
        const top = blockStack.pop();
        if (top !== blockName) {
          console.error(`❌ Page ID ${id}: Mismatched block closing! Expected <!-- /wp:${top} -->, found <!-- /wp:${blockName} -->`);
          syntaxErrors++;
        }
      }
    } else {
      // Opening block
      blockStack.push(blockName);
    }
  }

  if (blockStack.length > 0) {
    console.error(`❌ Page ID ${id}: Unclosed blocks remaining on stack: ${blockStack.join(', ')}`);
    syntaxErrors++;
  } else {
    console.log(`  ✅ Page ID ${id}: Block nesting perfectly balanced (0 unclosed tags).`);
  }
}

console.log(`\nVerified ${jsonCount} JSON attribute payloads across all 15 pages.`);
if (syntaxErrors === 0) {
  console.log('✅ ALL Gutenberg block comments and JSON payloads are 100% VALID and BALANCED.');
  process.exit(0);
} else {
  console.error(`❌ Found ${syntaxErrors} Gutenberg syntax errors!`);
  process.exit(1);
}
