#!/bin/bash

echo "🔐 Secure Docker Build for Basic Component App"
echo "============================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found!"
    echo "📝 Please create .env.local from .env.template and add your BIT_TOKEN"
    echo "💡 Steps:"
    echo "   1. Copy .env.template to .env.local"
    echo "   2. Run 'bit login' to authenticate"
    echo "   3. Get your token from global .npmrc"
    echo "   4. Add the token to BIT_TOKEN in .env.local"
    exit 1
fi

# Load environment variables from .env.local
echo "📂 Loading environment variables from .env.local..."
export $(grep -v '^#' .env.local | xargs)

# Check if BIT_TOKEN is set
if [ -z "$BIT_TOKEN" ] || [ "$BIT_TOKEN" = "your_bit_auth_token_here" ]; then
    echo "❌ Error: BIT_TOKEN not found or not configured in .env.local!"
    echo "💡 Please add your actual Bit authentication token to .env.local"
    exit 1
fi

echo "✅ BIT_TOKEN loaded successfully"
echo "🔨 Building Docker image with secure token..."

# Build Docker image with build argument
docker build --build-arg BIT_TOKEN="$BIT_TOKEN" -t basic-component-app .

if [ $? -eq 0 ]; then
    echo "✅ Docker build completed successfully!"
    echo "🚀 Run with: docker run -p 3000:3000 basic-component-app"
else
    echo "❌ Docker build failed!"
    exit 1
fi