const {context} = require('../core');
const {services, utils, environment, constant} = context;
/**
 *
 * @param headers {Object}
 * @returns {Function}
 */
module.exports = headers => {
  return (req, res, next) => {

    if(utils.is.objectEmptyChecker(headers)) {
      // custom options
      for(const header in headers) {

        res.header(header, headers[header]);
      }
    } else {
      // default settings
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
  };
};