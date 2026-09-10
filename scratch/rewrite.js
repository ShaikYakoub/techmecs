const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, 'public', 'modules');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const FONTS_DIR = path.join(__dirname, 'public', 'fonts');

const imageFiles = new Set(fs.readdirSync(IMAGES_DIR));
const fontFiles = new Set(fs.readdirSync(FONTS_DIR));
const moduleFiles = new Set(fs.readdirSync(MODULES_DIR));

function rewriteString(content) {
  let res = content;

  // 1. Rewrite module URLs: https://framerusercontent.com/sites/650ovdcXNrUyveRRfGW8Ip/<file> -> /modules/<file>
  res = res.replace(/https:\/\/framerusercontent\.com\/sites\/650ovdcXNrUyveRRfGW8Ip\/([a-zA-Z0-9_\-\.]+)/g, (match, file) => {
    return `/modules/${file}`;
  });

  // Rewrite external module imports: https://framerusercontent.com/modules/.../kOgwlcBkr.js -> /modules/kOgwlcBkr.js
  res = res.replace(/https:\/\/framerusercontent\.com\/modules\/[^\/]+\/[^\/]+\/([a-zA-Z0-9_\-\.]+\.js)/g, (match, file) => {
    return `/modules/${file}`;
  });

  // 2. Rewrite images: https://framerusercontent.com/images/<hash>.<ext>(?<query>) -> /images/<hash>.<ext>?<query>
  res = res.replace(/https:\/\/framerusercontent\.com\/images\/([a-zA-Z0-9_\-]+)\.(png|jpg|jpeg|svg|webp)/g, (match, hash, ext) => {
    const fn = `${hash}.${ext}`;
    return `/images/${fn}`;
  });

  // Rewrite assets: https://framerusercontent.com/assets/<hash>.<ext>
  res = res.replace(/https:\/\/framerusercontent\.com\/assets\/([a-zA-Z0-9_\-]+)\.(woff2|png|svg)/g, (match, hash, ext) => {
    const fn = `${hash}.${ext}`;
    if (ext === 'woff2') return `/fonts/${fn}`;
    return `/images/${fn}`;
  });

  // 3. Rewrite gstatic / fontshare fonts
  res = res.replace(/https:\/\/fonts\.gstatic\.com\/[^\s"'`\)]+\/([a-zA-Z0-9_\-]+\.woff2)/g, (match, fn) => {
    return `/fonts/${fn}`;
  });
  res = res.replace(/https:\/\/framerusercontent\.com\/third-party-assets\/fontshare\/[^\s"'`\)]+\/([a-zA-Z0-9_\-]+\.woff2)/g, (match, fn) => {
    return `/fonts/${fn}`;
  });
  res = res.replace(/https:\/\/app\.framerstatic\.com\/Inter-Regular\.latin-JLQMKCHE\.woff2/g, '/fonts/Inter-Regular.latin-JLQMKCHE.woff2');

  return res;
}

// 1. Process cohesion_raw.html -> index.html
console.log('Processing cohesion_raw.html -> index.html');
const rawHtml = fs.readFileSync('cohesion_raw.html', 'utf8');
const rewrittenHtml = rewriteString(rawHtml);
fs.writeFileSync('index.html', rewrittenHtml);
console.log('Created index.html (size:', rewrittenHtml.length, ')');

// 2. Process all modules in public/modules
console.log('Processing modules in public/modules...');
let rewrittenCount = 0;
for (const file of fs.readdirSync(MODULES_DIR)) {
  const filePath = path.join(MODULES_DIR, file);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    const rewritten = rewriteString(content);
    if (rewritten !== content) {
      fs.writeFileSync(filePath, rewritten);
      rewrittenCount++;
    }
  }
}
console.log(`Updated ${rewrittenCount} module files with local paths.`);
