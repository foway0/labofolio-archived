import env from './environment';

export default Object.freeze({
  mysql: {
    database: env.MYSQL_DATABASE,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    options: {
      dialect: 'mysql',
      timezone: '+09:00',
      host: env.MYSQL_HOST
    }
  }
});
