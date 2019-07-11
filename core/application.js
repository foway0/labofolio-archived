const express = require('express');
const http = require('http');
const https = require('https');
const sprintf = require('sprintf-js').sprintf;

class Application {
  constructor(env) {
    this.host = env.SERVICE_HOST;
    this.port = env.SERVICE_PORT;
    this.env  = env.SERVICE_ENV;
    this.mode = env.SERVICE_MODE;

    this.app = express();
    // TODO HEADER
    this.app.set('trust proxy', true);

    this.app.use(express.urlencoded({extended: true}));

    this.app.get('/favicon.ico', (req, res) => res.sendStatus(204));
    if(this.env === 'local') {
      this.app.use((req, res, next) => {
        console.log(`${this.host}:${this.port}${req.url}`);
        next();
      });
    }
  }

  /**
   * @param {Object} obj
   */
  loadRoutes(obj) {
    for(let key in obj) {
      this.app.use(key, obj[key]);
    }
  }

  start(env) {
    if(env.SSL_CERT && env.SSL_KEY) {
      const options = {
        key: env.SSL_KEY,
        cert: env.SSL_CERT
      };

      this.server = https.createServer(options, this.app);
    } else {
      this.server = http.createServer(this.app);
    }

    this.server.listen(this.port, this.host, () => {
      if(env.SERVICE_ENV === 'local') {
        const FORMAT = `ENV:%s MODE:%s %s:%s is listening!!!`;
        console.log(sprintf(FORMAT, this.env, this.mode, this.host, this.port));
      }
    });
  }
}

module.exports = Application;