var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

var tempet = merge(prodEnv, {
  NODE_ENV: '"development"',
  __DEV__:true,
  __PRO__:false
});

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  __DEV__:true,
  __PRO__:false
})
