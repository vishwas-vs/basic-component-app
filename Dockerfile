# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Build argument for auth token (passed securely at build time)
ARG BIT_TOKEN

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files (without .npmrc to avoid exposing token)
COPY package.json package-lock.json* ./

# Create secure .npmrc with build-time token
RUN echo "@shrijulvenkatesh:registry=https://node-registry.bit.cloud/" > .npmrc && \
    echo "//node-registry.bit.cloud/:_authToken=${BIT_TOKEN}" >> .npmrc

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Remove .npmrc after installation to avoid exposing token in final image
RUN rm -f .npmrc

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set production environment after build
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Change ownership of the .next directory
RUN chown -R nextjs:nodejs .next

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]