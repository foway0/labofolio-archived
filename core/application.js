const express = require('express');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');

class Application {
  constructor(env) {
    this.app = express();
    // TODO
    this.app.set('trust proxy', true);

    if(env.SSL_CERT && env.SSL_KEY) {
      const options = {
        key: env.SSL_KEY,
        cert: env.SSL_CERT
      };

      this.server = https.createServer(options, this.app)
    } else {
      this.server = http.createServer(this.app);
    }

    this.app.use(bodyParser.urlencoded({extended: true}));

    this.app.use((req, res, next) => {
      console.log(`localhost:${env.SERVICE_PORT}${req.url}`);
      //console.log(req.headers.host);
      next();
    });
  }

  start(env) {
    this.server.listen(env.SERVICE_PORT);
    console.log(`ENV:${env.SERVICE_ENV} MODE:${env.SERVICE_MODE} localhost:${env.SERVICE_PORT} is listening!!!`);
  }
}

module.exports = Application;