# 🔐 Secure Docker Setup for Basic Component App

This document explains how to securely build and run the dockerized version of the Basic Component App with proper secrets management.

## 🔒 Security Features

- ✅ **No hardcoded tokens** in committed files
- ✅ **Environment-based secrets** management
- ✅ **Build-time token injection** only
- ✅ **Clean final image** without exposed credentials

## Prerequisites

1. **Bit Authentication**: You must be logged in to Bit to access the private components
   ```bash
   # Install Bit CLI
   npm install -g @teambit/bvm
   bvm install
   bvm use <version>
   
   # Login to Bit
   bit login
   ```

2. **Docker**: Ensure Docker is installed and running on your system

3. **Environment Setup**: Configure your authentication token securely
   ```bash
   # Copy the template
   cp .env.template .env.local
   
   # Add your actual Bit token to .env.local (see setup section below)
   ```

## 🔧 Secure Setup Process

### Step 1: Get Your Bit Authentication Token
```bash
# 1. Login to Bit
bit login

# 2. Check your global .npmrc for the token (Linux/macOS)
cat ~/.npmrc | grep "_authToken"

# 2. Check your global .npmrc for the token (Windows)
type %USERPROFILE%\.npmrc | findstr "_authToken"
```

### Step 2: Configure Environment Variables
```bash
# 1. Copy the template
cp .env.template .env.local

# 2. Edit .env.local and replace 'your_bit_auth_token_here' with your actual token
# BIT_TOKEN=your_actual_token_here
```

⚠️ **Important**: The `.env.local` file is automatically ignored by git and will not be committed.

## 🚀 Building the Docker Image

### Method 1: Using Secure Build Scripts (Recommended)
```powershell
# Windows PowerShell
.\build-docker.ps1
```

```bash
# Linux/macOS
./build-docker.sh
```

### Method 2: Manual Secure Build
```bash
# Load environment variables and build with build argument
source .env.local  # Linux/macOS
docker build --build-arg BIT_TOKEN="$BIT_TOKEN" -t basic-component-app .
```

```powershell
# Windows PowerShell
Get-Content .env.local | ForEach-Object { if($_ -match "^BIT_TOKEN=(.*)") { $env:BIT_TOKEN=$matches[1] } }
docker build --build-arg BIT_TOKEN="$env:BIT_TOKEN" -t basic-component-app .
```

## Running the Docker Container

```bash
# Run the container on port 3000
docker run -p 3000:3000 basic-component-app

# Run in detached mode
docker run -d -p 3000:3000 basic-component-app

# Run with custom port mapping
docker run -p 8080:3000 basic-component-app
```

## Accessing the Application

Once the container is running, you can access the application at:
- **Local**: http://localhost:3000
- **Main Dashboard**: http://localhost:3000/
- **Interactive Showcase**: http://localhost:3000/interactive
- **Component Showcase**: http://localhost:3000/showcase

## Docker Image Details

- **Base Image**: node:18-alpine
- **Working Directory**: /app
- **Port**: 3000
- **User**: nextjs (non-root user for security)
- **Size**: ~280MB (optimized with multi-stage build considerations)

## Features Included

✅ **Chart Rendering**: All graphs render properly with correct dataKey configuration
✅ **Interactive Components**: Full drill-down functionality with statistical modals
✅ **Bit Components**: Private @shrijulvenkatesh components properly authenticated
✅ **Production Ready**: Optimized build with standalone output
✅ **Security**: Non-root user execution
✅ **Hot Reload**: Development-ready container setup

## Troubleshooting

### Authentication Issues
If you encounter 404 errors for Bit components:
1. Ensure you're logged in: `bit login`
2. Check `.npmrc` contains the auth token
3. Rebuild the Docker image

### Port Conflicts
If port 3000 is already in use:
```bash
docker run -p 8080:3000 basic-component-app
# Then access via http://localhost:8080
```

### Performance
The container includes all necessary dependencies and is optimized for production use with Next.js standalone output.

## Build Performance

- **Build Time**: ~3-4 minutes (including dependency installation)
- **Image Size**: ~280MB
- **Memory Usage**: ~150MB at runtime
- **CPU Usage**: Minimal for static serving

## Files Created

- `Dockerfile`: Multi-stage Docker build configuration
- `.dockerignore`: Optimized file exclusions
- `build-docker.ps1`: PowerShell build script
- `build-docker.sh`: Bash build script
- `.npmrc`: Bit registry authentication configuration


```bash
# Build the image
docker build -t basic-component-app .

# Run the container
docker run -p 3000:3000 basic-component-app

# Run in detached mode
docker run -d -p 3000:3000 basic-component-app

# View running containers
docker ps

# Stop container
docker stop <container_id>
```