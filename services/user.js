const {context} = require('../core');
const user = context.getStoresServices().user;

module.exports = {
  findOrCreate: (uuid, opts) => {
    return user.findOrCreate({
      where: {
        uuid: uuid
      },
      defaults: opts,
    });
  }
};