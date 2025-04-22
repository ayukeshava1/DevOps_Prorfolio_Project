# Use an official Node.js runtime as the base image for building the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Use an official Nginx image for serving the built application
FROM nginx:1.23-alpine

# Copy the build folder from the previous stage to the Nginx default HTML folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
