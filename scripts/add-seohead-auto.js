import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const seoPath = path.join(__dirname, '../src/utils/seo.ts');

// Read seo.ts and extract all page keys
const seoContent = fs.readFileSync(seoPath, 'utf-8');
const keyRegex = /^\s*'([\w-]+)'\s*:\s*\{/gm;
const seoKeys = new Set();
let match;

while ((match = keyRegex.exec(seoContent)) !== null) {
    seoKeys.add(match[1]);
}

console.log(`Found ${seoKeys.size} SEO keys in seo.ts\n`);

// Convert file path to potential SEO keys
function getKeyVariations(filePath) {
    const fileName = path.basename(filePath, '.tsx');
    const relativePath = path.relative(pagesDir, filePath).replace(/\\/g, '/');
    const dirName = path.dirname(relativePath);

    // Remove common suffixes
    const baseName = fileName
        .replace(/Page$/i, '')
        .replace(/Component$/i, '');

    // Convert CamelCase to kebab-case
    const kebabName = baseName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();

    const variations = [
        kebabName,
        baseName.toLowerCase(),
        baseName.toLowerCase().replace(/-/g, ''),
    ];

    // Add directory-prefixed variations
    if (dirName && dirName !== '.') {
        const dirPrefix = dirName.replace(/\//g, '-').toLowerCase();
        variations.push(`${dirPrefix}-${kebabName}`);

        // Special handling for support/manual pages
        if (dirName === 'support/manual') {
            variations.push(`support-manual-${kebabName}`);
            variations.push(`manual-${kebabName}`);
        }

        // Special handling for admin pages
        if (dirName === 'admin') {
            variations.push(`admin-${kebabName}`);
            variations.push(`${kebabName}`);
        }

        // Special handling for dashboard pages
        if (dirName === 'dashboards') {
            variations.push(`dashboard-${kebabName}`);
            variations.push(`dashboards-${kebabName}`);
        }

        // Special handling for manual/network-file pages
        if (dirName === 'manual/network-file') {
            variations.push(`network-file-${kebabName}`);
            variations.push(`manual-network-${kebabName}`);
        }
    }

    return [...new Set(variations)];
}

// Get all TSX files recursively
function getTsxFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getTsxFiles(fullPath, files);
        } else if (item.endsWith('.tsx')) {
            files.push(fullPath);
        }
    }
    return files;
}

const pageFiles = getTsxFiles(pagesDir);
console.log(`Found ${pageFiles.length} TSX files\n`);

let addedCount = 0;
let skippedCount = 0;
let noMatchCount = 0;
let errorCount = 0;

for (const filePath of pageFiles) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        const fileName = path.basename(filePath);
        const relativePath = path.relative(pagesDir, filePath).replace(/\\/g, '/');

        // Skip if already has SEOHead with getSEOForPage
        if (content.includes('getSEOForPage(')) {
            skippedCount++;
            continue;
        }

        // Get all possible SEO key variations
        const keyVariations = getKeyVariations(filePath);

        // Find a matching key in seo.ts
        let matchedKey = null;
        for (const key of keyVariations) {
            if (seoKeys.has(key)) {
                matchedKey = key;
                break;
            }
        }

        // If no match found, try to use a default key
        if (!matchedKey) {
            // Use the first kebab-case variation as the key
            // The page will show default SEO metadata
            matchedKey = keyVariations[0];
            noMatchCount++;
        }

        // Calculate correct import path
        const depth = relativePath.split('/').length - 1;
        const importPrefix = depth > 0 ? '../'.repeat(depth + 1) : '../';

        let newContent = content;
        let modified = false;

        // Add SEOHead import if not present
        if (!content.includes("import SEOHead")) {
            const firstImport = content.match(/^import\s/m);
            if (firstImport) {
                newContent =
                    newContent.slice(0, firstImport.index) +
                    `import SEOHead from "${importPrefix}components/SEOHead";\n` +
                    newContent.slice(firstImport.index);
                modified = true;
            }
        }

        // Add getSEOForPage import if not present
        if (!newContent.includes("getSEOForPage")) {
            const seoHeadImport = newContent.match(/import SEOHead from.*;\n/);
            if (seoHeadImport) {
                const insertPos = seoHeadImport.index + seoHeadImport[0].length;
                newContent =
                    newContent.slice(0, insertPos) +
                    `import { getSEOForPage } from "${importPrefix}utils/seo";\n` +
                    newContent.slice(insertPos);
                modified = true;
            }
        }

        // Add SEOHead component
        const seoHeadComponent = `<SEOHead seo={getSEOForPage("${matchedKey}")} />`;

        // Find return ( and add after first opening tag
        const returnPatterns = [
            /return\s*\(\s*\n?\s*(<>)/,
            /return\s*\(\s*\n?\s*(<Fragment>)/,
            /return\s*\(\s*\n?\s*(<div[^>]*>)/,
            /return\s*\(\s*\n?\s*(<section[^>]*>)/,
            /return\s*\(\s*\n?\s*(<main[^>]*>)/,
        ];

        let added = false;
        for (const pattern of returnPatterns) {
            const returnMatch = newContent.match(pattern);
            if (returnMatch && !newContent.includes(`getSEOForPage("${matchedKey}")`)) {
                const insertPos = newContent.indexOf(returnMatch[0]) + returnMatch[0].length;
                newContent =
                    newContent.slice(0, insertPos) +
                    `\n      {/* SEO Meta Tags */}\n      ${seoHeadComponent}` +
                    newContent.slice(insertPos);
                added = true;
                modified = true;
                break;
            }
        }

        if (modified && added) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            addedCount++;
            console.log(`✅ Added SEOHead to: ${relativePath} with key: "${matchedKey}"`);
        }

    } catch (err) {
        errorCount++;
        console.log(`❌ Error processing: ${path.basename(filePath)} - ${err.message}`);
    }
}

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Total files: ${pageFiles.length}`);
console.log(`SEOHead added: ${addedCount}`);
console.log(`Already had SEOHead: ${skippedCount}`);
console.log(`Using default/generated keys: ${noMatchCount}`);
console.log(`Errors: ${errorCount}`);
console.log('========================================');
