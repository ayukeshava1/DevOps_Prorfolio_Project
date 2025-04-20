# Stage 1: Build React App
FROM node:18 AS builder

# Optimize memory usage
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Copy only package files for dependency caching
COPY package.json package-lock.json ./

RUN npm install

# Copy the full application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Optional: Include custom Nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy build files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
