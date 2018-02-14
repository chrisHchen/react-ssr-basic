import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import routes from '../routes';
import Bundled from './bundle';
import Layout from './components/layout';
import asyncRender from '../util/asyncRender';

export default async () => {
  const pathname = window.location.pathname;
  const { Cmp, chunkName, fetch } = await asyncRender({ url: pathname });
  return (
    <Router>
      <Layout fetch={fetch}>
        {
          routes.map((r) => {
            if (r.chunkName === chunkName) {
              return (<Route
                path={r.path}
                exact={r.exact}
                component={Cmp}
                key={r.path}
              />);
            } else {
              return (<Route
                path={r.path}
                exact={r.exact}
                component={Bundled(r.load)}
                key={r.path}
              />);
            }
          })
        }
      </Layout>
    </Router>
  );
};
