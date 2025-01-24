import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173, // Indstil porten til udviklingsserveren
    hmr: {
      clientPort: 5173, // Angiv porten, som WebSocket skal bruge
      protocol: 'ws', // Sørg for, at WebSocket bruger korrekt protokol
    },
  },
});
