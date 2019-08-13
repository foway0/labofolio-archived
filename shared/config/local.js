module.exports = env => {
  const config = {};
  config.stores = stores(env);
  config[env.SERVICE_MODE] = service(env)[env.SERVICE_MODE];

  return Object.freeze(config);
};

const stores = env => {
  return {
    mysql: {
      dialect: 'mysql',
      port: 3306,
      database: env.MYSQL_DATABASE,
      timezone: '+09:00',
      retry: {
        max: 3,
      },
      replication: {
        read: [
          { host: env.MYSQL_HOST, username: env.MYSQL_USER, password: env.MYSQL_PASSWORD },
        ],
        write: { host: env.MYSQL_HOST, username: env.MYSQL_ROOT_USER, password: env.MYSQL_ROOT_PASSWORD }
      }
    }
  };
};

const service = env => { // eslint-disable-line no-unused-vars
  return {
    'web-api': {
      cors: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      oauth: {
        callbackURL: 'http://localhost/auth/google/callback'
      },
      expire: 60 * 24,
    }
  };
};