/* eslint-env node */
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

// Serves netlify/functions/font-search.mjs at /api/font-search during
// `npm run dev`, so AI search works locally without the Netlify CLI. The
// function runs here in Node, as on Netlify, and reads GEMINI_API_KEY from
// .env.local; it never reaches the client bundle.
const netlifyFunctionsDev = () => ({
  name: 'netlify-functions-dev',
  configureServer(server) {
    Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''))

    server.middlewares.use('/api/font-search', async (req, res) => {
      const { default: handler } = await server.ssrLoadModule(
        '/netlify/functions/font-search.mjs',
      )

      const body = await new Promise(resolve => {
        const chunks = []
        req.on('data', chunk => chunks.push(chunk))
        req.on('end', () => resolve(Buffer.concat(chunks)))
      })

      const controller = new AbortController()
      res.on('close', () => {
        if (!res.writableEnded) controller.abort()
      })

      const response = await handler(
        new Request(`http://localhost${req.originalUrl}`, {
          method: req.method,
          headers: req.headers,
          body: ['GET', 'HEAD'].includes(req.method) ? undefined : body,
          signal: controller.signal,
        }),
      )

      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      res.end(Buffer.from(await response.arrayBuffer()))
    })
  },
})

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
    netlifyFunctionsDev(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
