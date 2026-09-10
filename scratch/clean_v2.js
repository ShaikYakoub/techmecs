const fs = require('fs');

for (const file of ['public/modules/kOgwlcBkr.DQpAbsRK.mjs', 'public/modules/T0aOdsSzY.CVdqHoGH.mjs']) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replaceAll('.framercms?v=2`', '.framercms`');
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Cleaned URLs');
