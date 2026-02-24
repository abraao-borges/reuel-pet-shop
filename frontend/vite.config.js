import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    middlewares: [
      (req, res, next) => {
        // SPA routing fallback: serve index.html for any non-file request
        if (req.method === 'GET' && !req.url.match(/\.[^/]*$/) && !req.url.startsWith('/node_modules')) {
          req.url = '/index.html'
        }
        next()
      },
    ],
  },
})
