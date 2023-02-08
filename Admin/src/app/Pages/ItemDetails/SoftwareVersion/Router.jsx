import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

const SoftwareVersion = lazy(() => import('./index.jsx'));
const Create = lazy(() => import('./create.jsx'));
const Edit = lazy(() => import('./[Slug]/edit.jsx'));




function ItemRoute() {
    return (
        <>
            <Switch>
                <Route path="/item-detail/software-version/list" component={SoftwareVersion} />
                <Route path="/item-detail/software-version/add" component={Create} />
                <Route path="/item-detail/software-version/edit/:id" component={Edit} />
                <Redirect
                    exact={true}
                    from="/item-detail/software-version"
                    to="/item-detail/software-version/list"
                />
            </Switch>
        </>
    )
}

export default ItemRoute