FROM node:14

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install
RUN npm run build

USER node

CMD [ "npm", "start" ]
