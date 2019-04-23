const environment = require('./environment');

module.exports = {
  environment,
  constant: require('./constant')(environment),
};