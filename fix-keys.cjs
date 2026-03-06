const fs = require('fs');
const path = 'src/pages/FileEraserPage.tsx';
let content = fs.readFileSync(path, 'utf8');
const original = content;

// Match t("fileEraser.key") or t('fileEraser.key') or even t(`fileEraser.key`)
content = content.replace(/t\s*\(\s*(['"`])fileEraser\.([^'"`]+)(['"`])\s*\)/g, (match, q1, key, q2) => {
    return `t(${q1}${key}${q2})`;
});

if (content !== original) {
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully removed fileEraser prefix.');
} else {
    console.log('No prefixes found.');
}
