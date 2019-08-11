const express = require('express');
const moment = require('moment');

const {context} = require('../../../core');
const {services, utils} = context;

const router = express.Router();

const doAsync = utils.wrapper.doAsync;

router.route('/google/callback')
  .get(doAsync(callback));

module.exports = router;

async function callback(req, res) {
  req.user.ua = req.get('user-agent');
  const info = req.user.profile._json;
  const opts = {
    uuid: info.sub,
    nickname: info.name,
    profile_url: info.picture,
    locale: info.locale,
    user_agent: req.user.ua,
    last_access: moment().tz('Asia/Tokyo'),
  };
  const a = await services.user.findOrCreate(req.user.profile.id, opts);
  res.json(a);
}