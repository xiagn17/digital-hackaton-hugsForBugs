import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import ErrorBoundary from './ErrorBoundary';
import Header from './Header';

const HEADER_HEIGHT = 70;

const useStyles = makeStyles((theme) => ({
    main: {
        position: 'relative',
        height: `calc(100% - ${HEADER_HEIGHT}px)`,
    },
    wrapper: {
        height: '100%',
    },
}));

export default function Page(props) {
    const { children, headerContent } = props;
    const classes = useStyles();

    return (
        <ErrorBoundary>
            <Header />
            <main className={classes.main}>
                <div className={classes.wrapper}>{children}</div>
            </main>
        </ErrorBoundary>
    );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    headerContent: PropTypes.any,
};
