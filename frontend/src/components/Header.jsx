import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import LogoImg from '../assets/imgs/logo.png';
import { UserContext } from '../context/UserContext';
import { useDialog } from '../hooks/useDialog';

import { ReactComponent as userIcon } from '../assets/imgs/icons/user.svg';
import AnchorDialog from './common/AnchorDialog';
import { makeStyles, Typography } from '@material-ui/core';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 120px;
    background-color: white;
    height: 70px;
    box-shadow: 0px 4px 8px rgba(0, 53, 114, 0.15);
    color: #2A5EA1;
`;

const Logo = styled.img`
    width: 184px;
    height: 54px;
`;

const UserMenu = styled.button`
    border-radius: 50%;
    border: 0;
    outline: 0;
    background-color: #2A5EA1;
    width: 48px;
    height: 48px;
    cursor: pointer;
`;

const UserIcon = styled(userIcon)`

`;

const useStyles = makeStyles(() => ({
    paper: {
        marginTop: 16,
        paddingBottom: 16,
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px 1px rgba(0, 53, 114, 0.15)',
        borderRadius: 8,
        maxWidth: 322,
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: '1px solid #2A5EA1',
        boxSizing: 'border-box',
        borderRadius: 24,
        marginTop: 24,
        padding: '8px 24px',
        fontSize: 16,
        outline: 0,
        cursor: 'pointer',
        transition: '150ms all ease-in-out',
        '&:hover': {
            backgroundColor: '#2A5EA1',
            color: '#fff',
        },
    },
}));

const Header = (props) => {
    const { children } = props;

    const { state: { user }, actions: { onLogout } } = useContext(UserContext);

    const anchorEl = useRef();
    const userMenuDialog = useDialog();

    const classes = useStyles();

    return (
        <StyledHeader>
            {children || (
                <>
                    <Logo src={LogoImg} alt="Россети" />
                    {user && (
                        <>
                            <UserMenu onClick={userMenuDialog.onOpen} ref={anchorEl}>
                                <UserIcon />
                            </UserMenu>
                            <AnchorDialog
                                anchorEl={anchorEl.current}
                                open={userMenuDialog.open}
                                onClose={userMenuDialog.onClose}
                                classes={{
                                    paper: classes.paper,
                                    dialogContent: classes.dialogContent,
                                }}
                                transformOrigin={{
                                    horizontal: 'right',
                                    vertical: 'top',
                                }}
                                anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom',
                                }}
                            >
                                <Typography>
                                    {user.fullName}
                                </Typography>
                                <Typography>
                                    {`группа ${user.groupId}`}
                                </Typography>
                                <button className={classes.logoutButton} onClick={onLogout}>
                                    Выйти
                                </button>
                            </AnchorDialog>
                        </>
                    )}
                </>
            )}
        </StyledHeader>
    );
};

export default Header;
