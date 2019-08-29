module.exports = {
  objectEmptyChecker: obj => {
    // return true | false
    return !!(obj.constructor === Object && Object.keys(obj).length);
  },
};