var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
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
    filename: '[name].[chunkhash].js'
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
      // splitting some webpack runtime codes from vendor.js 
      // into manifest.js
      names: ['vendor', 'manifest'],
    }),
    // automatically maintain the <script>...</script> tags
    // in index.html
    new htmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ]
};
