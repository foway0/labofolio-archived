const express = require('express');

const core = require('../core');

const router = {
    '/v1/sample' : require('./v1/sample')(express)
};

class Service extends core.Application {

    constructor() {
        super();

        for(let route in router) {

            this.app.use(route, router[route]);
        }

        this.app.get('*', function(req, res){
            res.status(404).send('what???');

            console.log('???');
        });
    }
}

module.exports = new Service();