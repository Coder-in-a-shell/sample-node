# Use a lightweight Alpine image
FROM node:20-alpine

# Set to production to optimize Node modules
ENV NODE_ENV=production

# Create app directory and set ownership to the node user
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

# Switch to the non-root user for security
USER node

# Copy files and set correct permissions
COPY --chown=node:node package*.json ./
COPY --chown=node:node server.js ./

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]