import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
const Items = lazy(() => import('./index.jsx'));
const CreateItem = lazy(() => import('./index.jsx'));
const EditItem = lazy(() => import('./[itemSlug]/index.jsx'));


function ItemRoute() {
    return (
        <>
            <Switch>
                <Redirect
                    exact={true}
                    from="/items"
                    to="/items/list"
                />
                <Route path="/items/list" component={Items} />
                <Route path="/items/add" component={CreateItem} />
                <Route path="/items/edit/:id" component={EditItem} />
            </Switch>
        </>
    )
}

export default ItemRoute