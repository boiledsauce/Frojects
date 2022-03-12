FROM node:16.13.2

WORKDIR /single-page-application

COPY package*.json ./

RUN npm install

COPY src src

CMD npm run start