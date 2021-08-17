#FROM node:14.16.0
FROM node:lts-alpine 
#FROM node:14.16.0
# Informs Docker that the container listens on the 
# specified network ports at runtime
ENV NODE_ENV=production
EXPOSE 4000
# Copies index.js and the two package files from the local 
# directory to a new app directory on the container
#COPY .  app/
# Changes working directory to the new directory just created
#WORKDIR /app
WORKDIR /opt/app
#COPY package.json package-lock.json ./
#COPY package.json yarn.lock ./
#RUN yarn install --frozen-lockfile
# Installs npm dependencies on container
WORKDIR /opt/app
COPY . . 
RUN npm i
# Command container will actually run when called
CMD ["node", "server.js"]

# Install dependencies only when needed



# RUN yarn build

