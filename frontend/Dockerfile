# Stage 1: Build React App
FROM node:18 AS builder

# Increase memory limit for Node.js
ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

# Copy dependencies first
COPY package*.json ./

RUN npm install

# Then copy the rest of the app
COPY . .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
