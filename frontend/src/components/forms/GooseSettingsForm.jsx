import React, { useState, useEffect } from 'react';
import { cnb } from 'cnbuilder';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button, Checkbox, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

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
    borderRight: {
        borderRight: '1px solid #2A5EA1',
    },
    borderBottom: {
        borderBottom: '1px solid #2A5EA1',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    radioWrapper: {
        marginLeft: 0,
        marginRight: 0,
        '&:first-child': {
            transform: 'translateX(-8px)',
        },
        '&:last-child': {
            transform: 'translateX(5px)',
        }
    },
}));

export const Device = (props) => {
    const {
        device: { id, name, ports, linkedDevices },
        classes,
        value,
        onChange,
    } = props;

    const handleChange = (port1, port2) => {
        onChange((prev) => ({
            ...prev,
            [id]: {
                ports: {
                    ...prev[id].ports,
                    [port1]: port2,
                }
            }
        }));
    };

    return linkedDevices.length > 0 && (
        <div>
            <table className={classes.table}>
                <tr>
                    <th></th>
                    <td colspan={3} align="center" className={cnb(classes.deviceNamePorts, classes.tableCell)}>
                        {`Входы ${name}`}
                    </td>
                </tr>
                <tr>
                    <td
                        align="left"
                        className={cnb(
                            classes.deviceNamePorts,
                            classes.borderRight,
                            classes.borderBottom,
                            classes.tableCell
                        )}
                    >
                        {`Выходы ${linkedDevices[0].name}`}
                    </td>
                    {ports.map((port) => (
                        <th key={port} className={cnb(classes.port, classes.borderBottom, classes.tableCell)}>
                            {`Вход ${port}`}
                        </th>
                    ))}
                </tr>
                {linkedDevices[0].ports.map((port) => (
                    <tr>
                        <th key={port}
                            className={cnb(classes.port, classes.borderRight, classes.tableCell)}
                            align="left"
                        >
                            {`Выход ${port}`}
                        </th>
                        <td align="center" colSpan={3}>
                            <RadioGroup
                                value={value[id].ports[port]}
                                onChange={(e) => handleChange(port, e.target.value)}
                                className={classes.radioGroup}
                            >
                                {ports.map((port) => (
                                    <FormControlLabel
                                        key={port}
                                        value={`${port}`}
                                        control={<Radio className={classes.radio} color="primary" />}
                                        className={classes.radioWrapper}
                                    />
                                ))}
                            </RadioGroup>
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

    const [state, setState] = useState();

    useEffect(() => {
        const newState = {};
        devices.forEach((d) => {
            if (!newState[d.id]) {
                newState[d.id] = {
                    ports: {},
                };
            }
            newState[d.id].ports = {
                0: devices.port ? devices.ports[0] : null,
                1: devices.port ? devices.ports[1] : null,
                2: devices.port ? devices.ports[2] : null,
            };
        });

        setState(newState)
    }, [devices]);

    const onSubmit = (e) => {
        e.preventDefault();

        devices.forEach((device) => {
            const { ports } = state[device.id];

            Object.keys(state).forEach((id) => {
                if (id !== device.id) {
                    device.subscribeTo(id, ports);
                }
            });
        });
        onClose();
    };

    return (
        <Form onSubmit={onSubmit}>
            <Grid container spacing={5}>
                {devices.map((device) => (
                    <Grid item xs={6}>
                        <Device
                            device={device}
                            classes={classes}
                            value={state}
                            onChange={setState}
                        />
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
