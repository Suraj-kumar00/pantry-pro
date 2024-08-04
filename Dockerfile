FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies with legacy-peer-deps to avoid conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "dev"]
