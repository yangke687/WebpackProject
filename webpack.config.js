var webpack = require('webpack');
var path = require('path');
const VENDOR_LIBS = [
   'react',
   'lodash',
   'redux',
   'react-redux',
   'react-dom',
   'react-input-range',
   'redux-form',
   'redux-thunk',
   'faker',
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      }
    ]
  },
  plugins: [
    // solve the issue of double-including modules
    // such as React,Redux... only be included in 'vendor.js'
    // not in both 'bundle.js' and 'vendor.js'
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ]
};
