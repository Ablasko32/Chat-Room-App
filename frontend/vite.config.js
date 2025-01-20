import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    },
    host: '0.0.0.0',
    proxy: false,
  },
});
