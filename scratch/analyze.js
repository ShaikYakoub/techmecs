const fs = require('fs');

const s = fs.readFileSync('script_main.js', 'utf8');
const idx = s.indexOf('uo={');
const endIdx = s.indexOf(',po=', idx);
console.log(s.substring(idx, endIdx));
