const express = require('express');
const moment = require('moment');
require('moment-timezone');

const uuid = require('uuid');

const {context} = require('../../../core');
const {services, utils} = context;
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
    uuid: uuid(),
    nickname: info.name,
    profile_url: info.picture,
    locale: info.locale,
    user_agent: req.user.ua,
    last_access: moment().tz('Asia/Tokyo'),
  };
  const result = await services.user.findOrCreate(info.sub, opts);

  const key = result[0].strategy_id;
  const iv  = result[0].uuid;
  const expire = moment().tz('Asia/Tokyo').add(config.expire, 'minutes').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
  const text = `${result[0].strategy_id}_${expire}`;
  const token = utils.crypto.encrypt(text, key, iv);

  res.status(200).render('auth.pug', {token: token});
}