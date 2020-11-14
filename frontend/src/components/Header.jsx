import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LogoImg from '../assets/imgs/logo.png';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 120px',
        backgroundColor: 'white',
        height: 70,
        boxShadow: '0px 4px 8px rgba(0, 53, 114, 0.15)',
        color: '#2A5EA1',
    },
    logo: {
        width: 184,
        height: 54,
    },
}));


const Header = (props) => {
    const { children } = props;
    const classes = useStyles();

    return (
        <header className={classes.header}>
            {children || (
                <img className={classes.logo} src={LogoImg} alt="Россети" />
            )}
        </header>
    );
};

export default Header;
