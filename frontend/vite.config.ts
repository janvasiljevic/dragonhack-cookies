import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  envDir: './env',
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    // Replace @ with src
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
