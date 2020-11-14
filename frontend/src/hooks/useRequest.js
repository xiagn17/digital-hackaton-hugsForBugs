import { useState, useContext, useCallback } from 'react';
import { sendHttpRequest } from '../utils/sendHttpRequest';
import { UserContext } from '../context/UserContext';
import { REQUEST_STATUSES } from '../const/REQUEST_STATUSES';
import { UNAUTHORIZED } from '../const/STATUS_CODES';

const DEFAULT_STATE = {
    status: REQUEST_STATUSES.INITIAL,
    isProcessing: false,
    result: null,
    errors: null,
};

export const useRequest = ({ url, method } = {}) => {
    const [state, setState] = useState(DEFAULT_STATE);
    const { actions: onLogout } = useContext(UserContext);

    // eslint-disable-next-line consistent-return
    const onRequest = useCallback(async ({ data, queries } = {}) => {
        setState({
            ...DEFAULT_STATE,
            isProcessing: true,
            status: REQUEST_STATUSES.PROCESSING,
        });

        try {
            const result = await sendHttpRequest({
                url,
                method,
                data,
                queries,
            });

            const nextState = {
                ...DEFAULT_STATE,
                isProcessing: false,
                status: REQUEST_STATUSES.SUCCEEDED,
                result,
            };

            setState(nextState);

            return nextState;
        } catch (err) {
            if (err.status === UNAUTHORIZED) {
                await onLogout();
            }

            setState({
                ...DEFAULT_STATE,
                isProcessing: false,
                status: REQUEST_STATUSES.FAILED,
                errors: err.errors || err,
            });
        }
    }, [url, method]);

    const onClearState = useCallback(() => {
        setState(DEFAULT_STATE);
    }, []);

    return {
        state,
        onRequest,
        onClearState,
    };
};
