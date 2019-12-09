FROM node:12.13.1-slim

ENV HOME=/usr/src/app
WORKDIR $HOME

# Setup project
ADD .env $HOME/.env
ADD tsconfig.json $HOME/tsconfig.json
ADD package.json $HOME/package.json
ADD src $HOME/src
ADD test $HOME/test

RUN npm cache verify && npm install --no-progress

EXPOSE 3000
CMD ["npm", "run", "dev"]