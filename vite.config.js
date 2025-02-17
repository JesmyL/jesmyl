import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      alias: {
        shared: '/src/shared',
        front: '/src/front',
        bibles: '/src/bibles',
      },
    },
  };
});
