const fs = require('fs');
const path = require('path');
const translate = require('@iamtraction/google-translate');

const langMap = {
  'zh': 'zh-CN', 'zh_CN': 'zh-CN', 'zh_TW': 'zh-TW', 'pt_BR': 'pt',
  'es_MX': 'es', 'en_CA': 'en', 'en_GB': 'en', 'fr_CA': 'fr', 'fil': 'tl' 
};

const getGoogleLang = (lang) => langMap[lang] || lang;
const filesToTranslate = [
  'src/locales/en/common.json',
  'src/locales/en/home.json',
  'src/locales/en/fileEraser.json',
  'public/locales/en/seo.json'
];

const srcLocalesDir = path.join(__dirname, 'src', 'locales');
const languages = fs.readdirSync(srcLocalesDir).filter(name => {
  return fs.statSync(path.join(srcLocalesDir, name)).isDirectory() && name !== 'en' && name !== 'hi';
});

async function batchTranslate(texts, targetLang) {
    if (targetLang === 'en') return texts;
    if (texts.length === 0) return [];

    const translatedTexts = [];
    const DELIMITER = '\n\n###\n\n';
    let currentBatch = [];
    let currentLength = 0;
    const MAX_LEN = 400; // Even smaller batches to be extra safe

    const flushBatch = async (batch) => {
        if (batch.length === 0) return;
        const compoundString = batch.join(DELIMITER);
        let retries = 3;
        while(retries > 0) {
            try {
                const res = await translate(compoundString, { to: targetLang });
                const splits = res.text.split(/(?:\s*###\s*)/).map(s => s.trim());
                if(splits.length === batch.length) {
                     translatedTexts.push(...splits);
                } else {
                     console.log(`Delimiter mismatch (${splits.length}/${batch.length}). Fallback to 1-by-1.`);
                     for (const t of batch) {
                         const r = await translate(t, { to: targetLang });
                         translatedTexts.push(r.text);
                         await new Promise(r => setTimeout(r, 2000)); // 2s per line on fallback
                     }
                }
                break;
            } catch (err) {
                if (err.name === 'TooManyRequestsError' || err.statusCode === 429 || err.message.includes('Unexpected token')) {
                    console.log(`Rate limit or HTML response detected, waiting 60s... (retries left: ${retries - 1})`);
                    await new Promise(r => setTimeout(r, 60000));
                    retries--;
                    if(retries===0) {
                         console.log("Failed after retries, keeping English.");
                         translatedTexts.push(...batch);
                    }
                } else {
                    console.error("Translation error:", err.message);
                    translatedTexts.push(...batch);
                    break;
                }
            }
        }
    };

    for (const text of texts) {
        if (currentLength + text.length + DELIMITER.length > MAX_LEN) {
            await flushBatch(currentBatch);
            currentBatch = [];
            currentLength = 0;
            console.log(`Processed a batch, sleeping for 15 seconds to respect free tier limits...`);
            await new Promise(r => setTimeout(r, 15000)); 
        }
        currentBatch.push(text);
        currentLength += text.length + DELIMITER.length;
    }
    await flushBatch(currentBatch);
    return translatedTexts;
}

function flattenAndCollect(obj, existingPath = '', missingTexts = [], pathMap = []) {
   for (const key of Object.keys(obj)) {
       const value = obj[key];
       const currentPath = existingPath ? `${existingPath}.${key}` : key;
       if (typeof value === 'object' && value !== null) {
           flattenAndCollect(value, currentPath, missingTexts, pathMap);
       } else if (typeof value === 'string') {
           missingTexts.push(value);
           pathMap.push(currentPath);
       }
   }
   return { missingTexts, pathMap };
}

function setValueAtPath(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

async function run() {
  console.log(`Starting batched slow translation for ${languages.length} languages...`);
  
  for (const lang of languages) {
    console.log(`\n=================================\nTranslating for language: ${lang}\n=================================`);
    const targetGoogleLang = getGoogleLang(lang);

    for (const relativePath of filesToTranslate) {
      const sourceFile = path.join(__dirname, relativePath);
      if (!fs.existsSync(sourceFile)) continue;

      let targetFile = sourceFile.replace(/[\\\/]en[\\\/]/, `/${lang}/`);
      targetFile = path.normalize(targetFile);

      const targetDir = path.dirname(targetFile);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
      
      let existingData = {};
      if (fs.existsSync(targetFile)) {
        try { existingData = JSON.parse(fs.readFileSync(targetFile, 'utf8')); } 
        catch (e) { }
      }

      const { missingTexts, pathMap } = flattenAndCollect(sourceData);
      
      const textsToTranslate = [];
      const pathsToTranslate = [];

      for (let i = 0; i < missingTexts.length; i++) {
          const pathStr = pathMap[i];
          const srcVal = missingTexts[i];
          const getNested = (obj, p) => p.split('.').reduce((o, k) => (o || {})[k], obj);
          const existVal = getNested(existingData, pathStr);

          // We only translate if missing OR if the existing value is EXACTLY identical to the english source (meaning it wasn't translated yet)
          // Some files might be missing totally, so existVal will be undefined.
          if (existVal === undefined || existVal === srcVal) {
             textsToTranslate.push(srcVal);
             pathsToTranslate.push(pathStr);
          }
      }

      if (textsToTranslate.length === 0) {
          console.log(`   No missing translations in ${relativePath}`);
          continue;
      }

      console.log(`   Translating ${textsToTranslate.length} keys in ${relativePath}...`);
      const translatedTexts = await batchTranslate(textsToTranslate, targetGoogleLang);
      
      const finalData = { ...existingData };
      for (let i = 0; i < pathsToTranslate.length; i++) {
          setValueAtPath(finalData, pathsToTranslate[i], translatedTexts[i] || textsToTranslate[i]);
      }

      fs.writeFileSync(targetFile, JSON.stringify(finalData, null, 2), 'utf8');
      console.log(`   [SUCCESS] Saved ${textsToTranslate.length} translated keys to ${targetFile}`);
    }
  }
  console.log('\nAll 46 languages completely translated!');
}

run().catch(console.error);
