const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.join(__dirname, 'src/client/app/index.jsx'),
  cssSrc: path.join(__dirname, 'src/client/styles/style.css'),
  compiled: path.join(__dirname, 'src/client/public')
};

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [PATHS.src, PATHS.cssSrc, 'webpack-hot-middleware/client'],
  output: { path: PATHS.compiled, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react'],
        exclude: /node_modules/
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;

