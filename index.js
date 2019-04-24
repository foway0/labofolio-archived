const express = require('express');
const Sequelize = require('sequelize');
// TODO : mode & context

(async () => {
  const shared = require('./shared');
  const environment = shared.environment;
  const constant = shared.constant;
  const config = shared.config;
  const sequelize = new Sequelize(config.stores.mysql);

  const app = express();
  app.set('truest proxy', true);

  app.use((req, res, next) => {
    console.log(`localhost:${environment.SERVICE_PORT}${req.url}`);
    //console.log(req.headers.host);
    next();
  });

  app.get('/', (req, res) => {
    res.json('ok');
  });
  app.get('/test', (req, res) => {
    res.json('test');
  });
  app.get('/ping', async (req, res) => {
    await sequelize.authenticate();

    res.json('pong');
  });

  app.listen(environment.SERVICE_PORT, () => {
    console.log(`ENV:${environment.SERVICE_ENV} MODE:${environment.SERVICE_MODE} localhost:${environment.SERVICE_PORT} is listening!!!`);
  });
})().catch(err => {
  console.log(err);
  process.exit(1);
});