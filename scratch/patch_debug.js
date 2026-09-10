const fs = require('fs');

let content = fs.readFileSync('public/modules/kOgwlcBkr.DQpAbsRK.mjs', 'utf8');
content = content.replace('console.log("CMS_DEBUG:', 'console.error("CMS_DEBUG:');
fs.writeFileSync('public/modules/kOgwlcBkr.DQpAbsRK.mjs', content, 'utf8');
console.log('Replaced with console.error');
