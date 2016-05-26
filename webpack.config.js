var webpack = require('webpack')
module.exports = {
   entry: './index.js',
  // entry:[
  //   'webpack-dev-server/client?http://127.0.0.1:3000', // WebpackDevServer host and port
  //   'webpack/hot/only-dev-server',
  //   './index.js' // Your appʼs entry point
  // ],
  output: {
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
  new webpack.DefinePlugin({
  "process.env": {
     NODE_ENV: JSON.stringify("production")
   }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      //supresses warnings, usually from module minification
      warnings: false
    }
  }),
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.NoErrorsPlugin()
  // new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"]},
      { test: /\.json$/,exclude:/node-modules/,loader:'json'},
      { test: /\.(jpg|png)$/, exclude: /node_modules/, loader: "url?limit=8192"}
//      { test: /\.js$/, exclude: /node_modules/, loader: 'react-hot!jsx-loader?harmony'}
    ]
  }
}
