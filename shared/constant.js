module.exports = env => {
  const constant = {};
  constant.statusCode = statusCode;

  return Object.freeze(constant);
};

const statusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};