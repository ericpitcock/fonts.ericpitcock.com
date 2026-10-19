import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5179,
    strictPort: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // additionalData: `@use "@/assets/base.scss";`
      },
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
