import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LogoImg from '../assets/imgs/logo.png';

import ErrorBoundary from './ErrorBoundary';

const HEADER_HEIGHT = 70;

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 120px',
        backgroundColor: 'white',
        height: 70,
    },
    logo: {
        width: 184,
        height: 54,
    },
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
            <header className={classes.header}>
                {headerContent || (
                    <img className={classes.logo} src={LogoImg} alt="Россети" />
                )}
            </header>
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
