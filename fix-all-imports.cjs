// Fix ALL corrupted import blocks across the project
// The extraction scripts replaced icon names like "ShieldIcon" with {t("prefix.shieldicon")} inside import blocks
const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/DriveEraserPage.tsx',
  'src/pages/FileEraserPage.tsx',
  'src/pages/HomePage.tsx',
  'src/layouts/MainLayout.tsx',
  'src/pages/PricingAndPlanPage.tsx',
  'src/pages/DataGuardianAwardPage.tsx',
  'src/pages/manual/CompleteDSecureManual.tsx',
];

let totalFixed = 0;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Check if file has corrupted imports (t() calls inside import blocks)
  if (!content.includes('{t("') || !content.match(/import\s*\{[\s\S]*?\{t\(/)) {
    // Quick check: look for {t(" right after "import {"
    const lines = content.split(/\r?\n/);
    let inImport = false;
    let hasCorruption = false;
    
    for (const line of lines) {
      if (line.trim().startsWith('import {') || line.trim().startsWith('import{')) inImport = true;
      if (inImport && line.includes('{t(')) { hasCorruption = true; break; }
      if (inImport && (line.includes(' from ') || line.includes('}from'))) inImport = false;
    }
    
    if (!hasCorruption) {
      console.log(`✓ ${file}: OK`);
      continue;
    }
  }
  
  // Fix: process line by line
  const lines = content.split(/\r?\n/);
  const newLines = [];
  let inImport = false;
  let importStart = -1;
  let fixed = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.startsWith('import {') || trimmed.startsWith('import{')) {
      inImport = true;
      importStart = i;
    }
    
    if (inImport) {
      // Check if this line has a corrupted t() call
      const tMatch = line.match(/\{t\("[\w.]+\.(\w+)"\)\}/);
      if (tMatch) {
        // Convert key back to PascalCase: "shieldicon" → "ShieldIcon"
        const key = tMatch[1];
        // PascalCase conversion
        let iconName = key;
        // Known icon mappings
        const knownIcons = {
          'shieldicon': 'ShieldIcon',
          'checkicon': 'CheckIcon',
          'lightningicon': 'LightningIcon',
          'arrowrighticon': 'ArrowRightIcon',
          'buildingicon': 'BuildingIcon',
          'staricon': 'StarIcon',
          'gearicon': 'GearIcon',
          'hovericon': 'HoverIcon',
          'clipboardicon': 'ClipboardIcon',
          'globeicon': 'GlobeIcon',
          'hearticon': 'HeartIcon',
          'cloudicon': 'CloudIcon',
          'servericon': 'ServerIcon',
          'databaseicon': 'DatabaseIcon',
          'chaticon': 'ChatIcon',
          'arrowdownicon': 'ArrowDownIcon',
          'briefcaseicon': 'BriefcaseIcon',
          'lockicon': 'LockIcon',
          'checkbadgeicon': 'CheckBadgeIcon',
          'charticon': 'ChartIcon',
          'documenticon': 'DocumentIcon',
          'downloadicon': 'DownloadIcon',
          'eyeicon': 'EyeIcon',
          'filtericon': 'FilterIcon',
          'homeicon': 'HomeIcon',
          'menuicon': 'MenuIcon',
          'plusicon': 'PlusIcon',
          'searchicon': 'SearchIcon',
          'settingsicon': 'SettingsIcon',
          'trashicon': 'TrashIcon',
          'usericon': 'UserIcon',
          'xicon': 'XIcon',
        };
        
        iconName = knownIcons[key.toLowerCase()] || (key.charAt(0).toUpperCase() + key.slice(1));
        
        const indent = line.match(/^(\s*)/)[1];
        const hasComma = line.trim().endsWith(',') || line.includes('},');
        newLines.push(`${indent}${iconName},`);
        fixed++;
        continue;
      }
    }
    
    if (inImport && (trimmed.includes(' from ') || trimmed.includes('}from') || trimmed.match(/^\}\s*from/))) {
      inImport = false;
    }
    
    newLines.push(line);
  }
  
  if (fixed > 0) {
    content = newLines.join('\r\n');
    fs.writeFileSync(file, content, 'utf-8');
    totalFixed += fixed;
    console.log(`✅ ${file}: Fixed ${fixed} corrupted icon imports`);
  } else {
    console.log(`✓ ${file}: OK`);
  }
}

// Also clean up invalid icon keys from en.json
const enJsonPath = 'src/locales/en.json';
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf-8'));

const iconKeyPattern = /icon$/i;
const sections = ['home', 'layout', 'fileEraser', 'driveEraser', 'pricing', 'dataGuardian', 'manual'];
let removedKeys = 0;

for (const section of sections) {
  if (!enJson[section]) continue;
  for (const key of Object.keys(enJson[section])) {
    if (iconKeyPattern.test(key)) {
      delete enJson[section][key];
      removedKeys++;
    }
  }
}

if (removedKeys > 0) {
  fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2) + '\n', 'utf-8');
  console.log(`\n🧹 Removed ${removedKeys} invalid icon keys from en.json`);
}

console.log(`\n✅ Total: ${totalFixed} corrupted imports fixed across all files`);
