const fs = require('fs');

function fixFile(file, regex, replaceStr) {
  let content = fs.readFileSync(file, 'utf8');
  if (regex.test(content)) {
    fs.writeFileSync(file, content.replace(regex, replaceStr), 'utf8');
    console.log('Fixed ' + file);
  } else {
    console.log('Not found in ' + file);
  }
}

fixFile('./src/pages/PricingAndPlanPage.tsx', 
  /\{\s*\{t\("pricing\.customlicensedata"\)\}\s*\}/, 
  '{ CustomLicenseData }');

fixFile('./src/pages/manual/NetworkFileManualLayout.tsx',
  /import \{\s*import \{ useLocaleNavigate \} from "@\/hooks\/useLocaleNavigate";\s*BookOpen,/,
  'import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";\nimport {\n  BookOpen,');
