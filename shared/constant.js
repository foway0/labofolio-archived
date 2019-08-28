module.exports = env => { // eslint-disable-line no-unused-vars
  const constant = {};
  constant.statusCode = statusCode;

  return Object.freeze(constant);
};

const statusCode = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED:401,
  NOT_FOUND: 404,
  SERVICE_UNAVAILABLE: 503,
};