const fs = require('fs');
const path = require('path');

function replaceFileContent(filePath, searchValue, replaceValue) {
  try {
    const fullPath = path.resolve(filePath);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    let matched = false;
    if (searchValue instanceof RegExp) {
      if (searchValue.test(content)) {
        content = content.replace(searchValue, replaceValue);
        matched = true;
      }
    } else {
      if (content.includes(searchValue)) {
        content = content.split(searchValue).join(replaceValue);
        matched = true;
      }
    }

    if (matched) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed in ${filePath}`);
    } else {
      console.log(`ℹ️ Not found in ${filePath}, skipping`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
  }
}

// 1. Fix AdminReports.tsx PDF Strings
const adminReportsPath = './src/pages/dashboards/AdminReports.tsx';

// Line 2046
const pdfRegex53 = /"%PDF-1\.4\\n1 0 obj\\n<< \/Type \/Catalog \/Pages 2 0 R >>\{t\("dashboard\.adminReports\.nendobjn2_0_objn"\)\}<< \/Type \/Pages \/Kids \[3 0 R\] \/Count 1 >>\{t\("dashboard\.adminReports\.nendobjn3_0_objn"\)\}<< \/Type \/Page \/Parent 2 0 R \/MediaBox \[0 0 612 792\] \/Contents 4 0 R \/Resources << \/Font << \/F1 << \/Type \/Font \/Subtype \/Type1 \/BaseFont \/Helvetica >> >> >> >>\{t\("dashboard\.adminReports\.nendobjn4_0_objn"\)\}<< \/Length 53 >>\{t\("dashboard\.adminReports\.nstreamnbtnf1_24_tfn100_700_tdndemo_pdf_repor"\)\}<< \/Size 5 \/Root 1 0 R >>\\nstartxref\\n392\\n%%EOF"/g;
const pdfReplace53 = '"%PDF-1.4\\n1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\\nendobj\\n4 0 obj\\n<< /Length 53 >>\\nstream\\nBT\\n/F1 24 Tf\\n100 700 Td\\n(Demo PDF Report)\\nTj\\nET\\nendstream\\nendobj\\n5 0 obj\\n<< /Size 5 /Root 1 0 R >>\\nstartxref\\n392\\n%%EOF"';
replaceFileContent(adminReportsPath, pdfRegex53, pdfReplace53);

// Line 2517
const pdfRegex61 = /"%PDF-1\.4\\n1 0 obj\\n<< \/Type \/Catalog \/Pages 2 0 R >>\{t\("dashboard\.adminReports\.nendobjn2_0_objn"\)\}<< \/Type \/Pages \/Kids \[3 0 R\] \/Count 1 >>\{t\("dashboard\.adminReports\.nendobjn3_0_objn"\)\}<< \/Type \/Page \/Parent 2 0 R \/MediaBox \[0 0 612 792\] \/Contents 4 0 R \/Resources << \/Font << \/F1 << \/Type \/Font \/Subtype \/Type1 \/BaseFont \/Helvetica >> >> >> >>\{t\("dashboard\.adminReports\.nendobjn4_0_objn"\)\}<< \/Length 61 >>\{t\("dashboard\.adminReports\.nstreamnbtnf1_24_tfn100_700_tdndemo_pdf_previ"\)\}<< \/Size 5 \/Root 1 0 R >>\\nstartxref\\n400\\n%%EOF"/g;
const pdfReplace61 = '"%PDF-1.4\\n1 0 obj\\n<< /Type /Catalog /Pages 2 0 R >>\\nendobj\\n2 0 obj\\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\\nendobj\\n3 0 obj\\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\\nendobj\\n4 0 obj\\n<< /Length 61 >>\\nstream\\nBT\\n/F1 24 Tf\\n100 700 Td\\n(Demo PDF Preview)\\nTj\\nET\\nendstream\\nendobj\\n5 0 obj\\n<< /Size 5 /Root 1 0 R >>\\nstartxref\\n400\\n%%EOF"';
replaceFileContent(adminReportsPath, pdfRegex61, pdfReplace61);

// 2. Fix AdminSessions.tsx
const adminSessionsPath = './src/pages/dashboards/AdminSessions.tsx';
replaceFileContent(adminSessionsPath, '{t("dashboard.adminSessions.arrayisarraycached")}', 'Array.isArray(cached) &&');
replaceFileContent(adminSessionsPath, '{item.count > {t("dashboard.adminSessions.1")} <span', '{item.count > 1 && <span');
replaceFileContent(
  adminSessionsPath, 
  '{t("dashboard.adminSessions.datenow")}',
  'Date.now() ? ('
);

// 3. Fix PricingAndPlanPage.tsx 
const pricingPath = './src/pages/PricingAndPlanPage.tsx';
replaceFileContent(
  pricingPath,
  'import CustomLicenseModal, {\n  {t("pricing.customlicensedata")}\n} from "../components/CustomLicenseModal";',
  'import CustomLicenseModal, {\n  CustomLicenseData\n} from "../components/CustomLicenseModal";'
);

// 4. Fix NetworkFileManualLayout.tsx mangled import
const networkPath = './src/pages/manual/NetworkFileManualLayout.tsx';
replaceFileContent(
  networkPath,
  'import {\nimport { useLocaleNavigate } from "@/hooks/useLocaleNavigate";\n  BookOpen,',
  'import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";\nimport {\n  BookOpen,'
);

// 5. Fix CompleteDSecureManual.tsx (if any similarly mangled imports)
console.log("Fix script completed.");
