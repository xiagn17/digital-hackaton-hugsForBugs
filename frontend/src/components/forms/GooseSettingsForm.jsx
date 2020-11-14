import React from 'react';
import { cnb } from 'cnbuilder';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button, Checkbox } from '@material-ui/core';

import Form from '../../components/common/Form';

const useStyles = makeStyles(() => ({
    table: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
    },
    tableCell: {
        padding: 5,
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
    deviceNamePorts: {
        color: '#2A5EA1',
        fontSize: 13,
    },
    port: {
        fontWeight: 'normal',
        fontSize: 17,
    },
    checkboxIcon: {
        borderRadius: 3,
        width: 20,
        height: 20,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        border: '2px solid #2A5EA1',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkboxCheckedIcon: {
        backgroundColor: '#2A5EA1',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 18,
            height: 18,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    borderRight: {
        borderRight: '1px solid #2A5EA1',
    },
    borderBottom: {
        borderBottom: '1px solid #2A5EA1',
    }
}));

export const Device = (props) => {
    const { device: { id, name, ports, linkedDevices }, classes } = props;

    return (
        <div>
            <table className={classes.table}>
                <tr>
                    <th></th>
                    <td colspan={3} align="center" className={cnb(classes.deviceNamePorts, classes.tableCell)}>
                        {`Входы ${name}`}
                    </td>
                </tr>
                <tr>
                    <td align="left" className={cnb(classes.deviceNamePorts, classes.borderRight, classes.borderBottom, classes.tableCell)}>
                        {`Выходы ${linkedDevices[0].name}`}
                    </td>
                    {ports.map((port) => (
                        <th className={cnb(classes.port, classes.borderBottom, classes.tableCell)}>
                            {`Вход ${port}`}
                        </th>
                    ))}
                </tr>
                {linkedDevices[0].ports.map((port) => (
                    <tr>
                        <th className={cnb(classes.port, classes.borderRight, classes.tableCell)} align="left">
                            {`Выход ${port}`}
                        </th>
                        {ports.map((port) => (
                            <td align="center">
                                <Checkbox
                                    color="primary"
                                    icon={<span className={classes.checkboxIcon} />}
                                    checkedIcon={<span className={cnb(classes.checkboxIcon, classes.checkboxCheckedIcon)} />}
                                />
                            </td>
                        ))}
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
                        <Device device={device} classes={classes} />
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
