import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const noop = () => {};

// Define ALL global mocks at the absolute top of the file
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
globalThis.addEventListener = noop;
globalThis.removeEventListener = noop;
globalThis.dispatchEvent = () => true;

// Mock function using delete + defineProperty to bypass Node 24+ restrictions
function mock(prop, value) {
  try {
    delete globalThis[prop];
    Object.defineProperty(globalThis, prop, {
      value,
      configurable: true,
      writable: true,
      enumerable: true
    });
  } catch (err) {
    // If defineProperty fails, fallback to simple assignment
    globalThis[prop] = value;
  }
}

const mockElement = {
  style: {},
  setAttribute: noop,
  getAttribute: () => null,
  appendChild: noop,
  addEventListener: noop,
  removeEventListener: noop,
  getElementsByTagName: () => [],
  querySelector: () => null,
  querySelectorAll: () => [],
  innerHTML: '',
};

const mockDoc = {
  documentElement: { ...mockElement },
  body: { ...mockElement },
  head: { ...mockElement },
  createElement: () => ({ ...mockElement }),
  getElementsByTagName: () => [],
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: noop,
  removeEventListener: noop,
};

// Apply all mocks
mock('window', globalThis);
mock('self', globalThis);
mock('top', globalThis);
mock('document', mockDoc);
mock('navigator', { userAgent: 'node.js' });
mock('location', { 
  href: 'https://dsecuretech.com/', 
  hostname: 'dsecuretech.com',
  pathname: '/',
  search: '',
  hash: ''
});
mock('history', { pushState: noop, replaceState: noop });
mock('localStorage', { getItem: () => null, setItem: noop, removeItem: noop, clear: noop });
mock('sessionStorage', { getItem: () => null, setItem: noop, removeItem: noop, clear: noop });
// mock('performance', { now: () => Date.now() });
mock('requestIdleCallback', (cb) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1));
mock('cancelIdleCallback', (id) => clearTimeout(id));
mock('matchMedia', () => ({ matches: false, addListener: noop, removeListener: noop, addEventListener: noop, removeEventListener: noop }));
mock('ResizeObserver', class { 
  observe() { noop(); } 
  unobserve() { noop(); } 
  disconnect() { noop(); } 
});
mock('IntersectionObserver', class { 
  constructor(cb) { this.cb = cb; }
  observe(el) { 
    // SSG mein content ko visible rakhne ke liye callback ko turant call karo
    if (this.cb) {
      this.cb([{ isIntersecting: true, target: el }]); 
    }
  } 
  unobserve() { noop(); } 
  disconnect() { noop(); } 
});

// SSR mein React ke form warnings suppress karo (value/checked without onChange)
const originalConsoleError = console.error;
console.error = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('You provided a `value` prop') ||
    msg.includes('You provided a `checked` prop')
  ) return; // SSR mein ye warnings irrelevant hain
  originalConsoleError.apply(console, args);
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);
const templatePath = toAbsolute('dist/index.html');
const sitemapPath = toAbsolute('public/sitemap.xml');

// Vite hashes the output file (e.g., dist/server/js/entry-server-xxxx.js)
const serverJsDir = toAbsolute('dist/server/js');
let serverEntryPath;
if (fs.readdirSync(serverJsDir)) {
  const files = fs.readdirSync(serverJsDir);
  const entryFile = files.find(f => f.startsWith('entry-server') && f.endsWith('.js'));
  if (entryFile) {
    serverEntryPath = path.join(serverJsDir, entryFile);
  }
}

/**
 * Determines if a route should be excluded from pre-rendering
 */
function isExcludedRoute(routePath) {
  const excludedExtensions = ['.txt', '.xml', '.json', '.svg', '.png'];
  if (excludedExtensions.some(ext => routePath.endsWith(ext))) return true;
  if (routePath.includes('?') || routePath.includes('#')) return true;
  if (routePath.includes('data-guardian-award')) return true;
  return false;
}

/**
 * Automatically discovers routes from sitemap.xml
 */
function getRoutesToPrerender() {
  const routes = new Set(['/']);
  
  if (!fs.existsSync(sitemapPath)) {
    console.warn('⚠️ sitemap.xml not found, falling back to basic routes.');
    ['/compliance/nist-800-88', '/compliance/gdpr', '/solutions/mac-erasure'].forEach(r => routes.add(r));
    return Array.from(routes).sort((a, b) => a.localeCompare(b));
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const locRegex = /<loc>https:\/\/dsecuretech\.com([^<]*)<\/loc>/g;
  let match;
  
  while ((match = locRegex.exec(content)) !== null) {
    const routePath = match[1] || '/';
    if (!isExcludedRoute(routePath)) {
      routes.add(routePath.startsWith('/') ? routePath : '/' + routePath);
    }
  }

  console.log(`🔍 Discovered ${routes.size} HTML routes from sitemap.xml`);
  return Array.from(routes).sort((a, b) => a.localeCompare(b));
}

async function prerender() {
  if (!fs.existsSync(templatePath) || !serverEntryPath || !fs.existsSync(serverEntryPath)) {
    console.error('Missing dist files. Make sure to build client and server first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render } = await import(`file://${serverEntryPath}`);
  const routesToPrerender = getRoutesToPrerender();

  console.log(`🚀 Starting pre-rendering for ${routesToPrerender.length} routes...`);

  let successCount = 0;
  let failCount = 0;

  for (const url of routesToPrerender) {
    let html = template;
    let appHtml = '';
    
    try {
      const result = await render(url);
      appHtml = result.html;
      const { helmet } = result;
      
      if (helmet) {
        const helmetContent = [
          helmet.title.toString(),
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
          helmet.noscript.toString(),
        ].filter(t => t && t.toString().length > 0).join('\n');
        
        // Robustly remove existing title using string indexing (regex can be flaky with large files/new-lines)
        const tStart = html.indexOf('<title>');
        const tEnd = html.indexOf('</title>', tStart);
        if (tStart !== -1 && tEnd !== -1) {
          html = html.substring(0, tStart) + html.substring(tEnd + 8);
        }

        // Remove default meta tags
        html = html.replace(/<meta\s+name=["']description["'][^>]*?\/?>/gi, '');
        html = html.replace(/<meta\s+name=["']keywords["'][^>]*?\/?>/gi, '');
        
        // Inject helmet content before </head>
        html = html.replace('</head>', `${helmetContent}\n</head>`);
        
        // Log title for verification (will show in terminal)
        if (url.includes('freeze-state') && !url.includes('smart') && !url.includes('advanced')) {
          console.log(`✅ [SEO] Frozen State Title: ${helmet.title.toString().replace(/<[^>]*>?/gm, '')}`);
        }
      }
      
      successCount++;
    } catch (err) {
      console.error(`❌ Render failed for ${url}:`, err.message);
      appHtml = `<!-- Render Error: ${err.message} -->`;
      failCount++;
    }

    // Inject page content into the template's root div
    html = html.replace(
      /(<div id="root"[^>]*>)([\s\S]*?)(<\/div>)(?=\s*?<footer)/,
      (_, p1, _p2, p3) => `${p1}${appHtml}${p3}`
    );

    const filePath = url === '/' ? 'index.html' : `${url}/index.html`;
    const absoluteFilePath = toAbsolute(`dist/${filePath}`);
    const dir = path.dirname(absoluteFilePath);
    
    try {
      if (fs.existsSync(dir) && !fs.lstatSync(dir).isDirectory()) {
         console.warn(`⚠️ Skipping ${url}: Directory path collision with existing file.`);
         continue;
      }
      
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(absoluteFilePath, html);
    } catch (e) {
      console.error(`❌ File write failed for ${url}:`, e.message);
    }
    
    if (successCount % 50 === 0) {
      console.log(`...progress: ${successCount}/${routesToPrerender.length} matched`);
    }
  }
  
  console.log(`\n✅ Pre-rendering complete!`);
  console.log(`📊 Total: ${routesToPrerender.length} | Success: ${successCount} | Failed: ${failCount}`);
}

try {
  await prerender();
} catch (e) {
  console.error('❌ Critical failure in prerender process:', e);
  process.exit(1);
}
