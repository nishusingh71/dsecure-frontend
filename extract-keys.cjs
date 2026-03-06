const fs = require('fs');
const content = fs.readFileSync('src/pages/FileEraserPage.tsx', 'utf8');
const regex = /t\s*\(\s*(['"`])(.*?)\1\s*\)/gs;
let matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
    matches.push(match[2].trim().replace(/\n\s+/g, ' '));
}
const uniqueMatches = Array.from(new Set(matches)).sort();
console.log(JSON.stringify(uniqueMatches, null, 2));
