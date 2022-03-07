FROM node:16.13.2

WORKDIR /single-page-application

COPY package*.json ./

RUN npm install

COPY frontend frontend

COPY server.js server.js

CMD npm run start