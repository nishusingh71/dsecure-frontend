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
      
      // SEO data extract karo — pehle Helmet context se, agar nahi mila toh body HTML ke data-seo-bridge se
      let seoTitle = '';
      let seoDescription = '';
      let seoCanonical = '';
      let seoOgTitle = '';
      let seoOgDescription = '';
      let seoOgImage = '';
      let seoOgType = 'website';
      let seoKeywords = '';
      let helmetContent = '';
      
      // React 19 streaming + Lazy Routes ki wajah se Helmet context incomplete reh sakta hai.
      // Jabki last data-seo-bridge div (jo HTML body mein seedha render hota hai) hamesha accurate page SEO deta hai.
      // Isliye, ALWAYS try extracting from data-seo-bridge FIRST.
      let allBridges = [];
      try {
        allBridges = [...appHtml.matchAll(/<div\s+data-seo-bridge(?:="")?[^>]*\/?>/g)];
      } catch(e) {}
      
      const lastBridge = allBridges.length > 0 ? allBridges[allBridges.length - 1][0] : null;

      // React 19 SSR Stream drops lazy-loaded chunks
      // So blog posts metadata must be extracted manually if bridge is missing or default
      if (!lastBridge || String(lastBridge).includes("D-Secure - #1 Data Erasure Software")) {
         if (url.startsWith('/blog/') && url !== '/blog/') {
             try {
                const slug = url.replace('/blog/', '');
                const blogSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/data/blogPosts.ts'), 'utf-8');
                
                // Read from block looking for title
                const titleMatch = blogSrc.match(new RegExp(`slug:\\s*['"\`]${slug}['"\`][\\s\\S]*?title:\\s*['"\`](.*?)['"\]`));
                if (titleMatch) {
                    const extractedTitle = titleMatch[1];
                    seoTitle = `${extractedTitle} | D-Secure Blog`;
                    seoCanonical = `https://dsecuretech.com${url}`;
                    helmetContent = `<title data-rh="true">${seoTitle}</title>
    <link data-rh="true" rel="canonical" href="${seoCanonical}" />`;
                }
             } catch(e) {
                 console.log("Failed to manually extract blog SEO: ", e);
             }
         }
      }
      
      if (lastBridge && !helmetContent) {
        // Last bridge div se saare data-seo-* attributes extract karo
        const extractAttr = (attr) => {
          // Flexible regex that handles attributes without quotes, with single quotes, or with double quotes,
          // and stops at the next attribute or tag end. We also decode HTML entities to avoid issues.
          const match = lastBridge.match(new RegExp(`${attr}=(?:(["'])(.*?)\\1|([^\\s>]+))`));
          const val = match ? (match[2] !== undefined ? match[2] : match[3]) : '';
          return val.replace(/&amp;/g, '&');
        };
        
        seoTitle = extractAttr('data-seo-title');
        seoDescription = extractAttr('data-seo-description');
        seoCanonical = extractAttr('data-seo-canonical');
        seoOgTitle = extractAttr('data-seo-og-title');
        seoOgDescription = extractAttr('data-seo-og-description');
        seoOgImage = extractAttr('data-seo-og-image');
        seoOgType = extractAttr('data-seo-og-type') || 'website';
        const seoTwitterImage = extractAttr('data-seo-twitter-image');
        seoKeywords = extractAttr('data-seo-keywords');
        
        // Page-specific head tags manually build karo
        const headTags = [];
        
        if (seoTitle) headTags.push(`<title data-rh="true">${seoTitle}</title>`);
        if (seoDescription) headTags.push(`<meta data-rh="true" name="description" content="${seoDescription}" />`);
        if (seoKeywords) headTags.push(`<meta data-rh="true" name="keywords" content="${seoKeywords}" />`);
        if (seoCanonical) headTags.push(`<link data-rh="true" rel="canonical" href="${seoCanonical}" />`);
        
        if (seoOgType) headTags.push(`<meta data-rh="true" property="og:type" content="${seoOgType}" />`);
        if (seoOgTitle) headTags.push(`<meta data-rh="true" property="og:title" content="${seoOgTitle}" />`);
        if (seoOgDescription) headTags.push(`<meta data-rh="true" property="og:description" content="${seoOgDescription}" />`);
        if (seoOgImage) headTags.push(`<meta data-rh="true" property="og:image" content="${seoOgImage}" />`);
        if (seoCanonical) headTags.push(`<meta data-rh="true" property="og:url" content="${seoCanonical}" />`);
        headTags.push(`<meta data-rh="true" property="og:site_name" content="D-Secure Tech" />`);
        headTags.push(`<meta data-rh="true" property="og:locale" content="en_US" />`);
        
        headTags.push(`<meta data-rh="true" name="twitter:card" content="summary_large_image" />`);
        if (seoOgTitle) headTags.push(`<meta data-rh="true" name="twitter:title" content="${seoOgTitle}" />`);
        if (seoOgDescription) headTags.push(`<meta data-rh="true" name="twitter:description" content="${seoOgDescription}" />`);
        if (seoTwitterImage || seoOgImage) headTags.push(`<meta data-rh="true" name="twitter:image" content="${seoTwitterImage || seoOgImage}" />`);
        if (seoCanonical) headTags.push(`<meta data-rh="true" name="twitter:url" content="${seoCanonical}" />`);
        headTags.push(`<meta data-rh="true" name="twitter:site" content="@D-Securetech" />`);
        headTags.push(`<meta data-rh="true" name="twitter:creator" content="@D-Securetech" />`);
        
        helmetContent = headTags.join(String.fromCharCode(10) + '    ');
      } else if (helmet) {
        // Fallback to Helmet context if no bridge is found
        const helmetTitle = helmet.title.toString();
        const helmetMeta = helmet.meta.toString();
        const helmetLink = helmet.link.toString();
        const helmetScript = helmet.script.toString();
        const helmetNoscript = helmet.noscript.toString();
        
        helmetContent = [helmetTitle, helmetMeta, helmetLink, helmetScript, helmetNoscript]
          .filter(t => t && t.toString().length > 0).join(String.fromCharCode(10));
        seoTitle = helmetTitle.replace(/<[^>]*>?/gm, '');
      }
      
      // Safety: Convert any literal \n characters to actual newlines
      if (helmetContent) {
        helmetContent = helmetContent.replace(/\\n/g, String.fromCharCode(10));
        helmetContent = helmetContent.replace(/\\r/g, '');
      }
      
      // Template ke default head tags hatao — page-specific se replace honge
      if (helmetContent && helmetContent.trim().length > 0) {
        // ROBUST STRIP: Remove all existing SEO-related tags from the template
        // We use [^>]* to handle attributes in any order (e.g. data-rh before name)
        html = html
          // Strip all <title> tags
          .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
          // Strip description, keywords, author, robots, etc.
          .replace(/<meta[^>]*name=["'](description|keywords|author|robots|googlebot|bingbot|theme-color)["'][^>]*\/?>/gi, '')
          // Strip OG tags (property="og:...")
          .replace(/<meta[^>]*property=["']og:[^"']+["'][^>]*\/?>/gi, '')
          // Strip Twitter tags (name="twitter:...")
          .replace(/<meta[^>]*name=["']twitter:[^"']+["'][^>]*\/?>/gi, '')
          // Strip canonical and other SEO links
          .replace(/<link[^>]*rel=["'](canonical|icon|manifest|alternate|help|index|llms-txt)["'][^>]*\/?>/gi, '')
          // Strip any remaining tags with data-rh="true" to be safe
          .replace(/<[^>]*data-rh=["']true["'][^>]*\/?>/gi, '');
        
        // Inject page-specific tags right after the opening <head> tag to ensure priority
        html = html.replace(/<head>/i, `<head>` + String.fromCharCode(10) + `    ${helmetContent}`);
      }
      
      // JSON-LD scripts ko body se extract karo aur head mein move karo
      const jsonLdScripts = [...appHtml.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      if (jsonLdScripts.length > 0) {
        // Duplicate JSON-LD hatao (MainLayout + page dono se aa sakte hain) — unique by content
        const uniqueJsonLd = new Set();
        const jsonLdTags = [];
        for (const match of jsonLdScripts) {
          const content = match[1].trim();
          if (content && !uniqueJsonLd.has(content)) {
            uniqueJsonLd.add(content);
            jsonLdTags.push(`<script type="application/ld+json">${content}</script>`);
          }
        }
        if (jsonLdTags.length > 0) {
          html = html.replace('</head>', `    ${jsonLdTags.join('\n    ')}\n</head>`);
        }
        // Body se JSON-LD scripts hatao (ab head mein hain)
        appHtml = appHtml.replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
      }
      
      // data-seo-bridge div ko final HTML se hatao — production mein zaroorat nahi
      appHtml = appHtml.replace(/<div\s+data-seo-bridge=""[^>]*\/?>/g, '');
      
      // Verification log — har 50th route + homepage par dikhao
      if (successCount % 50 === 0 || url === '/') {
        const logTitle = seoTitle || '(no title)';
        console.log(`✅ [SEO] ${url} → ${logTitle}`);
      }
      
      successCount++;
    } catch (err) {
      console.error(`❌ Render failed for ${url}:`, err.message);
      appHtml = `<!-- Render Error: ${err.message} -->`;
      failCount++;
    }

    // Inject page content into the template's root div
    // In production, Vite moves scrips to the head, so we use our unique AI-discovery footer as anchor
    const rootDivStart = html.indexOf('<div id="root">');
    if (rootDivStart !== -1) {
      const contentStart = html.indexOf('>', rootDivStart) + 1;
      
      // Look for the unique AI discovery footer which is always AFTER the root div in our template
      const footerAnchor = html.indexOf('<footer style="position:absolute');
      
      if (footerAnchor !== -1) {
        // Find the last closing div BEFORE the footer anchor
        const closingDivPos = html.lastIndexOf('</div>', footerAnchor);
        
        if (closingDivPos > contentStart) {
          html = html.substring(0, contentStart) + appHtml + html.substring(closingDivPos);
        }
      } else {
        // Fallback for dev mode where footer might be different: try finding last div before script
        const scriptAnchor = html.indexOf('<script type="module"', contentStart);
        const fallbackAnchor = scriptAnchor !== -1 ? scriptAnchor : html.lastIndexOf('</body>');
        const closingDivPos = html.lastIndexOf('</div>', fallbackAnchor);
        
        if (closingDivPos > contentStart) {
          html = html.substring(0, contentStart) + appHtml + html.substring(closingDivPos);
        }
      }
    }

    const filePath = url === '/' ? 'index.html' : (url.startsWith('/') ? `${url.substring(1)}.html` : `${url}.html`);
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
