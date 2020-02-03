export default Object.freeze({
  SERVICE_ENV: String(process.env.SERVICE_ENV),
  SERVICE_PORT: Number(process.env.SERVICE_PORT),
  SERVICE_HOST: String(process.env.SERVICE_HOST),
  MYSQL_DATABASE: String(process.env.MYSQL_DATABASE),
  MYSQL_USER: String(process.env.MYSQL_USER),
  MYSQL_PASSWORD: String(process.env.MYSQL_PASSWORD),
  MYSQL_HOST: String(process.env.MYSQL_HOST)
});
