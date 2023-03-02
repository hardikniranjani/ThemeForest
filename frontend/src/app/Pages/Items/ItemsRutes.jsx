import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
const SearchItem = lazy(() => import('./SearchItems.jsx'));
const ItemDetails = lazy(() => import('./[ItemSlug]/Index.jsx'));


function UserRoute() {
    return (
        <>
            <Switch>
                <Redirect
                    exact={true}
                    from="/items"
                    to="/items/search"
                />
                <Route path="/items/search" component={SearchItem} />
                <Route path="/items/detail/:id" component={ItemDetails} />
                <Redirect to="/items/search" />
            </Switch>
        </>
    )
}

export default UserRoute