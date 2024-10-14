import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // Added base path for correct asset resolution during deployment
  build: {
    rollupOptions: {
      external: [
        'firebase/app',
        'firebase/firestore',
        'firebase/storage',
        'firebase/auth',
        'firebase/analytics',
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

