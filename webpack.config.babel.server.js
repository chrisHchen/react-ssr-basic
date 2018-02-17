import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import autoprefixer from 'autoprefixer';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
const CSS_MAPS = true;
const ENV = process.env.NODE_ENV || 'development';
const isDebug = !process.argv.includes('--release');

export default {
  name: 'server',

  target: 'node',

  devtool: 'source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
  ],
  entry: {
    server: ['@babel/polyfill', path.resolve(__dirname, './server/handler.js')],
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    publicPath: '/assets/',
    chunkFilename: 'chunks/[name].js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '6.5',
                  },
                  modules: false,
                  useBuiltIns: false,
                  debug: false,
                },
              ],
              '@babel/preset-stage-0',
              ['@babel/preset-react', { development: isDebug }],
            ],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              sourceMap: CSS_MAPS,
              modules: true,
              localIdentName: '[local]__[hash:base64:8]',
              camelCase: 'dashes',
              // minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: CSS_MAPS,
              plugins: () => {
                autoprefixer({
                  browsers: ['last 2 versions'],
                });
              },
            },
          },
          {
            loader: 'less-loader',
            // options: {
            //   sourceMap: CSS_MAPS,
            // },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: ENV === 'production' ? 'file-loader' : 'url-loader',
        options: {
          emitFile: false,
        },
      },
    ],
  },
  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: [
    './assets.json',
    nodeExternals(),
  ],
};
