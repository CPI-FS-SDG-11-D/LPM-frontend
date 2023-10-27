# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS base

# Set the working directory to /app
WORKDIR /app

EXPOSE 4173

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the app
RUN npm run build

# Set the command to start the app
CMD ["npm", "run", "preview"]