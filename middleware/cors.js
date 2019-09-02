const {context} = require('../core');
const {utils, logger, constant} = context;
const code = constant.statusCode;
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
        logger.info('json', `${header}: ${headers[header]}`);
      }
    } else {
      // default settings
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    if ('OPTIONS' === req.method) {
      //respond with 200
      return res.send(code.OK);
    }
    return next();
  };
};