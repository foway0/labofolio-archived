module.exports = env => {
  switch (env.SERVICE_ENV) {
    case 'local':
      return require('./local')(env);
    case 'prd':
      return require('./prd')(env);
    default:
      throw Error('env ERROR!');
  }
};