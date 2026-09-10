const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'modules');
let fixedCount = 0;

for (const file of fs.readdirSync(dir)) {
  const filePath = path.join(dir, file);
  if (!fs.statSync(filePath).isFile()) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace any new URL(something, `/modules/...` or '/modules/...') with new URL(something, import.meta.url)
  content = content.replace(/new\s+URL\s*\(([^,]+),\s*[`'"]\/modules\/[^`'"]+[`'"]\s*\)/g, (match, arg1) => {
    return `new URL(${arg1}, import.meta.url)`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed URL base in ${file}`);
    fixedCount++;
  }
}

console.log(`Total files fixed: ${fixedCount}`);
