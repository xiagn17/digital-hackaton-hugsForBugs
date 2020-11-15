import React from 'react';
import { cnb } from 'cnbuilder';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { ReactComponent as CloseIcon } from '../../assets/imgs/icons/close.svg';

import IEDSettingsForm from '../forms/IEDSettingsForm';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    paper: {
        padding: 16,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 8px 1px rgba(0, 53, 114, 0.15)',
        borderRadius: 8,
    },
    header: {
        color: '#2A5EA1',
    },
    button: {
        paddingLeft: 0,
        outline: 0,
        border: 0,
        color: '#2A5EA1',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    closeButton: {
        fontWeight: 700,
        fontSize: 20,
        marginLeft: 'auto',
        paddingRight: 0,
    },
    closeButtonIcon: {
        width: '1.2em',
        height: '1.2em',
    },
}));

const IEDSettingsDialog = (props) => {
    const { open, onClose, device, deviceIndex } = props;

    const classes = useStyles();

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            classes={{
                paper: classes.paper,
            }}
        >
            <DialogTitle>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography className={classes.header} variant="h5">
                            {device.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <button
                            onClick={onClose}
                            className={cnb(classes.closeButton, classes.button)}
                        >
                            <CloseIcon className={classes.closeButtonIcon} />
                        </button>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <IEDSettingsForm device={device} onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
};

export default IEDSettingsDialog;
