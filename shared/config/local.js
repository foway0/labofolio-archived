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
    api: {
      cors: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
        'Access-Control-Expose-Headers': 'Authorization',
      },
      oauth: {
        callbackURL: 'https://localhost/auth/google/callback',
        web_host: 'localhost',
        login_url: '/auth/google',
        login_url_redirect: '/auth/google/callback',
        allow_email_domains: [
          'gmail.com',
        ],
      },
      token_expire: 60 * 60 * 24,
    }
  };
};