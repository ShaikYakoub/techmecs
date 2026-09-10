const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5173;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon'
};

function sendFile(res, filePath, contentType, rangeParam) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    
    let responseData = data;
    if (rangeParam && typeof rangeParam === 'string') {
      const ranges = rangeParam.split(',');
      const chunks = [];
      for (const r of ranges) {
        const parts = r.trim().split('-');
        if (parts.length === 2) {
          const start = parseInt(parts[0], 10);
          const end = parseInt(parts[1], 10);
          if (!isNaN(start) && !isNaN(end) && start <= end) {
            chunks.push(data.subarray(start, end + 1));
          }
        }
      }
      if (chunks.length > 0) {
        responseData = Buffer.concat(chunks);
      }
    }

    const cacheControl = 'no-cache, no-store, must-revalidate';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': responseData.length,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': cacheControl
    });
    res.end(responseData);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const rangeParam = parsedUrl.query?.range;
  let pathname = decodeURIComponent(parsedUrl.pathname);

  console.log(`[REQ] ${req.method} ${pathname} ${rangeParam ? `(range: ${rangeParam})` : ''}`);

  // Handle root
  if (pathname === '/' || pathname === '') {
    return sendFile(res, path.join(__dirname, 'index.html'), MIME_TYPES['.html']);
  }

  // Handle explicit /cms/ files
  if (pathname.startsWith('/cms/')) {
    const filename = pathname.replace('/cms/', '').split('?')[0];
    const filePath = path.join(PUBLIC_DIR, 'cms', filename);
    if (fs.existsSync(filePath)) {
      return sendFile(res, filePath, 'application/octet-stream', rangeParam);
    }
  }

  // Handle module alias
  if (pathname.startsWith('/sites/650ovdcXNrUyveRRfGW8Ip/')) {
    pathname = pathname.replace('/sites/650ovdcXNrUyveRRfGW8Ip/', '/modules/');
  }

  // Check in public/modules
  if (pathname.startsWith('/modules/')) {
    const filename = pathname.replace('/modules/', '').split('?')[0];
    const filePath = path.join(PUBLIC_DIR, 'modules', filename);
    if (fs.existsSync(filePath)) {
      return sendFile(res, filePath, MIME_TYPES['.mjs']);
    }
  }

  // Check in public/images
  if (pathname.startsWith('/images/')) {
    const filename = pathname.replace('/images/', '').split('?')[0];
    const filePath = path.join(PUBLIC_DIR, 'images', filename);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename).toLowerCase();
      return sendFile(res, filePath, MIME_TYPES[ext] || 'application/octet-stream');
    }
  }

  // Check in public/fonts
  if (pathname.startsWith('/fonts/')) {
    const filename = pathname.replace('/fonts/', '').split('?')[0];
    const filePath = path.join(PUBLIC_DIR, 'fonts', filename);
    if (fs.existsSync(filePath)) {
      return sendFile(res, filePath, MIME_TYPES['.woff2']);
    }
  }

  // Check in public/assets
  if (pathname.startsWith('/assets/')) {
    const filename = pathname.replace('/assets/', '').split('?')[0];
    const ext = path.extname(filename).toLowerCase();
    const targetDir = ext === '.woff2' ? 'fonts' : 'images';
    const filePath = path.join(PUBLIC_DIR, targetDir, filename);
    if (fs.existsSync(filePath)) {
      return sendFile(res, filePath, MIME_TYPES[ext] || 'application/octet-stream');
    }
  }

  // Check direct file in public
  const directPublicPath = path.join(PUBLIC_DIR, pathname);
  if (fs.existsSync(directPublicPath) && fs.statSync(directPublicPath).isFile()) {
    const ext = path.extname(directPublicPath).toLowerCase();
    return sendFile(res, directPublicPath, MIME_TYPES[ext] || 'application/octet-stream', rangeParam);
  }

  // SPA fallback for routes like /licensing, /sign-up, /reelio-..., etc.
  return sendFile(res, path.join(PUBLIC_DIR, 'subpage.html'), MIME_TYPES['.html']);
});

server.listen(PORT, () => {
  console.log(`Cohesion Portfolio Server running at http://localhost:${PORT}`);
});
