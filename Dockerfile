FROM node:18.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

RUN npm install -g pm2

COPY . .

EXPOSE 5000

CMD ["pm2", "start", "app.js"]