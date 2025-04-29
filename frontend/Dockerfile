# Stage 1: Build React app
FROM node:18-alpine as builder
WORKDIR /app

# Copy only necessary files for installation and building
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . . 
RUN npm run build

# Stage 2: Serve it with nginx
FROM nginx:alpine

# Copy the built React app from the builder stage to nginx's default location
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web app
EXPOSE 80

# Command to run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
