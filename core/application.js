const express    = require('express'),
      http       = require('http'),
      https      = require('https'),
      bodyParser = require('body-parser');

const env = require('./shared').environment;

class Application {
    constructor() {
        this.app    = express();

        // TODO : 실제로 적용하기
        if(env.SSL_CERT && env.SSL_KEY) {
            const options = {
                key: env.SSL_KEY,
                cert: env.SSL_CERT
            };

            console.log('-------------------');
            console.log('https server start!');
            console.log('-------------------');

            this.server = https.createServer(options, this.app)
        } else {
            this.server = http.createServer(this.app);

            console.log('-------------------');
            console.log('http  server start!');
            console.log('-------------------');
        }

        // TODO: middleware
        this.app.use((req, res, next) => {
            console.log(`req => localhost:${env.SERVICE_PORT}${req.url}`);
            next();
        });
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    start() {
        this.server.listen(env.SERVICE_PORT);
        console.log('server start !!!');
    }
}

module.exports = Application;