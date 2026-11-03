import { VitePWAOptions } from 'vite-plugin-pwa';

const manifestFilename = 'app-manifest-v2.json';

export const vitePWAOptions = {
  injectRegister: 'auto',
  strategies: 'injectManifest',
  registerType: 'prompt',
  srcDir: 'src',
  filename: 'sw.ts',
  manifestFilename,
  injectManifest: {
    globPatterns: ['**/*.{js,wasm,css,html}'],
    manifestTransforms: [
      // `cm-edit-` chunks are built only from the rights-gated CmRedactor slice
      // (see chunkFileNames in vite.config.ts), so they must not be pre-downloaded on install.
      manifest => ({ manifest: manifest.filter(({ url }) => !url.startsWith('assets/cm-edit-')) }),
    ],
  },
  manifest: {
    name: 'Jesus my Lord',
    short_name: 'JesmyL',
    description: 'Сборник приложений',
    id: '/',
    scope: '/',
    prefer_related_applications: false,
    related_applications: [{ platform: 'webapp', url: `/${manifestFilename}`, id: '/' }],
    start_url: '/',
    display: 'standalone',
    theme_color: '#587455',
    background_color: '#587455',
    categories: ['christian', 'христианское', 'песни', 'хвала', 'для Иисуса Христа', 'JesmyL'],
    icons: [
      {
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    share_target: {
      action: '/share',
      method: 'GET',
      enctype: 'application/x-www-form-urlencoded',
      params: {
        title: 'shareText',
        text: 'shareDescription',
      },
    },
    shortcuts: [
      {
        name: 'Песни возрождённых',
        url: '/cm',
      },
    ],
    handle_links: 'preferred',
    launch_handler: {
      client_mode: 'focus-existing',
    },
  },
} satisfies Partial<VitePWAOptions>;
