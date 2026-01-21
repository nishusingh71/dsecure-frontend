import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const seoPath = path.join(__dirname, '../src/utils/seo.ts');

// Read sitemap.xml
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Extract all URLs from sitemap
const urlRegex = /<loc>(.*?)<\/loc>/g;
const urls = [];
let match;
while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in sitemap.xml`);

// Read seo.ts
let seoContent = fs.readFileSync(seoPath, 'utf-8');

// Extract existing page keys from seo.ts (more accurate regex)
const existingKeysRegex = /['"]([^'"]+)['"]\s*:\s*\{[\s\S]*?title\s*:/g;
const existingKeys = new Set();
while ((match = existingKeysRegex.exec(seoContent)) !== null) {
    existingKeys.add(match[1]);
}

// Also check for simpler pattern
const simpleKeyRegex = /^\s*['"]?([\w-]+)['"]?\s*:\s*\{/gm;
while ((match = simpleKeyRegex.exec(seoContent)) !== null) {
    existingKeys.add(match[1]);
}

console.log(`Found ${existingKeys.size} existing pages in seo.ts`);
console.log('Sample existing keys:', Array.from(existingKeys).slice(0, 10));

// Helper function to convert URL path to SEO key
function urlToKey(url) {
    const urlPath = url.replace('https://dsecuretech.com/', '').replace(/\/$/, '');
    return urlPath.replace(/\//g, '-').toLowerCase();
}

// Helper function to generate title from key
function generateTitle(key) {
    return key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' | D-Secure Tech';
}

// Helper function to generate description from key
function generateDescription(key) {
    const words = key.split('-').join(' ');
    return `Learn about ${words}. D-Secure provides comprehensive data erasure solutions and documentation for ${words}.`;
}

// Find missing pages - use a Set to avoid duplicates
const addedKeys = new Set();
const missingPages = [];

for (const url of urls) {
    const key = urlToKey(url);
    if (!existingKeys.has(key) &&
        !addedKeys.has(key) &&
        key !== '' &&
        key !== 'dsecuretech.com' &&
        key.length > 0) {
        addedKeys.add(key);
        missingPages.push({
            key,
            url
        });
    }
}

console.log(`Found ${missingPages.length} unique missing pages to add`);

// Generate SEO entries for missing pages
let newEntries = '';

for (const page of missingPages) {
    const title = generateTitle(page.key).replace(/'/g, "\\'");
    const description = generateDescription(page.key).replace(/'/g, "\\'");
    const keywords = page.key.split('-').filter(k => k.length > 2).slice(0, 4);

    newEntries += `
  '${page.key}': {
    title: '${title}',
    description: '${description}',
    keywords: generateKeywords([
      '${keywords.join("',\n      '")}',
      'data erasure',
    ]),
    canonicalUrl: '${page.url}',
  },`;
}

// Find the position to insert - look for the end of implementation entry
const insertRegex = /(canonicalUrl:\s*getCanonicalUrl\('\/implementation'\),\s*\r?\n\s*\})\r?\n(\};)/;
const insertMatch = seoContent.match(insertRegex);

if (insertMatch) {
    const insertPosition = seoContent.indexOf(insertMatch[0]);

    const newSeoContent =
        seoContent.substring(0, insertPosition) +
        insertMatch[1] + ',\n\n  // ========================\n  // Auto-generated SEO entries from sitemap.xml\n  // ========================' +
        newEntries +
        '\n};\n' +
        seoContent.substring(insertPosition + insertMatch[0].length + 1);

    fs.writeFileSync(seoPath, newSeoContent, 'utf-8');
    console.log(`\nSuccessfully added ${missingPages.length} new SEO entries to seo.ts`);
} else {
    console.log('Could not find insertion point with regex');
    // Save to file for manual insertion
    const outputContent = `// Add these entries to PAGE_SEO in seo.ts
// Total: ${missingPages.length} new pages
${newEntries}`;

    fs.writeFileSync(
        path.join(__dirname, '../missing-seo-entries.ts'),
        outputContent,
        'utf-8'
    );
    console.log('Entries saved to missing-seo-entries.ts for manual insertion');
}

// Print summary
console.log('\n--- Summary ---');
console.log(`Total URLs in sitemap: ${urls.length}`);
console.log(`Existing pages in seo.ts: ${existingKeys.size}`);
console.log(`New unique pages added: ${missingPages.length}`);
