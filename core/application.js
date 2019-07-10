const express = require('express');
const http = require('http');
const https = require('https');
// TODO utils ?
const sprintf = require('sprintf-js').sprintf;
// TODO 잘 생각해서 공통 기능 부분을 추가하자
class Application {
  constructor(env) {
    this.app = express();
    // TODO HEADER
    this.app.set('trust proxy', true);

    if(env.SSL_CERT && env.SSL_KEY) {
      const options = {
        key: env.SSL_KEY,
        cert: env.SSL_CERT
      };

      this.server = https.createServer(options, this.app);
    } else {
      this.server = http.createServer(this.app);
    }

    this.app.use(express.urlencoded({extended: true}));

    this.app.get('/favicon.ico', (req, res) => res.status(204));
    if(env.SERVICE_ENV === 'local') {
      this.app.use((req, res, next) => {
        console.log(`localhost:${env.SERVICE_PORT}${req.url}`);
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
    this.server.listen(env.SERVICE_PORT, () => {
      if(env.SERVICE_ENV === 'local') {
        const FORMAT = `ENV:%s MODE:%s localhost:%s is listening!!!`;
        console.log(sprintf(FORMAT, env.SERVICE_ENV, env.SERVICE_MODE, env.SERVICE_PORT));
      }
    });
  }
}

module.exports = Application;