import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoImg from '../assets/imgs/logo.png';

import ErrorBoundary from '../components/ErrorBoundary';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 120px',
        backgroundColor: 'white',
        height: 70
    },
    logo: {
        width: 184,
        height: 54
    },
    main: {},
    wrapper: {},
}));

export default function Page(props) {
    const { children } = props;
    const classes = useStyles();
    return (
        <ErrorBoundary>
            <header className={classes.header}>
                <img className={classes.logo} src={LogoImg} alt="Россети" />
            </header>
            <main className={classes.main}>
                <div className={classes.wrapper}>{children}</div>
            </main>
        </ErrorBoundary>
    );
}
