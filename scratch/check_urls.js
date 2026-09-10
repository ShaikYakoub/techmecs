const fs = require('fs');
const path = require('path');

const dir = path.join('public', 'modules');
const files = fs.readdirSync(dir);
const framerUrls = new Set();
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = content.match(/https:\/\/(framerusercontent\.com|fonts\.gstatic\.com)[^"'`\s\)]+/g) || [];
  for (const m of matches) framerUrls.add(m);
}
console.log('Total external URLs found inside modules:', framerUrls.size);
for (const url of Array.from(framerUrls)) {
  console.log(url);
}
