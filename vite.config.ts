import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react({
      // Optimize React runtime
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Enhanced performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@tanstack/react-query', 'react-helmet-async'],
    exclude: ['@vite/client', '@vite/env']
  },

  // Server optimizations
  server: {
    hmr: {
      overlay: false
    },
    // allowedHosts: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Increase chunk size limit to suppress warnings
    chunkSizeWarningLimit: 2000,
    // Enhanced minification
    minify: 'esbuild',
    // Target modern browsers for better performance
    target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
    // Enable compression
    reportCompressedSize: false,
    // Enhanced performance settings
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: 'recommended',
      output: {
        // Simplified chunk splitting - only vendor to avoid initialization order issues
        manualChunks: (id) => {
          // ALL node_modules go into vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          // Let Vite handle other splitting automatically
        },

        // Optimize file names for caching
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset'
          const info = name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `img/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  },
  // CSS optimization
  css: {
    devSourcemap: false
  },
  // Drop console logs in production build
  esbuild: {
    drop: ['console', 'debugger'],
  },


})