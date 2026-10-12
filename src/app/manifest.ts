import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ziad ❤️ Habiba',
    short_name: 'Our Place ❤️',
    description: 'المكان بتاعنا إحنا الاتنين بس — ذكريات زياد وحبيبة',
    start_url: '/',
    display: 'standalone',
    background_color: '#F2E1DD',
    theme_color: '#F2E1DD',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
