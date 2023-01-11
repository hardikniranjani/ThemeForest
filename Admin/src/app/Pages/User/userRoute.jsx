import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
const Users = lazy(() => import('./index.jsx'));
const CreateUser = lazy(() => import('./Create.jsx'));
const EditUser = lazy(() => import('./[userSlug]/edit.jsx'));


function UserRoute() {
    return (
        <>
            <Switch>
                <Redirect
                    exact={true}
                    from="/users"
                    to="/users/list"
                />
                <Route path="/users/list" component={Users} />
                <Route path="/users/adduser" component={CreateUser} />
                <Route path="/users/edituser/:id" component={EditUser} />
            </Switch>
        </>
    )
}

export default UserRoute