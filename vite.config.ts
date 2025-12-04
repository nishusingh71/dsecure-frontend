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
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // Server optimizations
  server: {
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Increase chunk size limit to suppress warnings
    chunkSizeWarningLimit: 1500,
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
        // Enhanced chunk splitting for better code-splitting
        // Bundle all React-dependent libraries together to avoid initialization issues
        manualChunks: (id) => {
          // React core + all React-dependent libraries - keep together to avoid initialization issues
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/') ||
              id.includes('react-helmet') ||
              id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run/') ||
              id.includes('@tanstack/react-query') ||
              id.includes('framer-motion')) {
            return 'react-vendor'
          }
          // JSZip
          if (id.includes('jszip')) {
            return 'jszip'
          }
          // Utilities
          if (id.includes('node_modules/axios') || 
              id.includes('node_modules/date-fns') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge')) {
            return 'utils'
          }
          // Lucide icons
          if (id.includes('lucide-react')) {
            return 'icons'
          }
          // Split large dashboard pages
          if (id.includes('AdminDashboard')) {
            return 'admin-dashboard'
          }
          if (id.includes('AdminLogs') || id.includes('AdminSubusers') || id.includes('AdminReports')) {
            return 'admin-pages'
          }
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
  
  // Enable compression
  esbuild: {
    drop: ['console', 'debugger']
  }
})