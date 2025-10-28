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
    // Increase chunk size limit to 1000 KB to reduce warnings
    chunkSizeWarningLimit: 1000,
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
        // Aggressive chunk splitting for better caching and smaller files
        manualChunks(id) {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            // Core React libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core'
            }
            // React Router
            if (id.includes('react-router')) {
              return 'react-router'
            }
            // Framer Motion (animation library)
            if (id.includes('framer-motion')) {
              return 'vendor-large'
            }
            // JSZip library
            if (id.includes('jszip')) {
              return 'jszip.min'
            }
            // Helmet for SEO
            if (id.includes('react-helmet')) {
              return 'vendor-helmet'
            }
            // Other vendor libraries
            return 'vendor-other'
          }
          
          // Split dashboard pages into separate chunk
          if (id.includes('src/pages/dashboards/')) {
            return 'dashboards'
          }
          
          // Split solution pages
          if (id.includes('src/pages/solutions/')) {
            return 'solutions'
          }
          
          // Split manual/documentation pages
          if (id.includes('src/pages/manual/') || id.includes('src/pages/help/')) {
            return 'documentation'
          }
          
          // Split blog pages
          if (id.includes('src/pages/blog/')) {
            return 'blog'
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