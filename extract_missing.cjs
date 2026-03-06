const fs = require('fs');
const glob = require('glob');

const EN_JSON_PATH = 'src/locales/en.json';

// Read current en.json
let enJson;
try {
  enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, 'utf8'));
} catch (e) {
  console.error("Failed to read en.json", e);
  process.exit(1);
}

if (!enJson.dashboard) enJson.dashboard = {};

const files = glob.sync('src/pages/dashboards/*.tsx');

let addedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // match t("dashboard.compName.some_key")
  const regex = /t\(\s*["']dashboard\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)["']\s*\)/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    const compName = match[1];
    const key = match[2];
    
    if (!enJson.dashboard[compName]) {
      enJson.dashboard[compName] = {};
    }
    
    // Check if key exists (in en.json or if there is a default from before)
    if (!enJson.dashboard[compName][key]) {
      // Create a sensible default English string
      let defaultStr = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      // some hardcoded corrections based on screenshot
      if (key === 'private_cloud') defaultStr = 'Private Cloud';
      if (key === 'recent_reports') defaultStr = 'Recent Reports';
      if (key === 'view_all') defaultStr = 'View All';
      if (key === 'recent_sessions') defaultStr = 'Recent Sessions';
      if (key === 'settings') defaultStr = 'Settings';
      
      enJson.dashboard[compName][key] = defaultStr;
      console.log(`Added dashboard.${compName}.${key} = "${defaultStr}"`);
      addedCount++;
    }
  }
}

if (addedCount > 0) {
  fs.writeFileSync(EN_JSON_PATH, JSON.stringify(enJson, null, 2));
  console.log(`\nSuccessfully added ${addedCount} missing keys to en.json`);
} else {
  console.log('No missing keys found.');
}
