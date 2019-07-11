const Sequelize = require('sequelize');
const bugsnag = require('@bugsnag/js');
const bugsnagExpress = require('@bugsnag/plugin-express');

const shared = require('../shared');
const utils  = require('./utils');
const models = require('../tools/mysql/models');
const locales = require('../tools/locales');
const middleware = require('../middleware');

// TODO 이름 개판이니 고치기
// TODO setter로 로딩해서 constructor에서 사용하도록 설정하기!
class Context {
  constructor() {
    this.environment = shared.environment;
    this.constant = shared.constant;
    this.config = shared.config;
    this.utils = utils;
    this.logger = this.utils.log4js;
    this.models = models;
    this.middleware = middleware;
    this.locales = locales;
    this.stores = {};
    this.stores.service = {};
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

  // TODO set init
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