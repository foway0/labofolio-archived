const express    = require('express'),
      http       = require('http'),
      bodyParser = require('body-parser');

const env = require('./shared').environment;

class Application {
    constructor() {
        this.app    = express();
        this.server = http.Server(this.app);

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