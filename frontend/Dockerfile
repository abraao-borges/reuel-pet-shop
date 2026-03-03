<<<<<<< HEAD
# Step 1: Build the React/Vite app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy the dist folder from the build stage to Nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
=======
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:stable-alpine
# CHANGE THIS LINE: Vite builds to 'dist', not 'build'
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

>>>>>>> 739cb3c92d2a76f75b505a5e38170b8f83d81a56
CMD ["nginx", "-g", "daemon off;"]