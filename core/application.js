const express = require('express');
const http = require('http');
const https = require('https');
const sprintf = require('sprintf-js').sprintf;

class Application {
  constructor(ctx) {
    const env = ctx.environment;
    this.ctx    = ctx;
    this.host   = env.SERVICE_HOST;
    this.port   = env.SERVICE_PORT;
    this.env    = env.SERVICE_ENV;
    this.mode   = env.SERVICE_MODE;
    this.logger = ctx.logger;

    this.app = express();
    this.app.set('trust proxy', true);

    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());

    this.app.get('/favicon.ico', (req, res) => res.sendStatus(204));
    if(this.env === 'local') {
      this.app.use((req, res, next) => {
        this.logger.debug('line', `${this.host}:${this.port}${req.url}`);
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

  start() {
    const env = this.ctx.environment;
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
      if(this.env === 'local') {
        const FORMAT = `ENV:%s MODE:%s %s:%s is listening!!!`;
        this.logger.debug('line', sprintf(FORMAT, this.env, this.mode, this.host, this.port));
      }
    });
  }
}

module.exports = Application;