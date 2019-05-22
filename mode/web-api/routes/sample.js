const express = require('express');

const {context} = require('../../../core');
const code = context.getConst().statusCode;
const utils = context.getUtils();

const router = express.Router();

const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

router.get('/', (req, res) => {
  res.status(code.OK).send(`This is my sample page!!!`);
});

router.get('/error', doAsync(async (req, res) => {
  throw new utils.error('woops', 'TEST', code.BAD_REQUEST);
}));

router.get('/list', doAsync(async (req, res) => {
  const sequelize = context.getMysql();
  const STATUS = context.getModels().sample.STATUS;
  const sample = context.getModels().sample(sequelize);
  const result = await sample.findAll({
    where: {
      status: STATUS.valid,
    }
  }).catch(err => {
    // TODO send slack AND monitoring
    throw new utils.error(err.name, err.original.code, code.BAD_REQUEST);
  });

  res.status(code.OK).json(result);
}));

module.exports = router;