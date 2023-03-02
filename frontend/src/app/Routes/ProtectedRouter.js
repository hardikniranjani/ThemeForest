import React,{ Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './Routes'; // Route list
import Loader from '../shared/Spinner';

const ProtectedRoutes = () => (
  <Switch>
    <Suspense
      fallback={<Loader />}
    >
      {routes.map(({ component: Component, path, exact }) => (
        <Route
          path={`/${path}`}
          key={path}
          exact={exact}
        >
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;