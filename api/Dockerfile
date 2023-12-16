# Para app1
FROM node:14

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3800

CMD ["node", "index.js"]
