import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const seoPath = path.join(__dirname, '../src/utils/seo.ts');

// Read sitemap.xml and extract URLs
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const urlRegex = /<loc>(.*?)<\/loc>/g;
const sitemapUrls = new Set();
let match;

while ((match = urlRegex.exec(sitemapContent)) !== null) {
    const url = match[1];
    const key = url.replace('https://dsecuretech.com/', '').replace(/\/$/, '').replace(/\//g, '-').toLowerCase();
    if (key && key !== 'dsecuretech.com') {
        sitemapUrls.add(key);
    }
}

console.log(`Found ${sitemapUrls.size} URLs in sitemap`);

// Read seo.ts
let seoContent = fs.readFileSync(seoPath, 'utf-8');

// Extract all page keys from seo.ts
const pageKeyRegex = /^\s*'([\w-]+)'\s*:\s*\{[\s\S]*?canonicalUrl:/gm;
const seoKeys = [];
while ((match = pageKeyRegex.exec(seoContent)) !== null) {
    seoKeys.push(match[1]);
}

console.log(`Found ${seoKeys.length} pages in seo.ts`);

// Find pages in seo.ts that are NOT in sitemap
const extraPages = seoKeys.filter(key => !sitemapUrls.has(key));

console.log(`\nFound ${extraPages.length} extra pages to remove:`);
extraPages.forEach(page => console.log(`  - ${page}`));

// Remove extra pages from seo.ts
let updatedSeoContent = seoContent;
let removedCount = 0;

for (const pageKey of extraPages) {
    // Create regex to match the entire page entry
    const pageEntryRegex = new RegExp(
        `\\s*'${pageKey}'\\s*:\\s*\\{[\\s\\S]*?\\},?\\n`,
        'g'
    );

    const beforeLength = updatedSeoContent.length;
    updatedSeoContent = updatedSeoContent.replace(pageEntryRegex, '');

    if (updatedSeoContent.length < beforeLength) {
        removedCount++;
    }
}

// Write updated content
fs.writeFileSync(seoPath, updatedSeoContent, 'utf-8');

console.log(`\n✅ Successfully removed ${removedCount} extra pages from seo.ts`);
console.log(`Remaining pages: ${seoKeys.length - removedCount}`);
