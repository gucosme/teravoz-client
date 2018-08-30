FROM node:8.11.4-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --quiet --production

COPY ./src .

EXPOSE 8080
USER node
CMD ["node", "src/server.js"]
