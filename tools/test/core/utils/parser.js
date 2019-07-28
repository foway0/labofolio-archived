const {describe, it} = require("mocha");
const {expect} = require('chai');

const parser = require('../../../../core/utils/parser');
describe('core/utils/parser', () => {
  describe('loadYaml', () => {
    const yaml = parser.loadYaml(`${__dirname}/../../fixtures/test.yaml`);

    it('should load error', () => {
      try {
        parser.loadYaml(`error.yaml`);
      } catch (e) {
        e.message.should.equal(`ENOENT: no such file or directory, open 'error.yaml'`);
      }
    });

    it('should return object type', () => {
      expect(yaml).to.be.a('object');
    });

    it('should to deep equal object', () => {
      expect(yaml.info).to.deep.equal({
        version: '1.0.0',
        license: {
          name: 'MIT'
        }
      });
    })
  });

  describe('pathJoin', () => {
    it('should return joined path', () => {
      parser.pathJoin('i', 'like', 'test').should.equal('i/like/test');
    });
  });
});