# PowerShell script to build Docker image with Bit authentication

# First, let's try to copy the auth from global .npmrc to local
$globalNpmrc = "$env:USERPROFILE\.npmrc"
$projectNpmrc = ".\.npmrc"

if (Test-Path $globalNpmrc) {
    Write-Host "Copying Bit authentication from global .npmrc..."
    $content = Get-Content $globalNpmrc
    $authLine = $content | Where-Object { $_ -match "//node-registry.bit.cloud/:_authToken" }
    
    if ($authLine) {
        # Read existing project .npmrc
        $projectContent = Get-Content $projectNpmrc -ErrorAction SilentlyContinue
        
        # Add auth line if not already present
        if ($projectContent -notcontains $authLine) {
            Add-Content $projectNpmrc $authLine
            Write-Host "Added authentication to project .npmrc"
        }
    }
}

Write-Host "Building Docker image..."
docker build -t basic-component-app .