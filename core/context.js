const Sequelize = require('sequelize');

const shared = require('../shared');
const utils  = require('../utils');
const models = require('../tools/mysql/models');

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

  getConfigStoresMysql() {
    return this.config.stores.mysql;
  }

  getUtils() {
    return this.utils;
  }
}

module.exports = new Context();