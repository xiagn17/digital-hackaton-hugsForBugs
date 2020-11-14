import React, { useContext } from 'react';
import { useDialog } from '../hooks/useDialog';
import { TaskContext } from '../context/TaskContext';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ReactComponent as Switcher } from '../assets/imgs/icons/swticher.svg';
import { ReactComponent as DeleteIcon } from '../assets/imgs/icons/delete.svg';
import { ReactComponent as SettingsIcon } from '../assets/imgs/icons/settings.svg';
import NetworkSettingsDialog from './dialogs/NetworkSettingsDialog';

const useStyles = makeStyles(() => ({
    item: {
        position: 'relative',
    },
    icon: {
        position: 'relative',
    },
    btnWrapper: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
}));

const Ciso7000 = ({ device }) => {
    const {
        state: { devices },
        actions: { updateDevicesNetworkSettings },
    } = useContext(TaskContext);

    const { open, onOpen, onClose } = useDialog();
    const {
        actions: { removeDevice },
    } = useContext(TaskContext);
    const classes = useStyles();

    const onDeleteDevice = () => {
        removeDevice(device.id);
    };

    return (
        <div className={classes.item}>
            <Switcher className={classes.icon} />
            <div className={classes.btnWrapper}>
                <IconButton
                    size="small"
                    className={classes.btn}
                    onClick={onDeleteDevice}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    size="small"
                    className={classes.btn}
                    onClick={onOpen}
                >
                    <SettingsIcon />
                </IconButton>
                <NetworkSettingsDialog
                    open={open}
                    onClose={onClose}
                    devices={devices}
                    updateDevicesNetworkSettings={updateDevicesNetworkSettings}
                />
            </div>
        </div>
    );
};

export default Ciso7000;
