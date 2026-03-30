import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verification Logic for Sitemap Lastmod correctness
function verifySitemap() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Sitemap not found!');
    return;
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...content.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  
  console.log(`🔍 Verifying ${urls.length} URLs in sitemap...`);
  
  let validCount = 0;
  let missingLastmod = 0;
  
  urls.forEach((u, i) => {
    const locMatch = u[1].match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = u[1].match(/<lastmod>(.*?)<\/lastmod>/);
    
    if (lastmodMatch && lastmodMatch[1] && lastmodMatch[1] !== '2026-03-30') {
      // If lastmod is NOT today's date, it means it's correctly pulling from file system
      validCount++;
    } else if (!lastmodMatch) {
      missingLastmod++;
    }
  });
  
  console.log(`✅ ${validCount} URLs have specific modification dates.`);
  console.log(`ℹ️ ${urls.length - validCount} URLs are falling back to current date (e.g. dynamic routes).`);
  if (missingLastmod > 0) console.error(`❌ ${missingLastmod} URLs are missing <lastmod>!`);
}

verifySitemap();
