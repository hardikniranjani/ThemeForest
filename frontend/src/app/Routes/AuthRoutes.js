import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../shared/Spinner';


const LoginPage = lazy(() => import('../Pages/AuthPages/login.jsx'));

class AuthRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path="/auth/login" component={LoginPage} />
                    <Redirect to="/auth/login" />
                </Switch>
            </Suspense>
        );
    }
}

export default AuthRoutes;