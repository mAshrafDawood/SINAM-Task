# Stage 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Stage 2: Serve the application with a lightweight web server
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copy the build output to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]