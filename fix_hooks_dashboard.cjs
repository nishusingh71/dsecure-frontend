const fs = require('fs');
const path = require('path');

const dir = path.resolve('src/pages/dashboards');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Count occurrences
  const matches = content.match(/const \{ t \} = useTranslation\(\);/g);
  if (matches && matches.length > 1) {
    console.log(`Fixing ${file} (found ${matches.length} occurrences)`);
    
    // We want to KEEP the one that comes immediately after `export default function Component() {`
    // or `const Component: React.FC = () => {`
    // Actually, an easier way is: remove ALL of them, then inject ONE at the right place.
    
    content = content.replace(/[ \t]*const \{ t \} = useTranslation\(\);[ \t]*\r?\n?/g, '');
    
    let injected = false;
    content = content.replace(/(export default\s+)?(export\s+)?(const\s+\w+\s*(:\s*React\.FC(\s*<[^>]+>\s*)?)?\s*=\s*(memo\(\s*|forwardRef\(\s*)?)?(function\s*\w*\s*\([^)]*\)\s*\{|\([^)]*\)\s*=>\s*\{|function\s*\w*\s*\([^)]*\)\s*\{)(?!\s*const\s+\{\s*t\s*\})/, (match) => {
      injected = true;
      return match + '\n  const { t } = useTranslation();';
    });

    if (!injected) {
      console.log(`⚠️ Failed to re-inject in ${file}, reverting...`);
      content = originalContent;
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${file}`);
    }
  }
}
