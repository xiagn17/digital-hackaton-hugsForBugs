import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { cnb } from 'cnbuilder';
import Slide from '@material-ui/core/Slide';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Close } from '@material-ui/icons';

import Select from '../components/Select';
import { MODELS as EID_MODELS } from '../entities/device/IEDDevice';
import List from '../components/List';
import Card from '../components/Card';
import TaskPlayground from '../components/TaskPlayground';
import Header from '../components/Header';

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
                <Card>
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
                    <Card>
                        <button
                            onClick={onClearCategory}
                            className={cnb(classes.clearButton, classes.button)}
                        >
                            <ArrowBack />
                        </button>
                        <List
                            items={category?.devices}
                            onChange={onChangeDetailedCategory}
                        />
                    </Card>
                </Slide>
                <Slide
                    direction="down"
                    in={isDetailedDeviceChosen}
                    mountOnEnter
                    unmountOnExit
                >
                    <Card>
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
                                    <Close className={classes.closeButtonIcon} />
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
                    </Card>
                </Slide>
                <TaskPlayground />
            </div>
        </>
    );
};

export default Task;
