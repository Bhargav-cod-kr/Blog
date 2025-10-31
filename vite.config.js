import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// __define-ocg__ Set correct base path for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/Blog/', // <-- this must match your repo name exactly
})
