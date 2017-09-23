const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(3050, () => {
  console.log('Hey, I am listening');
});

