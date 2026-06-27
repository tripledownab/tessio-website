import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Apex domain — served at the root, no subpath.
const SITE_BASE = process.env.SITE_BASE ?? '/';
const SITE_URL = process.env.SITE_URL ?? 'https://tessio.eu';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
