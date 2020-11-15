import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Typography, TextField, Button } from '@material-ui/core';

import Form from '../../components/common/Form';
import IpMaskInput from '../common/IpMaskInput';
import { IED } from '../../entities/device/IEDDevice';
import IED_PARAMETERS from "../../const/IED_PARAMETERS";

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
    const {
        device: { label, id },
        control,
        classes,
    } = props;

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
                name={`${id}.ipAddress`}
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
                // InputProps={{
                //     inputComponent: IpMaskInput,
                // }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Маска подсети"
                name={`${id}.mask`}
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
                // InputProps={{
                //     inputComponent: IpMaskInput,
                // }}
            />
        </div>
    );
};

const NetworkSettingsForm = (props) => {
    const { devices, onClose, updateDevicesNetworkSettings } = props;

    const classes = useStyles();

    const { handleSubmit: onSubmitForm, control, reset } = useForm({
        defaultValues: {},
    });

    useEffect(() => {
        const objectToReset = devices
            .filter(d => d.type === 'ied')
            .map((device) => {
                const l = device.name.length;
                const id = device.id;
                const first = device.name.slice(l - 1, l) === '1';
                const second = device.name.slice(l - 1, l) === '2';
                const iedNumber = first ? 'first' : (second ? 'second' : '');
                const iedParametersForDevice = IED_PARAMETERS[iedNumber]?.FOR_CONNECTOR || {};
                return {
                    [id]: {
                        mask: iedParametersForDevice?.mask,
                        ipAddress: iedParametersForDevice?.ipAddress
                    }
                }
            })
            .reduce((acc, cur) => ({ ...acc, ...cur }), {});
        reset(objectToReset);
    }, []);

    const iedDevices = devices.filter(({ type }) => {
        return type === IED;
    });

    const handleSubmit = (data) => {
        updateDevicesNetworkSettings(data);
        onClose();
    };

    return (
        <Form onSubmit={onSubmitForm(handleSubmit)}>
            {iedDevices.map((device, index) => (
                <>
                    <Typography className={classes.header} variant="h6">
                        {`${device.type.toUpperCase()}${index + 1}`}
                    </Typography>
                    <Device
                        device={device}
                        control={control}
                        classes={classes}
                    />
                </>
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
