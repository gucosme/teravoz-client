FROM node:8.11.4-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --quiet --production

COPY . .

RUN npm run build

EXPOSE 3000
USER node

CMD ["node", "src/server.js"]
