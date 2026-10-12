const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makePng(width, height, r, g, b) {
  // 8-byte signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrTypeAndData = Buffer.concat([Buffer.from('IHDR'), ihdrData]);
  const ihdrCrc = crc32(ihdrTypeAndData);
  const ihdrChunk = Buffer.alloc(4 + 4 + 13 + 4);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.set(ihdrTypeAndData, 4);
  ihdrChunk.writeUInt32BE(ihdrCrc, 21);

  // Scanlines with filter byte 0
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  
  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.45;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = (x - cx) / radius;
      const dy = (y - cy) / radius;
      
      // Heart equation: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
      // Adjust coordinates:
      const hx = (x - cx) / (width * 0.32);
      const hy = -(y - cy * 0.95) / (height * 0.32);
      const heartEq = Math.pow(hx * hx + hy * hy - 0.7, 3) - hx * hx * Math.pow(hy, 3);

      if (heartEq <= 0) {
        // Muted Rose (#D88C88)
        rawData[pxOffset] = 0xd8;
        rawData[pxOffset + 1] = 0x8c;
        rawData[pxOffset + 2] = 0x88;
        rawData[pxOffset + 3] = 255;
      } else {
        // Warm blush pink background (#F2E1DD)
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatTypeAndData = Buffer.concat([Buffer.from('IDAT'), compressed]);
  const idatCrc = crc32(idatTypeAndData);
  const idatChunk = Buffer.alloc(4 + 4 + compressed.length + 4);
  idatChunk.writeUInt32BE(compressed.length, 0);
  idatChunk.set(idatTypeAndData, 4);
  idatChunk.writeUInt32BE(idatCrc, 8 + compressed.length);

  // IEND
  const iendType = Buffer.from('IEND');
  const iendCrc = crc32(iendType);
  const iendChunk = Buffer.alloc(12);
  iendChunk.writeUInt32BE(0, 0);
  iendChunk.set(iendType, 4);
  iendChunk.writeUInt32BE(iendCrc, 8);

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), makePng(192, 192, 0xf2, 0xe1, 0xdd));
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), makePng(512, 512, 0xf2, 0xe1, 0xdd));
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), makePng(180, 180, 0xf2, 0xe1, 0xdd));
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), makePng(32, 32, 0xf2, 0xe1, 0xdd));

console.log('PNG icons generated successfully.');
