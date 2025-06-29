import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { extname, relative, resolve } from 'path';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] }), libInjectCss()],
  resolve: {
    alias: {
      src: '/src',
      lib: path.resolve(__dirname, './lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}', {
            ignore: ['lib/**/*.d.ts'],
          })
          .map((file) => [
            relative('lib', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
} as UserConfig);
