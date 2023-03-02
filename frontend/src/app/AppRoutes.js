import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const PrivteRoutes = lazy(() => import('./Routes/PrivateRoutes'));
const AuthRoutes = lazy(() => import('./Routes/AuthRoutes'));

class AppRoutes extends Component {

  render() {
    const token = sessionStorage.getItem('token');
    return (
      <>
        <Suspense>
          <Switch>
            {token ?
              <>
                <Route>
                  <AuthRoutes />
                </Route>
              </>
              :
              <>
                <Route>
                  <PrivteRoutes />
                </Route>
              </>
            }
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default AppRoutes;