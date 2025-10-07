# PowerShell script to build Docker image with secure Bit authentication

Write-Host "🔐 Secure Docker Build for Basic Component App" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check if .env.local exists
if (-Not (Test-Path ".\.env.local")) {
    Write-Host "❌ Error: .env.local file not found!" -ForegroundColor Red
    Write-Host "📝 Please create .env.local from .env.template and add your BIT_TOKEN" -ForegroundColor Yellow
    Write-Host "💡 Steps:" -ForegroundColor Yellow
    Write-Host "   1. Copy .env.template to .env.local" -ForegroundColor White
    Write-Host "   2. Run 'bit login' to authenticate" -ForegroundColor White
    Write-Host "   3. Get your token from global .npmrc" -ForegroundColor White
    Write-Host "   4. Add the token to BIT_TOKEN in .env.local" -ForegroundColor White
    exit 1
}

# Load environment variables from .env.local
Write-Host "📂 Loading environment variables from .env.local..." -ForegroundColor Green
Get-Content ".\.env.local" | ForEach-Object {
    if ($_ -match "^([^#][^=]+)=(.*)$") {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}

# Check if BIT_TOKEN is set
$bitToken = $env:BIT_TOKEN
if (-Not $bitToken -or $bitToken -eq "your_bit_auth_token_here") {
    Write-Host "❌ Error: BIT_TOKEN not found or not configured in .env.local!" -ForegroundColor Red
    Write-Host "💡 Please add your actual Bit authentication token to .env.local" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ BIT_TOKEN loaded successfully" -ForegroundColor Green
Write-Host "🔨 Building Docker image with secure token..." -ForegroundColor Yellow

# Build Docker image with build argument
docker build --build-arg BIT_TOKEN="$bitToken" -t basic-component-app .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docker build completed successfully!" -ForegroundColor Green
    Write-Host "🚀 Run with: docker run -p 3000:3000 basic-component-app" -ForegroundColor Cyan
}
else {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}