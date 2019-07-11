const Sequelize = require('sequelize');
const bugsnag = require('@bugsnag/js');
const bugsnagExpress = require('@bugsnag/plugin-express');

const utils  = require('./utils');

class Context {
  constructor() {
    this.environment = null;
    this.constant    = null;
    this.config      = null;
    this.models      = null;
    this.middleware  = null;
    this.locales     = null;

    this.utils          = utils;
    this.logger         = this.utils.log4js;
    this.stores         = {};
    this.stores.service = {};
  }

  setParams(params, data) {
    this[params] = data;
  }

  async init() {
    await this.initStores();
    this.initServices();
    this.initBugsnag();
  }

  async initStores() {
    this.stores.mysql = new Sequelize(this.config.stores.mysql);
    await this.stores.mysql.authenticate()
      .then(() => {
        this.logger.info('out', 'Connection has been established successfully.');
      })
      .catch(err => {
        this.logger.error('json', 'Unable to connect to the database:', err);
      });
  }

  initBugsnag() {
    const bugsnagClient = bugsnag({
      apiKey: this.environment.BUGSNAG_API_KEY,
      releaseStage: this.environment.SERVICE_ENV,
      // TODO custom ?
      //logger: null,
      metaData: {
        app: {
          mode: this.environment.SERVICE_MODE,
        }
      }
    });
    bugsnagClient.use(bugsnagExpress);

    this.bugsnag = bugsnagClient.getPlugin('express');
  }

  initServices() {
    const models = this.models;
    this.logger.info('line','=======================');
    for(const rec in models) {
      this.logger.info('line', `init: ${[rec]}`);
      this.stores.service[rec] = models[rec](this.stores.mysql);
    }
    this.logger.info('line', '=======================');
    // load
    this.services = require('../services');
  }

  getMysqlConnect() {
    return this.stores.mysql;
  }

  getStoresServices() {
    return this.stores.service;
  }

  getConfig() {
    return this.config[this.environment.SERVICE_MODE];
  }
}

module.exports = new Context();