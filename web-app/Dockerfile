FROM node:16.13.2

WORKDIR /web-app

COPY package*.json ./

RUN npm install

COPY src src

CMD npm run start