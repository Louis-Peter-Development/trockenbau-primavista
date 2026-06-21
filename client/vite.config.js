import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isNetlifyDev = process.env.NETLIFY_DEV === 'true';

export default defineConfig({
  envDir: '..',
  plugins: [react()],
  server: {
    host: true,
    open: !isNetlifyDev,
    port: 5178,
    strictPort: true,
    proxy: {
      // Netlify Dev serves the functions/redirects on 8888 (see netlify.toml [dev]).
      // Only used when hitting Vite directly; under `netlify dev` requests come via 8888.
      '/api': 'http://localhost:8888',
    },
  },
});
