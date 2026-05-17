import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const allowedHosts = [
  'unpaved-pogo-grandpa.ngrok-free.dev',
  'e726-2409-40c4-19c-dcd8-926d-a849-a882-66d7.ngrok-free.app',
   'http://127.0.0.1:8000',
  ...((process.env.__VITE_ADDITIONAL_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean)),
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts,
  },
})
