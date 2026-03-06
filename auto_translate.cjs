const fs = require('fs');
const glob = require('glob');

const EN_JSON_PATH = 'src/locales/en.json';
const LOCALES_DIR = 'src/locales';

// Free Google Translate API
async function translateText(text, targetLang) {
  try {
    // Basic mapping for common language codes
    let gLang = targetLang.split('_')[0]; 
    if (targetLang === 'zh_CN') gLang = 'zh-CN';
    if (targetLang === 'zh_TW') gLang = 'zh-TW';
    
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${gLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    return data[0][0][0];
  } catch (err) {
    console.error(`Failed to translate "${text}" to ${targetLang}`, err);
    return text;
  }
}

async function run() {
  const enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, 'utf8'));
  const files = glob.sync(`${LOCALES_DIR}/*.json`);
  
  for (const file of files) {
    if (file.endsWith('en.json')) continue;
    
    const lang = file.match(/\/([^/]+)\.json$/)[1];
    let langJson;
    try {
      langJson = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      continue;
    }
    
    if (!langJson.dashboard) langJson.dashboard = {};
    
    let modified = false;
    
    // We only care about the admin Dashboard components
    const adminComps = [
      'adminDashboard', 'adminGroups', 'adminSessions', 'adminPerformance', 
      'adminReports', 'adminSubusers', 'adminMachines', 'adminLicenses',
      'adminDownloads', 'adminShell', 'userDashboard', 'reportsPage',
      'privateCloudSetup', 'newErasurePage', 'enhancedUserDashboard',
      'editSubuser', 'downloadAgentPage'
    ];
    
    for (const comp of adminComps) {
      if (!enJson.dashboard[comp]) continue;
      
      if (!langJson.dashboard[comp]) {
        langJson.dashboard[comp] = {};
        modified = true;
      }
      
      for (const [k, v] of Object.entries(enJson.dashboard[comp])) {
        if (!langJson.dashboard[comp][k]) {
          console.log(`Translating [${lang}] ${comp}.${k} = "${v}"...`);
          const translated = await translateText(v, lang);
          langJson.dashboard[comp][k] = translated;
          modified = true;
          // small delay to prevent rate limit
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(file, JSON.stringify(langJson, null, 2));
      console.log(`Saved ${file}`);
    }
  }
  
  console.log('All translations completed!');
}

run().catch(console.error);
