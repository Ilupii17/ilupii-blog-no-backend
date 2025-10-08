import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: { // <-- Tambahkan bagian ini
    host: true, // Ini agar server bisa diakses dari network
    allowedHosts: [
      '33b565384aaa.ngrok-free.app' // <-- Tambahkan host ngrok Anda di sini
    ]
  }

})
