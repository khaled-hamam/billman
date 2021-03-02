FROM node:14

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install
RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]
