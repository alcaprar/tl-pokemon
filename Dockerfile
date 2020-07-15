# build docker
FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --quiet --production --no-progress

# Bundle app source
COPY . .

# build code
RUN yarn build

CMD ["yarn", "start"]