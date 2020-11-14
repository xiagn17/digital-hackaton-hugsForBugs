import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Typography, TextField, Button } from '@material-ui/core';

import Form from '../../components/common/Form';
import IpMaskInput from '../common/IpMaskInput';

const useStyles = makeStyles(() => ({
    header: {
        color: '#2A5EA1',
    },
    submitButton: {
        display: 'block',
        cursor: 'pointer',
        margin: '20px auto 0',
        backgroundColor: '#2A5EA1',
        boxShadow: '0px 4px 8px rgba(0, 53, 114, 0.15)',
        borderRadius: 24,
        width: 130,
    },
    textField: {
        backgroundColor: '#fff',
        borderRadius: 8,
    },
}));

const Device = (props) => {
    const { device: { label, id }, control, classes } = props;

    return (
        <div>
            <Typography className={classes.header} variant="subtitle1">
                {label}
            </Typography>
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="IP адрес"
                name={`${id}-ipAddress`}
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
                InputProps={{
                    inputComponent: IpMaskInput,
                }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Маска подсети"
                name={`${id}-mask`}
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
                InputProps={{
                    inputComponent: IpMaskInput,
                }}
            />
        </div>
    );
};

const NetworkSettingsForm = (props) => {
    const { devices, onClose } = props;

    const classes = useStyles();

    const {
        handleSubmit: onSubmitForm, control,
    } = useForm({
        defaultValues: {},
    });

    return (
        <Form onSubmit={onSubmitForm}>
            {devices.map((device) => (
                <Device
                    device={device}
                    control={control}
                    classes={classes}
                />
            ))}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submitButton}
            >
                Сохранить
            </Button>
        </Form>
    );
};

export default NetworkSettingsForm;