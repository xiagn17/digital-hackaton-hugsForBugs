import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Switcher } from '../assets/imgs/icons/swticher.svg';
import { ReactComponent as DeleteIcon } from '../assets/imgs/icons/delete.svg';
import { ReactComponent as SettingsIcon } from '../assets/imgs/icons/settings.svg';
import { IconButton } from '@material-ui/core';

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
                    // onClick={onDeleteDevice}
                >
                    <SettingsIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Ciso7000;
