import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use '/rathnavel-pon/' while on GitHub Pages subdomain
// Change to '/' after connecting your custom domain
export default defineConfig({
  plugins: [react()],
  base: '/rathnavel-pon/',
})
