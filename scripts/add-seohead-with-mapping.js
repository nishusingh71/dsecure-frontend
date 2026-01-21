import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual page to SEO key mapping
const pageToSeoKeyMapping = {
    // Main Pages
    'HomePage.tsx': 'home',
    'HomePageOptimized.tsx': 'home',
    'About.tsx': 'about',
    'ContactPage.tsx': 'contact',
    'PricingPage.tsx': 'pricing',
    'PricingAndPlanPage.tsx': 'pricing-and-plan',
    'FeaturesPage.tsx': 'features',
    'ProductPage.tsx': 'products',

    // Services & Solutions
    'EnterprisePage.tsx': 'solutions-enterprise',
    'EducationPage.tsx': 'solutions-education',
    'GovernmentPage.tsx': 'solutions-government',
    'HealthcareServices.tsx': 'solutions-healthcare',
    'FinancialServices.tsx': 'solutions-financial-services',
    'ITADPage.tsx': 'solutions-itad',
    'ServiceProvidersPage.tsx': 'solutions-service-providers',

    // Products
    'DriveEraserPage.tsx': 'products-drive-eraser',
    'FileEraserPage.tsx': 'products-file-eraser',
    'MobileErasureSolutions.tsx': 'products-mobile-erasure',
    'CloudErasurePage.tsx': 'services-cloud-erasure',

    // Support & Documentation
    'SupportPage.tsx': 'support',
    'DownloadPage.tsx': 'downloads',
    'FAQPage.tsx': 'faq',
    'FreeTrialPage.tsx': 'free-trial',
    'RequestDemoPage.tsx': 'request-demo',
    'LiveDemoPage.tsx': 'live-demo',
    'SearchDemoPage.tsx': 'search-demo',

    // Partners
    'PartnersPage.tsx': 'partners',
    'PartnerProgramPage.tsx': 'partner-program',
    'ResellersPage.tsx': 'resellers',
    'AffiliatesPage.tsx': 'affiliates',

    // Resources
    'ResourcesPage.tsx': 'resources',
    'BlogPage.tsx': 'blog',
    'NewsPage.tsx': 'news',
    'PressPage.tsx': 'press',
    'EventsPage.tsx': 'events',
    'WebinarsPage.tsx': 'webinars',
    'TrainingPage.tsx': 'training',
    'CaseStudiesPage.tsx': 'resources-case-studies',
    'WhitepapersPage.tsx': 'resources-whitepapers',
    'DocumentationPage.tsx': 'resources-documentation',
    'CustomerStoriesPage.tsx': 'customer-stories',
    'TestimonialsPage.tsx': 'testimonials',
    'ReviewsPage.tsx': 'reviews',
    'UseCasesPage.tsx': 'use-cases',

    // Compliance & Legal
    'CompliancePage.tsx': 'compliance',
    'PrivacyPolicy.tsx': 'privacy-policy',
    'TermsConditionsPage.tsx': 'terms-conditions',
    'TermsOfServicePage.tsx': 'terms-of-service',
    'CookiePolicyPage.tsx': 'cookie-policy',
    'LegalPolicy.tsx': 'legal',

    // Company
    'CareersPage.tsx': 'careers',
    'TeamPage.tsx': 'team',
    'LeadershipPage.tsx': 'leadership',
    'IntegrationsPage.tsx': 'integrations',
    'ImplementationPage.tsx': 'implementation',
    'ProfessionalServicesPage.tsx': 'professional-services',
    'ConsultingPage.tsx': 'consulting',

    // Support Guides
    'WipeGuide.tsx': 'support-wipe-guide',
    'OverwriteGuide.tsx': 'support-overwrite-guide',
    'CryptoEraseSSD.tsx': 'support-ssd-cryptographic-erasure-guide',
    'FileEraserGuide.tsx': 'support-file-eraser-guide',
    'MacEraseGuide.tsx': 'support-mac-eraser-guide',
    'WipeMacM1.tsx': 'support-mac-wipe-guide',
    'WipeSASDrive.tsx': 'support-sas-wipe-guide',
    'SecureEraseHDDSSD.tsx': 'support-secure-erase-hddssd',
    'CloudConsoleGuide.tsx': 'support-cloud-console-guide',
    'RetainOSGuide.tsx': 'support-retain-os-guide',
    'GetStartedPage.tsx': 'support-get-started',
    'KnowledgeBasePage.tsx': 'support-knowledge-base',
    'ProductVideosPage.tsx': 'support-product-videos',

    // Other Pages
    'ROICalculatorPage.tsx': 'roi-calculator',
    'ApiTestPage.tsx': 'api-test',
    'DiagnosticsPage.tsx': 'diagnostics',
    'ForumPage.tsx': 'forum',
    'NotFoundPage.tsx': '404',
    'OrderSuccessPage.tsx': 'order-success',
    'PaymentPage.tsx': 'payment',
    'PaymentSetupPage.tsx': 'payment-setup',
    'CheckoutPage.tsx': 'checkout',
    'ReleaseNotesPage.tsx': 'release-notes',
};

const pagesDir = path.join(__dirname, '../src/pages');

// Get all TSX files recursively
function getTsxFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getTsxFiles(fullPath, files);
        } else if (item.endsWith('.tsx')) {
            files.push(fullPath);
        }
    }
    return files;
}

const pageFiles = getTsxFiles(pagesDir);
console.log(`Found ${pageFiles.length} TSX files\n`);

let addedCount = 0;
let skippedCount = 0;
let noMappingCount = 0;
let errorCount = 0;

for (const filePath of pageFiles) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        const fileName = path.basename(filePath);
        const relativePath = path.relative(pagesDir, filePath).replace(/\\/g, '/');

        // Skip if already has SEOHead with getSEOForPage
        if (content.includes('getSEOForPage(')) {
            skippedCount++;
            continue;
        }

        // Get SEO key from mapping
        const seoKey = pageToSeoKeyMapping[fileName] || pageToSeoKeyMapping[relativePath];

        if (!seoKey) {
            noMappingCount++;
            continue;
        }

        // Calculate correct import path
        const depth = relativePath.split('/').length - 1;
        const importPrefix = depth > 0 ? '../'.repeat(depth + 1) : '../';

        let newContent = content;
        let modified = false;

        // Add SEOHead import if not present
        if (!content.includes("import SEOHead")) {
            const firstImport = content.match(/^import\s/m);
            if (firstImport) {
                newContent =
                    newContent.slice(0, firstImport.index) +
                    `import SEOHead from "${importPrefix}components/SEOHead";\n` +
                    newContent.slice(firstImport.index);
                modified = true;
            }
        }

        // Add getSEOForPage import if not present
        if (!newContent.includes("getSEOForPage")) {
            const seoHeadImport = newContent.match(/import SEOHead from.*;\n/);
            if (seoHeadImport) {
                const insertPos = seoHeadImport.index + seoHeadImport[0].length;
                newContent =
                    newContent.slice(0, insertPos) +
                    `import { getSEOForPage } from "${importPrefix}utils/seo";\n` +
                    newContent.slice(insertPos);
                modified = true;
            }
        }

        // Add SEOHead component - handle different return patterns
        const seoHeadComponent = `<SEOHead seo={getSEOForPage("${seoKey}")} />`;

        // Pattern 1: return ( <>
        if (newContent.includes('return (') && !newContent.includes(seoHeadComponent)) {
            // Find return ( and add after first opening tag
            const returnRegex = /return\s*\(\s*\n?\s*(<>|<Fragment>|<div[^>]*>)/;
            const returnMatch = newContent.match(returnRegex);

            if (returnMatch) {
                const insertPos = newContent.indexOf(returnMatch[0]) + returnMatch[0].length;
                newContent =
                    newContent.slice(0, insertPos) +
                    `\n      {/* SEO Meta Tags */}\n      ${seoHeadComponent}\n` +
                    newContent.slice(insertPos);
                modified = true;
            }
        }

        if (modified && newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            addedCount++;
            console.log(`✅ Added SEOHead to: ${fileName} with key: "${seoKey}"`);
        }

    } catch (err) {
        errorCount++;
        console.log(`❌ Error processing: ${path.basename(filePath)} - ${err.message}`);
    }
}

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Total files: ${pageFiles.length}`);
console.log(`SEOHead added: ${addedCount}`);
console.log(`Already had SEOHead: ${skippedCount}`);
console.log(`No mapping defined: ${noMappingCount}`);
console.log(`Errors: ${errorCount}`);
console.log('========================================');
