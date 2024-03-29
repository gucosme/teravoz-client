FROM node:8.11.4-alpine

WORKDIR /usr/app

COPY . .

RUN npm cache clean --force \
  && npm install --quiet --production
RUN npm run build

EXPOSE 3000
USER node

CMD ["node", "src/server.js"]
