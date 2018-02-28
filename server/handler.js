import React from 'react';
import { StaticRouter } from 'react-router';
import ReactDOM from 'react-dom/server';
import asyncRender from '../util/asyncRender';
import Html from './html';
import Layout from '../src/components/layout';
import NoFound from '../src/components/noFound';

export default async (ctx) => {
  const props = {};
  const { Cmp, data, chunkName} = await asyncRender({ url: ctx.req.url});
  // inculde StaticRouter to avoid warning...
  const context = {};
  if (!Cmp) {
    ctx.body = ReactDOM.renderToString(<NoFound />);
    return;
  }
  props.children = ReactDOM.renderToString(
    <StaticRouter context={context}>
      <Layout initData={data}>
        <Cmp />
      </Layout>
    </StaticRouter>,
  );

  props.chunkName = chunkName;
  props.initData = data;
  const htmlMarkup = ReactDOM.renderToStaticMarkup(<Html {...props} />);

  ctx.body = `<!DOCTYPE html>
    ${htmlMarkup}
  `;
};
