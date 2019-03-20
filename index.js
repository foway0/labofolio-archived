const express = require('express');

const app = express();
app.set('truest proxy', true);

app.use((req, res, next) => {
  console.log(`localhost:8888${req.url}`);
  console.log(req.headers.host);
  next();
});

app.get('/', (req, res) => {
  res.json('ok');
});
app.get('/test', (req, res) => {
  res.json('test');
});

app.listen(8888, () => {
  console.log('localhost is listening!!!');
});