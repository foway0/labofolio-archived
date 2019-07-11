const express = require('express');

const {context} = require('../../../core');
const {services, utils, constant} = context;
const code = constant.statusCode;

const router = express.Router();

const doAsync = utils.wrapper.doAsync;

router.route('/')
  .get(doAsync(list));

router.route('/:id')
  .get(doAsync(getOne));

module.exports = router;

async function list(req, res) {
  const result = await services.sample.getList().catch(err => {
    // TODO send slack AND monitoring
    throw new utils.error(err.name, err.original.code, code.BAD_REQUEST);
  });
  utils.log4js.info('json', result);

  res.status(code.OK).json(result);
}

async function getOne(req, res) {
  const id = req.params.id;
  const result = await services.sample.getById(id);
  utils.log4js.info('json', result);

  res.status(code.OK).json(result);
}