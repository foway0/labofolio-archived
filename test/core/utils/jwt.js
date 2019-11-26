const {describe, it} = require('mocha');

const jwt = require('../../../core/utils/jwt');
describe('core/utils/jwt.js', () => {
  const SECRET = 'labofolio-unit-test';
  let tokens;
  const data = {
    labofolio: 'qwerty',
  };

  describe('generateToken', () => {
    it('should be string', () => {
      const expires = 1000;
      tokens = jwt.generateToken(data, SECRET, expires);
      tokens.should.be.a('string');
    });
  });

  describe('verifyToken', () => {
    it('should be object', () => {
      const decode = jwt.verifyToken(tokens, SECRET);
      decode.should.be.a('object');
      decode.labofolio.should.be.equal('qwerty');
    });

    it('should throw error - invalid signature', () => {
      const SECRET = 'heyhey';
      try {
        tokens = jwt.verifyToken(tokens, SECRET);
      } catch (e) {
        e.message.should.be.equal('invalid signature');
      }
    });

    it('should throw error - jwt expired', () => {
      const expires = -1000;
      tokens = jwt.generateToken(data, SECRET, expires);
      try {
        jwt.verifyToken(tokens, SECRET);
      } catch (e) {
        e.message.should.be.equal('jwt expired');
      }
    });
  });
});