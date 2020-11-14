import React, { forwardRef } from 'react';
import { cnb } from 'cnbuilder';
import { Grid, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Card from './common/Card';

const DeviceInfo = forwardRef((props, ref) => {
    const { detailedDevice, onClearDetailedDevice, classes } = props;

    return (
        <Card ref={ref}>
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
    )
});

export default DeviceInfo;
