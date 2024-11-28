# Base image for Node.js
FROM node:22

WORKDIR /mean-mono

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose port 3000 and 4200
EXPOSE 3000
EXPOSE 4200

# Start Nest & Angular dev server
CMD ["npm", "run", "app"]
