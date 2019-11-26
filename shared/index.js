const environment = require('./environment');
const constant = require('./constant')(environment);
const config = require('./config')(environment);
const locales = require('./locales');

module.exports = {
  environment,
  constant,
  config,
  locales,
};