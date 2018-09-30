const express = require('express'),
      http    = require('http');

const env = require('./shared').environment;

class Application {
    constructor() {
        this.app    = express();
        this.server = http.Server(this.app);
    }

    start() {
        this.server.listen(env.SERVICE_PORT);
        console.log('server start !!!');
    }
}

module.exports = Application;