import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  plugins: [
    react({
      // Optimize React runtime
      jsxRuntime: 'automatic'
    }),
    splitVendorChunkPlugin()
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['//console.log']
      }
    },
    // Target modern browsers
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
        // Optimize file names
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `img/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    // Enable minification
    minify: 'esbuild',
    // Target modern browsers for better performance
    target: 'es2020'
  },
  // Dev server optimizations
  server: {
    hmr: {
      overlay: false
    }
  }
})
