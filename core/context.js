const Sequelize = require('sequelize');
const bugsnag = require('@bugsnag/js');
const bugsnagExpress = require('@bugsnag/plugin-express');
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

  installOauth(app, ops) {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });
    const login_url = ops.login_url;
    const login_url_redirect = ops.login_url_redirect;
    delete ops.login_url;
    delete ops.login_url_redirect;
    const gStrategy = new GoogleStrategy(ops,
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          return done(null, {accessToken, refreshToken, profile});
        });
      });
    passport.use(gStrategy);
    refresh.use(gStrategy);
    app.use(passport.initialize());
    app.get(login_url, passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline' }));
    app.get(login_url_redirect, passport.authenticate( 'google', ));
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