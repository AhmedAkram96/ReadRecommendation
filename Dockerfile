# Dockerfile
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files (including entrypoint and wait-for-it)
COPY . .

# Make sure scripts are executable
RUN chmod +x entrypoint.sh wait-for-it.sh

# Expose app port
EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
