import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
const Authors = lazy(() => import('./index.jsx'));
const CreateAuthor = lazy(() => import('./create.jsx'));
const EditAuthor = lazy(() => import('./[authorSlug]/edit.jsx'));


function AuthorRoute() {
    return (
        <>
            <Switch>
                <Redirect
                    exact={true}
                    from="/authors"
                    to="/authors/list"
                />
                <Route path="/authors/list" component={Authors} />
                <Route path="/authors/addauthor" component={CreateAuthor} />
                <Route path="/authors/editauthor/:id" component={EditAuthor} />
            </Switch>
        </>
    )
}

export default AuthorRoute