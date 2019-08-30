const path = require('path')

module.exports = (env = {}, args = {}) => {
  const MODE_DEVELOPMENT = 'development'
  const MODE_PRODUCTION = 'production'
  const mode = args.mode || MODE_DEVELOPMENT

  const config = {
    mode,
    entry: {
      'index': './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules']
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      publicPath: 'http://localhost:8080/',
      inline: true,
      hot: true,
      noInfo: true,
      overlay: true
    },
    optimization: {
      minimize: mode === MODE_PRODUCTION
    }
  }
  config.stats = 'minimal'
  config.devtool = mode === MODE_PRODUCTION ? 'none' : 'eval-source-map'

  return config
  
}