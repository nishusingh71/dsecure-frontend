const fs = require('fs');
const path = require('path');

const tscOutput = fs.readFileSync('c:\\tmp\\tsc-output2.txt', 'utf8');
const lines = tscOutput.split('\n');

const filesMissingT = new Set();
for (const line of lines) {
  if (line.includes("Cannot find name 't'.")) {
    const match = line.match(/^([^(]+)\(/);
    if (match) {
      filesMissingT.add(match[1].trim());
    }
  }
}

console.log('Found ' + filesMissingT.size + ' files missing t');

for (const file of filesMissingT) {
  try {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    if (!content.includes('useTranslation')) {
      // Very naive injection: just put it at the top
      content = 'import { useTranslation } from "react-i18next";\n' + content;
      modified = true;
    }

    if (!content.includes('const { t } = useTranslation();')) {
      content = content.replace(/export default function (\w+)\(([^)]*)\) \{/, (match) => {
        return match + '\n  const { t } = useTranslation();';
      });
      content = content.replace(/export function (\w+)\(([^)]*)\) \{(?!\s*const \{ t \})/, (match) => {
        return match + '\n  const { t } = useTranslation();';
      });
      content = content.replace(/const (\w+) = \(([^)]*)\) => \{(?!\s*const \{ t \})/, (match) => {
        return match + '\n  const { t } = useTranslation();';
      });
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Injected useTranslation in ' + file);
    }
  } catch (err) {
    console.error('❌ Error in ' + file + ':', err.message);
  }
}

// Fix CompliancePage issue
const compliancePath = './src/pages/CompliancePage.tsx';
if (fs.existsSync(compliancePath)) {
  let content = fs.readFileSync(compliancePath, 'utf8');
  content = content.replace(/requirements:/g, '// requirements:');
  fs.writeFileSync(compliancePath, content, 'utf8');
}
