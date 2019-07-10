const Sequelize = require('sequelize');
const bugsnag = require('@bugsnag/js');
const bugsnagExpress = require('@bugsnag/plugin-express');

const shared = require('../shared');
const utils  = require('../utils');
const models = require('../tools/mysql/models');
const locales = require('../tools/locales');
const middlewares = require('../middlewares');

// TODO 이름 개판이니 고치기
// TODO setter로 로딩해서 constructor에서 사용하도록 설정하기!
class Context {
  constructor() {
    this.environment = shared.environment;
    this.constant = shared.constant;
    this.config = shared.config;
    this.utils = utils;
    this.models = models;
    this.stores = {};
    this.stores.mysql = null;
    this.stores.service = {};
    this.services = null;
    this.middlewares = middlewares;
    this.locales = locales;
    this.bugsnag = null;
  }

  async initStores() {
    this.stores.mysql = new Sequelize(this.getConfigStoresMysql());
    await this.stores.mysql.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }

  initBugsnag() {
    const bugsnagClient = bugsnag({
      apiKey: this.environment.BUGSNAG_API_KEY,
      releaseStage: this.environment.SERVICE_ENV,
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
    const models = this.getModels();
    for(const rec in models) {
      console.log('=======================');
      console.log(`init: ${[rec]}`);
      this.stores.service[rec] = models[rec](this.getStoresMysql());
      console.log('=======================');
    }
    // load
    this.services = require('../services');
  }

  getBugsnag() {
    return this.bugsnag;
  }

  getServices() {
    return this.services;
  }

  getEnv() {
    return this.environment;
  }

  getConst() {
    return this.constant;
  }

  getModels() {
    return this.models;
  }

  getStoresMysql() {
    return this.stores.mysql;
  }

  getStoresServices() {
    return this.stores.service;
  }

  getConfig() {
    return this.config[this.environment.SERVICE_MODE];
  }

  getConfigStoresMysql() {
    return this.config.stores.mysql;
  }

  getUtils() {
    return this.utils;
  }

  getMiddlewares() {
    return this.middlewares;
  }

  getLocales() {
    return this.locales;
  }
}

module.exports = new Context();