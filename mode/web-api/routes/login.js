const express = require('express');
const moment = require('moment');
require('moment-timezone');

const {context} = require('../../../core');
const {services, utils, environment, constant} = context;
const config = context.getConfig();
const code = constant.statusCode;

const router = express.Router();

const doAsync = utils.wrapper.doAsync;

router.route('/google/callback')
  .get(doAsync(callback));

module.exports = router;

// TODO bearer
async function callback(req, res) {
  req.user.ua = req.get('user-agent');
  const info = req.user.profile._json;
  const email = req.user.profile._json.email;
  const email_domains = email.trim().split('@')[1];
  console.log(email_domains);
  console.log(config.oauth.allow_email_domains);
  if(!config.oauth.allow_email_domains.includes(email_domains)) {
    throw new utils.error('email domains not matched', 'email domains validation error', code.BAD_REQUEST);
  }
  const opts = {
    strategy_id: info.sub,
    nickname: info.name,
    profile_url: info.picture,
    locale: info.locale,
    user_agent: req.user.ua,
    last_access: moment().tz('Asia/Tokyo'),
  };
  const result = await services.users.findOrCreate(info.sub, opts);

  const data = {
    strategy_id: result[0].strategy_id
  };
  const token = utils.jwt.generateToken(data, environment.JWT_SECRET, config.token_expire);

  res.status(code.OK).render('auth.pug', {token: token, role:result[0].role_id, host: config.oauth.web_host});
}