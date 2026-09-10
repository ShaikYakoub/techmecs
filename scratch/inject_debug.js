const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const debugScript = `<script>
window.addEventListener('error', function(e) {
  console.error('CAUGHT_EXACT_ERROR:', e.message, 'AT:', e.filename, 'LINE:', e.lineno, 'COL:', e.colno, 'STACK:', e.error ? e.error.stack : 'no stack');
});
</script>`;

html = html.replace('<head>', '<head>\n' + debugScript);
fs.writeFileSync('index.html', html);
console.log('Successfully injected error listener.');
