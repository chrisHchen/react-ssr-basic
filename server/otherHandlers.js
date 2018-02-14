import readable from './readable';

const stream = (ctx) => {
  ctx.type = 'text/html';
  ctx.body = readable();
};

const streamStatic = (ctx) => {
  ctx.type = 'text/html';
  ctx.body = readable(true);
};

export {
  stream,
  streamStatic,
};
