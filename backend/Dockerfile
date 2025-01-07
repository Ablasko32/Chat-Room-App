FROM node:22.12-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node","server.js"]