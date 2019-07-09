/**
 *
 * @param headers {Object}
 * @returns {Function}
 */
module.exports = headers => {
  return (req, res, next) => {

    if(objectChecker(headers)) {
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
// TODO white_list + custom wl

const objectChecker = obj => {
  return obj.constructor === Object && Object.keys(obj).length;
};