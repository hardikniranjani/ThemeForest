import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../shared/Spinner';

// const customerRoutes = lazy(() => import('../Pages/customers/customerRoutes'));
// const productRoutes = lazy(() => import('../Pages/products/productRoutes'));
// const faqRoutes = lazy(() => import('../Pages/Faq/faqRoutes'));
const Dashboard = lazy(() => import('../Pages/dashBoard.jsx'));
const Account = lazy(() => import('../Pages/Account'));
const UserRouter = lazy(() => import('../Pages/User/userRoute.jsx'));
const AuthorRouter = lazy(() => import('../Pages/Author/AuthorRoute.jsx'));
const ItemRouter = lazy(() => import('../Pages/Items/ItemRouter.jsx'));
const ItemDetaisRouter = lazy(() => import('../Pages/ItemDetails/ItemDetailRouter.jsx'));

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
          <Route path="/users" component={UserRouter} />
          <Route path="/authors" component={AuthorRouter} />
          <Route path="/items" component={ItemRouter} />
          <Route path="/item-detail" component={ItemDetaisRouter} />
          
          {/* 
          <Route path="/products" component={productRoutes} />
          <Route path="/faq" component={faqRoutes} /> */}


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default PrivateRoutes;