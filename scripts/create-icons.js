const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate an SVG with warm aesthetic matching the reference
function generateSvg(size) {
  const heartScale = size / 512;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFF9F2" />
        <stop offset="100%" stop-color="#F2E1DD" />
      </radialGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="${4 * heartScale}" stdDeviation="${8 * heartScale}" flood-color="#795C53" flood-opacity="0.25" />
      </filter>
    </defs>
    
    <!-- Background rounded square -->
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#F2E1DD"/>
    
    <!-- Inner Card -->
    <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.18}" fill="#FFF9F2" filter="url(#shadow)"/>
    
    <!-- Envelope Flap / Heart -->
    <g transform="translate(${size * 0.5}, ${size * 0.48}) scale(${heartScale * 0.85}) translate(-256, -256)">
      <!-- Heart path -->
      <path d="M256,440 C140,340 60,260 60,165 C60,95 115,40 185,40 C225,40 256,70 256,70 C256,70 287,40 327,40 C397,40 452,95 452,165 C452,260 372,340 256,440 Z" fill="#D88C88"/>
      <!-- Inner shine -->
      <path d="M256,410 C160,325 90,250 90,165 C90,110 135,68 185,68 C220,68 245,95 256,105 C267,95 292,68 327,68 C377,68 422,110 422,165 C422,250 352,325 256,410 Z" fill="#E5A7A3" opacity="0.4"/>
      <!-- Monogram text -->
      <text x="256" y="220" font-family="sans-serif" font-size="70" font-weight="bold" fill="#FFF9F2" text-anchor="middle" dominant-baseline="middle">Z ❤️ H</text>
    </g>
  </svg>`;
}

// Write SVG files
fs.writeFileSync(path.join(iconsDir, 'icon-192x192.svg'), generateSvg(192));
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.svg'), generateSvg(512));
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), generateSvg(180));
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), generateSvg(64));

console.log('SVG icons generated successfully.');
