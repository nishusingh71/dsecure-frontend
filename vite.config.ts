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
    // [PERF-H3] Removed 'framer-motion' — zero direct imports found in codebase
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'react-helmet-async'],
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
    chunkSizeWarningLimit: 1000,
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
        // [PERF-C5] Granular vendor chunking strategy
        // Split the 1577KB monolith into parallel-loadable smaller chunks.
        // React core stays together; other libs split for parallel download.
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Heavy libs — stay out so Vite bundles them into lazy-loaded page chunks
            if (
              id.includes('jspdf') || id.includes('exceljs') ||
              id.includes('jszip') || id.includes('file-saver') || id.includes('pako') ||
              id.includes('recharts') || id.includes('d3-') || id.includes('d3/') ||
              (id.includes('/leaflet/') && !id.includes('react-leaflet')) ||
              id.includes('lucide-react') || id.includes('@cloudinary') ||
              id.includes('pdfjs-dist') || id.includes('react-pdf') ||
              id.includes('date-fns') || id.includes('@reduxjs') || id.includes('@polar-sh')
            ) {
              return; // Let Vite handle — they'll end up in lazy chunks
            }

            // Data-fetching: only needed by pages with API calls
            if (id.includes('@tanstack/react-query') || id.includes('@tanstack/query-core')) {
              return 'vendor-query';
            }

            // i18n: can load in parallel, not needed for first paint
            if (id.includes('i18next') || id.includes('i18next-browser-languagedetector')) {
              return 'vendor-i18n';
            }

            // HTTP/crypto libs: only needed when API calls start
            if (id.includes('axios') || id.includes('crypto-js')) {
              return 'vendor-http';
            }

            // React core + router + everything else React-dependent stays together
            return 'vendor-react';
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
  // Drop console logs in production build
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    treeShaking: true
  },
})