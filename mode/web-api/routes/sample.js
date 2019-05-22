const express = require('express');

const {context} = require('../../../core');
const code = context.getConst().statusCode;

const router = express.Router();

router.get('/', (req, res) => {
  res.status(code.OK).send(`This is my sample page!!!`);
});

router.get('/result', async (req, res) => {
  const sequelize = context.getMysql();
  const STATUS = context.getModels().sample.STATUS;
  const sample = context.getModels().sample(sequelize);
  const result = await sample.findAll({
    where: {
      status: STATUS.valid,
    }
  });

  res.status(code.OK).json(result);
});

module.exports = router;