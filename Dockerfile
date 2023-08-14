FROM node:18

WORKDIR /usr/src/app

COPY deliveries/package*.json ./

RUN npm install

RUN npm install mysql cookie-parser body-parser express-session session-file-store method-override jsonwebtoken express ejs morgan

RUN mkdir /var/log/app && touch /var/log/app/access.log

COPY deliveries/. .

EXPOSE 3002

CMD [ "node", "index.js" ]
