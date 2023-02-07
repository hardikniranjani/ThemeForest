import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

const CompatibleBrowsers = lazy(() => import('./index.jsx'));
const Create = lazy(() => import('./create.jsx'));
const Edit = lazy(() => import('./[Slug]/edit.jsx'));





function ItemRoute() {
    return (
        <>
            <Switch>

                <Route path="/item-detail/compatible-browsers/list" component={CompatibleBrowsers} />
                <Route path="/item-detail/compatible-browsers/add" component={Create} />
                <Route path="/item-detail/compatible-browsers/edit/:id" component={Edit} />
                <Redirect
                    exact={true}
                    from="/item-detail/compatible-browsers"
                    to="/item-detail/compatible-browsers/list"
                />
            </Switch>
        </>
    )
}

export default ItemRoute