// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://eband.com.br',
  adapter: cloudflare(),
  integrations: [mdx(), sitemap(), react()],

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'eband.com.br' },
      { protocol: 'https', hostname: '**.easypanel.host' },
      { protocol: 'https', hostname: '**.mftikx.easypanel.host' },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});