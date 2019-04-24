module.exports = env => {
  const config = {};
  config.stores = stores(env);


  return Object.freeze(config);
};

const stores = env => {
  return {
    mysql: {
      dialect: 'mysql',
      port: 3306,
      database: 'sample',
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
  }
};