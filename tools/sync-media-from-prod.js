/**
 * High-Speed Precise Media Asset Synchronization Tool
 * Fetches exact media library uploads and generated thumbnails from the live production site (https://indigenoustourismmanitoba.ca/)
 * based on WordPress database attachment metadata.
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { themeRoot } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROD_BASE = 'https://indigenoustourismmanitoba.ca';
const uploadsDir = path.resolve(themeRoot, '..', '..', 'uploads');

fs.mkdirSync(uploadsDir, { recursive: true });

function downloadFile(url, destPath) {
  return new Promise((resolve) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, { rejectUnauthorized: false, timeout: 10000 }, response => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        try { if (fs.existsSync(destPath)) fs.unlinkSync(destPath); } catch(e) {}
        downloadFile(response.headers.location, destPath).then(resolve);
      } else {
        file.close();
        try { if (fs.existsSync(destPath)) fs.unlinkSync(destPath); } catch(e) {}
        resolve(false);
      }
    });

    req.on('error', () => {
      file.close();
      try { if (fs.existsSync(destPath)) fs.unlinkSync(destPath); } catch(e) {}
      resolve(false);
    });

    req.on('timeout', () => {
      req.destroy();
      file.close();
      try { if (fs.existsSync(destPath)) fs.unlinkSync(destPath); } catch(e) {}
      resolve(false);
    });
  });
}

// Concurrency pool runner
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

async function syncMedia() {
  console.log(`\n======================================================`);
  console.log(`📥 High-Speed Precise Media Sync from: ${PROD_BASE}`);
  console.log(`   Destination: ${uploadsDir}`);
  console.log(`======================================================\n`);

  let filesJson = '[]';
  try {
    const rawOutput = execSync(
      `lando wp eval '$posts = get_posts(["post_type" => "attachment", "numberposts" => -1]); $files = []; foreach ($posts as $p) { $main = get_post_meta($p->ID, "_wp_attached_file", true); if ($main) { $files[] = $main; $meta = wp_get_attachment_metadata($p->ID); if (!empty($meta["sizes"])) { $dir = dirname($main); foreach ($meta["sizes"] as $s) { $files[] = ($dir !== "." ? $dir . "/" : "") . $s["file"]; } } } } echo json_encode(array_values(array_unique($files)));'`,
      { cwd: themeRoot, encoding: 'utf8' }
    );
    filesJson = rawOutput.trim();
  } catch (err) {
    console.error('Failed to query attachment files via WP CLI:', err.message);
    return;
  }

  let exactFiles = [];
  try {
    exactFiles = JSON.parse(filesJson);
  } catch (e) {
    console.error('Failed to parse exact files JSON');
    return;
  }

  const missingFiles = exactFiles.filter(rel => !fs.existsSync(path.join(uploadsDir, rel)));

  console.log(`Total exact files in WordPress database: ${exactFiles.length}`);
  console.log(`Already present locally: ${exactFiles.length - missingFiles.length}`);
  console.log(`Missing files to download: ${missingFiles.length}\n`);

  if (missingFiles.length === 0) {
    console.log(`✨ All media files are already synced locally!`);
    return;
  }

  let downloadedCount = 0;
  let notFoundCount = 0;
  let completedCount = 0;

  await asyncPool(20, missingFiles, async (relPath) => {
    const localFilePath = path.join(uploadsDir, relPath);
    const prodFileUrl = `${PROD_BASE}/wp-content/uploads/${relPath}`;

    const success = await downloadFile(prodFileUrl, localFilePath);
    completedCount++;
    if (success) {
      downloadedCount++;
    } else {
      notFoundCount++;
    }

    if (completedCount % 50 === 0 || completedCount === missingFiles.length) {
      console.log(`  ⏳ Progress: ${completedCount}/${missingFiles.length} (${downloadedCount} downloaded, ${notFoundCount} not on prod)`);
    }
  });

  console.log(`\n------------------------------------------------------`);
  console.log(`🎉 Media Sync Finished!`);
  console.log(`   - Downloaded from production: ${downloadedCount}`);
  console.log(`   - 404 on prod (abandoned in DB): ${notFoundCount}`);
  console.log(`   - Total Local Media Files: ${exactFiles.length - notFoundCount}`);
  console.log(`------------------------------------------------------\n`);
}

syncMedia().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
