import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const seoPath = path.join(__dirname, '../src/utils/seo.ts');

// Extract sitemap URLs
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const urlRegex = /<loc>(.*?)<\/loc>/g;
const sitemapKeys = new Set();
let match;

while ((match = urlRegex.exec(sitemapContent)) !== null) {
    const url = match[1];
    const key = url.replace('https://dsecuretech.com/', '').replace(/\/$/, '').replace(/\//g, '-').toLowerCase();
    if (key && key !== 'dsecuretech.com' && key.length > 0) {
        sitemapKeys.add(key);
    }
}

console.log(`Sitemap URLs: ${sitemapKeys.size}`);

// Read seo.ts and find all page entries
let seoContent = fs.readFileSync(seoPath, 'utf-8');

// Extract page keys more carefully
const allMatches = [];
const keyRegex = /^\s*'([\w-]+)'\s*:\s*\{/gm;
while ((match = keyRegex.exec(seoContent)) !== null) {
    allMatches.push({
        key: match[1],
        index: match.index,
        fullMatch: match[0]
    });
}

console.log(`Total entries in seo.ts: ${allMatches.length}`);

// Find entries NOT in sitemap (excluding core pages like 'home', 'services', etc.)
const corePages = new Set(['home', 'services', 'products', 'pricing', 'contact', 'about',
    'compliance', 'industries', 'resources', 'partners', 'support', 'blog', 'careers',
    'privacy', 'terms', 'implementation', 'professional-services', 'pricing-and-plan']);

const extraPages = allMatches.filter(entry =>
    !sitemapKeys.has(entry.key) && !corePages.has(entry.key)
);

console.log(`\nExtra pages to remove: ${extraPages.length}`);
if (extraPages.length > 0) {
    console.log('First 10 extra pages:');
    extraPages.slice(0, 10).forEach(p => console.log(`  - ${p.key}`));
}

// Remove extra pages
let updatedContent = seoContent;
let removedCount = 0;

for (const page of extraPages) {
    // Match the entire page entry including trailing comma
    const entryRegex = new RegExp(
        `\\s*'${page.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'\\s*:\\s*\\{[\\s\\S]*?\\},?\\s*\\n`,
        ''
    );

    const before = updatedContent;
    updatedContent = updatedContent.replace(entryRegex, '');

    if (updatedContent !== before) {
        removedCount++;
    }
}

// Clean up any double commas or trailing commas before closing brace
updatedContent = updatedContent.replace(/,(\s*),/g, ',');
updatedContent = updatedContent.replace(/,(\s*)\};/g, '\n};');

fs.writeFileSync(seoPath, updatedContent, 'utf-8');

console.log(`\n✅ Removed ${removedCount} extra pages`);
console.log(`Remaining: ${allMatches.length - removedCount} pages`);
console.log(`Should match sitemap (${sitemapKeys.size}) + core pages (${corePages.size}) = ${sitemapKeys.size + corePages.size}`);
