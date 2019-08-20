const {context} = require('../core');
const users = context.getStoresServices().users;

module.exports = {
  findOrCreate: (sid, opts) => {
    return users.findOrCreate({
      where: {
        strategy_id: sid,
      },
      defaults: opts,
    });
  }
};