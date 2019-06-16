const {context} = require('../core');
const sample = context.getStoresServices().sample;
const STATUS = sample.getStatus();

// TODO join 문제로 class 포기... 다른 설계 생각해보기
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