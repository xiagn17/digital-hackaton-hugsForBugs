import React, { useState, useCallback } from 'react';
import { cnb } from 'cnbuilder';
import Slide from '@material-ui/core/Slide';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Close } from '@material-ui/icons';
import Page from '../components/Page';

import Select from '../components/Select';
import { MODELS as EID_MODELS } from '../entities/device/IEDDevice';
import List from '../components/List';
import Card from '../components/Card';
import TaskPlayground from '../components/TaskPlayground';

const useStyles = makeStyles((theme) => ({
    dashboardWrapper: {
        backgroundColor: '#F3F3F3',
        height: '100%',
        padding: 16,
        display: 'flex',
        alignItems: 'flex-start',
    },
    header: {
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

const DashboardHeader = () => {
    return (
        <>
            <Typography>Практическое задание 1/2</Typography>
        </>
    );
};

const Task = () => {
    const classes = useStyles();

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
        <Page headerContent={<DashboardHeader />}>
            <div className={classes.wrapper}>
                <Card>
                    <Typography className={classes.header} variant="h6">
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
                    </Card>
                </Slide>
                <TaskPlayground />
            </div>
        </Page>
    );
};

export default Task;
