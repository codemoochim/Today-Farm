FROM node:18.13.0

WORKDIR /server

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001

CMD ["node", "app.js"]