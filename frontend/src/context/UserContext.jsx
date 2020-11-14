import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRequest } from '../hooks/useRequest';
import { API_LOGIN, API_ME } from '../const/API_URL';
import { HTTP_REQUEST_METHODS } from '../const/HTTP_REQUEST_METHODS';
import {
    isRequestFailed,
    isRequestSucceeded,
    isRequestFinished,
} from '../utils/requestResolver';

const DEFAULT_USER = {};
const DEFAULT_USER_DATA = null;
const UserContext = React.createContext(DEFAULT_USER);

const UserContextProvider = (props) => {
    const { children, defaultState } = props;

    const [state, setState] = useState({
        ...defaultState,
        user: DEFAULT_USER_DATA,
    });

    const { state: loginRequestState, onRequest: onLogin } = useRequest({
        url: API_LOGIN,
        method: HTTP_REQUEST_METHODS.POST,
    });

    const { state: logoutRequestState, onRequest: onLogout } = useRequest({
        url: API_LOGIN,
        method: HTTP_REQUEST_METHODS.DELETE,
    });

    const { state: getMeRequestState, onRequest: onGetMe } = useRequest({
        url: API_ME,
        method: HTTP_REQUEST_METHODS.POST,
    });

    const setUser = (userInfo) => {
        setState((prev) => ({
            ...prev,
            user: userInfo,
        }));
    };

    const actions = {
        onLogin,
        onLogout,
        onGetMe,
        setUser,
    };

    useEffect(() => {
        if (!state.user) {
            onGetMe();
        }
    }, [state.user]);

    useEffect(() => {
        if (isRequestFinished(logoutRequestState.status)) {
            setUser(DEFAULT_USER_DATA);
        }
    }, [logoutRequestState.status]);

    useEffect(() => {
        if (isRequestSucceeded(loginRequestState.status)) {
            const user = loginRequestState.result;

            setUser(user);
        } else if (isRequestFailed(loginRequestState.status)) {
            setUser(DEFAULT_USER_DATA);
        }
    }, [loginRequestState.status]);

    useEffect(() => {
        if (isRequestSucceeded(getMeRequestState.status)) {
            const user = getMeRequestState.result;

            setUser(user);
        } else if (isRequestFailed(getMeRequestState.status)) {
            setUser(DEFAULT_USER_DATA);
        }
    }, [getMeRequestState.status]);

    return (
        <UserContext.Provider
            value={{
                state,
                actions,
                loginRequestState,
                logoutRequestState,
                getMeRequestState,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.any,
    defaultState: PropTypes.object,
};
UserContextProvider.defaultProps = {
    children: null,
    defaultState: {},
};

export { UserContext, UserContextProvider };
