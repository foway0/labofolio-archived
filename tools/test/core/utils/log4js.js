const {describe, it} = require('mocha');
const {expect} = require('chai');

const log4js = require('../../../../core/utils/log4js');
describe('core/utils/log4js', () => {
  describe('log', () => {
    it('should return Function', () => {
      expect(log4js).to.be.a('function');
    });

    it('should stdout log', () => {
      log4js.all('out', 'UT');
      log4js.trace('out', 'UT');
      log4js.debug('out', 'UT');
      log4js.info('out', 'UT');
      log4js.warn('out', 'UT');
      log4js.error('out', 'UT');
      log4js.fatal('out', 'UT');
    });
  });
});