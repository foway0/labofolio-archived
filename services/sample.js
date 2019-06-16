const {context} = require('../core');

// TODO join 문제로 class 포기... 다른 설계 생각해보기
module.exports = {
  getList() {
    const sample = context.getStoresServices().sample;
    const STATUS = sample.getStatus();
    const options = {
      where: {
        status: STATUS.valid,
      }
    };

    return sample.findAll(options)
  },
};