const fs = require('fs');
const path = require('path');

const BASE_SITE = 'https://framerusercontent.com/sites/650ovdcXNrUyveRRfGW8Ip/';
const MODULES_DIR = path.join(__dirname, 'public', 'modules');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const FONTS_DIR = path.join(__dirname, 'public', 'fonts');

fs.mkdirSync(MODULES_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(FONTS_DIR, { recursive: true });

const downloaded = new Set();

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath)) {
    return;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: ${res.status}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`Downloaded ${path.basename(destPath)} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

// Extract imports from JS file (quotes, double quotes, backticks)
function extractImports(content) {
  const matches = [];
  const regex1 = /from\s*[`'"]\.\/([^`'"]+)[`'"]/g;
  const regex2 = /import\s*\(\s*[`'"]\.\/([^`'"]+)[`'"]\s*\)/g;
  let m;
  while ((m = regex1.exec(content)) !== null) matches.push(m[1]);
  while ((m = regex2.exec(content)) !== null) matches.push(m[1]);
  return matches;
}

async function crawlModules(entryFile) {
  const queue = [entryFile];
  while (queue.length > 0) {
    const fileName = queue.shift();
    if (downloaded.has(fileName)) continue;
    downloaded.add(fileName);

    const fileUrl = fileName.startsWith('http') ? fileName : BASE_SITE + fileName;
    const localPath = path.join(MODULES_DIR, fileName.split('?')[0]);

    await downloadFile(fileUrl, localPath);

    if (fs.existsSync(localPath)) {
      const content = fs.readFileSync(localPath, 'utf8');
      const imports = extractImports(content);
      for (const imp of imports) {
        if (!downloaded.has(imp)) {
          queue.push(imp);
        }
      }
    }
  }
}

async function main() {
  console.log('--- Step 1: Downloading all JS modules ---');
  await crawlModules('script_main.ad2XKncb.mjs');
  console.log(`Finished downloading ${downloaded.size} modules.`);
}

main().catch(console.error);
