import Loading from '../src/components/loading';
import fakeFetch from '../util/fakeFetch';

export default [
  {
    path: '/',
    exact: true,
    load: () => import(/* webpackChunkName: 'home' */ '../src/components/home'),
    fetch: () => fakeFetch({ desc: 'this is fetched data from server'}),
    loading: Loading,
    chunkName: 'home',
  },
  {
    path: '/about',
    exact: true,
    load: () => import(/* webpackChunkName: 'about' */ '../src/components/about'),
    fetch: () => fakeFetch({ desc: 'about this app, keep it simple and see what happen under the hood'}),
    loading: Loading,
    chunkName: 'about',
  },
  {
    path: '/welcome',
    exact: true,
    load: () => import(/* webpackChunkName: 'welcome' */ '../src/components/welcome'),
    fetch: () => fakeFetch({ desc: '你好'}),
    loading: Loading,
    chunkName: 'welcome',
  },
];

