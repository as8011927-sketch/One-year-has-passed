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

function makeRomanticPhoto(width, height, memoryNumber, label) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrTypeAndData = Buffer.concat([Buffer.from('IHDR'), ihdrData]);
  const ihdrChunk = Buffer.alloc(4 + 4 + 13 + 4);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.set(ihdrTypeAndData, 4);
  ihdrChunk.writeUInt32BE(crc32(ihdrTypeAndData), 21);

  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  // Palettes for romantic sunset/cafe/college aesthetic
  const palettes = [
    { r1: 242, g1: 215, b1: 200, r2: 216, g2: 140, b2: 136 }, // memory 1
    { r1: 235, g1: 210, b1: 195, r2: 200, g2: 155, b2: 130 }, // memory 2
    { r1: 248, g1: 225, b1: 220, r2: 225, g2: 150, b2: 150 }, // memory 3
    { r1: 240, g1: 220, b1: 210, r2: 210, g2: 160, b2: 160 }, // memory 4
    { r1: 230, g1: 215, b1: 205, r2: 190, g2: 150, b2: 140 }, // memory 5
    { r1: 245, g1: 220, b1: 220, r2: 220, g2: 140, b2: 140 }, // memory 6
    { r1: 235, g1: 220, b1: 210, r2: 205, g2: 155, b2: 145 }, // memory 7
    { r1: 245, g1: 230, b1: 215, r2: 215, g2: 165, b2: 140 }, // memory 8
  ];

  const p = palettes[(memoryNumber - 1) % palettes.length];

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;
    const factorY = y / height;
    
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const factorX = x / width;
      const t = (factorY * 0.7 + factorX * 0.3);

      // Gradient with subtle vignette and warm light
      const rVal = Math.round(p.r1 * (1 - t) + p.r2 * t);
      const gVal = Math.round(p.g1 * (1 - t) + p.g2 * t);
      const bVal = Math.round(p.b1 * (1 - t) + p.b2 * t);

      // Vignette effect
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const vig = Math.max(0.75, 1 - dist * 0.25);

      rawData[pxOffset] = Math.min(255, Math.round(rVal * vig));
      rawData[pxOffset + 1] = Math.min(255, Math.round(gVal * vig));
      rawData[pxOffset + 2] = Math.min(255, Math.round(bVal * vig));
      rawData[pxOffset + 3] = 255;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatTypeAndData = Buffer.concat([Buffer.from('IDAT'), compressed]);
  const idatChunk = Buffer.alloc(4 + 4 + compressed.length + 4);
  idatChunk.writeUInt32BE(compressed.length, 0);
  idatChunk.set(idatTypeAndData, 4);
  idatChunk.writeUInt32BE(crc32(idatTypeAndData), 8 + compressed.length);

  const iendType = Buffer.from('IEND');
  const iendChunk = Buffer.alloc(12);
  iendChunk.writeUInt32BE(0, 0);
  iendChunk.set(iendType, 4);
  iendChunk.writeUInt32BE(crc32(iendType), 8);

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

const memoriesDir = path.join(__dirname, '..', 'public', 'images', 'memories');
if (!fs.existsSync(memoriesDir)) {
  fs.mkdirSync(memoriesDir, { recursive: true });
}

for (let i = 1; i <= 8; i++) {
  // 600x800 portrait photos
  const buf = makeRomanticPhoto(600, 800, i, `Memory ${i}`);
  fs.writeFileSync(path.join(memoriesDir, `memory-${i}.jpg`), buf);
}

console.log('8 memory placeholder images created successfully in /public/images/memories/.');
