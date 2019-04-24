module.exports = {
  SERVICE_ENV: process.env.SERVICE_ENV || 'local',
  SERVICE_PORT: process.env.SERVICE_PORT,
  SERVICE_MODE: process.env.SERVICE_MODE,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  SSL_CERT: process.env.SSL_CERT,
  SSL_KEY: process.env.SSL_KEY,
};