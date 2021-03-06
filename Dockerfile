FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

RUN chmod -x /wait
COPY . .

EXPOSE ${PORT}

CMD npm start