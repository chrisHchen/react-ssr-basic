export default {
  get: (path, fn) => {
    return async (ctx, next) => {
      if (new RegExp(`/${path}/`).test(ctx.path)) {
        // await next();
        await fn(ctx);
      } else {
        await next();
      }
    };
  },
};
