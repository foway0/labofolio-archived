module.exports = {
  objectEmptyChecker: obj => {
    return obj.constructor === Object && Object.keys(obj).length;
  },
};