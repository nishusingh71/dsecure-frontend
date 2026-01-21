import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src');

// Patterns to replace - careful not to break file paths, imports, or code identifiers
const replacements = [
    // Text content replacements (in displayed text, titles, descriptions)
    { from: /DSecure Tech/g, to: 'D-Secure Tech' },
    { from: /DSecure's/g, to: 'D-Secure\'s' },
    { from: /DSecure /g, to: 'D-Secure ' },
    { from: /DSecure\./g, to: 'D-Secure.' },
    { from: /DSecure,/g, to: 'D-Secure,' },
    { from: /DSecure:/g, to: 'D-Secure:' },
    { from: /DSecure\?/g, to: 'D-Secure?' },
    { from: /DSecure!/g, to: 'D-Secure!' },
    { from: /DSecure"/g, to: 'D-Secure"' },
    { from: /DSecure'/g, to: 'D-Secure\'' },
    { from: /"DSecure/g, to: '"D-Secure' },
    { from: /'DSecure/g, to: '\'D-Secure' },
    { from: />DSecure</g, to: '>D-Secure<' },
    { from: / DSecure</g, to: ' D-Secure<' },
    { from: /\(DSecure/g, to: '(D-Secure' },
    { from: /DSecure\)/g, to: 'D-Secure)' },
    // Title case in sentences
    { from: /about DSecure/gi, to: 'about D-Secure' },
    { from: /Using DSecure/gi, to: 'Using D-Secure' },
    { from: /with DSecure/gi, to: 'with D-Secure' },
    { from: /by DSecure/gi, to: 'by D-Secure' },
    { from: /from DSecure/gi, to: 'from D-Secure' },
];

// Files/patterns to skip (imports, file paths, component names, variable names)
const skipPatterns = [
    /import.*from.*DSecure/,
    /\/DSecure/,
    /DSecure\w+Page/,
    /DSecure\w+Component/,
    /const.*DSecure/,
    /function.*DSecure/,
    /class.*DSecure/,
];

function shouldSkipLine(line) {
    return skipPatterns.some(pattern => pattern.test(line));
}

function getTsxFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            // Skip node_modules and .git
            if (!['node_modules', '.git', 'dist'].includes(item)) {
                getTsxFiles(fullPath, files);
            }
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            files.push(fullPath);
        }
    }
    return files;
}

const files = getTsxFiles(srcDir);
console.log(`Found ${files.length} TypeScript files\n`);

let totalChanges = 0;
let filesModified = 0;

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let fileChanges = 0;

    // Process line by line to skip imports and code
    const lines = content.split('\n');
    const newLines = lines.map(line => {
        // Skip lines that are imports, variable declarations, etc.
        if (shouldSkipLine(line)) {
            return line;
        }

        let newLine = line;
        for (const { from, to } of replacements) {
            const matches = line.match(from);
            if (matches) {
                newLine = newLine.replace(from, to);
                fileChanges += matches.length;
            }
        }
        return newLine;
    });

    const newContent = newLines.join('\n');

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        filesModified++;
        totalChanges += fileChanges;
        console.log(`✅ ${path.relative(srcDir, filePath)} - ${fileChanges} changes`);
    }
}

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Files processed: ${files.length}`);
console.log(`Files modified: ${filesModified}`);
console.log(`Total replacements: ${totalChanges}`);
console.log('========================================');
