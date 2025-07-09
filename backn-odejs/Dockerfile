# Use Node.js 18 LTS
FROM node:18-alpine

# Create app directory
WORKDIR /app
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3333

# Run migrations and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"] 