# Base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Use a minimal server to serve the static files
FROM nginx:alpine

# Copy built files from previous stag
COPY --from=build /app/build /usr/share/nginx/html

# Expose the por
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
