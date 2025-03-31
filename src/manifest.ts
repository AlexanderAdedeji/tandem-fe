
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tandem',
    short_name: 'Tandem',
    description: 'A collaborative, goal-oriented PWA for families and teams',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2ABFA3',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
