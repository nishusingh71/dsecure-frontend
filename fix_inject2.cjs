const fs = require('fs');
const path = require('path');

const tscOutput = fs.readFileSync('c:\\tmp\\tsc-output4.txt', 'utf8');
const lines = tscOutput.split('\n');

const filesMissingT = new Set();
for (const line of lines) {
  if (line.includes("Cannot find name 't'.") || line.includes("Cannot find name 'useTranslation'.")) {
    const match = line.match(/^([^(]+)\(/);
    if (match) {
      filesMissingT.add(match[1].trim());
    }
  }
}

console.log('Found ' + filesMissingT.size + ' files missing t or useTranslation');

for (const file of filesMissingT) {
  try {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    if (!content.includes('useTranslation')) {
      content = 'import { useTranslation } from "react-i18next";\n' + content;
      modified = true;
    }

    if (!content.includes('const { t } = useTranslation();')) {
      // Look for the main component block.
      // Match export default function Foo() {
      // Match export function Foo() {
      // Match const Foo = () => {
      // Match const Foo: React.FC = memo(function Foo() {
      
      let injected = false;
      content = content.replace(/(export default\s+)?(export\s+)?(const\s+\w+\s*(:\s*React\.FC(\s*<[^>]+>\s*)?)?\s*=\s*(memo\(\s*|forwardRef\(\s*)?)?(function\s*\w*\s*\([^)]*\)\s*\{|\([^)]*\)\s*=>\s*\{)(?!\s*const\s+\{\s*t\s*\})/, (match) => {
        injected = true;
        return match + '\n  const { t } = useTranslation();';
      });

      if (!injected) {
        // Fallback: Just look for `return (` and inject it inside the nearest function block. But that's risky.
        console.warn(`⚠️ Could not find component signature to inject 't' in ${file}`);
      } else {
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Injected useTranslation in ' + file);
    }
  } catch (err) {
    console.error('❌ Error in ' + file + ':', err.message);
  }
}
