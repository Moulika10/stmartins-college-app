FROM node:14-alpine AS node_image
ARG PORT=3030

#
# ------- Builder stage -------
#
FROM node_image AS build_image

WORKDIR /app
COPY package*.json ./

# Install all dependencies including dev
RUN npm install
# Copy the rest of the code
COPY . .
# Invoke the build script to transpile ts code to js
RUN npm run build

#
# ------- Final stage -------
#
FROM node_image AS final_image

# Add non-root user
RUN addgroup -S dgroup && adduser -S duser -G dgroup

# Prepare destination directory
RUN mkdir -p /home/duser/app/dist
WORKDIR /home/duser/app

# Install libraries
COPY package*.json ./
RUN npm install --only=production

# Copy js files
COPY --from=build_image /app/dist ./dist
COPY --from=build_image /app/node_modules ./dist/node_modules
COPY migrations ./dist/migrations
COPY seeders ./dist/seeders
COPY src/data/*.mock.json ./dist/src/data/
COPY --from=build_image /app/config ./dist/config
COPY --from=build_image /app/test ./test

EXPOSE ${PORT}
# Switch to user duser
USER duser
CMD ["node", "./dist/src/start-server.js"]
