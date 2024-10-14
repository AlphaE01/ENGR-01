import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
