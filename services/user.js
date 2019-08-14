const {context} = require('../core');
const user = context.getStoresServices().user;

module.exports = {
  findOrCreate: (sid, opts) => {
    return user.findOrCreate({
      where: {
        strategy_id: sid,
      },
      defaults: opts,
    });
  }
};