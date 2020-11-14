import React, { useState, useCallback, useContext, useMemo } from 'react';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TaskContext } from '../context/TaskContext';

import Routes from "../const/Routes";
import { MODELS as EID_MODELS } from '../entities/device/IEDDevice';
import { MODELS as SWITCHER_MODELS } from '../entities/device/SwitchDevice';
import TaskPlayground from '../components/TaskPlayground';
import Header from '../components/Header';
import SelectDeviceModel from '../components/SelectDeviceModel';
import DeviceInfo from '../components/DeviceInfo';
import SelectCategory from '../components/SelectCategory';
import { DEVICE_TYPE_CONSTRUCTORS_MAP } from '../const/deviceTypes';
import { useHistory } from 'react-router-dom';
import Hint from '../components/common/Hint';

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
        transform: 'translateY(3px)',
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
        devices: SWITCHER_MODELS,
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

    const taskType = useMemo(
        () => (step === 1 ? 'Практическое' : 'Теоретическое'),
        [step],
    );

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

        if (currentModel.component) {
            const DeviceConstructor =
                DEVICE_TYPE_CONSTRUCTORS_MAP[currentModel.type];

            const device = new DeviceConstructor(`${currentModel.label}-${devices.length + 1}`, currentModel);
            addDevice(device);
        }
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

    const onChangeDetailedDevice = useCallback((value) => {
        setDetailedDevice(value);
        setDetailedDeviceChosen(true);
    }, []);

    const history = useHistory()

    const goHome = () => {
        history.push(Routes.home.path)
    };

    return (
        <>
            <Header>
                <Typography variant="h5">
                    {`Часть ${step}/${totalSteps}. ${taskType} задание`}
                </Typography>
                <button className={classes.finishTaskButton} onClick={goHome}>
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
                        detailedDevice={detailedDevice}
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
                        detailedDevice={detailedDevice}
                        onClearDetailedDevice={onClearDetailedDevice}
                        onAddDevice={onAddDevice}
                        classes={classes}
                    />
                </Slide>
                <TaskPlayground devices={devices} />
                <Hint />
            </div>
        </>
    );
};

export default Task;
