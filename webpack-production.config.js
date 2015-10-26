var path = require('path');
var config = require('./webpack.config.js');

config.output = {
  path: path.resolve('public/assets/js/'),
  filename: "bundle.js"
};

module.exports = config;
