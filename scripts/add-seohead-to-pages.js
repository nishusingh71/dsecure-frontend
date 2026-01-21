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

console.log(`Found ${seoKeys.size} SEO keys in seo.ts`);

// Mapping of filename to SEO key
function fileNameToSeoKey(fileName) {
    // Remove Page suffix and convert to lowercase with dashes
    return fileName
        .replace(/Page\.tsx$/, '')
        .replace(/\.tsx$/, '')
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/--/g, '-');
}

// Get all TSX files in pages directory recursively
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
console.log(`Found ${pageFiles.length} TSX files in pages directory`);

let addedCount = 0;
let skippedCount = 0;
let noMatchCount = 0;

for (const filePath of pageFiles) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    // Skip if already has SEOHead
    if (content.includes('SEOHead') && content.includes('getSEOForPage')) {
        skippedCount++;
        continue;
    }

    // Get SEO key from filename
    let seoKey = fileNameToSeoKey(fileName);

    // Try different key variations
    const keyVariations = [
        seoKey,
        seoKey.replace(/-page$/, ''),
        seoKey.replace(/-/g, ''),
        fileName.replace(/Page\.tsx$/, '').replace(/\.tsx$/, '').toLowerCase(),
    ];

    let matchedKey = null;
    for (const key of keyVariations) {
        if (seoKeys.has(key)) {
            matchedKey = key;
            break;
        }
    }

    if (!matchedKey) {
        noMatchCount++;
        console.log(`No SEO key found for: ${fileName} (tried: ${keyVariations.join(', ')})`);
        continue;
    }

    // Check if imports already exist
    const hasSEOHeadImport = content.includes("import SEOHead from");
    const hasGetSEOForPage = content.includes("getSEOForPage");

    let newContent = content;

    // Add imports if needed
    if (!hasSEOHeadImport) {
        // Find the first import statement
        const firstImportMatch = content.match(/^import\s/m);
        if (firstImportMatch) {
            const insertPos = firstImportMatch.index;
            newContent =
                newContent.slice(0, insertPos) +
                'import SEOHead from "../components/SEOHead";\n' +
                newContent.slice(insertPos);
        }
    }

    if (!hasGetSEOForPage) {
        // Add getSEOForPage import after SEOHead import
        const seoHeadImportMatch = newContent.match(/import SEOHead from.*;\n/);
        if (seoHeadImportMatch) {
            const insertPos = seoHeadImportMatch.index + seoHeadImportMatch[0].length;
            newContent =
                newContent.slice(0, insertPos) +
                'import { getSEOForPage } from "../utils/seo";\n' +
                newContent.slice(insertPos);
        }
    }

    // Add SEOHead component after opening <>
    // Find patterns like: return ( <> or return ( <div or return (<>
    const returnPatterns = [
        { regex: /return\s*\(\s*<>/g, replacement: `return (\n    <>\n      <SEOHead seo={getSEOForPage("${matchedKey}")} />` },
        { regex: /return\s*\(\s*<Fragment>/g, replacement: `return (\n    <Fragment>\n      <SEOHead seo={getSEOForPage("${matchedKey}")} />` },
    ];

    let added = false;
    for (const pattern of returnPatterns) {
        if (pattern.regex.test(newContent) && !newContent.includes(`getSEOForPage("${matchedKey}")`)) {
            newContent = newContent.replace(pattern.regex, pattern.replacement);
            added = true;
            break;
        }
    }

    // If no pattern matched, try to add after first opening tag
    if (!added && !newContent.includes(`getSEOForPage("${matchedKey}")`)) {
        // Find return ( and the first tag after it
        const returnMatch = newContent.match(/return\s*\(\s*\n?\s*(<\w+[^>]*>)/);
        if (returnMatch) {
            const fullMatch = returnMatch[0];
            const insertPos = newContent.indexOf(fullMatch) + fullMatch.length;
            newContent =
                newContent.slice(0, insertPos) +
                `\n      <SEOHead seo={getSEOForPage("${matchedKey}")} />` +
                newContent.slice(insertPos);
            added = true;
        }
    }

    if (newContent !== content && added) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        addedCount++;
        console.log(`✅ Added SEOHead to: ${fileName} with key: "${matchedKey}"`);
    }
}

console.log('\n--- Summary ---');
console.log(`Total files processed: ${pageFiles.length}`);
console.log(`SEOHead added: ${addedCount}`);
console.log(`Already had SEOHead: ${skippedCount}`);
console.log(`No matching SEO key: ${noMatchCount}`);
