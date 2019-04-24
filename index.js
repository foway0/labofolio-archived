const express = require('express');
const Sequelize = require('sequelize');
// TODO : mode & context
const utils = require('./utils');

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
    res.status(200).json('ok');
  });
  app.get('/test', (req, res) => {
    res.status(200).json('test');
  });
  app.get('/ping', async (req, res) => {
    await sequelize.authenticate();

    res.json('pong');
  });
  app.get('/error/:flag', (req, res) => {
    const flag = req.params.flag;

    // error handling test
    if(flag === 'true') {
      res.json('this is true');
    } else {
      throw new utils.error('woops', 'TEST', 500);
    }
  });
  // 404 not found
  app.get('*', function(req, res){
    res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
  });
  app.use((err, req, res, next) => {
    // Will get here
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
    });
  });

  app.listen(environment.SERVICE_PORT, () => {
    console.log(`ENV:${environment.SERVICE_ENV} MODE:${environment.SERVICE_MODE} localhost:${environment.SERVICE_PORT} is listening!!!`);
  });
})().catch(err => {
  console.log(err);
  process.exit(1);
});