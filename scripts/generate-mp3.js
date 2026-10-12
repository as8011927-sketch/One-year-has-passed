const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Generate valid MP3 frames (MPEG-1 Layer III, 128 kbps, 44.1 kHz, stereo)
// Header: 1111 1111 1111 1011 1001 0000 0000 0000 => FF FB 90 00
// Frame size = 144 * BitRate / SampleRate = 144 * 128000 / 44100 = 417 bytes
const frameHeader = Buffer.from([0xFF, 0xFB, 0x90, 0x00]);
const frameSize = 417;
const frameData = Buffer.alloc(frameSize - 4, 0x55); // silent/gentle test pattern
const singleFrame = Buffer.concat([frameHeader, frameData]);

// Create ~30 seconds of audio frames (~1140 frames)
const totalFrames = 1140;
const chunks = [];
for (let i = 0; i < totalFrames; i++) {
  chunks.push(singleFrame);
}

const mp3Buffer = Buffer.concat(chunks);
fs.writeFileSync(path.join(audioDir, 'do-re-mi.mp3'), mp3Buffer);
console.log('Generated public/audio/do-re-mi.mp3 with length:', mp3Buffer.length);
