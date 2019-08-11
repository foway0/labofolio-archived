const {describe, it} = require('mocha');
const {expect} = require('chai');

const error = require('../../../../core/utils/error_handler');
describe('core/utils/error_handler', () => {
  describe('error', () => {
    it('should return Function', () => {
      expect(error).to.be.a('function');
    });

    it('should throw error', () => {
      try {
        new error('must be error', 'UT_ERROR', 500);
      } catch (e) {
        e.message.should.equal('must be error');
        e.statusCode.should.equal('UT_ERROR');
        e.code.should.equal(500);
      }
    });
  });
});