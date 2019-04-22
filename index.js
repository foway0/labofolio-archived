const express = require('express');

const port = process.env.SERVICE_PORT;

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
  console.log(`localhost:${port} is listening!!!`);
});

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