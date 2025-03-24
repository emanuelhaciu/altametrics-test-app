import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  css: {
    postcss: {
      plugins: [
        // Your existing plugins
      ]
    },
    devSourcemap: true,
  },
  
  build: {
    cssMinify: 'lightningcss',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React and related core libraries
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/@tanstack/react-query')) {
            return 'react-vendor';
          }
          
          // UI components
          if (id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/lucide-react') ||
              id.includes('node_modules/sonner')) {
            return 'ui-vendor';
          }
          
          // Router and state
          if (id.includes('node_modules/react-router') ||
              id.includes('node_modules/react-redux') ||
              id.includes('node_modules/@reduxjs')) {
            return 'router-state-vendor';
          }
          
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
}) 
