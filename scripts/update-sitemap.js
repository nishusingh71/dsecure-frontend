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

const routes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/services', changefreq: 'weekly', priority: '0.9' },
  { loc: '/solutions', changefreq: 'weekly', priority: '0.9' },
  { loc: '/compliance', changefreq: 'monthly', priority: '0.8' },
  { loc: '/pricing', changefreq: 'weekly', priority: '0.8' },
  { loc: '/resources', changefreq: 'weekly', priority: '0.7' },
  { loc: '/about', changefreq: 'monthly', priority: '0.6' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
  { loc: '/diagnostics', changefreq: 'weekly', priority: '0.5' },
  
  // Service-specific SEO URLs
  { loc: '/services?search=mobile+device+erasure', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services?search=network+server+erasure', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services?search=cloud+data+erasure', changefreq: 'weekly', priority: '0.8' },
  
  // Compliance-specific SEO URLs
  { loc: '/compliance?standard=nist', changefreq: 'monthly', priority: '0.7' },
  { loc: '/compliance?standard=gdpr', changefreq: 'monthly', priority: '0.7' },
  { loc: '/compliance?standard=hipaa', changefreq: 'monthly', priority: '0.7' },
  { loc: '/compliance?standard=iso27001', changefreq: 'monthly', priority: '0.7' },
  
  // Solution-specific SEO URLs
  { loc: '/solutions?industry=enterprise', changefreq: 'weekly', priority: '0.7' },
  { loc: '/solutions?industry=healthcare', changefreq: 'weekly', priority: '0.7' },
  { loc: '/solutions?industry=financial', changefreq: 'weekly', priority: '0.7' },
  { loc: '/solutions?industry=government', changefreq: 'weekly', priority: '0.7' }
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  routes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route.loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  
  return xml;
}

function updateSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    const sitemapContent = generateSitemap();
    
    fs.writeFileSync(sitemapPath, sitemapContent);
    
    //console.log('✅ Sitemap updated successfully!');
    //console.log(`📅 Updated with date: ${currentDate}`);
    //console.log(`📄 Total URLs: ${routes.length}`);
    //console.log(`Sitemap location: ${sitemapPath}`);
    
    // Also update robots.txt timestamp in comment
    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    let robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    // Add timestamp comment if not exists
    if (!robotsContent.includes('# Last updated:')) {
      robotsContent += `\n\n# Last updated: ${currentDate}`;
    } else {
      robotsContent = robotsContent.replace(
        /# Last updated: .*/,
        `# Last updated: ${currentDate}`
      );
    }
    
    fs.writeFileSync(robotsPath, robotsContent);
    //console.log('✅ Robots.txt timestamp updated!');
    
  } catch (error) {
    console.error('❌ Error updating sitemap:', error.message);
    process.exit(1);
  }
}

// Run the update
updateSitemap();

// Export for use in other scripts
export {
  generateSitemap,
  updateSitemap,
  routes
};