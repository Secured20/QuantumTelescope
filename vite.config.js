import { defineConfig } from 'vite'
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  server: {
    open: true,
    port: 30057,
    cors: true,
    /*
    proxy: {
      '/api': {
        target: 'http://localhost:30057/create',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
        bypass: function (req, res, proxyOptions) {
          res.setHeader('Content-Type', 'application/json')
          res.redirect('/api/create');
          //res.end(JSON.stringify({ json: true }))
          //return true
        }
      }
    }*/
  },
  build: {
    rollupOptions: {
      external: ["fs/promises"],
      input: {
        main: 'index.html',
        admin: 'admin/space.html',
      },
    },
  },
})