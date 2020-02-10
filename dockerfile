FROM node:alpine

COPY ./ /app/

WORKDIR /app/

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli

RUN yarn install

RUN yarn test

CMD [ "yarn", "start:prod" ]