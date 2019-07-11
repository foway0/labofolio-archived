module.exports = env => {
  const config = {};
  config.stores = stores(env);
  config[env.SERVICE_MODE] = service(env)[env.SERVICE_MODE];
  config.log4js = log4js(env);

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

const log4js = env => { // eslint-disable-line no-unused-vars
  return {
    appenders: {
      out: {
        type: 'stdout',
        layout: {
          type: 'coloured'
        }
      },
      pattern: {
        type: 'stdout',
        layout: {
          type: 'pattern',
          pattern: '[%d][%p][%c] %h - %m'
        }
      },
      json: {
        type: 'stdout',
        layout: {
          type: 'json',
          separator: ',',
        }
      }
    },
    categories: {
      default: {
        appenders: ['out'],
        level: 'all'
      },
      pattern: {
        appenders: ['pattern'],
        level: 'all'
      },
      json: {
        appenders: ['json'],
        level: 'all'
      },
    }
  }
};