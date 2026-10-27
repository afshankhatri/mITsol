import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  plugins: [
    react(),
    process.env.ANALYZE === 'true' &&
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
    {
      name: 'seo-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('X-Robots-Tag', 'index, follow');
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('X-Robots-Tag', 'index, follow');
          next();
        });
      }
    }
  ].filter(Boolean),
});
