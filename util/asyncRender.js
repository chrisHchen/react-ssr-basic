import { matchPath } from 'react-router';
import routes from '../routes';

export default async ({ url, isClient}) => {
  const route = routes.find(r => matchPath(url, {
    path: r.path,
    exact: true,
  }));

  if (route) {
    const Cmp = await route.load();
    let data = {};
    if (!isClient) {
      data = await route.fetch();
    }

    return ({
      Cmp: Cmp.default || Cmp,
      data,
      ...route,
    });
  } else {
    return ({
      Cmp: null,
    });
  }
};
