import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        // !Revisit: Secure - Set to true for production
        secure: false,
        // This is required for the server to accept the request
        // If false, the server will reject the request
        changeOrigin: true,
      },
    },
  }
})