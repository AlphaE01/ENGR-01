import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'firebase/app',
        'firebase/firestore', // Add firestore here
        'firebase/storage',
        'firebase/auth',
        'firebase/analytics',
      ],
    },
  },
});

