const fs = require('fs');

for (const fn of ['public/modules/kOgwlcBkr.js', 'public/modules/T0aOdsSzY.js']) {
  let c = fs.readFileSync(fn, 'utf8');
  c = c.replace(/from\s*["']framer["']/g, 'from "./framer.BLLc2Fy7.mjs"');
  fs.writeFileSync(fn, c);
}
console.log('Fixed bare framer imports in CMS js files');
