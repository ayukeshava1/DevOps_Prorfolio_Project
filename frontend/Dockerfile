# Stage 1: Build the React application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:1.23-alpine

# Copy the build output from the builder stage to Nginx's default HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
