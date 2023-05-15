FROM node:18.13.0

WORKDIR /server

COPY package*.json ./

RUN npm install --silent

RUN npm install -g pm2

COPY . .

EXPOSE 3001

CMD ["pm2", "start", "app.js"]