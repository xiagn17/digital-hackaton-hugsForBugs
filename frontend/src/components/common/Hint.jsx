import React, { useRef } from 'react';
import { makeStyles, DialogTitle, DialogContent, Grid } from '@material-ui/core';

import AnchorDialog from './AnchorDialog';
import { ReactComponent as QuestionMark } from '../../assets/imgs/icons/questionMark.svg';
import { ReactComponent as CloseIcon } from '../../assets/imgs/icons/close.svg';
import { useDialog } from '../../hooks/useDialog';
import { useHint } from '../../hooks/useHint';
import { cnb } from 'cnbuilder';

const useStyles = makeStyles(() => ({
    paper: {
        paddingBottom: 16,
        background: '#FFFFFF',
        boxShadow: '0px 0px 8px 1px rgba(0, 53, 114, 0.15)',
        borderRadius: 8,
        maxWidth: 322,
    },
    hintButton: {
        position: 'absolute',
        right: 15,
        top: 86,
        zIndex: 500,
        backgroundColor: '#59856A',
        height: 64,
        width: 64,
        borderRadius: '50%',
        color: '#fff',
        outline: 0,
        border: 0,
        cursor: 'pointer',
    },
    title: {
        padding: 0,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#2A5EA1',
    },
    content: {
        padding: 0,
        marginTop: 12,
        color: '#2A5EA1',
    },
    closeButton: {
        backgroundColor: 'transparent',
        outline: 0,
        border: 0,
        cursor: 'pointer',
    },
    closeButtonIcon: {
        transform: 'translateY(6px)',
    },
    hidden: {
        visibility: 'hidden',
    },
}));

const Hint = (props) => {
    const dialog = useDialog();
    const classes = useStyles();

    const anchorEl = useRef();

    const { hint } = useHint(Math.floor(Math.random() * 7));

    return (
        <>
            <button
                ref={anchorEl}
                className={cnb(classes.hintButton, { [classes.hidden]: dialog.open })}
                onClick={dialog.onOpen}
            >
                <QuestionMark />
            </button>
            <AnchorDialog
                anchorEl={anchorEl.current}
                open={dialog.open}
                onClose={dialog.onClose}
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
                    vertical: 'top',
                }}
            >
                <DialogTitle className={classes.title}>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item className={classes.titleText}>
                            Подсказка
                        </Grid>
                        <Grid item>
                            <button onClick={dialog.onClose} className={classes.closeButton}>
                                <CloseIcon className={classes.closeButtonIcon} />
                            </button>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    {hint.details}
                </DialogContent>
            </AnchorDialog>
        </>
    );
};

export default Hint;
