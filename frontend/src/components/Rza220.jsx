import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { TaskContext } from '../context/TaskContext';
import { makeStyles } from '@material-ui/core/styles';
import IEDSettingsDialog from '../components/dialogs/IEDSettingsDialog';
import { useDialog } from '../hooks/useDialog';
import { ReactComponent as PlusIcon } from '../assets/imgs/icons/Rza220.svg';
import { ReactComponent as DeleteIcon } from '../assets/imgs/icons/delete.svg';
import { ReactComponent as SettingsIcon } from '../assets/imgs/icons/settings.svg';
import { cnb } from 'cnbuilder';
import { PENDING, CONNECTED } from '../const/PORT_STATUS';
import styled from 'styled-components';


const useStyles = makeStyles(() => ({
    item: {
        position: 'relative',
        width: 171,
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
        position: 'absolute',
        bottom: 15,
        right: 8.5,
        margin: 0,
    },
    port: {
        display: 'block',
        backgroundColor: 'white',
        width: 16,
        height: 16,
        borderRadius: '50%',
        margin: 3,
        border: '1px solid #2A5EA1',
        cursor: 'pointer',
    },
    portPending: {
        backgroundColor: 'green',
    },
    portConnected: {
        backgroundColor: '#2A5EA1',
    }
}));

const DeviceName = styled.div`
position:absolute;
top: -25px;
left: 50%;
z-index: 100;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
color: #000000;
`;

const Rza220 = ({ device, deviceName }) => {
    const {
        actions: { removeDevice, resolveConnection },
    } = useContext(TaskContext);
    const { open, onOpen, onClose } = useDialog();
    const classes = useStyles();

    const onDeleteDevice = () => {
        removeDevice(device.id);
    };

    return (
        <div className={classes.item}>
            <DeviceName>{deviceName}</DeviceName>
            <PlusIcon className={classes.icon} />
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
                <IEDSettingsDialog
                    open={open}
                    onClose={onClose}
                    device={device}
                />
            </div>
            <ul className={classes.portsWrapper}>
                {device.ports.map(({ id, status }) => {
                    const portClassName = cnb(classes.port, {
                        [classes.portPending]: status === PENDING,
                        [classes.portConnected]: status === CONNECTED,
                    });

                    const handleResolveConnection = () => {
                        if (status === CONNECTED) {
                            return;
                        }
                        resolveConnection(device.id, id);
                    };

                    return (
                        <span
                            key={id}
                            id={id}
                            className={portClassName}
                            onClick={handleResolveConnection}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Rza220;
