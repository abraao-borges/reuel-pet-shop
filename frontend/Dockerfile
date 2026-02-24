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
# Copy a custom nginx config if you have one, or use default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]