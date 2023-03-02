
import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('../Pages/dashBoard.jsx')),
    exact: true
  },
  {
    path: 'dashboard',
    component: lazy(() => import('../Pages/Home.jsx')),
    exact: true
  },
  {
    path: 'item',
    component: lazy(() => import('../Pages/Items/[ItemSlug]/Index.jsx')),
  }
];

export default routes;