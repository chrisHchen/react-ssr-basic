
import webpack from 'webpack';
import clientConfig from './webpack.config.babel.client';
import serverConfig from './webpack.config.babel.server';

process.env.NODE_ENV = 'production';

webpack([clientConfig, serverConfig], (err, stats) => {
  if (err || stats.hasErrors()) {
    return process.stdout.write(JSON.toString(err));
  }
  process.stdout.write(`${stats.toString()}\n`);
});
