import React,{ lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Loader from './shared/Spinner';
import ProtectedRoutes from './Routes/ProtectedRouter'; //Authenticated routes
import PublicRoute from './Routes/PublicRoute'; 
import PrivateRoute from './Routes/PrivateRouter'; 

const LoginPage = lazy(() => import('./Pages/AuthPages/login.jsx'));
// const Register = lazy(() => import('components/Register'));
// const ForgotPassword = lazy(() => import('components/ForgotPassword'));
const NoFoundComponent = lazy(() => import('./Pages/NotFound.jsx'));

const AppRoutes = () => {
  // const isAuthenticated = getToken();
  const isAuthenticated = 'yes';

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute
            path="/login"
            isAuthenticated={isAuthenticated}
          >
            <LoginPage />
          </PublicRoute>
          {/* <PublicRoute
            path="/register"
            isAuthenticated={isAuthenticated}
          >
            <Register />
          </PublicRoute> */}
          {/* <PublicRoute
            path="/forgot-password"
            isAuthenticated={isAuthenticated}
          >
            <ForgotPassword />
          </PublicRoute> */}
          <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
          >
            <ProtectedRoutes />
          </PrivateRoute>
          <Route path="*">
            <NoFoundComponent />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;