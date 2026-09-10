const fs = require('fs');
const html = fs.readFileSync('public/subpage.html', 'utf8');
const appearIdx = html.indexOf('data-framer-appear-animation');
console.log(html.slice(appearIdx - 50, appearIdx + 400));
