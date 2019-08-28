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
  },
  findOne: (sid) => {
    console.log(context.getStoresServices());
    const options = {
      where: {
        strategy_id: sid,
      },
    };
    return users.findOne(options);
  }
};