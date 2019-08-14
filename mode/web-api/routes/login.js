const express = require('express');
const moment = require('moment');
require('moment-timezone');

const {context} = require('../../../core');
const {services, utils, environment} = context;
const config = context.getConfig();

const router = express.Router();

const doAsync = utils.wrapper.doAsync;

router.route('/google/callback')
  .get(doAsync(callback));

module.exports = router;

// TODO bearer
async function callback(req, res) {
  req.user.ua = req.get('user-agent');
  const info = req.user.profile._json;
  const opts = {
    strategy_id: info.sub,
    nickname: info.name,
    profile_url: info.picture,
    locale: info.locale,
    user_agent: req.user.ua,
    last_access: moment().tz('Asia/Tokyo'),
  };
  const result = await services.user.findOrCreate(info.sub, opts);

  const data = {
    strategy_id: result[0].strategy_id
  };
  const token = utils.crypto.generateToken(data, environment.JWT_SECRET, config.token_expire);

  res.status(200).render('auth.pug', {token: token});
}