const {context} = require('../core');
const sample = context.getStoresServices().sample;
const STATUS = sample.getStatus();

module.exports = {
  getList: () => {
    const options = {
      where: {
        status: STATUS.valid,
      }
    };

    return sample.findAll(options);
  },
  getById: id => {
    const options = {
      where: {
        status: STATUS.valid,
        id: id,
      }
    };

    return sample.findOne(options);
  },
};