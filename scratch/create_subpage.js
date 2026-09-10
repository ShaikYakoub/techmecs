const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const mainStart = html.indexOf('<div id="main"');
let depth = 0;
let pos = mainStart;
let closingPos = -1;

while (pos < html.length) {
  const nextOpen = html.indexOf('<div', pos);
  const nextClose = html.indexOf('</div>', pos);

  if (nextClose === -1) break;

  if (nextOpen !== -1 && nextOpen < nextClose) {
    depth++;
    pos = nextOpen + 4;
  } else {
    depth--;
    if (depth === 0) {
      closingPos = nextClose;
      break;
    }
    pos = nextClose + 6;
  }
}

const subpageHtml = html.slice(0, mainStart) + '<div id="main"></div>' + html.slice(closingPos + 6);
fs.writeFileSync('public/subpage.html', subpageHtml, 'utf8');
console.log('Created public/subpage.html, size:', subpageHtml.length);
