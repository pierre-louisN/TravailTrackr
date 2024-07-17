# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for development server (typically 3000 for React)
EXPOSE 3000

# Command to start the application in development mode
CMD ["npm", "start"]
