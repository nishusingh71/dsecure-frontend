const fs = require('fs');
const path = require('path');

// 1. Fix AdminGroups.tsx
try {
  const p = path.resolve('src/pages/dashboards/AdminGroups.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('import { useTranslation } from "react-i18next";\n\n      if (isDemo) {', '\n      if (isDemo) {');
  content = content.replace('const devLog = (...args: any[]) => {\n  const { t } = useTranslation();\n  if (!isDemoMode()) {', 'const devLog = (...args: any[]) => {\n  if (!isDemoMode()) {');
  content = content.replace('const devLog = (...args: any[]) => {\r\n  const { t } = useTranslation();\r\n  if (!isDemoMode()) {', 'const devLog = (...args: any[]) => {\r\n  if (!isDemoMode()) {');
  if (!content.startsWith('import { useTranslation }')) {
    content = 'import { useTranslation } from "react-i18next";\n' + content;
  }
  fs.writeFileSync(p, content);
  console.log('Fixed AdminGroups');
} catch (e) { console.error(e); }

// 2. Fix NewErasurePage.tsx
try {
  const p = path.resolve('src/pages/dashboards/NewErasurePage.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('const handleNext = () => {\n  const { t } = useTranslation();', 'const handleNext = () => {');
  content = content.replace('const handleNext = () => {\r\n  const { t } = useTranslation();', 'const handleNext = () => {');
  if (!content.includes('const { user } = useAuth()\n  const { t } = useTranslation();')) {
     content = content.replace('const { user } = useAuth()', 'const { user } = useAuth()\n  const { t } = useTranslation();');
  }
  fs.writeFileSync(p, content);
  console.log('Fixed NewErasurePage');
} catch (e) { console.error(e); }

// 3. CompleteDSecureManual.tsx
try {
  const p = path.resolve('src/pages/manual/CompleteDSecureManual.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('const navigationTree: NavItem[] = [', 'const getNavigationTree = (t: any): NavItem[] => [');
  content = content.replace(/const \[expandedSection, setExpandedSection\] = useState<string>\("about"\);/, 'const [expandedSection, setExpandedSection] = useState<string>("about");\n  const navigationTree = useMemo(() => getNavigationTree(t), [t]);');
  if (!content.includes('const { t } = useTranslation();')) {
     content = content.replace(/export default function CompleteDSecureManual\(\) \{/, 'export default function CompleteDSecureManual() {\n  const { t } = useTranslation();');
  }
  fs.writeFileSync(p, content);
  console.log('Fixed CompleteDSecureManual');
} catch(e) { console.error(e); }

// 4. DownloadAgentPage.tsx
try {
  const p = path.resolve('src/pages/dashboards/DownloadAgentPage.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('const downloadAgent = (agent: Agent) => {\n  const { t } = useTranslation();', 'const downloadAgent = (agent: Agent) => {');
  content = content.replace('const downloadAgent = (agent: Agent) => {\r\n  const { t } = useTranslation();', 'const downloadAgent = (agent: Agent) => {');
  if (!content.includes('const { user } = useAuth()\n  const { t } = useTranslation();')) {
     content = content.replace('const { user } = useAuth()', 'const { user } = useAuth()\n  const { t } = useTranslation();');
  }
  fs.writeFileSync(p, content);
  console.log('Fixed DownloadAgentPage');
} catch(e) { console.error(e); }

// 5. ReportsPage.tsx
try {
  const p = path.resolve('src/pages/dashboards/ReportsPage.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('const devLog = (...args: any[]) => {\n  const { t } = useTranslation(); if (!isDemoMode()) console.log(...args); };', 'const devLog = (...args: any[]) => { if (!isDemoMode()) console.log(...args); };');
  content = content.replace('const devLog = (...args: any[]) => {\r\n  const { t } = useTranslation(); if (!isDemoMode()) console.log(...args); };', 'const devLog = (...args: any[]) => { if (!isDemoMode()) console.log(...args); };');
  if (!content.includes('const { user } = useAuth()\n  const { t } = useTranslation();')) {
     content = content.replace('const { user } = useAuth()', 'const { user } = useAuth()\n  const { t } = useTranslation();');
  }
  fs.writeFileSync(p, content);
  console.log('Fixed ReportsPage');
} catch(e) { console.error(e); }

// 6. FileEraserPage.tsx
try {
  const p = path.resolve('src/pages/FileEraserPage.tsx');
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace('const getReadTime = (text: string) => {\n  const { t } = useTranslation();', 'const getReadTime = (text: string) => {');
  content = content.replace('const getReadTime = (text: string) => {\r\n  const { t } = useTranslation();', 'const getReadTime = (text: string) => {');
  if (!content.includes('const { showToast } = useToast();\n  const { t } = useTranslation();')) {
     content = content.replace('const { showToast } = useToast();', 'const { showToast } = useToast();\n  const { t } = useTranslation();');
  }
  fs.writeFileSync(p, content);
  console.log('Fixed FileEraserPage');
} catch(e) { console.error(e); }
