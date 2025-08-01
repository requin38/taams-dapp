import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/taamsbl2p/', // 👈 Ajoute cette ligne
  plugins: [vue()],
  define: {
    'process.env': {},
  },
});
