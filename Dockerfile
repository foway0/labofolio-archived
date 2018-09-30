FROM node:carbon

WORKDIR /usr/src/app

# Setup project
ADD app.js /usr/src/app/
ADD package*.json /usr/src/app/
ADD api /usr/src/app/api
ADD core /usr/src/app/core

RUN npm cache verify && npm install --no-progress

EXPOSE 3000
USER root
CMD [ "npm", "start" ]