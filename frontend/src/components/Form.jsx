import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { emptyFunc } from '../utils/emptyFunc';

const Form = (props) => {
    const {
        children,
        className,
        onSubmit,
        onReset,
    } = props;

    const handleSubmit = useCallback((ev) => {
        ev.preventDefault();
        onSubmit(ev);
    }, [onSubmit]);

    const handleReset = useCallback((ev) => {
        onReset(ev);
    }, [onReset]);

    return (
        <form
            className={className}
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            {children}
        </form>
    );
};

Form.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
};
Form.defaultProps = {
    children: null,
    className: '',
    onSubmit: emptyFunc,
    onReset: emptyFunc,
};

export default React.memo(Form);
