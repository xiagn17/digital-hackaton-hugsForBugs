import React, { useState, useEffect, useContext } from 'react';
import { cnb } from 'cnbuilder';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button, Checkbox, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import Form from '../../components/common/Form';
import { TaskContext } from '../../context/TaskContext';

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
        device: { id, name, goosePorts, linkedDevices },
        classes,
        value,
        onChange,
    } = props;

    const handleChange = (port1, port2) => {
        onChange((prev) => ({
            ...prev,
            [id]: {
                goosePorts: {
                    ...prev[id].goosePorts,
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
                    {goosePorts.map((port) => (
                        <th
                            key={`input-${port}`}
                            className={cnb(classes.port, classes.borderBottom, classes.tableCell)}
                        >
                            {`Вход ${port}`}
                        </th>
                    ))}
                </tr>
                {linkedDevices[0].goosePorts.map((port) => (
                    <tr>
                        <th key={`output-${port}`}
                            className={cnb(classes.port, classes.borderRight, classes.tableCell)}
                            align="left"
                        >
                            {`Выход ${port}`}
                        </th>
                        <td align="center" colSpan={3}>
                            <RadioGroup
                                value={value[id].goosePorts[port]}
                                onChange={(e) => handleChange(port, e.target.value)}
                                className={classes.radioGroup}
                            >
                                {goosePorts.map((port) => (
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

    const { state: { gooseConnections }, actions: { updateGooseConnections } } = useContext(TaskContext);

    const classes = useStyles();

    const [state, setState] = useState(gooseConnections);

    useEffect(() => {
        setState(gooseConnections);
    }, [gooseConnections]);

    useEffect(() => {
        const newState = {};

        devices.forEach((d) => {
            const device = {
                goosePorts: {
                    0: null,
                    1: null,
                    2: null,
                },
            };
            newState[d.id] = device;
        });

        setState(newState);
    }, [devices]);

    const onSubmit = (e) => {
        e.preventDefault();

        const { goosePorts: ports1 } = state[devices[0].id];
        const { goosePorts: ports2 } = state[devices[1].id];
        const isValid = Object.values(ports1).every((p, i) => p === ports2[i]);

        updateGooseConnections(state, isValid);
        
        onClose();
    };

    return (
        <Form onSubmit={onSubmit}>
            <Grid container spacing={5}>
                {Object.keys(state).length > 0 && devices.map((device) => (
                    <Grid item xs={6} key={device.id}>
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
