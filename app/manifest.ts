import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ali Burhan - Full Stack Developer & Architect',
    short_name: 'Ali Burhan',
    description:
      'Full Stack Developer & Architect specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['technology', 'portfolio', 'developer', 'programming'],
    screenshots: [
      {
        src: '/og-image.png',
        sizes: '1200x630',
        type: 'image/png',
        label: 'Ali Burhan Portfolio',
      },
    ],
  }
}
