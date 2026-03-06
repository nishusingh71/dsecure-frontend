const fs = require('fs');
const content = fs.readFileSync('src/pages/FileEraserPage.tsx', 'utf8');
// This regex specifically targets simple string literals inside t()
const regex = /t\s*\(\s*(['"`])(fileEraser\.[^'"`]+)\1\s*\)/g;
let matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
    matches.push(match[2]);
}

// Also find those with multi-line strings which the previous regex missed or messed up
const regexMulti = /t\s*\(\s*(['"`])(fileEraser\.[^'"`]+)\1\s*\)/gs;
// Wait, actually I just need to find ANY t("fileEraser.something")
const allPrefixed = [];
const lines = content.split('\n');
lines.forEach((line, i) => {
  const m = line.match(/t\s*\(\s*['"](fileEraser\.[^'"]+)['"]\s*\)/);
  if (m) allPrefixed.push({ line: i+1, key: m[1] });
});

// Let's also look for multi-line ones
const fullContentRegex = /t\s*\(\s*['"](fileEraser\.[^'"]+)['"]\s*\)/gs;
let m2;
while ((m2 = fullContentRegex.exec(content)) !== null) {
    allPrefixed.push({ key: m2[1] });
}

console.log(JSON.stringify(allPrefixed, null, 2));
