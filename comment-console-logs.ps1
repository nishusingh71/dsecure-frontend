$files = Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx,*.cjs,*.html -Recurse -File | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.vscode\\' -and $_.FullName -notmatch '\\dist\\' -and $_.FullName -notmatch '\\build\\' }

$totalModified = 0
$totalCommented = 0
$modifiedFiles = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Replace console.log statements (not already commented)
    # This regex handles multi-line console.log statements
    $content = $content -replace "(?m)^(\s*)console\.log\(", '$1// console.log('
    
    if ($content -ne $originalContent) {
        # Count how many console.log statements were commented
        $beforeCount = ([regex]::Matches($originalContent, "(?m)^(\s*)console\.log\(")).Count
        $afterCount = ([regex]::Matches($content, "(?m)^(\s*)console\.log\(")).Count
        $commented = $beforeCount - $afterCount
        
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalModified++
        $totalCommented += $commented
        $modifiedFiles += [PSCustomObject]@{
            File = $file.FullName.Replace((Get-Location).Path, ".")
            Commented = $commented
        }
        Write-Host "Modified: $($file.FullName.Replace((Get-Location).Path, ".")) - $commented console.log statements commented"
    }
}

Write-Host "`n========================================="
Write-Host "SUMMARY"
Write-Host "========================================="
Write-Host "Total files modified: $totalModified"
Write-Host "Total console.log statements commented: $totalCommented"
Write-Host "`nModified files:"
$modifiedFiles | Format-Table -AutoSize
