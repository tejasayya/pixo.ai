import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,  // Use Render's assigned port
    host: '0.0.0.0',                 // Expose the app to all network interfaces
  },
})
