# Remove duplicate Helmet imports
$files = Get-ChildItem -Path "src" -Recurse -Filter "*.tsx" -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if file has multiple Helmet imports
    if ($content -match "(?s)(import \{ Helmet \} from 'react-helmet-async';.*?){2,}") {
        Write-Host "Fixing $($file.Name)..."
        
        # Remove all Helmet imports first
        $content = $content -replace "import \{ Helmet \} from 'react-helmet-async';\r?\n", ""
        
        # Add single Helmet import at the right place (after first import)
        if ($content -match "^(import .+;\r?\n)") {
            $content = $content -replace "^(import .+;\r?\n)", "`$1import { Helmet } from 'react-helmet-async';`n"
        }
        
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "✓ Fixed $($file.Name)"
    }
}

Write-Host "`nDone!"
