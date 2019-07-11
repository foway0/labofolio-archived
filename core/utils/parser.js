const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

class Parser {
  loadYaml(path, encode = 'utf-8') {
    return yaml.safeLoad(fs.readFileSync(path, encode));
  }

  pathJoin(...root) {
    return path.join(...root);
  }
}

module.exports = new Parser();