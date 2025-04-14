# Stage 1: Build React App
FROM node:18 AS builder

# Limit memory usage to avoid OOM kill
ENV NODE_OPTIONS=--max_old_space_size=512

WORKDIR /app

# Copy only package.json first to cache dependencies
COPY package*.json ./

RUN npm install

# Now copy rest of the app code
COPY . .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Optional: Copy custom Nginx config (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy build files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
