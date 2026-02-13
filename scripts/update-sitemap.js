#!/usr/bin/env node

// Sitemap Update Script for DSecure
// Run this script to automatically update sitemap.xml with current timestamp

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://dsecuretech.com';
const currentDate = new Date().toISOString().split('T')[0];

const appTsxPath = path.join(__dirname, '..', 'src', 'App.tsx');

// Routes to explicitly exclude
const EXCLUDED_ROUTES = [
  '/admin',
  '/dashboard',
  '/login',
  '/register',
  '/payment',
  '/checkout',
  '/order-success',
  '/order-failure',
  '/api-test',
  '/search-demo'
];

// Routes to explicitly include with specific priorities (overrides auto-detection)
const PRIORITY_ROUTES = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/services': { changefreq: 'weekly', priority: '0.9' },
  '/solutions': { changefreq: 'weekly', priority: '0.9' },
  '/products': { changefreq: 'weekly', priority: '0.9' },
  '/download': { changefreq: 'weekly', priority: '0.8' },
  '/contact': { changefreq: 'monthly', priority: '0.7' },
  '/about': { changefreq: 'monthly', priority: '0.6' },
};

function extractRoutesFromApp() {
  try {
    const appContent = fs.readFileSync(appTsxPath, 'utf8');
    
    // Regex to find Route components with a 'path' prop
    // Improved regex to handle newlines, spaces, and attributes before/after path
    // Matches <Route ... path="..." ... >
    const routeRegex = /<Route[\s\S]*?path=["']([^"']+)["']/g;
    
    console.log(`📖 Reading App.tsx from: ${appTsxPath}`);
    console.log(`📄 File size: ${appContent.length} bytes`);

    const routes = new Set();
    let match;
    let matchCount = 0;

    while ((match = routeRegex.exec(appContent)) !== null) {
      matchCount++;
      let routePath = match[1];

      // Clean up path
      if (!routePath.startsWith('/')) {
        routePath = '/' + routePath;
      }

      // 1. Exclude dynamic routes (containing :)
      if (routePath.includes(':')) continue;

      // 2. Exclude wildcards
      if (routePath.includes('*')) continue;

      // 3. Exclude explicitly excluded prefixes/routes
      const isExcluded = EXCLUDED_ROUTES.some(excluded => {
        if (excluded.endsWith('*')) {
            const prefix = excluded.slice(0, -1); 
            return routePath.startsWith(prefix);
        }
        return routePath === excluded || routePath.startsWith('/admin') || routePath.startsWith('/dashboard');
      });

      if (isExcluded) continue;

      routes.add(routePath);
    }
    
    console.log(`✅ Extracted ${routes.size} unique valid routes from ${matchCount} matches.`);

    
    // Add manual entries that might not be in App.tsx directly or form complex query searches 
    // (Preserve the valuable query param URLs from original script if they are important)
    const queryRoutes = [
      '/services?search=mobile+device+erasure',
      '/services?search=network+server+erasure',
      '/services?search=cloud+data+erasure',
      '/compliance?standard=nist',
      '/compliance?standard=gdpr',
      '/compliance?standard=hipaa',
      '/compliance?standard=iso27001',
      '/solutions?industry=enterprise',
      '/solutions?industry=healthcare',
      '/solutions?industry=financial',
      '/solutions?industry=government'
    ];
    
    queryRoutes.forEach(r => routes.add(r));

    return Array.from(routes).sort();

  } catch (error) {
    console.error('Error reading App.tsx:', error);
    return [];
  }
}

function generateSitemap() {
  const discoveredRoutes = extractRoutesFromApp();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  discoveredRoutes.forEach(routePath => {
    // Determine priority and changefreq
    let priority = '0.5';
    let changefreq = 'monthly';

    // Check strict match in priority list
    if (PRIORITY_ROUTES[routePath]) {
      priority = PRIORITY_ROUTES[routePath].priority;
      changefreq = PRIORITY_ROUTES[routePath].changefreq;
    } else {
      // Heuristics
      if (routePath.startsWith('/products') || routePath.startsWith('/services') || routePath.startsWith('/solutions')) {
        priority = '0.8';
        changefreq = 'weekly';
      } else if (routePath.startsWith('/support/manual')) {
        priority = '0.7'; // Manuals are high value content
        changefreq = 'monthly';
      } else if (routePath.startsWith('/blog')) {
        priority = '0.7';
        changefreq = 'weekly';
      }
    }

    // Escape special chars in URL (like & in query params)
    const loc = `${baseUrl}${routePath}`.replace(/&/g, '&amp;');

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  
  return { xml, count: discoveredRoutes.length };
}

function updateSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    const { xml1, count } = generateSitemap();
    
    // Actually generate it again to get the string (function refactor side effect - cleaning up)
    const result = generateSitemap();
    const sitemapContent = result.xml;
    
    fs.writeFileSync(sitemapPath, sitemapContent);
    
    console.log('✅ Sitemap updated successfully!');
    console.log(`📅 Updated with date: ${currentDate}`);
    console.log(`📄 Total URLs: ${result.count}`);
    console.log(`Sitemap location: ${sitemapPath}`);
    
    // Also update robots.txt timestamp in comment
    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
        let robotsContent = fs.readFileSync(robotsPath, 'utf8');
        
        // Add or update timestamp comment
        if (!robotsContent.includes('# Last updated:')) {
        robotsContent += `\n\n# Last updated: ${currentDate}`;
        } else {
        robotsContent = robotsContent.replace(
            /# Last updated: .*/,
            `# Last updated: ${currentDate}`
        );
        }
        
        fs.writeFileSync(robotsPath, robotsContent);
        console.log('✅ Robots.txt timestamp updated!');
    }
    
  } catch (error) {
    console.error('❌ Error updating sitemap:', error.message);
    process.exit(1);
  }
}

// Run the update
updateSitemap();