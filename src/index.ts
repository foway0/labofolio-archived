import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

server.listen(3000, 'localhost', () => {
  console.log('localhost:3000 is on!');
});
