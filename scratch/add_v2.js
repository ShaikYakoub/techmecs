const fs = require('fs');

for (const file of ['public/modules/kOgwlcBkr.DQpAbsRK.mjs', 'public/modules/T0aOdsSzY.CVdqHoGH.mjs']) {
  let content = fs.readFileSync(file, 'utf8');
  // Replace .framercms` with .framercms?v=2`
  content = content.replaceAll('.framercms`', '.framercms?v=2`');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Appended ?v=2 to', file);
}
