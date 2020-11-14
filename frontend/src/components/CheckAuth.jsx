import React, { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import routes from '../const/Routes';
import { UserContext } from '../context/UserContext';
import { isRequestInitial, isRequestFinished } from '../utils/requestResolver';
import LoadingScreen from './LoadingScreen';

const isRouteAllowed = (routeRole, user) => {
    const isNeedAuth = Boolean(routeRole.length);

    if (!isNeedAuth) {
        return true;
    }

    const isAuthorized = Boolean(user);
    const hasAccessToRoute = isAuthorized && routeRole.includes(user.role);
    return hasAccessToRoute;
};

export default function CheckRoomAuth({
    component: Component,
    route,
    ...rest
}) {
    const {
        state: { user },
        actions: { onGetMe },
        getMeRequestState,
        loginRequestState,
        logoutRequestState,
    } = useContext(UserContext);
    const { routeRole = [] } = route;

    const IS_ROUTE_ALLOWED = useMemo(
        () => isRouteAllowed(routeRole, getMeRequestState.result || user),
        [getMeRequestState.result, user, routeRole],
    );

    useEffect(() => {
        if (!user && isRequestInitial(getMeRequestState.status)) {
            onGetMe();
        }
    }, [getMeRequestState.status, user]);

    if (IS_ROUTE_ALLOWED) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...rest} />;
    }

    if (
        (isRequestFinished(getMeRequestState.status) ||
            isRequestFinished(loginRequestState.status) ||
            isRequestFinished(logoutRequestState.status)) &&
        !IS_ROUTE_ALLOWED
    ) {
        return <Redirect to={routes.login.path} />;
    }

    return <LoadingScreen />;
}

CheckRoomAuth.propTypes = {
    component: PropTypes.elementType.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};
