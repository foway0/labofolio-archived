const {context} = require('../core');
const {services, utils, environment, constant} = context;
const code = constant.statusCode;

const doAsync = utils.wrapper.doAsync;

module.exports = {
  accessToken: doAsync(async (req, res, next) => {
    const tokens = req.get('Authorization');
    if(!tokens) {
      throw new utils.error('token does not exists', 'Unauthorized', code.UNAUTHORIZED);
    }

    let decode;
    try {
      decode = utils.jwt.verifyToken(tokens, environment.JWT_SECRET);
    } catch(err) {

      if(err.message.match('invalid signature')) {
        throw new utils.error('invalid token', 'Unauthorized', code.UNAUTHORIZED);
      }
      if(err.message.match('jwt expired')) {
        throw new utils.error('token expired', 'Unauthorized', code.UNAUTHORIZED);
      }

      // TODO 503 ?
      throw err;
    }

    const user = await services.users.findOne(decode.strategy_id);
    if(!user) {
      throw new utils.error('user does not exists', 'Unauthorized', code.UNAUTHORIZED);
    }
    req.user = user;

    return next();
  }),
};