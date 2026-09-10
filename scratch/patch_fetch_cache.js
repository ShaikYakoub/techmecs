const fs = require('fs');

for (const file of ['public/modules/kOgwlcBkr.DQpAbsRK.mjs', 'public/modules/T0aOdsSzY.CVdqHoGH.mjs']) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('let r=await fetch(e,t);')) {
    content = content.replace('let r=await fetch(e,t);', "let r=await fetch(e,{...t,cache:'no-store'});");
    fs.writeFileSync(file, content, 'utf8');
    console.log('Patched fetch cache in', file);
  }
}
