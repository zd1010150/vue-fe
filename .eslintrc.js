// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  "globals": {
    "_": false,
    "d3": false,
    "echart" : true,
    "vm": true,
    "$": true,
    "jQuery": true
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    /*
    "off" 或 0 - 关闭规则
    "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    */
    'camelcase' : 0,
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'one-var': [2, { 'initialized': 'always' }]
  }
}
