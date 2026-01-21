import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: "Model1",
        description: "DeepSeek Model1 Online Playground & API",
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0f1a',
        theme_color: '#3b82f6',
        icons: [
            {
                src: '/icon',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/apple-icon',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
