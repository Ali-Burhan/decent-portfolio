import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ali Burhan - Full Stack Engineer',
    short_name: 'Ali Burhan',
    description:
      'Full Stack Engineer specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['technology', 'portfolio', 'developer', 'programming'],
  }
}
