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
      database: 'sample',
      timezone: '+09:00',
      retry: {
        max: 3,
      },
      // TODO : replica ???
      // TODO : username password
      replication: {
        read: [
          { host: env.MYSQL_HOST, username: 'foway', password: 'qwerty' },
        ],
        write: { host: env.MYSQL_HOST, username: 'foway', password: 'qwerty' }
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
      }
    }
  };
};