import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
const CompatibleWith = lazy(() => import('./CompatibleWith/Router.jsx'));
const CompatibleBrowsersRouter = lazy(() => import('./CompatibleBrowsers/Router.jsx'));
const SoftwareVersion = lazy(() => import('./SoftwareVersion/Router.jsx'));
const FilesIncluded = lazy(() => import('./FilesIncluded/Router.jsx'));
const Tags = lazy(() => import('./Tags/Router.jsx'));



function ItemRoute() {
    return (
        <>
            <Switch>
                <Redirect
                    exact={true}
                    from="/item-detail"
                    to="/item-detail/compatible-with"
                />
                <Route path="/item-detail/compatible-with" component={CompatibleWith} />
                <Route path="/item-detail/compatible-browsers" component={CompatibleBrowsersRouter} />
                <Route path="/item-detail/software-version" component={SoftwareVersion} />
                <Route path="/item-detail/files-included" component={FilesIncluded} />
                <Route path="/item-detail/tags" component={Tags} />
            </Switch>
        </>
    )
}

export default ItemRoute