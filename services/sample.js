module.exports = Sample => {
  class SampleService extends Sample {
    static getList(options) {

      return this.findAll(options);
    }
  }

  return SampleService;
};