FROM node:10-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "." ]