const http = require('http');

http.get('http://localhost:5173/cms/kOgwlcBkr-indexes-default-0.framercms?range=6177-8900', (res) => {
  const chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
    const buf = Buffer.concat(chunks);
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('Received length:', buf.length);
    console.log('Expected length:', 8900 - 6177 + 1); // 2724
  });
});
