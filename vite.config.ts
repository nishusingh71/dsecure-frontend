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
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Pre-bundle dependencies
    force: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Minification options
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2020',
    rollupOptions: {
      output: {
        // Use function form for better chunk splitting
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // Router
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            // UI libraries
            if (id.includes('@headlessui') || id.includes('clsx') || id.includes('tailwind')) {
              return 'ui-vendor'
            }
            // Other vendor libraries
            return 'vendor'
          }
          
          // Page chunks
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('/')[0].replace('.tsx', '').replace('.ts', '')
            return `page-${pageName}`
          }
          
          // Component chunks
          if (id.includes('/components/') && !id.includes('FlatIcons')) {
            return 'components'
          }
          
          // Icons as separate chunk
          if (id.includes('FlatIcons')) {
            return 'icons'
          }
        },
        // Optimize file names
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
  }
})