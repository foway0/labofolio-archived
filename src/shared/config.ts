import env from './environment';

export default Object.freeze({
  mysql: {
    database: env.MYSQL_DATABASE,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    options: {
      dialect: 'mysql',
      host: env.MYSQL_HOST
    }
  }
});
