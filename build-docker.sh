#!/bin/bash

# Extract the auth token from global .npmrc
AUTH_TOKEN=$(npm config get //node-registry.bit.cloud/:_authToken 2>/dev/null || echo "")

if [ -z "$AUTH_TOKEN" ]; then
    echo "Error: No auth token found. Please run 'bit login' first."
    exit 1
fi

echo "Building Docker image with Bit authentication..."
docker build --build-arg BIT_TOKEN="$AUTH_TOKEN" -t basic-component-app .