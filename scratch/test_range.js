const fs = require('fs');

// Test range slicing
const testBuf = Buffer.from('0123456789abcdef');
// If range is "2-5"
// e.from = 2, e.to = 6, so e.to - 1 = 5
// length needed is 6 - 2 = 4 bytes ('2345')
// start = 2, end = 5 => testBuf.subarray(start, end + 1) => Buffer.from('2345')
const start = 2;
const end = 5;
const sliced = testBuf.subarray(start, end + 1);
console.log('Sliced:', sliced.toString(), 'Length:', sliced.length);
