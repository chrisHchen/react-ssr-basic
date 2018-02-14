import path from 'path';
import webpack from 'webpack';
import Koa from 'koa';
// import Router from 'koa-router';
import serve from 'koa-static';
import webpackDevMiddleware from 'webpack-dev-middleware';
import clientConfig from '../webpack.config.babel.client';
import serverConfig from '../webpack.config.babel.server';
import route from '../util/route';

// const router = new Router();
const isDebug = process.env.NODE_ENV !== 'production';

const multiCompiler = webpack([clientConfig, serverConfig]);

const serverCompiler = multiCompiler.compilers.find(
  compiler => compiler.name === 'server',
);

serverCompiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    return process.stdout.write(err || stats.toJson().errors);
  }
  process.stdout.write(stats.toString());
  // eslint-disable-next-line
  const handler = require('../build/server').default;

  const app = new Koa();

  app.use(serve(path.join(__dirname, 'public')));

  if (isDebug) {
    const clientCompiler = multiCompiler.compilers.find(
      compiler => compiler.name === 'client',
    );

    const middleware = webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      logLevel: 'silent',
    });

    app.use(async (ctx, next) => {
      await middleware(ctx.req, {
        end: (content) => {
          ctx.body = content;
        },
        setHeader: (name, value) => {
          ctx.set(name, value);
        },
      }, next);
    });
  }

  // router.get('*', handler);

  app.use(route.get('*', handler));

  /** this is test route for renderToNodeStream */
  // app.use(route.get('/stream', stream));
  // app.use(route.get('/streamstatic', streamStatic));

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('\n koa server at http://localhost:3000');
  });
});
