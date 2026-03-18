/**
 * Post-Build Pre-rendering Script (Cross-Platform / Vercel-Optimized)
 * 
 * Ye script detect karta hai ki ye Vercel pe chal raha hai ya local (Windows) pe.
 * Local: Standard Puppeteer use karta hai.
 * Vercel: puppeteer-core + @sparticuz/chromium use karta hai (fix for missing libraries).
 */

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const ROUTES = [
  '/', '/about', '/contact', '/pricing-and-plan',
  '/products/drive-eraser', '/products/drive-eraser-diagnostic',
  '/products/file-eraser', '/products/hardware-diagnostics',
  '/products/hard-drive-monitor', '/services', '/solutions',
  '/enterprise', '/support', '/download', '/compliance',
  '/comparison', '/use-cases', '/glossary', '/security',
  '/what-is-d-secure', '/why-d-secure', '/ai-overview',
  '/partners', '/trust-center'
];

const PORT = 4173;

/**
 * Static file server for dist folder
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
      const content = readFileSync(join(DIST_DIR, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
}

/**
 * Pre-render single route
 */
async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  
  // Third-party scripts block karo (Faster build)
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('google') || url.includes('clarity')) {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 25000,
    });

    // React components ko heavy rendering ke liye thoda extra time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const html = await page.content();

    const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route);
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

    writeFileSync(join(outputDir, 'index.html'), html, 'utf-8');
    console.log(`  ✅ ${route}`);
  } catch (err) {
    console.error(`  ❌ ${route} - ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const isVercel = process.env.VERCEL === '1';
  console.log(`\n🚀 Pre-rendering shuru ho raha hai... (Environment: ${isVercel ? 'Vercel' : 'Local'})`);
  
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));

  let browser;

  if (isVercel) {
    // Vercel/Production: use puppeteer-core + sparticuz/chromium
    console.log('📦 Using Vercel-optimized Chromium...');
    const puppeteerCore = await import('puppeteer-core');
    const chromium = (await import('@sparticuz/chromium')).default;
    
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    // Local (Windows/Mac): use standard puppeteer
    console.log('💻 Using local Puppeteer...');
    const puppeteer = await import('puppeteer');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  console.log('🌐 Rendering routes...\n');

  for (const route of ROUTES) {
    await prerenderRoute(browser, route);
  }

  await browser.close();
  server.close();

  console.log('\n✅ Pre-rendering complete!');
}

main();
