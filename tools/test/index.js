const {before, beforeEach, after, afterEach} = require('mocha');

before(() => {
  // 블록 범위 내 모든 테스트 전에 실행
  console.log('before');
  require('chai').should();
});

beforeEach(() => {
  // 블록 범위 내 각 테스트 직전에 실행
  console.log('before each');
});

afterEach(() => {
  // 블록 범위 내 각 테스트 직후에 실행
  console.log('after each');
});

after(() => {
  // 블록 범위 내 모든 테스트 후에 실행
  console.log('after');
});