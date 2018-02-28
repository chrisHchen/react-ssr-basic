import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import routes from '../routes';
import Bundled from './bundle';
import Layout from './components/layout';
import asyncRender from '../util/asyncRender';

export default async () => {
  const pathname = window.location.pathname;
  const { Cmp, chunkName } = await asyncRender({ url: pathname, isClient: true });
  return (
    <Router>
      <Layout>
        {
          routes.map((r) => {
            if (r.chunkName === chunkName) {
              return (<Route
                path={r.path}
                exact={r.exact}
                component={props => <Cmp fetch={r.fetch} {...props} />}
                key={r.path}
              />);
            } else {
              return (<Route
                path={r.path}
                exact={r.exact}
                component={Bundled({ load: r.load, fetch: r.fetch})}
                key={r.path}
              />);
            }
          })
        }
      </Layout>
    </Router>
  );
};
