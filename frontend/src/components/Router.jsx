import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Routes from '../const/Routes';
import CheckAuth from './CheckAuth';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import TaskPage from '../pages/Task';
import TestPage from '../pages/Test';

function makeRoute(route, Page = null) {
    return (
        <Route
            exact
            path={route.path}
            component={(props) => (
                <CheckAuth {...props} route={route} component={Page} />
            )}
        />
    );
}

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                {makeRoute(Routes.home, HomePage)}
                {makeRoute(Routes.login, LoginPage)}
                {makeRoute(Routes.task, TaskPage)}
                {makeRoute(Routes.test, TestPage)}
                <Redirect exact to={Routes.login.path} />
            </Switch>
        </BrowserRouter>
    );
}
