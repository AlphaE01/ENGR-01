export default {
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      external: ['firebase/storage', 'firebase/app', 'firebase/auth'],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
};
