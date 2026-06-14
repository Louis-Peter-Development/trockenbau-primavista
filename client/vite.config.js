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
      '/api': 'http://localhost:8787',
    },
  },
});
