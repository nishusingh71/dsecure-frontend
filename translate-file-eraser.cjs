const fs = require('fs');
const translate = require('@iamtraction/google-translate');

async function translateFile() {
    const enData = JSON.parse(fs.readFileSync('src/locales/en/fileEraser.json', 'utf8'));
    let hiData = {};
    if (fs.existsSync('src/locales/hi/fileEraser.json')) {
        try {
            hiData = JSON.parse(fs.readFileSync('src/locales/hi/fileEraser.json', 'utf8'));
        } catch (e) {
            hiData = {};
        }
    }

    const keys = Object.keys(enData);
    console.log(`Translating ${keys.length} keys...`);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (hiData[key] && hiData[key] !== enData[key] && hiData[key].length > 0) {
            // Already translated and not a placeholder
            continue;
        }

        try {
            const res = await translate(enData[key], { to: 'hi' });
            hiData[key] = res.text;
            console.log(`[${i+1}/${keys.length}] Translated ${key}`);
            
            // Save every 10 keys to avoid losing progress
            if ((i + 1) % 10 === 0) {
                fs.writeFileSync('src/locales/hi/fileEraser.json', JSON.stringify(hiData, null, 2), 'utf8');
            }
            
            // Wait a bit to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
            console.error(`Error translating ${key}:`, err.message);
            // If rate limited, stop and save
            if (err.message.includes('Too Many Requests')) {
                fs.writeFileSync('src/locales/hi/fileEraser.json', JSON.stringify(hiData, null, 2), 'utf8');
                process.exit(1);
            }
        }
    }

    fs.writeFileSync('src/locales/hi/fileEraser.json', JSON.stringify(hiData, null, 2), 'utf8');
    console.log('Translation complete.');
}

translateFile();
