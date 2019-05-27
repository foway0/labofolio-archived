const fs = require('fs');
const yaml = require('js-yaml');

class Parser {
  loadYaml(path, encode = 'utf-8') {
    return yaml.safeLoad(fs.readFileSync(path, encode));
  }
}

module.exports = new Parser();