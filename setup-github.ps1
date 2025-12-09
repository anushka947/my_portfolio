# GitHub Repository Setup Script
# Run this after creating your repository on GitHub

Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$githubUsername = Read-Host "Enter your GitHub username"

# Get repository name (default: rave-folio)
$repoName = Read-Host "Enter repository name (default: rave-folio)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "rave-folio"
}

# Add Git to PATH
$env:Path += ";C:\Program Files\Git\cmd"

# Add remote
Write-Host "`nAdding remote origin..." -ForegroundColor Yellow
git remote add origin "https://github.com/$githubUsername/$repoName.git"

# Verify remote
Write-Host "`nVerifying remote..." -ForegroundColor Yellow
git remote -v

# Push to GitHub
Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`nDone! Your repository has been pushed to GitHub." -ForegroundColor Green

