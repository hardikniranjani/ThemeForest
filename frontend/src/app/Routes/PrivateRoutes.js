import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../shared/Spinner';

const Dashboard = lazy(() => import('../Pages/Home.jsx'));
const Account = lazy(() => import('../Pages/Account/index.jsx'));
const SearchProducts = lazy(() => import('../Pages/Items/SearchItems.jsx'));
// const ItemDetail = lazy(() => import('../Pages/Items/[ItemSlug]/SpecificItem.jsx'))
const ItemRouter = lazy(() => import('../Pages/Items/ItemsRutes.jsx'))
const NoFoundComponent = lazy(() => import('../Pages/NotFound.jsx'));

class PrivateRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Redirect
            exact={true}
            from="/private"
            to="/dashboard"
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={Account} />
          {/* <Route path="/search-items" component={SearchProducts} /> */}
          <Route path="/items" component={ItemRouter} />
          <Route path="*" component={NoFoundComponent} />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default PrivateRoutes;