// Script to remove lines 3743-4120 (0-indexed: 3742-4119) from AdminReports.tsx
import { readFileSync, writeFileSync } from 'fs';
const file = 'src/pages/dashboards/AdminReports.tsx';
const lines = readFileSync(file, 'utf8').split('\n');
const keep = lines.filter((_, i) => i < 3742 || i > 4119);
writeFileSync(file, keep.join('\n'), 'utf8');
console.log(`Removed ${lines.length - keep.length} lines. New total: ${keep.length}`);
