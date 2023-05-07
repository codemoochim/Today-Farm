FROM node:lts
WORKDIR /backend
COPY package*.json /backend
RUN npm install
CMD ["npm", "start"]
EXPOSE 5000