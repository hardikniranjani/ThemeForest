import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

// const customerRoutes = lazy(() => import('./Pages/customers/customerRoutes'));
// const productRoutes = lazy(() => import('./Pages/products/productRoutes'));
// const faqRoutes = lazy(() => import('./Pages/Faq/faqRoutes'));

const PrivteRoutes = lazy(() => import('./Routes/PrivateRoutes'));
const AuthRoutes = lazy(() => import('./Routes/AuthRoutes'));

class AppRoutes extends Component {

  render() {
    const token = sessionStorage.getItem('token');
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          {/* {console.log("token",token)} */}
          {!token ?
            (<>
              <Route>
                <AuthRoutes /> 
              </Route>
              {/* <Route path="/auth" component={AuthRoutes} /> */}
            </>)
            :
            (<>
              {/* <Route path="/customers" component={customerRoutes} />
              <Route path="/products" component={productRoutes} />
              <Route path="/faq" component={faqRoutes} /> */}
              <Route>
                <PrivteRoutes />
              </Route>
            </>)
          }


        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;