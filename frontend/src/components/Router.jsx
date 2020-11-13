import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Routes from '../const/Routes';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

function makeRoute(route, Page = null) {
    return <Route exact path={route.path} component={Page} />;
}

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                {makeRoute(Routes.home, HomePage)}
                {makeRoute(Routes.login, LoginPage)}
                <Redirect exact to={Routes.login.path} />
            </Switch>
        </BrowserRouter>
    );
}