import React, { forwardRef } from 'react';
import { cnb } from 'cnbuilder';
import { Grid, Typography, Button } from '@material-ui/core';
import { ReactComponent as CloseIcon } from '../assets/imgs/icons/close.svg';

import Card from './common/Card';
import { SWITCH } from '../entities/device/SwitchDevice';

const DeviceInfo = forwardRef((props, ref) => {
    const {
        detailedDevice,
        onClearDetailedDevice,
        classes,
        onAddDevice,
        devices,
    } = props;

    const btnDisabled =
        devices.find(({ type }) => type === SWITCH) &&
        detailedDevice?.type === SWITCH;

    const onAddBtnClick = () => {
        onAddDevice();
        onClearDetailedDevice();
    };

    return (
        <Card ref={ref}>
            <Grid container direction="column" alignItems="center">
                <Grid container item alignItems="flex-start">
                    <Typography variant="h6">
                        {detailedDevice?.label}
                    </Typography>
                    <button
                        onClick={onClearDetailedDevice}
                        className={cnb(classes.closeButton, classes.button)}
                    >
                        <CloseIcon className={classes.closeButtonIcon} />
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
                <Button
                    className={classes.addBtn}
                    onClick={onAddBtnClick}
                    disabled={btnDisabled}
                >
                    Добавить
                </Button>
            </Grid>
        </Card>
    );
});

export default DeviceInfo;
