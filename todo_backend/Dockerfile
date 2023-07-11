FROM node:current-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]



