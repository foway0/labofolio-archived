const express = require('express');

const {context} = require('../../../core');
const services = context.getServices();
const code = context.getConst().statusCode;
const utils = context.getUtils();

const router = express.Router();

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

router.get('/info', (req, res) => {
  res.status(code.OK).send(`This is my sample page!!!`);
});

router.get('/error', doAsync(async (req, res) => {
  throw new utils.error('woops', 'TEST', code.BAD_REQUEST);
}));

router.get('/', doAsync(async (req, res) => {
  const result = await services.sample.getList().catch(err => {
    // TODO send slack AND monitoring
    throw new utils.error(err.name, err.original.code, code.BAD_REQUEST);
  });

  res.status(code.OK).json(result);
}));

router.get('/:id', doAsync(async (req, res) => {
  const id = req.params.id;
  const result = await services.sample.getById(id);

  res.status(code.OK).json(result);
}));

module.exports = router;