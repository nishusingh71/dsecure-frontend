/**
 * Post-Build Pre-rendering Script
 * 
 * Vite build ke baad ye script Puppeteer se key pages ka static HTML snapshot banata hai.
 * Isse AI tools aur bots ko full rendered content milta hai SPA skeleton ki jagah.
 * 
 * Usage: node scripts/prerender.js
 * Build script mein: "build": "vite build && node scripts/prerender.js"
 */

import puppeteer from 'puppeteer';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

// AI aur SEO ke liye important routes jo pre-render karne hain
const ROUTES_TO_PRERENDER = [
  '/',
  '/about',
  '/contact',
  '/pricing-and-plan',
  '/products/drive-eraser',
  '/products/drive-eraser-diagnostic',
  '/products/file-eraser',
  '/products/hardware-diagnostics',
  '/products/hard-drive-monitor',
  '/services',
  '/solutions',
  '/enterprise',
  '/support',
  '/download',
  '/compliance',
  '/comparison',
  '/use-cases',
  '/glossary',
  '/security',
  '/what-is-d-secure',
  '/why-d-secure',
  '/ai-overview',
  '/partners',
  '/trust-center',
];

const PORT = 4173;

/**
 * Ek simple static file server banata hai dist folder ke liye
 * SPA fallback ke saath (sab routes /index.html pe resolve hote hain)
 */
function createStaticServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.xml': 'application/xml',
    '.woff2': 'font/woff2',
  };

  return createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);

    // Agar file exist nahi karti toh SPA fallback (index.html serve karo)
    if (!existsSync(filePath) || filePath.endsWith('/')) {
      filePath = join(DIST_DIR, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = '.' + filePath.split('.').pop();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      // Fallback to index.html for SPA routes
      const content = readFileSync(join(DIST_DIR, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
}

/**
 * Ek route ka HTML snapshot leta hai Puppeteer se
 */
async function prerenderRoute(browser, route) {
  const page = await browser.newPage();

  // Third-party requests block karo (faster rendering)
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (
      url.includes('googletagmanager') ||
      url.includes('google-analytics') ||
      url.includes('clarity.ms') ||
      url.includes('fonts.googleapis.com') ||
      url.includes('fonts.gstatic.com')
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 15000,
    });

    // React ko render hone ka extra time dena
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const html = await page.content();

    // Output path decide karo
    const outputDir =
      route === '/'
        ? DIST_DIR
        : join(DIST_DIR, route);

    // Directory create karo agar exist nahi karti
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // HTML file write karo
    const outputPath = join(outputDir, 'index.html');
    writeFileSync(outputPath, html, 'utf-8');

    console.log(`  ✅ ${route} → ${outputPath.replace(DIST_DIR, 'dist')}`);
  } catch (err) {
    console.error(`  ❌ ${route} — Error: ${err.message}`);
  } finally {
    await page.close();
  }
}

/**
 * Main function - sab routes ko pre-render karta hai
 */
async function main() {
  console.log('\n🚀 Pre-rendering shuru ho raha hai...');
  console.log(`📁 Dist directory: ${DIST_DIR}`);
  console.log(`📄 Routes: ${ROUTES_TO_PRERENDER.length}\n`);

  // Static server start karo
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`🌐 Static server chal raha hai: http://localhost:${PORT}\n`);

  // Browser launch karo
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Routes ko batch mein process karo (4 at a time)
  const BATCH_SIZE = 4;
  for (let i = 0; i < ROUTES_TO_PRERENDER.length; i += BATCH_SIZE) {
    const batch = ROUTES_TO_PRERENDER.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((route) => prerenderRoute(browser, route)));
  }

  // Cleanup
  await browser.close();
  server.close();

  console.log(`\n✅ Pre-rendering complete! ${ROUTES_TO_PRERENDER.length} pages rendered.`);
}

main().catch((err) => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
