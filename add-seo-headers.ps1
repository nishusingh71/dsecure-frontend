# PowerShell Script to Add SEOHead to All Pages
# This script automatically adds <SEOHead seo={getSEOForPage("page-name")} /> to all page files

# Define the page mappings (SEO key -> File path)
$pageMappings = @{
    'home' = 'src\pages\HomePage.tsx'
    'about' = 'src\pages\AboutPage.tsx'
    'contact' = 'src\pages\ContactPage.tsx'
    'products' = 'src\pages\ProductsPage.tsx'
    'services' = 'src\pages\ServicesPage.tsx'
    'solutions' = 'src\pages\SolutionsPage.tsx'
    'support' = 'src\pages\SupportPage.tsx'
    'partners' = 'src\pages\PartnersPage.tsx'
    'pricing' = 'src\pages\PricingPage.tsx'
    'resources' = 'src\pages\ResourcesPage.tsx'
    'blog' = 'src\pages\BlogPage.tsx'
    'news' = 'src\pages\NewsPage.tsx'
    'press' = 'src\pages\PressPage.tsx'
    'careers' = 'src\pages\CareersPage.tsx'
    'team' = 'src\pages\TeamPage.tsx'
    'leadership' = 'src\pages\LeadershipPage.tsx'
    'login' = 'src\pages\auth\LoginPage.tsx'
    'register' = 'src\pages\auth\RegisterPage.tsx'
    'privacy-policy' = 'src\pages\PrivacyPolicyPage.tsx'
    'terms-of-service' = 'src\pages\TermsOfServicePage.tsx'
    'cookie-policy' = 'src\pages\CookiePolicyPage.tsx'
    'security' = 'src\pages\SecurityPage.tsx'
    'compliance' = 'src\pages\CompliancePage.tsx'
    'standards' = 'src\pages\StandardsPage.tsx'
    'certifications' = 'src\pages\CertificationsPage.tsx'
    'testimonials' = 'src\pages\TestimonialsPage.tsx'
    'use-cases' = 'src\pages\UseCasesPage.tsx'
    'training' = 'src\pages\TrainingPage.tsx'
    'webinars' = 'src\pages\WebinarsPage.tsx'
    'events' = 'src\pages\EventsPage.tsx'
    'status' = 'src\pages\StatusPage.tsx'
    'not-found' = 'src\pages\NotFoundPage.tsx'
    
    # Solutions pages
    'enterprise-solutions' = 'src\pages\solutions\EnterpriseSolutionsPage.tsx'
    'healthcare-solutions' = 'src\pages\solutions\HealthcareSolutionsPage.tsx'
    'financial-solutions' = 'src\pages\solutions\FinancialSolutionsPage.tsx'
    'education-solutions' = 'src\pages\solutions\EducationSolutionsPage.tsx'
    'government-solutions' = 'src\pages\solutions\GovernmentSolutionsPage.tsx'
    
    # Services pages
    'cloud-erasure' = 'src\pages\services\CloudErasurePage.tsx'
    'device-erasure' = 'src\pages\services\DeviceErasurePage.tsx'
    'network-erasure' = 'src\pages\services\NetworkErasurePage.tsx'
    'mobile-erasure' = 'src\pages\services\MobileErasurePage.tsx'
    
    # Support pages
    'faqs' = 'src\pages\support\FAQsPage.tsx'
    'knowledge-base' = 'src\pages\support\KnowledgeBasePage.tsx'
    'get-started' = 'src\pages\support\GetStartedPage.tsx'
    'help-manual' = 'src\pages\support\HelpManualPage.tsx'
    'product-videos' = 'src\pages\support\ProductVideosPage.tsx'
    
    # Product pages
    'drive-eraser' = 'src\pages\products\DriveEraserPage.tsx'
    'file-eraser' = 'src\pages\products\FileEraserPage.tsx'
    
    # Resources pages
    'documentation' = 'src\pages\resources\DocumentationPage.tsx'
    'case-studies' = 'src\pages\resources\CaseStudiesPage.tsx'
    'whitepapers' = 'src\pages\resources\WhitepapersPage.tsx'
    'download' = 'src\pages\resources\DownloadPage.tsx'
    
    # Other pages
    'wipe-mac-m1' = 'src\pages\WipeMacM1.tsx'
    'wipe-sas-drive' = 'src\pages\WipeSASDrive.tsx'
}

# Function to check if SEOHead already exists in file
function Test-SEOHeadExists {
    param (
        [string]$filePath
    )
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        return $content -match '<SEOHead\s+seo=\{getSEOForPage\('
    }
    return $false
}

# Function to add SEOHead import and component
function Add-SEOHead {
    param (
        [string]$filePath,
        [string]$seoKey
    )
    
    if (-not (Test-Path $filePath)) {
        Write-Host "❌ File not found: $filePath" -ForegroundColor Red
        return $false
    }
    
    if (Test-SEOHeadExists -filePath $filePath) {
        Write-Host "✓ SEOHead already exists in: $filePath" -ForegroundColor Yellow
        return $true
    }
    
    $content = Get-Content $filePath -Raw
    
    # Check if getSEOForPage is already imported
    $hasGetSEOImport = $content -match "import\s+\{[^}]*getSEOForPage"
    $hasSEOHeadImport = $content -match "import\s+\{[^}]*SEOHead"
    
    # Add imports if needed
    if (-not $hasGetSEOImport -or -not $hasSEOHeadImport) {
        # Find the last import statement
        if ($content -match '(?s)(import\s+[^;]+;)\s*\n\s*\n') {
            $lastImport = $matches[0]
            $importToAdd = "import { getSEOForPage } from '@/utils/seo';`nimport { SEOHead } from '@/components/SEOHead';`n`n"
            
            # If imports already exist partially, merge them
            if ($hasGetSEOImport) {
                $importToAdd = "import { SEOHead } from '@/components/SEOHead';`n`n"
            } elseif ($hasSEOHeadImport) {
                $importToAdd = "import { getSEOForPage } from '@/utils/seo';`n`n"
            }
            
            $content = $content -replace '(?s)(import\s+[^;]+;)\s*\n\s*\n', "`$1`n$importToAdd"
        }
    }
    
    # Find the return statement and add SEOHead after opening fragment or div
    $seoHeadComponent = "      <SEOHead seo={getSEOForPage('$seoKey')} />`n"
    
    # Try to find return statement with <>
    if ($content -match '(?s)return\s*\(\s*<>\s*\n') {
        $content = $content -replace '(?s)(return\s*\(\s*<>\s*\n)', "`$1$seoHeadComponent"
    }
    # Try to find return statement with <div or <section
    elseif ($content -match '(?s)return\s*\(\s*<(div|section)') {
        $content = $content -replace '(?s)(return\s*\(\s*\n)', "`$1$seoHeadComponent"
    }
    else {
        Write-Host "⚠️  Could not find appropriate location in: $filePath" -ForegroundColor Yellow
        return $false
    }
    
    # Write updated content
    Set-Content -Path $filePath -Value $content -NoNewline
    Write-Host "✅ Added SEOHead to: $filePath" -ForegroundColor Green
    return $true
}

# Main execution
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Adding SEOHead to All Pages" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$successCount = 0
$skippedCount = 0
$failedCount = 0

foreach ($mapping in $pageMappings.GetEnumerator()) {
    $seoKey = $mapping.Key
    $filePath = $mapping.Value
    
    Write-Host "Processing: $seoKey -> $filePath" -ForegroundColor White
    
    if (Add-SEOHead -filePath $filePath -seoKey $seoKey) {
        $successCount++
    } else {
        $failedCount++
    }
    Write-Host ""
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "✅ Success: $successCount" -ForegroundColor Green
Write-Host "⚠️  Skipped: $skippedCount" -ForegroundColor Yellow  
Write-Host "❌ Failed: $failedCount" -ForegroundColor Red
Write-Host "========================================`n" -ForegroundColor Cyan
