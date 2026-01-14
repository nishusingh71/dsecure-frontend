# Fix missing Helmet imports
$files = @(
    "src/pages/admin/AddUser.tsx",
    "src/pages/admin/AdminProfileEdit.tsx",
    "src/pages/admin/AdminSettings.tsx",
    "src/pages/admin/AdminUsers.tsx",
    "src/pages/admin/GenerateReport.tsx",
    "src/pages/admin/GroupDetailPage.tsx",
    "src/pages/CompliancePage.tsx",
    "src/pages/dashboards/AdminDownloads.tsx",
    "src/pages/dashboards/DownloadAgentPage.tsx",
    "src/pages/dashboards/EditSubuser.tsx",
    "src/pages/dashboards/NewErasurePage.tsx",
    "src/pages/dashboards/ReportsPage.tsx",
    "src/pages/dashboards/UserDashboard.tsx",
    "src/pages/manual/network-file/FAQ.tsx",
    "src/pages/support/manual/CommonIssuesPage.tsx",
    "src/pages/support/manual/ErrorCodesPage.tsx",
    "src/pages/support/manual/InstallationPage.tsx",
    "src/pages/support/manual/LinuxSystemsPage.tsx",
    "src/pages/support/manual/OverwritePatternsPage.tsx",
    "src/pages/support/manual/PhysicalDestructionPage.tsx"
)

foreach ($file in $files) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        if ($content -notmatch "import.*Helmet.*from.*react-helmet-async") {
            # Add Helmet import after the first import statement
            $content = $content -replace "(import .+ from .+;\r?\n)", "`$1import { Helmet } from 'react-helmet-async';`n"
            Set-Content $path -Value $content -NoNewline
            Write-Host "✓ Fixed $file"
        }
    }
}

Write-Host "`nDone!"
