# Stage 1: Build React App
FROM node:18-alpine AS builder

# Optimize memory usage for Node.js
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Set working directory
WORKDIR /app

# Copy only package files for better caching
COPY package.json package-lock.json ./

# Install dependencies efficiently
RUN npm ci

# Copy the application source code
COPY src ./src
COPY public ./public

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Set a non-root user for security
RUN adduser -D -H -s /sbin/nologin nginx-user

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Optional: Include custom Nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Set ownership to the non-root user
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Use non-root user
USER nginx-user

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
