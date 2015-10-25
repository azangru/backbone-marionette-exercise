var path = require('path');

module.exports = {
  entry: "./js/main.js",
  resolve: {
    alias: {
      "marionette": "backbone.marionette"
    }
  },
  output: {
    path: path.resolve('build/js/'),
    publicPath: '/assets/js/',
    filename: "bundle.js"
  },
  devServer: {
    contentBase: 'public'
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.css$/, exclude: /node_modules/, loader: "style!css" },
      { test: /\.scss$/, exclude: /node_modules/, loader: "style!css!sass" },
      { test: /\.html/, loader: "underscore-template-loader" },
      { test: /\.hbs/, loader: "handlebars-template-loader" }
      //{ test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      //{ test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      //{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};

