import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const seoPath = path.join(__dirname, '../src/utils/seo.ts');
const newEntriesPath = path.join(__dirname, '../new-seo-entries.ts');

// Read new-seo-entries.ts
const newEntriesContent = fs.readFileSync(newEntriesPath, 'utf-8');

// Extract just the entries (remove comments)
const entriesOnly = newEntriesContent.replace(/\/\/.*\n/g, '').trim();

// Read seo.ts
let seoContent = fs.readFileSync(seoPath, 'utf-8');

// Find the closing of PAGE_SEO object - look for "};\r\n\r\n// Merge"
let insertionPoint = seoContent.indexOf("};\r\n\r\n// Merge default SEO");

if (insertionPoint === -1) {
    // Try with just \n
    insertionPoint = seoContent.indexOf("};\n\n// Merge default SEO");
}

if (insertionPoint === -1) {
    // Try looking for the pattern with various whitespace
    const regex = /\}\s*;\s*\r?\n\r?\n\/\/ Merge default SEO/;
    const match = seoContent.match(regex);
    if (match) {
        insertionPoint = match.index;
    }
}

if (insertionPoint === -1) {
    console.log('Could not find insertion point. Trying alternative...');
    // Find "};" followed by getSEOForPage
    const altRegex = /\}\s*;\s*[\r\n]+\/\/ Merge/;
    const altMatch = seoContent.match(altRegex);
    if (altMatch) {
        insertionPoint = altMatch.index;
        console.log('Found at index:', insertionPoint);
    } else {
        console.log('Still could not find insertion point');
        process.exit(1);
    }
}

// Insert new entries before the closing brace
const beforeClose = seoContent.substring(0, insertionPoint);
const afterClose = seoContent.substring(insertionPoint);

// Add comma after last entry if needed, then add new entries
const newSeoContent = beforeClose + ",\n\n  // Auto-generated SEO entries from sitemap\n" + entriesOnly + "\n" + afterClose;

// Write updated seo.ts
fs.writeFileSync(seoPath, newSeoContent, 'utf-8');

console.log('Successfully added new SEO entries to seo.ts');

// Count entries
const countMatch = newEntriesContent.match(/Total: (\d+) new pages/);
if (countMatch) {
    console.log(`Added ${countMatch[1]} new page entries`);
}
