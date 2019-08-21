const express = require('express');

const {context} = require('../../../core');
const {services, utils, middleware, constant} = context;
const code = constant.statusCode;

const router = express.Router();

const doAsync = utils.wrapper.doAsync;

router.route('/')
  .post(middleware.auth_api.accessToken, doAsync(list));

module.exports = router;

async function list(req, res) {
  res.status(code.NO_CONTENT).send();
}