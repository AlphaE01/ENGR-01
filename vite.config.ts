import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Correct base path
  build: {
    rollupOptions: {
      external: ['firebase/analytics', 'firebase/firestore'],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
