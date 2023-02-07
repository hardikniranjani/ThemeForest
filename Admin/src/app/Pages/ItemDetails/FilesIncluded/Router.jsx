import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

const FilesIncluded = lazy(() => import('./index.jsx'));
const Create = lazy(() => import('./create.jsx'));
const Edit = lazy(() => import('./[Slug]/edit.jsx'));




function ItemRoute() {
    return (
        <>
            <Switch>
                <Route path="/item-detail/files-included/list" component={FilesIncluded} />
                <Route path="/item-detail/files-included/add" component={Create} />
                <Route path="/item-detail/files-included/edit/:id" component={Edit} />
                <Redirect
                    exact={true}
                    from="/item-detail/files-included"
                    to="/item-detail/files-included/list"
                />
            </Switch>
        </>
    )
}

export default ItemRoute