import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { TaskContext } from '../context/TaskContext';
import { makeStyles } from '@material-ui/core/styles';
import IEDSettingsDialog from '../components/dialogs/IEDSettingsDialog';
import { useDialog } from '../hooks/useDialog';
import { ReactComponent as PlusIcon } from '../assets/imgs/icons/Rza220.svg';
import { ReactComponent as DeleteIcon } from '../assets/imgs/icons/delete.svg';
import { ReactComponent as SettingsIcon } from '../assets/imgs/icons/settings.svg';
import styled from 'styled-components';


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

const DeviceName = styled.div`
position:absolute;
top: -25px;
right: -15px;
z-index: 100;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
color: #000000;
`;

const Rza220 = ({ device, deviceName }) => {
    const {
        actions: { removeDevice },
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
        </div>
    );
};

export default Rza220;
