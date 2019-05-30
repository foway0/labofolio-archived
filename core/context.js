const Sequelize = require('sequelize');

const shared = require('../shared');
const utils  = require('../utils');
const models = require('../tools/mysql/models');
const services = require('../services');

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
    this.services = services;
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
    for(const rec in this.getServices()) {
      console.log('=======================');
      console.log(`init: ${[rec]}`)
      this.stores.service[rec] = this.getServices()[rec](this.getModels()[rec](this.getStoresMysql()));
      console.log('=======================');
    }
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