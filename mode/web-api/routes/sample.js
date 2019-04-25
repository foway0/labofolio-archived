const express = require('express');

const {context} = require('../../../core');
const code = context.getConst().statusCode;

const router = express.Router();

router.get('/', (req, res) => {
  res.status(code.OK).send(`This is my sample page!!!`);
});

module.exports = router;