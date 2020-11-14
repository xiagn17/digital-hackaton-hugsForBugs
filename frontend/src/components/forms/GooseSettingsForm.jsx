import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button, Checkbox } from '@material-ui/core';

import Form from '../../components/common/Form';

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

export const Device = (props) => {
    const { device: { id, name, ports, linkedDevices } } = props;

    return (
        <div>
            <table>
                <tr>
                    <th></th>
                    <th colspan={3}>
                        {`Входы ${name}`}
                    </th>
                </tr>
                <tr>
                    <th align="left">
                        {`Выходы ${linkedDevices[0].name}`}
                    </th>
                    {ports.map((port) => (
                        <th>
                            {`Вход ${port}`}
                        </th>
                    ))}
                </tr>
                {linkedDevices[0].ports.map((port) => (
                    <tr>
                        <td>
                            {`Выход ${port}`}
                        </td>
                        <td>
                            <Checkbox />
                        </td>
                        <td>
                            <Checkbox />
                        </td>
                        <td>
                            <Checkbox />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
};

const GooseSettingsForm = (props) => {
    const { devices, onClose } = props;

    const classes = useStyles();

    const {
        handleSubmit: onSubmitForm, control,
    } = useForm({
        defaultValues: devices,
    });

    // const handleSubscribeDevice = useCallback((port) => {

    // }, [linkedDevices, ports, id]);

    return (
        <Form>
            <Grid container spacing={5}>
                {devices.map((device) => (
                    <Grid item xs={6}>
                        <Device device={device} />
                    </Grid>
                ))}
            </Grid>
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

export default GooseSettingsForm;
