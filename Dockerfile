FROM node:18 AS build

# Set NODE_ENV to production
ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
