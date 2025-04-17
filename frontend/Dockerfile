# Stage 1: Build React App
FROM node:18 AS builder

# Limit memory usage to avoid OOM kill
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Copy only package.json and package-lock.json first to cache dependencies
COPY package*.json ./

RUN npm install

# Now copy the rest of the app code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Optional: Copy custom Nginx config (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy build files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
