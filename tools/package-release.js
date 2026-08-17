#!/usr/bin/env node
/**
 * ITM Theme Release Packaging Script
 *
 * Compiles production assets and packages a clean `dist/kiwatinook.zip`
 * suitable for attachment to GitHub Releases (read by Plugin Update Checker).
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '..');
const distDir = path.join(themeRoot, 'dist');
const stageDir = path.join(distDir, 'kiwatinook');
const zipFile = path.join(distDir, 'kiwatinook.zip');

console.log('======================================================');
console.log('📦 Packaging ITM Theme Release: kiwatinook.zip');
console.log('======================================================\n');

// 1. Build assets
console.log('🔨 Step 1: Compiling production JS & CSS bundles...');
execSync('npm run build', { cwd: themeRoot, stdio: 'inherit' });

// 2. Clean & recreate staging directory
console.log('\n📁 Step 2: Staging clean production files...');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

// Copy function with exclusion filtering
function copyRecursive(src, dest, filterFn) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (filterFn && !filterFn(src, true)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry), filterFn);
    }
  } else {
    if (filterFn && !filterFn(src, false)) return;
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// Ignore list
const ignoreList = [
  'node_modules',
  '.git',
  '.github',
  'docs',
  'tools',
  'dist',
  'src',
  '.DS_Store',
  'package.json',
  'package-lock.json',
  'gulpfile.js',
  'webpack.config.js',
  '.gitignore',
  'less',
];

function shouldInclude(filePath, isDir) {
  const base = path.basename(filePath);
  if (ignoreList.includes(base)) return false;
  if (base.endsWith('.less') && !isDir) return false;
  if (base.endsWith('.map') && !isDir) return false;
  return true;
}

// Copy top-level PHP files, style.css, screenshot.png
const rootFiles = fs.readdirSync(themeRoot);
for (const file of rootFiles) {
  const fullPath = path.join(themeRoot, file);
  const stats = fs.statSync(fullPath);

  if (!stats.isDirectory()) {
    if (file.endsWith('.php') || file === 'style.css' || file === 'screenshot.png' || file === 'readme.txt' || file === 'README.md') {
      fs.copyFileSync(fullPath, path.join(stageDir, file));
    }
  }
}

// Copy essential folders
const includeDirs = ['inc', 'blocks', 'template-parts', 'js', 'languages', 'assets'];
for (const dir of includeDirs) {
  const src = path.join(themeRoot, dir);
  const dest = path.join(stageDir, dir);
  copyRecursive(src, dest, shouldInclude);
}

console.log('✅ Staged files successfully in dist/kiwatinook/');

// 3. Compress into zip
console.log('\n🗜️  Step 3: Creating kiwatinook.zip...');
try {
  execSync(`cd "${distDir}" && zip -rq "kiwatinook.zip" "kiwatinook"`, { stdio: 'inherit' });
} catch (e) {
  // Fallback to tar/zip if zip command differs
  console.warn('Zip command fallback:', e.message);
}

// Clean up temporary stage directory, leaving only the zip
fs.rmSync(stageDir, { recursive: true, force: true });

if (fs.existsSync(zipFile)) {
  const zipStats = fs.statSync(zipFile);
  const sizeKb = (zipStats.size / 1024).toFixed(1);
  const sizeMb = (zipStats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 Release archive generated successfully!`);
  console.log(`   File: ${zipFile}`);
  console.log(`   Size: ${sizeKb} KB (${sizeMb} MB)`);
} else {
  console.error('❌ Failed to generate release zip file.');
  process.exit(1);
}
