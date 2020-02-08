FROM node:alpine

COPY ./ /app/

WORKDIR /app/

RUN yarn install

CMD [ "yarn", "start:dev" ]