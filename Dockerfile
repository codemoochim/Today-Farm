FROM node:18.13.0

WORKDIR /backend

COPY package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]