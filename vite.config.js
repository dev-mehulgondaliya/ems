import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the target server
      '/api': {
        target: 'http://localhost:4747', // Replace with the actual API URL
        changeOrigin: true,  // This helps when the backend server is on a different domain
        secure: false,       // Use true for HTTPS APIs, false for HTTP
      },
    },
  },
});
