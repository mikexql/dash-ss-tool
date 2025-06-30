# Use the official Node.js image with dependencies
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Create screenshots directory
RUN mkdir -p /tmp/screenshots

# Expose port (Render expects 3000)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
