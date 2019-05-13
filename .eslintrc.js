module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'process': true,
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single',
      { 'avoidEscape': true, 'allowTemplateLiterals': true }
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': [
      // TODO log ???
      'error', { 'allow': ['log', 'error'] }
    ],
    'no-unused-vars': [
      'error', { 'argsIgnorePattern': 'req|res|next' }
    ]
  }
};