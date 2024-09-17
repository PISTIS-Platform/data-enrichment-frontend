# Simple setup using nginx for a vite project

# Use a compatible Node.js version with pnpm 7.x
FROM node:16-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@7.32.0

# Copy package files and install dependencies using pnpm
COPY ./package*.json pnpm-lock.yaml* /app/
RUN pnpm install --frozen-lockfile

# Build the project
COPY . .
RUN pnpm run build

# Production stage using nginx
FROM nginx:alpine

# The following steps are needed because of the OpenShift security constraints
# Create some temp folders for later permission granting
# RUN mkdir /var/cache/nginx/uwsgi_temp
# RUN mkdir /var/cache/nginx/client_temp
# RUN mkdir /var/cache/nginx/proxy_temp
# RUN mkdir /var/cache/nginx/fastcgi_temp
# RUN mkdir /var/cache/nginx/scgi_temp

# Support running as arbitrary user which belongs to the root group
# RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /var/cache/nginx/client_temp

# Copy the built files to the nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
