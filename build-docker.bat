@echo off
echo 🔐 Secure Docker Build for Basic Component App
echo =============================================

REM Check if .env.local exists
if not exist ".env.local" (
    echo ❌ Error: .env.local file not found!
    echo 📝 Please create .env.local from .env.template and add your BIT_TOKEN
    echo 💡 Steps:
    echo    1. Copy .env.template to .env.local
    echo    2. Run 'bit login' to authenticate
    echo    3. Get your token from global .npmrc
    echo    4. Add the token to BIT_TOKEN in .env.local
    exit /b 1
)

REM Load BIT_TOKEN from .env.local
for /f "tokens=2 delims==" %%a in ('findstr "^BIT_TOKEN=" .env.local') do set BIT_TOKEN=%%a

REM Check if BIT_TOKEN is set
if "%BIT_TOKEN%"=="" (
    echo ❌ Error: BIT_TOKEN not found in .env.local!
    echo 💡 Please add your actual Bit authentication token to .env.local
    exit /b 1
)

if "%BIT_TOKEN%"=="your_bit_auth_token_here" (
    echo ❌ Error: BIT_TOKEN not configured in .env.local!
    echo 💡 Please add your actual Bit authentication token to .env.local
    exit /b 1
)

echo ✅ BIT_TOKEN loaded successfully
echo 🔨 Building Docker image with secure token...

REM Build Docker image with build argument
docker build --build-arg BIT_TOKEN="%BIT_TOKEN%" -t basic-component-app .

if %ERRORLEVEL% EQU 0 (
    echo ✅ Docker build completed successfully!
    echo 🚀 Run with: docker run -p 3000:3000 basic-component-app
) else (
    echo ❌ Docker build failed!
    exit /b 1
)