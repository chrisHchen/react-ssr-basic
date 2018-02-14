import { matchPath } from 'react-router';
import routes from '../routes';

export default async ({url}) => {
  const route = routes.find(r => matchPath(url, {
    path: r.path,
    exact: true,
  }));

  if (route) {
    const Cmp = await route.load();
    const data = await route.fetch();

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
