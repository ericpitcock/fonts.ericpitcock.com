import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
      '@epicenter': fileURLToPath(new URL('./node_modules/@ericpitcock/epicenter-vue-components/dist', import.meta.url)),
      '@epicenter-styles': fileURLToPath(new URL('./node_modules/@ericpitcock/epicenter-styles/dist', import.meta.url)),
    }
  }
})
