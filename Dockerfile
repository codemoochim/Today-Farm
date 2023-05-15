FROM node:18.13.0

WORKDIR /server

COPY package*.json ./

RUN npm install --silent

RUN npm install pm2 -g

COPY . .

EXPOSE 3001

CMD ["node", "app.js"]