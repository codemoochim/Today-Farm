FROM node:18.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000

CMD ["pm2", "start", "app.js"]