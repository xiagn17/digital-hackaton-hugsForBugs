import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { TaskContext } from '../../context/TaskContext';

import Form from '../../components/common/Form';
import IpMaskInput from '../common/IpMaskInput';
import IED_PARAMETERS from "../../const/IED_PARAMETERS";
import TableButton from "../common/TableButton";

const useStyles = makeStyles(() => ({
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

const IEDSettingsForm = (props) => {
    const { device, onClose } = props;
    const {
        actions: { updateDevice },
    } = useContext(TaskContext);

    const classes = useStyles();

    const { handleSubmit: onSubmitForm, control, reset } = useForm({
        defaultValues: device,
    });


    const completeByClick = () => {
        const l = device.name.length;
        const first = device.name.slice(l - 1, l) === '1';
        const second = device.name.slice(l - 1, l) === '2';
        const iedNumber = first ? 'first' : (second ? 'second' : '');
        const iedParametersForDevice = IED_PARAMETERS[iedNumber];

        reset({
            gcb: iedParametersForDevice?.gcb || '',
            goooseId: iedParametersForDevice?.goooseId || '',
            macAddress: iedParametersForDevice?.macAddress || '',
            appId: iedParametersForDevice?.appId || '',
            vlanId: iedParametersForDevice?.vlanId || '',
            minTime: iedParametersForDevice?.minTime || '',
            maxTime: iedParametersForDevice?.maxTime || ''
        });
    };

    const updateDeviceInfo = (IEDData) => {
        updateDevice(device.id, IEDData);
        onClose();
    };

    return (
        <Form onSubmit={onSubmitForm(updateDeviceInfo)}>
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Имя GCB"
                name="gcb"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="GOOSE ID"
                name="goooseId"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="MAC адрес"
                name="macAddress"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="APP ID"
                name="appId"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="VLAN ID"
                name="vlanId"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{ className: classes.input }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Min Time, мс"
                name="minTime"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{
                    className: classes.input,
                    type: 'number',
                    min: 0,
                }}
            />
            <Controller
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder="Max Time, мс"
                name="maxTime"
                autoFocus
                control={control}
                required
                className={classes.textField}
                inputProps={{
                    className: classes.input,
                    type: 'number',
                    min: 0,
                }}
            />
            <TableButton onClick={completeByClick}>Автозаполнение</TableButton>
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

export default IEDSettingsForm;
