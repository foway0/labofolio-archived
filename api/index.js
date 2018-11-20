const express    = require('express'),
      validation = require('express-validator');

const core = require('../core');

const router = {
    '/v1/sample' : require('./v1/sample')(express)
};

class Service extends core.Application {

    constructor() {
        super();

        this.app.use(validation());

        for(let route in router) {

            this.app.use(route, router[route]);
        }

        this.app.get('*', (req, res) => {
            res.status(404).send('what???');

            console.log('???');
        });
    }
}

module.exports = new Service();