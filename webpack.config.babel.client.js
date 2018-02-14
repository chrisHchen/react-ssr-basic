import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import pkg from './package.json';

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = true;

const isDebug = !process.argv.includes('--release');

export default {
  name: 'client',

  target: 'web',

  devtool: 'source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    // https://webpack.js.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
  ],

  entry: {
    client: ['@babel/polyfill', path.resolve(__dirname, './src/client.js')],
  },

  output: {
    filename: '[name].js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, './build/public/assets'),
    chunkFilename: '[name].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'routes'),
          path.resolve(__dirname, 'util'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: ['transform-async-to-generator'],
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: pkg.browserslist,
                    forceAllTransforms: !isDebug, // for UglifyJS
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
      // Transform our own .(less|css) files with PostCSS and CSS-modules
      // NOTE: modules: true: import style from 'style.less'; <div className={style.hello}></div>
      // modules: false: import 'style.less';
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:8]',
              camelCase: 'dashes',
              sourceMap: CSS_MAPS,
              minimize: true,
              importLoaders: 1,
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
            options: {
              sourceMap: CSS_MAPS,
            },
          },
          ],
        }),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: 'raw-loader',
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: ENV === 'production' ? 'file-loader' : 'url-loader',
      },
    ],
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
