# Para app2
FROM node:14

WORKDIR /socket

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800

CMD ["node", "index.js"]
