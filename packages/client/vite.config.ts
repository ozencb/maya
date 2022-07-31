import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import paths from './tsconfig.path.json';

const aliases = Object.fromEntries(
  Object.entries(paths.compilerOptions.paths).map(([key, value]) => [
    key,
    path.resolve(__dirname, 'src', value.join('')),
  ])
);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: aliases,
  },
  server: { port: 3000 },
  preview: {
    port: 8080,
  },
  plugins: [react()],
});
