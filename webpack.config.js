const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = (args = {}) => {
  const MODE_DEVELOPMENT = 'development';
  const MODE_PRODUCTION = 'production';
  const mode = args.mode || MODE_DEVELOPMENT;

  const config = {
    mode,
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] },
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue'],
      modules: ['node_modules'],
      alias: {
        vue: 'vue/dist/vue.js',
      },
    },
    plugins: [new VueLoaderPlugin()],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      publicPath: 'http://localhost:8080/',
      inline: true,
      hot: true,
      noInfo: true,
      overlay: true,
    },
    optimization: {
      minimize: mode === MODE_PRODUCTION,
    },
  };
  config.stats = 'minimal';
  config.devtool = mode === MODE_PRODUCTION ? 'none' : 'eval-source-map';

  return config;
};
