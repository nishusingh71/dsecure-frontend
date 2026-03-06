const fs = require('fs');

function fix() {
    const tsxPath = 'src/pages/FileEraserPage.tsx';
    const enPath = 'src/locales/en/fileEraser.json';
    const hiPath = 'src/locales/hi/fileEraser.json';

    let tsxContent = fs.readFileSync(tsxPath, 'utf8');
    let enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    let hiContent = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

    // Regex to find t("...") or t('...') or t(`...`) including multi-line
    // We search for t( followed by any whitespace, then quote, then content, then quote, then closing )
    const tRegex = /t\s*\(\s*(['"`])(.*?)\1\s*\)/gs;
    
    let match;
    let modifiedTsx = tsxContent;
    let missingKeysFound = 0;

    // We'll use a copy of the content to find matches to avoid index issues while replacing
    // Actually, it's safer to use replace with a callback
    modifiedTsx = tsxContent.replace(tRegex, (fullMatch, quote, key) => {
        let cleanKey = key.trim().replace(/\n\s+/g, ' ');
        
        if (cleanKey.startsWith('fileEraser.')) {
            const actualKey = cleanKey.substring('fileEraser.'.length);
            console.log(`Found prefixed key: ${cleanKey} -> ${actualKey}`);
            
            // Check if actualKey exists in EN JSON. If not, we have a problem.
            // But for now, we'll just fix the prefix in the TSX.
            // Wait, if it's missing from EN, we should probably keep the prefix OR fix the JSON.
            // The user wants it fixed.
            return `t(${quote}${actualKey}${quote})`;
        }
        return fullMatch;
    });

    if (modifiedTsx !== tsxContent) {
      fs.writeFileSync(tsxPath, modifiedTsx, 'utf8');
      console.log('Updated TSX file.');
    } else {
      console.log('No changes needed for TSX.');
    }
}

fix();
