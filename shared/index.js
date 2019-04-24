const environment = require('./environment');
const constant = require('./constant')(environment);
const config = require('./config')(environment);

module.exports = {
  environment,
  constant,
  config,
};