import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const seoPath = path.join(__dirname, '../src/utils/seo.ts');

// Step 1: Get all sitemap URLs
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const urlRegex = /<loc>(.*?)<\/loc>/g;
const sitemapKeys = new Set();
let match;

while ((match = urlRegex.exec(sitemapContent)) !== null) {
    const url = match[1];
    const key = url.replace('https://dsecuretech.com/', '').replace(/\/$/, '').replace(/\//g, '-').toLowerCase();
    if (key && key.length > 0) {
        sitemapKeys.add(key);
    }
}

console.log(`Sitemap URLs: ${sitemapKeys.size}`);

// Step 2: Get existing SEO keys
let seoContent = fs.readFileSync(seoPath, 'utf-8');
const existingKeys = new Set();
const keyRegex = /^\s*'([\w-]+)'\s*:\s*\{/gm;

while ((match = keyRegex.exec(seoContent)) !== null) {
    existingKeys.add(match[1]);
}

console.log(`Existing SEO pages: ${existingKeys.size}`);

// Step 3: Find missing pages (in sitemap but not in seo.ts)
const missingPages = Array.from(sitemapKeys).filter(key => !existingKeys.has(key));
console.log(`Missing pages to add: ${missingPages.length}`);

// Step 4: Find extra pages (in seo.ts but not in sitemap)
const extraPages = Array.from(existingKeys).filter(key => !sitemapKeys.has(key));
console.log(`Extra pages to remove: ${extraPages.length}`);

if (extraPages.length > 0) {
    console.log('\nExtra pages:');
    extraPages.forEach(p => console.log(`  - ${p}`));
}

// Step 5: Generate entries for missing pages
function generateTitle(key) {
    return key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' | D-Secure Tech';
}

function generateDescription(key) {
    const words = key.split('-').join(' ');
    return `Learn about ${words}. D-Secure provides comprehensive data erasure solutions and documentation for ${words}.`;
}

let newEntries = '';
for (const key of missingPages) {
    const title = generateTitle(key).replace(/'/g, "\\'");
    const desc = generateDescription(key).replace(/'/g, "\\'");
    const keywords = key.split('-').filter(k => k.length > 2).slice(0, 4);
    const url = `https://dsecuretech.com/${key.replace(/-/g, '/')}`;

    newEntries += `
  '${key}': {
    title: '${title}',
    description: '${desc}',
    keywords: generateKeywords([
      '${keywords.join("',\n      '")}',
      'data erasure',
    ]),
    canonicalUrl: '${url}',
  },`;
}

// Step 6: Remove extra pages
let updatedContent = seoContent;

for (const key of extraPages) {
    const entryRegex = new RegExp(
        `\\s*'${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'\\s*:\\s*\\{[\\s\\S]*?canonicalUrl:.*?\\},?\\s*`,
        ''
    );
    updatedContent = updatedContent.replace(entryRegex, '');
}

// Step 7: Add new entries before closing of PAGE_SEO
const insertRegex = /(\};)\s*\n\s*\/\/ Merge default SEO/;
const insertMatch = updatedContent.match(insertRegex);

if (insertMatch && newEntries) {
    const insertPos = updatedContent.indexOf(insertMatch[0]);
    updatedContent =
        updatedContent.substring(0, insertPos) +
        ',\n' + newEntries + '\n};\n\n// Merge default SEO' +
        updatedContent.substring(insertPos + insertMatch[0].length);
}

// Clean up
updatedContent = updatedContent.replace(/,(\s*),/g, ',');

fs.writeFileSync(seoPath, updatedContent, 'utf-8');

console.log(`\n✅ Sync complete!`);
console.log(`Added: ${missingPages.length} pages`);
console.log(`Removed: ${extraPages.length} pages`);
console.log(`Final count should be: ${sitemapKeys.size}`);
