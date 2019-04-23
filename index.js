const express = require('express');

const shared = require('./shared');
const environment = shared.environment;
const constant = shared.constant;

const port = environment.SERVICE_PORT;
const env  = environment.SERVICE_ENV;
const mode = environment.SERVICE_MODE;

const app = express();
app.set('truest proxy', true);

app.use((req, res, next) => {
  console.log(`localhost:${port}${req.url}`);
  console.log(req.headers.host);
  next();
});

app.get('/', (req, res) => {
  res.json('ok');
});
app.get('/test', (req, res) => {
  res.json('test');
});

app.listen(port, () => {
  console.log(`ENV:${env} MODE:${mode} localhost:${port} is listening!!!`);
});

// test line
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('sample', 'foway', 'qwerty', {
  host: 'local-store',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });