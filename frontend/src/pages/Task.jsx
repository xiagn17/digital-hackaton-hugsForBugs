import React, { useState, useCallback, useContext } from 'react';
import { cnb } from 'cnbuilder';
import Slide from '@material-ui/core/Slide';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Close } from '@material-ui/icons';
import { TaskContext } from '../context/TaskContext';

import Select from '../components/Select';
import { MODELS as EID_MODELS } from '../entities/device/IEDDevice';
import List from '../components/List';
import Card from '../components/Card';
import TaskPlayground from '../components/TaskPlayground';
import Header from '../components/Header';
import { DEVICE_TYPE_CONSTRUCTORS_MAP } from '../const/deviceTypes';

const useStyles = makeStyles(() => ({
    dashboardWrapper: {
        backgroundColor: '#F3F3F3',
        height: '100%',
        padding: 16,
        display: 'flex',
        alignItems: 'flex-start',
    },
    headerText: {
        color: '#2A5EA1',
        marginBottom: 24,
    },
    wrapper: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    menu: {
        position: 'relative',
        zIndex: 401,
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
        },
    },
    addBtn: {
        display: 'block',
        minWidth: 121,
        margin: '0 auto',
        textTransform: 'capitalize',
        backgroundColor: '#2A5EA1',
        borderRadius: 24,
        color: 'white',
        '&:hover': {
            backgroundColor: '#2A5EA1',
            color: 'white',
        },
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
    const {
        state: { devices },
        actions: { addDevice },
    } = useContext(TaskContext);

    const [isCategoryChosen, setCategoryChosen] = useState(false);
    const [category, setCategory] = useState();
    const [isDetailedDeviceChosen, setDetailedDeviceChosen] = useState(false);
    const [detailedDevice, setDetailedDevice] = useState();

    const onAddDevice = useCallback(() => {
        const currentModel = detailedDevice;
        const DeviceConstructor =
            DEVICE_TYPE_CONSTRUCTORS_MAP[currentModel.type];
        const device = new DeviceConstructor('bro', currentModel);
        addDevice(device);
    }, [detailedDevice]);

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

    const onChangeDetailedCategory = useCallback((value) => {
        setDetailedDevice(value);
        setDetailedDeviceChosen(true);
    }, []);

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
                <Card className={classes.menu}>
                    <Typography className={classes.headerText} variant="h6">
                        Выбор устройства
                    </Typography>
                    <Select
                        options={categoryOptions}
                        value={category}
                        onChange={onChangeCategory}
                    />
                </Card>
                <Slide
                    direction="down"
                    in={isCategoryChosen}
                    mountOnEnter
                    unmountOnExit
                >
                    <Card className={classes.menu}>
                        <button
                            onClick={onClearCategory}
                            className={cnb(classes.clearButton, classes.button)}
                        >
                            <ArrowBack />
                        </button>
                        <Select
                            options={category?.devices || []}
                            onChange={onChangeDetailedCategory}
                            value={detailedDevice}
                        />
                    </Card>
                </Slide>
                <Slide
                    direction="down"
                    in={isDetailedDeviceChosen}
                    mountOnEnter
                    unmountOnExit
                >
                    <Card className={classes.menu}>
                        <Grid container direction="column" alignItems="center">
                            <Grid container item alignItems="flex-start">
                                <Typography variant="h6">
                                    {detailedDevice?.label}
                                </Typography>
                                <button
                                    onClick={onClearDetailedDevice}
                                    className={cnb(
                                        classes.closeButton,
                                        classes.button,
                                    )}
                                >
                                    <Close
                                        className={classes.closeButtonIcon}
                                    />
                                </button>
                            </Grid>
                            <Grid item>
                                <img
                                    src={detailedDevice?.img}
                                    alt={detailedDevice?.label}
                                    className={classes.deviceImage}
                                />
                            </Grid>
                            <Grid item>
                                <p className={classes.deviceDetails}>
                                    {detailedDevice?.details}
                                </p>
                            </Grid>
                        </Grid>
                        <Button
                            className={classes.addBtn}
                            onClick={onAddDevice}
                        >
                            Добавить
                        </Button>
                    </Card>
                </Slide>
                <TaskPlayground devices={devices} />
            </div>
        </>
    );
};

export default Task;
