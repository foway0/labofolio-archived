const {before, beforeEach, after, afterEach} = require("mocha");

before(function() {
  // 블록 범위 내 모든 테스트 전에 실행
  console.log('before');
  require('chai').should();
});

beforeEach(function() {
  // 블록 범위 내 각 테스트 직전에 실행
  console.log('before each');
});

afterEach(function() {
  // 블록 범위 내 각 테스트 직후에 실행
  console.log('after each');
});

after(function() {
  // 블록 범위 내 모든 테스트 후에 실행
  console.log('after');
});