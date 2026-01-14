# Add Helmet import to files that use it but don't have the import
$files = @(
    "src/pages/admin/AdminProfileEdit.tsx",
    "src/pages/admin/AdminSettings.tsx",
    "src/pages/admin/AdminUsers.tsx",
    "src/pages/CompliancePage.tsx",
    "src/pages/dashboards/DownloadAgentPage.tsx",
    "src/pages/dashboards/EditSubuser.tsx",
    "src/pages/dashboards/NewErasurePage.tsx",
    "src/pages/dashboards/ReportsPage.tsx",
    "src/pages/dashboards/UserDashboard.tsx"
)

foreach ($filePath in $files) {
    $fullPath = Join-Path $PSScriptRoot $filePath
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Check if Helmet is used but not imported
        if ($content -match "<Helmet>" -and $content -notmatch "import.*Helmet.*from.*react-helmet-async") {
            Write-Host "Adding Helmet import to $filePath..."
            
            # Add import after the first import statement
            $content = $content -replace "^(import .+?;\r?\n)", "`$1import { Helmet } from 'react-helmet-async';`n"
            
            Set-Content $fullPath -Value $content -NoNewline
            Write-Host "✓ Fixed $filePath"
        }
    } else {
        Write-Host "⚠ File not found: $filePath"
    }
}

Write-Host "`nDone!"
