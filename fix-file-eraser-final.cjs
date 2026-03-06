const fs = require('fs');
const path = require('path');

const tsxPath = 'src/pages/FileEraserPage.tsx';
const enPath = 'src/locales/en/fileEraser.json';
const hiPath = 'src/locales/hi/fileEraser.json';

let tsxContent = fs.readFileSync(tsxPath, 'utf8');
let enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let hiContent = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

// 1. Remove prefixes in TSX
// We'll use a very safe regex that doesn't cross lines in a greedy way
// but handles multi-line t() calls by matching the prefix specifically
const prefixRegex = /(t\s*\(\s*['"`])fileEraser\./g;
const newTsxContent = tsxContent.replace(prefixRegex, '$1');

if (newTsxContent !== tsxContent) {
    fs.writeFileSync(tsxPath, newTsxContent, 'utf8');
    console.log('Removed prefixes from TSX.');
    tsxContent = newTsxContent;
}

// 2. Audit all keys in TSX and add missing ones to EN and HI JSON
// We'll extract all keys from t("key")
const keyRegex = /t\s*\(\s*(['"`])(.*?)\1\s*\)/gs;
let match;
let missingKeys = [];

while ((match = keyRegex.exec(tsxContent)) !== null) {
    let key = match[2].trim().replace(/\n\s+/g, ' ');
    // Skip if it still has fileEraser. prefix (should be gone now)
    if (key.startsWith('fileEraser.')) {
        key = key.substring('fileEraser.'.length);
    }
    
    if (!enContent[key]) {
        console.log(`Missing key in EN: ${key}`);
        // We'll try to find a default value or use the key as value
        // For many of these, the key is actually a truncated version of the sentence
        // or a snake_case key.
        enContent[key] = key.replace(/_/g, ' '); 
        missingKeys.push(key);
    }
}

if (missingKeys.length > 0) {
    fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2), 'utf8');
    console.log(`Added ${missingKeys.length} missing keys to EN JSON.`);
    
    // For HI, we should at least add the keys to keep them in sync
    missingKeys.forEach(key => {
        if (!hiContent[key]) {
            hiContent[key] = enContent[key]; // Placeholder
        }
    });
    fs.writeFileSync(hiPath, JSON.stringify(hiContent, null, 2), 'utf8');
    console.log(`Synced HI JSON with ${missingKeys.length} keys (placeholders).`);
} else {
    console.log('No missing keys found in JSON.');
}
