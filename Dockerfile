FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code to the working directory
COPY server.js .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]