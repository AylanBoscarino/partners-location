FROM node:alpine

COPY ./ /app/

WORKDIR /app/

RUN apk add --no-cache bash

RUN yarn install

CMD [ "yarn", "start:dev" ]