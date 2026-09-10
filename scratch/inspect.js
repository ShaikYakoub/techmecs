const fs = require('fs');
const content = fs.readFileSync('public/modules/kOgwlcBkr.DQpAbsRK.mjs', 'utf8');

const idx = content.indexOf('W=async(e,t)=>{');
console.log(content.slice(idx, idx + 400));
