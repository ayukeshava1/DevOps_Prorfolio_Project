# Stage 1: Build React App
FROM node:18-alpine AS builder

# Optimize Node.js memory usage
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set working directory
WORKDIR /app

# Copy only package files for better caching of dependency installation
COPY package.json package-lock.json ./

# Install dependencies efficiently
RUN npm ci --only=production

# Copy the application source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
