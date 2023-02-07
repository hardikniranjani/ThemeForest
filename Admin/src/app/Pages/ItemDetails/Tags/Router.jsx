import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

const Tags = lazy(() => import('./index.jsx'));
const Create = lazy(() => import('./create.jsx'));
const Edit = lazy(() => import('./[Slug]/edit.jsx'));




function ItemRoute() {
    return (
        <>
            <Switch>
                <Route path="/item-detail/tags/list" component={Tags} />
                <Route path="/item-detail/tags/add" component={Create} />
                <Route path="/item-detail/tags/edit/:id" component={Edit} />
                <Redirect
                    exact={true}
                    from="/item-detail/tags"
                    to="/item-detail/tags/list"
                />
            </Switch>
        </>
    )
}

export default ItemRoute