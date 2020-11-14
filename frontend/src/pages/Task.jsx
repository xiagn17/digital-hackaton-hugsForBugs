import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MODELS as EID_MODELS } from '../entities/device/IEDDevice';
import TaskPlayground from '../components/TaskPlayground';
import Header from '../components/Header';
import NetworkSettingsDialog from '../components/dialogs/NetworkSettingsDialog';
import { useDialog } from '../hooks/useDialog';
import IEDSettingsDialog from '../components/dialogs/IEDSettingsDialog';
import { Device } from '../components/forms/GooseSettingsForm';
import IEDDevice from '../entities/device/IEDDevice';
import SelectDeviceModel from '../components/SelectDeviceModel';
import DeviceInfo from '../components/DeviceInfo';
import SelectCategory from '../components/SelectCategory';
import GooseSettingsDialog from '../components/dialogs/GooseSettingsDialog';

const useStyles = makeStyles((theme) => ({
    headerText: {
        color: '#2A5EA1',
        marginBottom: 24,
    },
    wrapper: {
        display: 'flex',
        alignItems: 'flex-start',
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
    deviceImage: {
        objectFit: 'contain',
        width: 300,
        height: 300,
    },
    deviceDetails: {
        maxWidth: 400,
    },
    finishTaskButton: {
        backgroundColor: 'transparent',
        border: '1px solid #2A5EA1',
        boxSizing: 'border-box',
        borderRadius: 24,
        padding: '8px 24px',
        fontSize: 16,
        cursor: 'pointer',
        transition: '150ms all ease-in-out',
        '&:hover': {
            backgroundColor: '#2A5EA1',
            color: '#fff',
        }
    },
}));

const categoryOptions = [
    {
        label: 'Р3А',
        value: 1,
        devices: EID_MODELS,
    },
    {
        label: 'Промышленные коммутаторы',
        value: 2,
        devices: [],
    },
    {
        label: 'Подключения',
        value: 3,
        devices: [],
    },
];

const Task = () => {
    const classes = useStyles();
    const step = 1;
    const totalSteps = 2;

    const [isCategoryChosen, setCategoryChosen] = useState(false);
    const [category, setCategory] = useState();
    const [isDetailedDeviceChosen, setDetailedDeviceChosen] = useState(false);
    const [detailedDevice, setDetailedDevice] = useState();

    const networkSettingsDialog = useDialog();
    const iedSettingsDialog = useDialog();
    const gooseSettingsDialog = useDialog();

    const onClearDetailedDevice = useCallback(() => {
        setDetailedDeviceChosen(false);

        setTimeout(() => {
            setDetailedDevice(undefined);
        }, 250);
    }, []);

    const onClearCategory = useCallback(() => {
        onClearDetailedDevice();
        setCategoryChosen(false);

        setTimeout(() => {
            setCategory(undefined);
        }, 250);
    }, [onClearDetailedDevice]);

    const onChangeCategory = useCallback((value) => {
        onClearDetailedDevice();
        setCategory(value);
        setCategoryChosen(true);
    }, []);

    const onChangeDetailedDevice = useCallback((value) => {
        setDetailedDevice(value);
        setDetailedDeviceChosen(true);
    }, []);

    const device1 = new IEDDevice('device-1', 0);
    const device2 = new IEDDevice('device-2', 0);

    device1.linkTo(device2);
    console.log({
        device1,
        device2,
    })

    return (
        <>
            <Header>
                <Typography variant="h5">
                    {`Часть ${step}/${totalSteps}. Практическое задание`}
                </Typography>
                <button className={classes.finishTaskButton}>
                    Завершить задание
                </button>
            </Header>
            <div className={classes.wrapper}>
                <SelectCategory
                    options={categoryOptions}
                    value={category}
                    onChangeCategory={onChangeCategory}
                    classes={classes}
                />
                <Slide
                    direction="down"
                    in={isCategoryChosen}
                    mountOnEnter
                    unmountOnExit
                >
                    <SelectDeviceModel
                        category={category}
                        onChangeDevice={onChangeDetailedDevice}
                        onClearCategory={onClearCategory}
                        classes={classes}
                    />
                </Slide>
                <Slide
                    direction="down"
                    in={isDetailedDeviceChosen}
                    mountOnEnter
                    unmountOnExit
                >
                    <DeviceInfo
                        detailedDevice={detailedDevice} onClearDetailedDevice={onClearDetailedDevice} classes={classes}
                    />
                </Slide>
                <TaskPlayground />
            </div>
        </>
    );
};

export default Task;
