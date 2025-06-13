import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {  
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_TEST,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
