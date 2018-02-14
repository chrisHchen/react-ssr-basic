import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import route from './util/route';

const handler = require('./build/server').default;

const app = new Koa();

app.use(serve(path.join(__dirname, 'build/public')));

app.use(route.get('*', handler));

/** this is test route for renderToNodeStream */
// app.use(route.get('/stream', stream));
// app.use(route.get('/streamstatic', streamStatic));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('koa server at http://localhost:3000');
});
