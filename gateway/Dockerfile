FROM node:14

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install

USER node

CMD [ "npm", "start" ]
