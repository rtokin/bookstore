// vite.config.js
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  plugins: [
    viteReact(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.png'],
});
