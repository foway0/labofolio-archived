const {describe, it} = require('mocha');
const {expect} = require('chai');

const is = require('../../../core/utils/type_checker');
describe('core/utils/type_checker', () => {
  describe('objectEmptyChecker', () => {
    it('should return true', () => {
      expect(is.objectEmptyChecker({is: true})).to.be.true;
    });

    it('should return false', () => {
      expect(is.objectEmptyChecker({})).to.be.false;
    });

    it('should return false #type not matched', () => {
      expect(is.objectEmptyChecker([])).to.be.false;
      expect(is.objectEmptyChecker('a')).to.be.false;
      expect(is.objectEmptyChecker(1)).to.be.false;
    });
  });
});