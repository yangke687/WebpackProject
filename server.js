const express = require('express');
const path = require('path');
const app = express();

if( process.env.NODE_ENV !== 'production' ) {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.config.js');
  const webpack = require('webpack');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => {
  const mode = process.env.NODE_ENV;
  console.log(`Hey, I am listening on mode: ${mode}`);
});

