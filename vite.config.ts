import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'

// Read critical CSS for inlining
const criticalCSS = fs.existsSync('./src/critical.css')
  ? fs.readFileSync('./src/critical.css', 'utf-8')
  : ''

export default defineConfig({
  plugins: [
    react({
      // Optimize React runtime
      jsxRuntime: 'automatic'
    }),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Brotli compression (better compression ratio)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // HTML plugin for critical CSS inlining and minification
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          criticalCSS: criticalCSS
        }
      }
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
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Enhanced minification
    minify: 'esbuild',
    // Target modern browsers for better performance
    target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
    // Disable compressed size reporting for faster builds
    reportCompressedSize: false,
    // Enhanced performance settings
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      treeshake: 'recommended',
      output: {
        // Disabled manual chunking - using Vite's default automatic chunking to avoid dependency issues
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     // Core UI dependencies (React + UI libraries) - must be together to avoid initialization errors
        //     if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') ||
        //       id.includes('lucide-react') || id.includes('framer-motion') || id.includes('@tanstack')) {
        //       return 'vendor-ui'
        //     }
        //     // Heavy charting libraries - split out for dashboards only
        //     if (id.includes('recharts') || id.includes('d3')) {
        //       return 'vendor-charts'
        //     }
        //     // PDF/Excel generation - split out for export functionality only
        //     if (id.includes('jspdf') || id.includes('exceljs') || id.includes('jszip') || id.includes('file-saver') || id.includes('pako')) {
        //       return 'vendor-export'
        //     }
        //     // Everything else together
        //     return 'vendor-other'
        //   }
        // },

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
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    treeShaking: true
  },
})