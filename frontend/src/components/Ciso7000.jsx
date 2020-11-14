import React, { useContext } from 'react';
import { useDialog } from '../hooks/useDialog';
import { TaskContext } from '../context/TaskContext';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ReactComponent as Switcher } from '../assets/imgs/icons/swticher.svg';
import { ReactComponent as DeleteIcon } from '../assets/imgs/icons/delete.svg';
import { ReactComponent as SettingsIcon } from '../assets/imgs/icons/settings.svg';
import { ReactComponent as PortIcon } from '../assets/imgs/icons/port.svg';
import NetworkSettingsDialog from './dialogs/NetworkSettingsDialog';
import { cnb } from 'cnbuilder';
import { PENDING, CONNECTED } from '../const/PORT_STATUS';

const useStyles = makeStyles(() => ({
    item: {
        position: 'relative',
        width: 536
    },
    icon: {
        position: 'relative',
    },
    btnWrapper: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    portsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0,
        width: 144,
        height: 64,
        position: 'absolute',
        bottom: 5,
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
    },
    port: {
        display: 'block',
        backgroundColor: 'transparent',
        width: 23,
        height: 19,
        // borderRadius: '50%',
        margin: 3,
        // border: '1px solid #2A5EA1',
        cursor: 'pointer',
    },
    rotatedPort: {
        transform: 'rotate(180deg)',
    },
    portPending: {
        backgroundColor: 'green',
    },
    portConnected: {
        '& svg': {
            fill: '#2A5EA1'
        }
    }
}));

const Ciso7000 = ({ device }) => {
    const {
        state: { devices },
        actions: { updateDevicesNetworkSettings, resolveConnection },
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
            <ul className={classes.portsWrapper}>
                {device.ports.map(({ id, status }, i) => {
                    const portClassName = cnb(classes.port, {
                        [classes.portPending]: status === PENDING,
                        [classes.portConnected]: status === CONNECTED,
                        [classes.rotatedPort]: i < 4,
                    });

                    const handleResolveConnection = () => {
                        if (status === CONNECTED) {
                            return;
                        }
                        resolveConnection(device.id, id);
                    };

                    return (
                        <div
                            key={id}
                            id={id}
                            className={portClassName}
                            onClick={handleResolveConnection}
                        >
                            <PortIcon />
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default Ciso7000;
